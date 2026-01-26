declare module "*.svg" {
	const content: string;
	export default content;
}

declare module "*.png" {
	const content: string;
	export default content;
}

declare module "*.jpg" {
	const content: string;
	export default content;
}

declare module "*.scss" {
	const content: { [className: string]: string };
	export default content;
}

declare module "*.mp4" {
	const content: string;
	export default content;
}

declare module "@eslint/js" {
	const content: string;
	export default content;
}

declare module "eslint-plugin-react" {
	const content: string;
	export default content;
}

declare module "eslint-plugin-react-hooks" {
	const content: string;
	export default content;
}

declare module "*.pdf" {
	const content: string;
	export default content;
}

declare module "*.json" {
	const value: any;
	export default value;
}
