"use client";

import { useLayoutEffect } from "react";

export default function ScrollToTop() {
	useLayoutEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "instant",
		});
	}, []);

	return null;
}
