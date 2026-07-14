import { fetchFromApi } from "@/lib/api";
import type { About } from "@portfolio/schemas";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact — Steve Pinto",
  description: "Get in touch.",
};

const Contact = async () => {
  const about = await fetchFromApi<About>("/about");

  return (
    <main className="px-8 py-16">
      <p className="mb-2 font-mono text-xs uppercase tracking-wide text-primary-400">Get in touch</p>
      <h1 className="mb-10 text-2xl font-medium text-ink-50">Contact</h1>

      <div className="max-w-md space-y-4">
        <div className="rounded-lg border border-ink-800 p-4">
          <p className="mb-1 font-mono text-[10px] uppercase tracking-wide text-ink-500">Email</p>
          <a href={`mailto:${about.email}`} className="text-sm text-ink-50 hover:text-primary-400">
            {about.email}
          </a>
        </div>

        <div className="rounded-lg border border-ink-800 p-4">
          <p className="mb-1 font-mono text-[10px] uppercase tracking-wide text-ink-500">Location</p>
          <p className="text-sm text-ink-50">{about.location}</p>
        </div>

        {(about.socialLinks.github || about.socialLinks.linkedin || about.socialLinks.twitter) && (
          <div className="rounded-lg border border-ink-800 p-4">
            <p className="mb-2 font-mono text-[10px] uppercase tracking-wide text-ink-500">Elsewhere</p>
            <div className="flex flex-col gap-1.5">
              {about.socialLinks.github && (
                <a href={about.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-sm text-ink-50 hover:text-primary-400">
                  GitHub
                </a>
              )}
              {about.socialLinks.linkedin && (
                <a href={about.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm text-ink-50 hover:text-primary-400">
                  LinkedIn
                </a>
              )}
              {about.socialLinks.twitter && (
                <a href={about.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-sm text-ink-50 hover:text-primary-400">
                  Twitter
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Contact;
