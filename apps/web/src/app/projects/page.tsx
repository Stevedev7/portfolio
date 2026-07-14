import { fetchFromApi } from "@/lib/api";
import type { Project, Skill } from "@portfolio/schemas";

const Projects = async () => {
	const [projects, skills] = await Promise.all([
		fetchFromApi<Project[]>("/projects"),
		fetchFromApi<Skill[]>("/skills"),
	]);

	const skillMap = new Map(skills.map((skill) => [skill.id, skill.name]));

	return (
		<main className="px-8 py-16">
			<p className="mb-2 font-mono text-xs uppercase tracking-wide text-primary-400">Selected work</p>
			<h1 className="mb-10 text-2xl font-medium text-ink-50">Projects</h1>

			<div className="grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
				{projects.map((project) => (
					<div
						key={project.id}
						className="overflow-hidden rounded-lg border border-ink-800 bg-ink-950"
					>
						{project.imageUrl && (
							<img src={project.imageUrl} alt={project.title} className="h-36 w-full object-cover" />
						)}
						<div className="p-4">
							<div className="mb-1.5 flex items-center gap-2">
								<p className="text-sm font-medium text-ink-50">{project.title}</p>
								{project.featured && (
									<span className="rounded-full bg-primary-950 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wide text-primary-400">
										Featured
									</span>
								)}
							</div>
							<p className="mb-3 text-xs leading-relaxed text-ink-400">
								{project.description[0]}
							</p>
							<div className="mb-3 flex flex-wrap gap-1.5">
								{project.skillIds.map((id) => (
									<span
										key={id}
										className="rounded-full bg-ink-800 px-2.5 py-1 font-mono text-[10px] text-ink-400"
									>
										{skillMap.get(id) ?? "Unknown"}
									</span>
								))}
							</div>
							<div className="flex gap-3">
								{project.liveUrl && (
									<a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-xs uppercase tracking-wide text-primary-400 hover:text-primary-300">
										Live
									</a>
								)}
								{project.repoUrl && (
									<a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-xs uppercase tracking-wide text-ink-400 hover:text-ink-50">
										Source
									</a>
								)}
							</div>
						</div>
					</div>
				))}
			</div>

			{projects.length === 0 && (
				<p className="text-sm text-ink-500">No projects yet.</p>
			)}
		</main>
	);
};

export default Projects;
