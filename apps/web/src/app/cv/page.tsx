import { fetchFromApi } from "@/lib/api";
import type { Experience, Education, Certification } from "@portfolio/schemas";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "CV — Steve Pinto",
  description: "Work experience, education, and certifications.",
};

const CV = async () => {
  const [experience, education, certifications] = await Promise.all([
    fetchFromApi<Experience[]>("/experience"),
    fetchFromApi<Education[]>("/education"),
    fetchFromApi<Certification[]>("/certifications"),
  ]);

  return (
    <main className="px-8 py-16">
      <p className="mb-2 font-mono text-xs uppercase tracking-wide text-primary-400">Experience</p>
      <h1 className="mb-10 text-2xl font-medium text-ink-50">CV</h1>

      <section className="mb-14 max-w-2xl">
        <div className="flex flex-col">
          {experience.map((entry, i) => (
            <div
              key={entry.id}
              className="relative border-l border-ink-800 py-1 pb-8 pl-6 last:pb-0"
            >
              <span
                className={`absolute left-[-5px] top-2 h-[9px] w-[9px] rounded-full ${i === 0 ? "bg-primary-600" : "bg-ink-700"
                  }`}
              />
              <div className="mb-1 flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                <p className="text-sm font-medium text-ink-50">{entry.role}</p>
                <p className="font-mono text-xs text-ink-500">
                  {entry.startDate} — {entry.endDate ?? "Present"}
                </p>
              </div>
              <p className="mb-2 text-xs text-ink-400">
                {entry.company} · {entry.location}
              </p>
              <ul className="list-disc space-y-1 pl-4">
                {entry.description.map((line, idx) => (
                  <li key={idx} className="text-xs leading-relaxed text-ink-400">
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-14 max-w-2xl">
        <p className="mb-2 font-mono text-xs uppercase tracking-wide text-primary-400">Education</p>
        <h2 className="mb-6 text-lg font-medium text-ink-50">Education</h2>
        <div className="flex flex-col gap-4">
          {education.map((entry) => (
            <div key={entry.id} className="rounded-lg border border-ink-800 p-4">
              <div className="mb-1 flex justify-between">
                <p className="text-sm font-medium text-ink-50">{entry.degree}</p>
                <p className="font-mono text-xs text-ink-500">
                  {entry.startDate} — {entry.endDate ?? "Present"}
                </p>
              </div>
              <p className="text-xs text-ink-400">{entry.institution}</p>
              {entry.modules.length > 0 && (
                <p className="mt-2 text-xs text-ink-500">{entry.modules.join(", ")}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-2xl">
        <p className="mb-2 font-mono text-xs uppercase tracking-wide text-primary-400">Certifications</p>
        <h2 className="mb-6 text-lg font-medium text-ink-50">Certifications</h2>
        <div className="flex flex-col gap-4">
          {certifications.map((cert) => (
            <div key={cert.id} className="rounded-lg border border-ink-800 p-4">
              <div className="mb-1 flex justify-between">
                <p className="text-sm font-medium text-ink-50">{cert.name}</p>
                <p className="font-mono text-xs text-ink-500">{cert.issueDate}</p>
              </div>
              <p className="text-xs text-ink-400">{cert.issuingOrganization}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default CV;
