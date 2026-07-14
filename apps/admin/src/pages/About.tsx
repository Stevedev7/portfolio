import { useEffect } from "react";
import { toast } from "sonner";
import { useForm, Button, Input, PageHeader, Card } from "@portfolio/ui";
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
  const [updateAbout, { isLoading: isSaving }] = useUpdateAboutMutation();
  const { values, handleChange, setValues } = useForm<AboutType>(emptyAbout);

  useEffect(() => {
    if (data?.data) {
      setValues(data.data);
    }
  }, [data, setValues]);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const parsed = aboutSchema.safeParse(values);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Invalid about data");
      return;
    }
    try {
      await updateAbout(parsed.data).unwrap();
      toast.success("About updated");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  if (isLoading) return <p className="text-text-faint">Loading...</p>;

  return (
    <div>
      <PageHeader eyebrow="Content" title="About" />
      <Card className="max-w-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-3">
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
          <Button type="submit" disabled={isSaving}>
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default About;
