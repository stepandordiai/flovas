import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        // TODO: Condition to scroll restoration when path has no hash

        if (pathname && !hash) {
            window.scrollTo(0, 0);
        } else {
            return;
        }
    }, [pathname]);

    return null;
}
