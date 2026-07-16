import { useState } from "react";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, FolderGit2, Upload } from "lucide-react";
import { useForm, Button, Input, Modal, MultiSelect, Card, PageHeader, Badge, EmptyState, FilePicker } from "@portfolio/ui";
import { createProjectSchema, type Project as ProjectType, type CreateProjectInput } from "@portfolio/schemas";
import { useUploadFileMutation, useGetFilesQuery } from "../store/filesApi";
import {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} from "../store/projectsApi";
import { useGetSkillsQuery } from "../store/skillsApi";

const emptyProject: CreateProjectInput = {
  title: "",
  description: [],
  imageUrl: "",
  liveUrl: "",
  repoUrl: "",
  featured: false,
  skillIds: [],
};

const Projects = () => {
  const { data, isLoading } = useGetProjectsQuery();
  const { data: skillsData } = useGetSkillsQuery();
  const [createProject] = useCreateProjectMutation();
  const [updateProject] = useUpdateProjectMutation();
  const [deleteProject] = useDeleteProjectMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [descriptionText, setDescriptionText] = useState("");
  const { values, handleChange, setValues, reset } = useForm<CreateProjectInput>(emptyProject);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const { data: filesData } = useGetFilesQuery();
  const [uploadFile, { isLoading: isUploadingImage }] = useUploadFileMutation();

  const skillOptions = (skillsData?.data ?? []).map((s) => ({ id: s.id, label: s.name }));

  const openCreateModal = () => {
    setEditingId(null);
    reset();
    setDescriptionText("");
    setIsModalOpen(true);
  };

  const openEditModal = (project: ProjectType) => {
    setEditingId(project.id);
    setValues({
      title: project.title,
      description: project.description,
      imageUrl: project.imageUrl ?? "",
      liveUrl: project.liveUrl ?? "",
      repoUrl: project.repoUrl ?? "",
      featured: project.featured,
      skillIds: project.skillIds,
    });
    setDescriptionText(project.description.join("\n"));
    setIsModalOpen(true);
  };
  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const result = await uploadFile(formData).unwrap();
      handleChange("imageUrl", result.data.url);
      toast.success("Image uploaded");
    } catch {
      toast.error("Image upload failed");
    }
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    const payload = {
      ...values,
      description: descriptionText.split("\n").filter((line) => line.trim() !== ""),
    };
    const parsed = createProjectSchema.safeParse(payload);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Invalid project data");
      return;
    }

    try {
      if (editingId) {
        await updateProject({ id: editingId, body: parsed.data }).unwrap();
        toast.success("Project updated");
      } else {
        await createProject(parsed.data).unwrap();
        toast.success("Project created");
      }
      setIsModalOpen(false);
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this project?")) return;
    try {
      await deleteProject(id).unwrap();
      toast.success("Project deleted");
    } catch {
      toast.error("Could not delete this project.");
    }
  };

  if (isLoading) return <p className="text-text-faint">Loading...</p>;

  return (
    <div>
      <PageHeader
        eyebrow={`Content · ${data?.data.length ?? 0} entries`}
        title="Projects"
        action={
          <Button onClick={openCreateModal} className="flex items-center gap-1.5 w-fit px-4">
            <Plus size={14} />
            Add project
          </Button>
        }
      />

      {data?.data.length === 0 ? (
        <Card>
          <EmptyState icon={FolderGit2} title="No projects yet" description="Add your first project to get started." action={<Button onClick={openCreateModal} className="mt-2">Add project</Button>} />
        </Card>
      ) : (
        <Card className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr>
                <th>Title</th>
                <th>Featured</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.data.map((project) => (
                <tr key={project.id}>
                  <td className="text-text">{project.title}</td>
                  <td>{project.featured ? <Badge variant="primary">Featured</Badge> : <span className="text-text-faint">—</span>}</td>
                  <td>
                    <div className="flex gap-1">
                      <button onClick={() => openEditModal(project)} className="rounded p-1.5 text-text-faint hover:bg-surface-alt hover:text-text" aria-label="Edit">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => handleDelete(project.id)} className="rounded p-1.5 text-text-faint hover:bg-primary-950 hover:text-primary-400" aria-label="Delete">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? "Edit project" : "Add project"}>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input placeholder="Title" value={values.title} onChange={(e) => handleChange("title", e.target.value)} />
          <textarea
            placeholder="Description (one bullet per line)"
            value={descriptionText}
            onChange={(e) => setDescriptionText(e.target.value)}
            className="w-full rounded-md border border-border bg-surface-alt px-3 py-2 text-sm text-text placeholder:text-text-faint focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
            rows={4}
          />
          <div>
            <p className="mb-1 font-mono text-[10px] uppercase tracking-wide text-text-faint">Image</p>
            <div className="flex items-center gap-2">
              {values.imageUrl ? (
                <img src={values.imageUrl} alt="" className="h-12 w-12 rounded object-cover" />
              ) : (
                <div className="h-12 w-12 rounded bg-surface-alt" />
              )}
              <label className="flex cursor-pointer items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs text-text-muted hover:bg-surface-alt">
                <Upload size={12} />
                {isUploadingImage ? "Uploading..." : "Upload"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(file);
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
          <Input placeholder="Live URL" value={values.liveUrl} onChange={(e) => handleChange("liveUrl", e.target.value)} />
          <Input placeholder="Repo URL" value={values.repoUrl} onChange={(e) => handleChange("repoUrl", e.target.value)} />
          <label className="flex items-center gap-2 text-sm text-text">
            <input type="checkbox" checked={values.featured} onChange={(e) => handleChange("featured", e.target.checked)} />
            Featured
          </label>
          <MultiSelect label="Skills" options={skillOptions} selectedIds={values.skillIds} onChange={(ids) => handleChange("skillIds", ids)} />
          <Button type="submit" className="w-full">{editingId ? "Update" : "Create"}</Button>
        </form>
      </Modal>
      <FilePicker
        isOpen={isPickerOpen}
        onClose={() => setIsPickerOpen(false)}
        files={filesData?.data ?? []}
        onSelect={(url) => handleChange("imageUrl", url)}
      />
    </div>
  );
};

export default Projects;
