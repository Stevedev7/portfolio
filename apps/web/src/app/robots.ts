import type { MetadataRoute } from "next";

const robots = (): MetadataRoute.Robots => {
	const baseUrl = process.env.SITE_URL ?? "https://stevedev7.qzz.io";

	return {
		rules: { userAgent: "*", allow: "/" },
		sitemap: `${baseUrl}/sitemap.xml`,
	};
};

export default robots;
