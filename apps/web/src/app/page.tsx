import type { Metadata } from "next";
import { fetchFromApi } from "@/lib/api";
import type { About, Skill } from "@portfolio/schemas";

export const dynamic = "force-dynamic";

export const generateMetadata = async (): Promise<Metadata> => {
  const about = await fetchFromApi<About>("/about");
  return {
    title: `${about.name} — ${about.title}`,
    description: about.summary,
    openGraph: {
      title: `${about.name} — ${about.title}`,
      description: about.summary,
      images: about.avatarUrl ? [about.avatarUrl] : [],
    },
  };
};

const Home = async () => {
  const [about, skills] = await Promise.all([
    fetchFromApi<About>("/about"),
    fetchFromApi<Skill[]>("/skills"),
  ]);

  return (
    <main className="flex flex-col gap-14 px-8 py-16 md:flex-row md:items-center md:gap-10">
      <div className="flex-1">
        <p className="mb-3 font-mono text-xs uppercase tracking-wide text-primary-400">
          {about.title}
        </p>
        <h1 className="mb-3 max-w-xl text-3xl font-medium leading-snug text-ink-50">
          {about.summary}
        </h1>
        <p className="mb-6 max-w-md text-sm leading-relaxed text-ink-400">{about.bio}</p>
        <div className="flex gap-3">
          <a
            href="/projects"
            className="rounded-md bg-primary-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-500"
          >
            View projects
          </a>
          <a
            href="/contact"
            className="rounded-md border border-ink-700 px-5 py-2.5 text-sm font-medium text-ink-50 hover:bg-ink-800"
          >
            Contact
          </a>
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill.id}
              className="rounded-full bg-ink-800 px-3 py-1.5 font-mono text-xs text-ink-400"
            >
              {skill.name}
            </span>
          ))}
        </div>
      </div>
      {about.avatarUrl && (
        <img
          src={about.avatarUrl}
          alt={about.name}
          className="h-36 w-36 shrink-0 rounded-full border border-ink-800 object-cover"
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: about.name,
            jobTitle: about.title,
            email: about.email,
            address: about.location,
            url: process.env.SITE_URL,
            sameAs: Object.values(about.socialLinks).filter(Boolean),
          }),
        }}
      />
    </main>
  );
};

export default Home;
