import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
	// TODO: learn this
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "ctrsfeqrmqoomorjcaqx.supabase.co",
			},
		],
	},
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
