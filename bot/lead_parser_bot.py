import asyncio
import logging
import os
import random
import re
from datetime import datetime

from dotenv import load_dotenv
from supabase import create_client, Client
from telethon import TelegramClient, events
from telethon.errors import FloodWaitError

load_dotenv()

# ========================= НАЛАШТУВАННЯ =========================

API_ID = int(os.getenv('API_ID'))
API_HASH = os.getenv('API_HASH')
PHONE = os.getenv('PHONE')

SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_KEY')

GROUPS_TO_MONITOR = [
    "work_praha",
    "help_praha",
    "Czech_Republic_UA",
    "Pragafushki",
    "UA_inCzech",
    "Vova5621",
    "czechia_2020",
    "praceska",
    "praha_rabota_chat",
    "cz_job",
    # Додай свої групи
]

KEYWORDS = [
    # Основні
    "шукаю роботу", "резюме", "відгукнусь", "пошук роботи",
    "готова працювати", "готовий працювати", "шукати роботу",
    
    # Додаткові популярні
    "відкриті до пропозицій", "відкритий до пропозицій",
    "в активному пошуку", "шукаю вакансію", "працюю віддалено",
    "готов вийти", "готов приступити",
    
    # Варіанти написання
    "роботу шукаю", "шукаю роботу в", "треба роботу",
    
    # Поширені фрази
    "мені 18", "мені 20", "мені 25", "мені 30",  # якщо потрібно
    "дівчина шукає", "хлопець шукає",

    # Пряме формулювання пошуку
    "шукаю підробіток", "потрібна робота", "потрібна підробота",
    "розгляну вакансії", "розгляну пропозиції", "потрібен заробіток",

    # Готовність
    "можу вийти", "можу приступити", "готова вийти",
    "шукаю на повний день", "шукаю на пів дня", "шукаю зміни",

    # Типові для українців у Чехії
    "шукаю роботу в чехії", "потрібна робота в чехії",
    "шукаю роботу прага", "потрібне житло і робота",
]

# ========================= SUPABASE =========================
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

client = TelegramClient('lead_parser_session', API_ID, API_HASH)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# ====================== ПАРСИНГ ======================
def extract_phone(text: str):
    # """Витягує українські (+38), чеські (+42) та інші номери"""
    if not text:
        return None
        
    # Більш універсальні патерни
    patterns = [
        # Українські номери
        r'(\+?38)?[\s(]*0\d{2}[\s)]*[\s.-]?\d{3}[\s.-]?\d{2}[\s.-]?\d{2}',
        r'(\+?38)?[\s(]*0\d{2}[\s)]*[\s.-]?\d{3}[\s.-]?\d{4}',           # інший формат
        # Чеські номери (+420)
        r'(\+?420)?[\s(]*0?\d{3}[\s)]*[\s.-]?\d{3}[\s.-]?\d{3}',
        # Загальний формат (будь-який номер з 9+ цифр)
        r'(\+?\d{1,4})?[\s(]*\d{3,4}[\s).-]*\d{2,4}[\s.-]*\d{2,4}[\s.-]*\d{2,4}',
    ]
    
    text_clean = re.sub(r'\s+', ' ', text)  # прибираємо зайві пробіли
    
    for pattern in patterns:
        matches = re.findall(pattern, text_clean)
        if matches:
            # Беремо найдовше співпадіння
            best_match = max(matches, key=len) if isinstance(matches[0], str) else max((m[0] for m in matches), key=len)
            # Очищаємо номер
            cleaned = re.sub(r'[\s().-]', '', best_match)
            if len(cleaned) >= 9:  # мінімальна довжина номера
                return best_match.strip()
    
    return None

def extract_name(text: str):
    patterns = [
        r'(?:Ім\'я|ПІБ|Name)[:\s]+([А-ЯІЇЄҐ][а-яіїєґ]+(?:\s+[А-ЯІЇЄҐ][а-яіїєґ]+){1,2})',
        r'^([А-ЯІЇЄҐ][а-яіїєґ]+(?:\s+[А-ЯІЇЄҐ][а-яіїєґ]+){1,2})',
    ]
    for pattern in patterns:
        match = re.search(pattern, text, re.IGNORECASE | re.MULTILINE)
        if match:
            return match.group(1).strip()
    return None

def extract_city(text: str):
    cities = ["Прага", "Колін", "Високе Мито", "Пардубіце", "Курім", "Хвалетіце"]
    for city in cities:
        if city.lower() in text.lower():
            return city
    return None

def extract_position(text: str):
    match = re.search(r'(Склад|Завод|Прибирання|Доглядання|Зеднік|Водій|Шліфувальник|Складник|Прибиральник)[\w\s-]+', text, re.IGNORECASE)
    return match.group(0).strip() if match else None

def extract_gender(text: str):
    text_lower = text.lower()
    if any(word in text_lower for word in ["дівчина", "жінка", "ж", "д"]):
        return "Жінка"
    if any(word in text_lower for word in ["хлопець", "чоловік", "ч", "м"]):
        return "Чоловік"
    return None

async def save_to_supabase(lead: dict):
    try:
        response = supabase.table("leads").insert(lead).execute()
        logging.info(f"✅ Лід збережено → {lead.get('name') or 'Без імені'}")
        return response
    except Exception as e:
        logging.error(f"❌ Помилка Supabase: {e}")
        return None

@client.on(events.NewMessage(chats=GROUPS_TO_MONITOR))
async def handler(event):
    try:
        if not event.message or not event.message.text:
            return

        text = event.message.text.strip()
        text_lower = text.lower()

        if not any(kw in text_lower for kw in KEYWORDS):
            return

        chat = await event.get_chat()
        sender = await event.get_sender()

        # Формат messengers під твою таблицю
        messengers = [
            {"name": "telegram", "isAvailable": True}
        ]

        lead = {
            "name": extract_name(text),
            "tel": extract_phone(text),
            "address": extract_city(text),
            "position": extract_position(text),
            "message": text[:3000],
            "gender": extract_gender(text),
            "status": "Новий",
            "messengers": messengers,          # ← правильний jsonb формат
        }

        await save_to_supabase(lead)

        await asyncio.sleep(random.uniform(0.8, 2.5))

    except FloodWaitError as e:
        logging.warning(f"FloodWait {e.seconds} сек...")
        await asyncio.sleep(e.seconds + 15)
    except Exception as e:
        logging.error(f"Помилка: {e}")

async def main():
    await client.start(phone=PHONE)
    print("🚀 Бот запущений і повністю адаптований під твою таблицю!")
    print(f"Моніторимо {len(GROUPS_TO_MONITOR)} груп")
    await client.run_until_disconnected()

if __name__ == '__main__':
    asyncio.run(main())