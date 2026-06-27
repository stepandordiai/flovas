import asyncio
import logging
import os
import random
import re
import requests
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
    "DZ_PracePraha",
    "robota_chehia",
    "CZ2023work",
    "work_chehia",
    "chehiya_pidtrymka"
]

KEYWORDS = [
    "шукаю роботу",
    "шукаю вакансії",
    "роботу в чехії", 
    "шукати роботу",
    "дівчина шукає",
    "жінка шукає",
    "переїхала",
    "переїхав",
    "шукаю в",
    "тільки переїхала",
    "готова працювати",
    "готовий працювати",
    "відкриті до пропозицій"
]

# Слова, за наявності яких лід ІГНОРУЄТЬСЯ
BLACKLIST = [
    "вакансії",
    "робота на курорті",
    "переїзд наш клопіт", 
    "житло включено",
    "$3000",
    "від $",
    "від 1500",
    "від 2000",
    "склад shein",
    "склад market",
    "електрокарі",
    "аванси щотижня",
    "біометричний паспорт",
    "чеська віза",
    "без досвіду 18–35",
    "працюй на курорті",
    "сонце",
    "пальми",
    "переїзд за наш рахунок",
    "вакансії по європі",
    "для українців 18–32"
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
        
# Дуже універсальний regex для чеських і українських номерів
    patterns = [
        r'(\+?420)?[\s.-]*(\d{3})[\s.-]*(\d{3})[\s.-]*(\d{3})',   # Чехія +420
        r'(\+?38)?0(\d{2})[\s.-]*(\d{3})[\s.-]*(\d{2})[\s.-]*(\d{2})',  # Україна
        r'(\+?\d{1,4})[\s.-]*(\d{3,4})[\s.-]*(\d{2,4})[\s.-]*(\d{2,4})',  # Загальний
    ]
    
    text_clean = re.sub(r'\s+', ' ', text)  # прибираємо зайві пробіли
    
    for pattern in patterns:
        match = re.search(pattern, text)
        if match:
            phone = match.group(0).strip()
            # Очищаємо від зайвих символів
            cleaned = re.sub(r'[\s().-]', '', phone)
            if len(cleaned) >= 9:   # мінімальна довжина нормального номера
                return phone
    return None

def extract_name(text: str):
  # Шукаємо ім'я або самопредставлення
    patterns = [
        r'(?:Мене звати|Я|Дівчина|Жінка|Хлопець|Чоловік)[:\s]*([А-ЯІЇЄҐ][а-яіїєґ]+(?:\s+[А-ЯІЇЄҐ][а-яіїєґ]+){0,2})',
        r'^([А-ЯІЇЄҐ][а-яіїєґ]+(?:\s+[А-ЯІЇЄҐ][а-яіїєґ]+){1,2})',
    ]
    for pattern in patterns:
        match = re.search(pattern, text, re.IGNORECASE | re.MULTILINE)
        if match:
            return match.group(1).strip()
    return None

def extract_city(text: str):
    cities = ["Брно", "Прага", "Мельник", "Прага-Схід", "Оломоуц", "Острава", "Пльзень", "Ліберець"]
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
        # 1. Зберігаємо в Supabase
        response = supabase.table("leads").insert(lead).execute()
        
        # 2. Відправляємо notify в React-адмінку (жорстко)
        notify_url = "https://www.flovas.cz"   # ← сюди твій сайт
        
        try:
            requests.post(
                f"{notify_url}/api/notify-lead",
                headers={"Content-Type": "application/json"},
                json=lead,
                timeout=5
            )
            logging.info("📨 Сповіщення відправлено в адмінку")
        except Exception as e:
            logging.warning(f"Не вдалося відправити notify: {e}")
        
        logging.info(f"✅ Лід збережено → {lead.get('name', 'Без імені')}")
        return response
        
    except Exception as e:
        logging.error(f"❌ Помилка: {e}")
        return None

@client.on(events.NewMessage(chats=GROUPS_TO_MONITOR))
async def handler(event):
    try:
        if not event.message or not event.message.text:
            return

        text = event.message.text.strip()
        text_lower = text.lower()

        # 1. Перевіряємо, чи є хоча б одне ключове слово
        if not any(kw in text_lower for kw in KEYWORDS):
            return

        # 2. Перевіряємо чорний список (реклама, вакансії від агентств)
        if any(bad in text_lower for bad in BLACKLIST):
            logging.info(f"⛔ Ігноровано рекламу: {text[:80]}...")
            return

        # Якщо дійшло сюди — це реальний лід від людини
        logging.info("🔥 Знайдено реальний лід!")

        chat = await event.get_chat()
        sender = await event.get_sender()

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
            "messengers": messengers,
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
    print("🚀 Бот запущений!")
    print(f"Моніторю {len(GROUPS_TO_MONITOR)} телеграм груп")
    await client.run_until_disconnected()

if __name__ == '__main__':
    asyncio.run(main())