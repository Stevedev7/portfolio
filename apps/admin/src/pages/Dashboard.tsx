import { Sparkles, Briefcase, GraduationCap, FolderGit2, Award, User } from "lucide-react";
import { StatCard, Card, PageHeader } from "@portfolio/ui";
import { useGetSkillsQuery } from "../store/skillsApi";
import { useGetExperienceQuery } from "../store/experienceApi";
import { useGetEducationQuery } from "../store/educationApi";
import { useGetProjectsQuery } from "../store/projectsApi";
import { useGetCertificationsQuery } from "../store/certificationsApi";
import { useGetAboutQuery } from "../store/aboutApi";

const Dashboard = () => {
  const { data: skills } = useGetSkillsQuery();
  const { data: experience } = useGetExperienceQuery();
  const { data: education } = useGetEducationQuery();
  const { data: projects } = useGetProjectsQuery();
  const { data: certifications } = useGetCertificationsQuery();
  const { data: about } = useGetAboutQuery();

  return (
    <div>
      <PageHeader eyebrow="Overview" title="Dashboard" />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        <StatCard icon={Sparkles} label="Skills" value={skills?.data.length ?? 0} />
        <StatCard icon={Briefcase} label="Experience" value={experience?.data.length ?? 0} />
        <StatCard icon={GraduationCap} label="Education" value={education?.data.length ?? 0} />
        <StatCard icon={FolderGit2} label="Projects" value={projects?.data.length ?? 0} />
        <StatCard icon={Award} label="Certifications" value={certifications?.data.length ?? 0} />
      </div>

      <Card className="mt-6 flex items-center gap-4 p-5">
        <div className="rounded-full bg-canvas-100 p-3 dark:bg-ink-700">
          <User size={18} className="text-primary-600 dark:text-primary-400" />
        </div>
        <div>
          <p className="font-medium text-ink-900 dark:text-canvas-100">{about?.data.name || "About not set up yet"}</p>
          <p className="text-sm text-ink-500 dark:text-ink-300">{about?.data.title || "Fill in the About section to get started"}</p>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
