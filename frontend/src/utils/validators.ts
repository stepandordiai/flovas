export const isValidTel = (tel: string): boolean =>
	tel.trim() !== "" && tel.length > 8;
