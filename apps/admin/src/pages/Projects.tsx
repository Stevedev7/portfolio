import { useState } from "react";
import { useForm, Button, Input, Modal, MultiSelect } from "@portfolio/ui";
import { createProjectSchema, type Project as ProjectType, type CreateProjectInput } from "@portfolio/schemas";
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...values,
      description: descriptionText.split("\n").filter((line) => line.trim() !== ""),
    };
    const parsed = createProjectSchema.safeParse(payload);
    if (!parsed.success) {
      alert(parsed.error.issues.map((i) => i.message).join(", "));
      return;
    }

    if (editingId) {
      await updateProject({ id: editingId, body: parsed.data });
    } else {
      await createProject(parsed.data);
    }
    setIsModalOpen(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this project?")) return;
    await deleteProject(id);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Projects</h1>
        <Button onClick={openCreateModal}>Add Project</Button>
      </div>

      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b">
            <th className="py-2">Title</th>
            <th className="py-2">Featured</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.data.map((project) => (
            <tr key={project.id} className="border-b">
              <td className="py-2">{project.title}</td>
              <td className="py-2">{project.featured ? "Yes" : "No"}</td>
              <td className="py-2 space-x-2">
                <Button variant="secondary" onClick={() => openEditModal(project)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(project.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? "Edit Project" : "Add Project"}>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input placeholder="Title" value={values.title} onChange={(e) => handleChange("title", e.target.value)} />
          <textarea
            placeholder="Description (one bullet per line)"
            value={descriptionText}
            onChange={(e) => setDescriptionText(e.target.value)}
            className="w-full rounded border px-3 py-2 text-sm"
            rows={4}
          />
          <Input placeholder="Image URL" value={values.imageUrl} onChange={(e) => handleChange("imageUrl", e.target.value)} />
          <Input placeholder="Live URL" value={values.liveUrl} onChange={(e) => handleChange("liveUrl", e.target.value)} />
          <Input placeholder="Repo URL" value={values.repoUrl} onChange={(e) => handleChange("repoUrl", e.target.value)} />
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={values.featured}
              onChange={(e) => handleChange("featured", e.target.checked)}
            />
            Featured
          </label>
          <MultiSelect
            label="Skills"
            options={skillOptions}
            selectedIds={values.skillIds}
            onChange={(ids) => handleChange("skillIds", ids)}
          />
          <Button type="submit" className="w-full">{editingId ? "Update" : "Create"}</Button>
        </form>
      </Modal>
    </div>
  );
};

export default Projects;
