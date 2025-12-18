const handleCopy = (e, className, copiedTxt) => {
	navigator.clipboard
		.writeText(e.target.innerText)
		.then(() => {
			const copyBanner = document.createElement("span");
			copyBanner.innerText = copiedTxt;

			Object.assign(copyBanner.style, {
				position: "absolute",
				top: "0",
				right: "0",
				transform: "translateX(calc(100% + 5px))",
				color: "#000",
				pointerEvents: "none",
			});

			const element = document.querySelector(className);

			element?.append(copyBanner);

			setTimeout(() => {
				copyBanner.remove();
			}, 3000);
		})
		.catch((err) => console.error("Error copying text:", err));
};

export default handleCopy;
