import { useEffect } from "react";
import { toast } from "sonner";
import { useForm, Button, PageHeader, Card } from "@portfolio/ui";
import { configSchema, type Config as ConfigType } from "@portfolio/schemas";
import { useGetConfigQuery, useUpdateConfigMutation } from "../store/configApi";

const emptyConfig: ConfigType = {
  id: 1,
  projects: true,
  workExperience: true,
  skills: true,
  education: true,
  certifications: true,
  about: true,
};

const sections: { key: keyof Omit<ConfigType, "id">; label: string }[] = [
  { key: "about", label: "About" },
  { key: "skills", label: "Skills" },
  { key: "workExperience", label: "Work experience" },
  { key: "education", label: "Education" },
  { key: "projects", label: "Projects" },
  { key: "certifications", label: "Certifications" },
];

const Config = () => {
  const { data, isLoading } = useGetConfigQuery();
  const [updateConfig, { isLoading: isSaving }] = useUpdateConfigMutation();
  const { values, handleChange, setValues } = useForm<ConfigType>(emptyConfig);

  useEffect(() => {
    if (data?.data) {
      setValues(data.data);
    }
  }, [data, setValues]);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const parsed = configSchema.safeParse(values);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Invalid config data");
      return;
    }
    try {
      await updateConfig(parsed.data).unwrap();
      toast.success("Config updated");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  if (isLoading) return <p className="text-text-faint">Loading...</p>;

  return (
    <div>
      <PageHeader eyebrow="Settings" title="Section visibility" />
      <Card className="max-w-md p-6">
        <form onSubmit={handleSubmit} className="space-y-2">
          {sections.map((section) => (
            <label
              key={section.key}
              className="flex items-center justify-between rounded-md border border-border bg-surface-alt px-3 py-2.5 text-sm text-text"
            >
              {section.label}
              <input
                type="checkbox"
                checked={values[section.key]}
                onChange={(e) => handleChange(section.key, e.target.checked)}
              />
            </label>
          ))}
          <Button type="submit" disabled={isSaving} className="mt-2 w-full">
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Config;
