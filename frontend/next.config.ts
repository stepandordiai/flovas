import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
	// TODO: learn this
	images: {
		remotePatterns: [
			{ protocol: "https", hostname: "flovas-admin.netlify.app" },
		],
	},
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
