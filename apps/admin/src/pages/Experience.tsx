import { useState } from "react";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Briefcase } from "lucide-react";
import { useForm, Button, Input, Modal, MultiSelect, Card, PageHeader, EmptyState } from "@portfolio/ui";
import { createExperienceSchema, type Experience as ExperienceType, type CreateExperienceInput } from "@portfolio/schemas";
import {
  useGetExperienceQuery,
  useCreateExperienceMutation,
  useUpdateExperienceMutation,
  useDeleteExperienceMutation,
} from "../store/experienceApi";
import { useGetSkillsQuery } from "../store/skillsApi";

const emptyExperience: CreateExperienceInput = {
  company: "",
  role: "",
  startDate: "",
  endDate: null,
  description: [],
  location: "",
  skillIds: [],
};

const Experience = () => {
  const { data, isLoading } = useGetExperienceQuery();
  const { data: skillsData } = useGetSkillsQuery();
  const [createExperience] = useCreateExperienceMutation();
  const [updateExperience] = useUpdateExperienceMutation();
  const [deleteExperience] = useDeleteExperienceMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [descriptionText, setDescriptionText] = useState("");
  const { values, handleChange, setValues, reset } = useForm<CreateExperienceInput>(emptyExperience);

  const skillOptions = (skillsData?.data ?? []).map((s) => ({ id: s.id, label: s.name }));

  const openCreateModal = () => {
    setEditingId(null);
    reset();
    setDescriptionText("");
    setIsModalOpen(true);
  };

  const openEditModal = (experience: ExperienceType) => {
    setEditingId(experience.id);
    setValues({
      company: experience.company,
      role: experience.role,
      startDate: experience.startDate,
      endDate: experience.endDate,
      description: experience.description,
      location: experience.location,
      skillIds: experience.skillIds,
    });
    setDescriptionText(experience.description.join("\n"));
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    const payload = {
      ...values,
      description: descriptionText.split("\n").filter((line) => line.trim() !== ""),
    };
    const parsed = createExperienceSchema.safeParse(payload);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Invalid experience data");
      return;
    }

    try {
      if (editingId) {
        await updateExperience({ id: editingId, body: parsed.data }).unwrap();
        toast.success("Experience updated");
      } else {
        await createExperience(parsed.data).unwrap();
        toast.success("Experience created");
      }
      setIsModalOpen(false);
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this experience entry?")) return;
    try {
      await deleteExperience(id).unwrap();
      toast.success("Experience deleted");
    } catch {
      toast.error("Could not delete this entry.");
    }
  };

  if (isLoading) return <p className="text-text-faint">Loading...</p>;

  return (
    <div>
      <PageHeader
        eyebrow={`Content · ${data?.data.length ?? 0} entries`}
        title="Experience"
        action={
          <Button onClick={openCreateModal} className="flex items-center gap-1.5 w-fit px-4">
            <Plus size={14} />
            Add experience
          </Button>
        }
      />

      {data?.data.length === 0 ? (
        <Card>
          <EmptyState icon={Briefcase} title="No experience yet" description="Add your first role to get started." action={<Button onClick={openCreateModal} className="mt-2">Add experience</Button>} />
        </Card>
      ) : (
        <Card className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr>
                <th>Company</th>
                <th>Role</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.data.map((experience) => (
                <tr key={experience.id}>
                  <td className="text-text">{experience.company}</td>
                  <td className="text-text-muted">{experience.role}</td>
                  <td className="text-text-muted">{experience.location}</td>
                  <td>
                    <div className="flex gap-1">
                      <button onClick={() => openEditModal(experience)} className="rounded p-1.5 text-text-faint hover:bg-surface-alt hover:text-text" aria-label="Edit">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => handleDelete(experience.id)} className="rounded p-1.5 text-text-faint hover:bg-primary-950 hover:text-primary-400" aria-label="Delete">
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? "Edit experience" : "Add experience"}>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input placeholder="Company" value={values.company} onChange={(e) => handleChange("company", e.target.value)} />
          <Input placeholder="Role" value={values.role} onChange={(e) => handleChange("role", e.target.value)} />
          <Input placeholder="Location" value={values.location} onChange={(e) => handleChange("location", e.target.value)} />
          <Input type="date" value={values.startDate} onChange={(e) => handleChange("startDate", e.target.value)} />
          <Input type="date" placeholder="End date (leave blank if present)" value={values.endDate ?? ""} onChange={(e) => handleChange("endDate", e.target.value || null)} />
          <textarea
            placeholder="Description (one bullet per line)"
            value={descriptionText}
            onChange={(e) => setDescriptionText(e.target.value)}
            className="w-full rounded-md border border-border bg-surface-alt px-3 py-2 text-sm text-text placeholder:text-text-faint focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
            rows={4}
          />
          <MultiSelect label="Skills" options={skillOptions} selectedIds={values.skillIds} onChange={(ids) => handleChange("skillIds", ids)} />
          <Button type="submit" className="w-full">{editingId ? "Update" : "Create"}</Button>
        </form>
      </Modal>
    </div>
  );
};

export default Experience;
