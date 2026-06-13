import { useEffect, useRef } from "react";

type PaginationProps = {
	totalPages: number;
	currentPage: number;
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

export default function Pagination({
	totalPages,
	currentPage,
	setCurrentPage,
}: PaginationProps) {
	return (
		<div className="pagination" style={{ display: "flex", gap: "5px" }}>
			<button
				className="pag-btn"
				onClick={() => setCurrentPage((prev) => prev - 1)}
				disabled={currentPage === 1}
			>
				Назад
			</button>

			{/* First page */}
			<button
				onClick={() => setCurrentPage(1)}
				className={`pag-btn ${currentPage === 1 ? "pag-btn--active" : ""}`}
			>
				1
			</button>

			{currentPage > 3 && <span className="pag-btn">...</span>}

			{/* Sliding window */}
			{Array.from({ length: totalPages }, (_, i) => i + 1)
				.filter(
					(page) =>
						page !== 1 &&
						page !== totalPages &&
						// TODO: learn this
						Math.abs(page - currentPage) <= 1,
				)
				.map((page) => (
					<button
						key={page}
						onClick={() => setCurrentPage(page)}
						className={`pag-btn ${currentPage === page ? "pag-btn--active" : ""}`}
					>
						{page}
					</button>
				))}

			{currentPage < totalPages - 2 && <span className="pag-btn">...</span>}

			{/* Last page */}
			{totalPages > 1 && (
				<button
					onClick={() => setCurrentPage(totalPages)}
					className={`pag-btn ${currentPage === totalPages ? "pag-btn--active" : ""}`}
				>
					{totalPages}
				</button>
			)}

			<button
				className="pag-btn"
				onClick={() => setCurrentPage((prev) => prev + 1)}
				disabled={currentPage === totalPages}
			>
				Вперед
			</button>
		</div>
	);
}
