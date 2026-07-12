import { useEffect } from "react";
import { useForm, Button } from "@portfolio/ui";
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
  { key: "workExperience", label: "Work Experience" },
  { key: "education", label: "Education" },
  { key: "projects", label: "Projects" },
  { key: "certifications", label: "Certifications" },
];

const Config = () => {
  const { data, isLoading } = useGetConfigQuery();
  const [updateConfig, { isLoading: isSaving, isSuccess, error }] = useUpdateConfigMutation();
  const { values, handleChange, setValues } = useForm<ConfigType>(emptyConfig);

  useEffect(() => {
    if (data?.data) {
      setValues(data.data);
    }
  }, [data, setValues]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = configSchema.safeParse(values);
    if (!parsed.success) {
      alert(parsed.error.issues.map((i) => i.message).join(", "));
      return;
    }
    updateConfig(parsed.data);
  };

  if (isLoading) return <p className="text-ink-900 dark:text-canvas-100">Loading...</p>;

  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold text-ink-900 dark:text-canvas-100">Section Visibility</h1>
      <form onSubmit={handleSubmit} className="max-w-md space-y-3">
        {sections.map((section) => (
          <label
            key={section.key}
            className="flex items-center justify-between rounded border border-canvas-400 bg-white px-3 py-2 text-sm text-ink-900 dark:border-ink-700 dark:bg-ink-800 dark:text-canvas-100"
          >
            {section.label}
            <input
              type="checkbox"
              checked={values[section.key]}
              onChange={(e) => handleChange(section.key, e.target.checked)}
            />
          </label>
        ))}

        {error && <p className="text-sm text-primary-600 dark:text-primary-400">Failed to update</p>}
        {isSuccess && <p className="text-sm text-green-600 dark:text-green-400">Saved successfully</p>}

        <Button type="submit" disabled={isSaving} className="w-full">
          {isSaving ? "Saving..." : "Save"}
        </Button>
      </form>
    </div>
  );
};

export default Config;
