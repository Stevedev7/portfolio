import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useForm, Button, Input, PageHeader, Card, FilePicker } from "@portfolio/ui";
import { aboutSchema, type About as AboutType } from "@portfolio/schemas";
import { useGetAboutQuery, useUpdateAboutMutation } from "../store/aboutApi";
import { useGetFilesQuery, useUploadFileMutation } from "../store/filesApi";
import { Upload } from 'lucide-react';

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

  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const { data: filesData } = useGetFilesQuery();
  const [uploadFile, { isLoading: isUploadingAvatar }] = useUploadFileMutation();

  const handleAvatarUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const result = await uploadFile(formData).unwrap();
      handleChange("avatarUrl", result.data.url);
      toast.success("Avatar uploaded");
    } catch {
      toast.error("Avatar upload failed");
    }
  };

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
          <div>
            <p className="mb-1 font-mono text-[10px] uppercase tracking-wide text-text-faint">Avatar</p>
            <div className="flex items-center gap-2">
              {values.avatarUrl ? (
                <img src={values.avatarUrl} alt="" className="h-12 w-12 rounded-full object-cover" />
              ) : (
                <div className="h-12 w-12 rounded-full bg-surface-alt" />
              )}
              <label className="flex cursor-pointer items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs text-text-muted hover:bg-surface-alt">
                <Upload size={12} />
                {isUploadingAvatar ? "Uploading..." : "Upload"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleAvatarUpload(file);
                    e.target.value = "";
                  }}
                />
              </label>
              <button
                type="button"
                onClick={() => setIsPickerOpen(true)}
                className="rounded-md border border-border px-3 py-1.5 text-xs text-text-muted hover:bg-surface-alt"
              >
                Choose existing
              </button>
            </div>
          </div>
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
      <FilePicker
        isOpen={isPickerOpen}
        onClose={() => setIsPickerOpen(false)}
        files={filesData?.data ?? []}
        onSelect={(url) => handleChange("avatarUrl", url)}
      />
    </div>
  );
};

export default About;
