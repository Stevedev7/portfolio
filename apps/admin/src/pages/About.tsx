import { useEffect } from "react";
import { useForm, Button, Input } from "@portfolio/ui";
import { aboutSchema, type About as AboutType } from "@portfolio/schemas";
import { useGetAboutQuery, useUpdateAboutMutation } from "../store/aboutApi";

const emptyAbout: AboutType = {
  id: 1,
  name: "",
  title: "",
  summary: "",
  bio: "",
  email: "",
  location: "",
  avatarUrl: "",
  socialLinks: {},
};

const About = () => {
  const { data, isLoading } = useGetAboutQuery();
  const [updateAbout, { isLoading: isSaving, isSuccess, error }] = useUpdateAboutMutation();
  const { values, handleChange, setValues } = useForm<AboutType>(emptyAbout);

  useEffect(() => {
    if (data?.data) {
      setValues(data.data);
    }
  }, [data, setValues]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = aboutSchema.safeParse(values);
    if (!parsed.success) {
      alert(parsed.error.issues.map((i) => i.message).join(", "));
      return;
    }
    updateAbout(parsed.data);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">About</h1>
      <form onSubmit={handleSubmit} className="max-w-lg space-y-3">
        <Input placeholder="Name" value={values.name} onChange={(e) => handleChange("name", e.target.value)} />
        <Input placeholder="Title" value={values.title} onChange={(e) => handleChange("title", e.target.value)} />
        <Input placeholder="Summary" value={values.summary} onChange={(e) => handleChange("summary", e.target.value)} />
        <Input placeholder="Bio" value={values.bio} onChange={(e) => handleChange("bio", e.target.value)} />
        <Input placeholder="Email" value={values.email} onChange={(e) => handleChange("email", e.target.value)} />
        <Input placeholder="Location" value={values.location} onChange={(e) => handleChange("location", e.target.value)} />
        <Input placeholder="Avatar URL" value={values.avatarUrl ?? ""} onChange={(e) => handleChange("avatarUrl", e.target.value)} />
        <Input
          placeholder="GitHub URL"
          value={values.socialLinks.github ?? ""}
          onChange={(e) => handleChange("socialLinks", { ...values.socialLinks, github: e.target.value })}
        />
        <Input
          placeholder="LinkedIn URL"
          value={values.socialLinks.linkedin ?? ""}
          onChange={(e) => handleChange("socialLinks", { ...values.socialLinks, linkedin: e.target.value })}
        />

        {error && <p className="text-sm text-red-600">Failed to update</p>}
        {isSuccess && <p className="text-sm text-green-600">Saved successfully</p>}

        <Button type="submit" disabled={isSaving}>
          {isSaving ? "Saving..." : "Save"}
        </Button>
      </form>
    </div>
  );
};

export default About;
