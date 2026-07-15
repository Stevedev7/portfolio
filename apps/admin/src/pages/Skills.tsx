import { useState } from "react";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Sparkles, Upload } from "lucide-react";
import { useForm, Button, Input, Modal, Card, PageHeader, Badge, EmptyState } from "@portfolio/ui";
import { createSkillSchema, type Skill, type CreateSkillInput } from "@portfolio/schemas";
import {
  useGetSkillsQuery,
  useCreateSkillMutation,
  useUpdateSkillMutation,
  useDeleteSkillMutation,
} from "../store/skillsApi";
import { useUploadFileMutation } from "../store/filesApi";

const emptySkill: CreateSkillInput = { name: "", category: "", proficiency: "", iconUrl: "" };

const Skills = () => {
  const { data, isLoading } = useGetSkillsQuery();
  const [createSkill] = useCreateSkillMutation();
  const [updateSkill] = useUpdateSkillMutation();
  const [deleteSkill] = useDeleteSkillMutation();
  const [uploadFile, { isLoading: isUploadingIcon }] = useUploadFileMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const { values, handleChange, setValues, reset } = useForm<CreateSkillInput>(emptySkill);

  const openCreateModal = () => {
    setEditingId(null);
    reset();
    setIsModalOpen(true);
  };

  const openEditModal = (skill: Skill) => {
    setEditingId(skill.id);
    setValues({ name: skill.name, category: skill.category, proficiency: skill.proficiency ?? "", iconUrl: skill.iconUrl ?? "" });
    setIsModalOpen(true);
  };

  const handleIconUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const result = await uploadFile(formData).unwrap();
      handleChange("iconUrl", result.data.url);
      toast.success("Icon uploaded");
    } catch {
      toast.error("Icon upload failed");
    }
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const parsed = createSkillSchema.safeParse(values);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Invalid skill data");
      return;
    }

    try {
      if (editingId) {
        await updateSkill({ id: editingId, body: parsed.data }).unwrap();
        toast.success("Skill updated");
      } else {
        await createSkill(parsed.data).unwrap();
        toast.success("Skill created");
      }
      setIsModalOpen(false);
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this skill?")) return;
    try {
      await deleteSkill(id).unwrap();
      toast.success("Skill deleted");
    } catch (err) {
      const message =
        err && typeof err === "object" && "data" in err
          ? (err.data as { message?: string })?.message
          : undefined;
      toast.error(message ?? "Could not delete this skill.");
    }
  };

  if (isLoading) return <p className="text-text-faint">Loading...</p>;

  return (
    <div>
      <PageHeader
        eyebrow={`Content · ${data?.data.length ?? 0} entries`}
        title="Skills"
        action={
          <Button onClick={openCreateModal} className="flex items-center gap-1.5">
            <Plus size={14} />
            Add skill
          </Button>
        }
      />

      {data?.data.length === 0 ? (
        <Card>
          <EmptyState
            icon={Sparkles}
            title="No skills yet"
            description="Add your first skill to get started."
            action={<Button onClick={openCreateModal} className="mt-2">Add skill</Button>}
          />
        </Card>
      ) : (
        <Card className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Category</th>
                <th>Proficiency</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.data.map((skill) => (
                <tr key={skill.id}>
                  <td className="w-8">
                    {skill.iconUrl ? (
                      <img src={skill.iconUrl} alt="" className="h-5 w-5 object-contain" />
                    ) : (
                      <div className="h-5 w-5 rounded bg-surface-alt" />
                    )}
                  </td>
                  <td className="text-text">{skill.name}</td>
                  <td><Badge>{skill.category}</Badge></td>
                  <td className="text-text-muted">{skill.proficiency}</td>
                  <td>
                    <div className="flex gap-1">
                      <button onClick={() => openEditModal(skill)} className="rounded p-1.5 text-text-faint hover:bg-surface-alt hover:text-text" aria-label="Edit">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => handleDelete(skill.id)} className="rounded p-1.5 text-text-faint hover:bg-primary-950 hover:text-primary-400" aria-label="Delete">
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? "Edit skill" : "Add skill"}>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input placeholder="Name" value={values.name} onChange={(e) => handleChange("name", e.target.value)} />
          <Input placeholder="Category" value={values.category} onChange={(e) => handleChange("category", e.target.value)} />
          <Input placeholder="Proficiency" value={values.proficiency} onChange={(e) => handleChange("proficiency", e.target.value)} />

          <div>
            <p className="mb-1 font-mono text-[10px] uppercase tracking-wide text-text-faint">Icon</p>
            <div className="flex items-center gap-2">
              {values.iconUrl ? (
                <img src={values.iconUrl} alt="" className="h-8 w-8 rounded object-contain" />
              ) : (
                <div className="h-8 w-8 rounded bg-surface-alt" />
              )}
              <label className="flex cursor-pointer items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs text-text-muted hover:bg-surface-alt">
                <Upload size={12} />
                {isUploadingIcon ? "Uploading..." : "Upload"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleIconUpload(file);
                    e.target.value = "";
                  }}
                />
              </label>
            </div>
          </div>

          <Button type="submit" className="w-full">{editingId ? "Update" : "Create"}</Button>
        </form>
      </Modal>
    </div>
  );
};

export default Skills;
