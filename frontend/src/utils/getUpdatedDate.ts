// TODO: learn this
import {
	formatDistanceToNow,
	differenceInDays,
	format,
	isToday,
	isYesterday,
} from "date-fns";

import { uk } from "date-fns/locale";

export default function getUpdatedDate(date: string) {
	const updatedAt = new Date(date);

	if (isToday(updatedAt)) return "сьогодні";
	if (isYesterday(updatedAt)) return "вчора";

	const days = differenceInDays(new Date(), updatedAt);

	if (days <= 7) {
		return formatDistanceToNow(updatedAt, {
			addSuffix: true,
			locale: uk,
		});
	}

	return format(updatedAt, "d MMMM yyyy", {
		locale: uk,
	});
}
