// TODO: LEARN THIS
export async function OPTIONS() {
	return new Response(null, {
		headers: {
			"Access-Control-Allow-Origin": "https://flovas-admin.netlify.app",
			"Access-Control-Allow-Methods": "POST, OPTIONS",
			"Access-Control-Allow-Headers": "Content-Type",
		},
	});
}

// TODO: LEARN THIS
export async function POST(req: Request) {
	const lead = await req.json();

	const text =
		`Новий лід 👨🏻\n\n` +
		`Імʼя: ${lead.name ?? "—"}\n` +
		`Телефон: ${lead.tel ?? "—"}\n` +
		`Адреса: ${lead.address ?? "—"}\n` +
		`Позиція: ${lead.position ?? "—"}\n` +
		`Стать: ${lead.gender ?? "—"}\n` +
		`Повідомлення: ${lead.message ?? "—"}`;

	await Promise.all([
		fetch(
			`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ chat_id: process.env.TELEGRAM_CHAT_ID, text }),
			},
		),
		fetch(
			`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_F_TOKEN}/sendMessage`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ chat_id: process.env.TELEGRAM_CHAT_F_ID, text }),
			},
		),
	]);

	return Response.json(
		{ ok: true },
		{
			headers: {
				"Access-Control-Allow-Origin": "https://flovas-admin.netlify.app",
			},
		},
	);
}
