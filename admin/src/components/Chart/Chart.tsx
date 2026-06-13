import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	Cell,
} from "recharts";

import "./Chart.scss";

type StatConfig<T> = {
	label: string;
	color: string;
	filter: (item: T) => boolean;
};

type Props<T> = {
	items: T[];
	stats: StatConfig<T>[];
	label?: string;
};

export default function Chart<T>({ items, stats, label }: Props<T>) {
	const data = stats.map((s) => ({
		label: s.label,
		color: s.color,
		count: items.filter(s.filter).length,
	}));

	return (
		<div>
			<div
				style={{
					display: "flex",
					flexWrap: "wrap",
					gap: "8px",
					marginBottom: 20,
					padding: "12px",
				}}
			>
				{data.map((d) => (
					<div key={d.label} className="stat-card">
						<p className="stat-label">{d.label}</p>
						<p className="stat-value" style={{ color: d.color }}>
							{d.count}
						</p>
					</div>
				))}
				<div className="stat-card">
					<p className="stat-label">Всього</p>
					<p className="stat-value">{items.length}</p>
				</div>
			</div>

			<ResponsiveContainer width="100%" height={280}>
				<BarChart data={data} barSize={48}>
					<CartesianGrid
						// TODO: learn this
						strokeDasharray="10 10"
						vertical={false}
						stroke="rgba(0, 0, 0, 0.5)"
					/>
					<XAxis
						tick={{ fill: "#000" }}
						dataKey="label"
						axisLine={false}
						tickLine={false}
					/>
					<YAxis
						tick={{ fill: "#000" }}
						allowDecimals={false}
						axisLine={false}
						tickLine={false}
						domain={[0, items.length]}
					/>
					<Tooltip
						cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
						formatter={(value) => [value, label ?? "Кількість"]}
					/>
					<Bar dataKey="count" radius={[12, 12, 0, 0]}>
						{data.map((d) => (
							<Cell key={d.label} fill={d.color} />
						))}
					</Bar>
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
}
