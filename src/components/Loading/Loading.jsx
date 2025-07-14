// import { useEffect } from "react";
// import "./Loading.scss";

// const Loading = () => {
// 	useEffect(() => {
// 		let start = 50;

// 		document.querySelectorAll(".loading__char").forEach((char, index) => {
// 			setTimeout(() => {
// 				char.classList.add("loading__char--active");
// 			}, start + index * 50);
// 		});

// 		setTimeout(() => {
// 			document.querySelector(".loading").style.display = "none";
// 		}, 2000);
// 	}, []);

// 	return (
// 		<div className="loading" style={{ display: "flex" }}>
// 			<p className="loading__title">
// 				{"flovas agency".split("").map((char, index) => {
// 					return (
// 						<span key={index} className="loading__char">
// 							{char}
// 						</span>
// 					);
// 				})}
// 			</p>
// 		</div>
// 	);
// };

// export default Loading;
