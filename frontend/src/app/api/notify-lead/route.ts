// TODO: LEARN THIS
export async function POST(req: Request) {
	const lead = await req.json();

	await fetch(
		`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
		{
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				chat_id: process.env.TELEGRAM_CHAT_ID,
				text:
					`Новий лід 👨🏻\n\n` +
					`Імʼя: ${lead.name ?? "—"}\n` +
					`Телефон: ${lead.tel ?? "—"}\n` +
					`Адреса: ${lead.address ?? "—"}\n` +
					`Позиція: ${lead.position ?? "—"}\n` +
					`Повідомлення: ${lead.message ?? "—"}`,
			}),
		},
	);

	return Response.json({ ok: true });
}
