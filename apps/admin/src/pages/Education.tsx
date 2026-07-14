import { useState } from "react";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, GraduationCap } from "lucide-react";
import { useForm, Button, Input, Modal, Card, PageHeader, EmptyState } from "@portfolio/ui";
import { createEducationSchema, type Education as EducationType, type CreateEducationInput } from "@portfolio/schemas";
import {
  useGetEducationQuery,
  useCreateEducationMutation,
  useUpdateEducationMutation,
  useDeleteEducationMutation,
} from "../store/educationApi";

const emptyEducation: CreateEducationInput = {
  institution: "",
  degree: "",
  fieldOfStudy: "",
  startDate: "",
  endDate: null,
};

const Education = () => {
  const { data, isLoading } = useGetEducationQuery();
  const [createEducation] = useCreateEducationMutation();
  const [updateEducation] = useUpdateEducationMutation();
  const [deleteEducation] = useDeleteEducationMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const { values, handleChange, setValues, reset } = useForm<CreateEducationInput>(emptyEducation);

  const openCreateModal = () => {
    setEditingId(null);
    reset();
    setIsModalOpen(true);
  };

  const openEditModal = (education: EducationType) => {
    setEditingId(education.id);
    setValues({
      institution: education.institution,
      degree: education.degree,
      fieldOfStudy: education.fieldOfStudy,
      startDate: education.startDate,
      endDate: education.endDate,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    const parsed = createEducationSchema.safeParse(values);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Invalid education data");
      return;
    }

    try {
      if (editingId) {
        await updateEducation({ id: editingId, body: parsed.data }).unwrap();
        toast.success("Education updated");
      } else {
        await createEducation(parsed.data).unwrap();
        toast.success("Education created");
      }
      setIsModalOpen(false);
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this education entry?")) return;
    try {
      await deleteEducation(id).unwrap();
      toast.success("Education deleted");
    } catch {
      toast.error("Could not delete this entry.");
    }
  };

  if (isLoading) return <p className="text-text-faint">Loading...</p>;

  return (
    <div>
      <PageHeader
        eyebrow={`Content · ${data?.data.length ?? 0} entries`}
        title="Education"
        action={
          <Button onClick={openCreateModal} className="flex items-center gap-1.5 w-fit px-4">
            <Plus size={14} />
            Add education
          </Button>
        }
      />

      {data?.data.length === 0 ? (
        <Card>
          <EmptyState icon={GraduationCap} title="No education yet" description="Add your first entry to get started." action={<Button onClick={openCreateModal} className="mt-2">Add education</Button>} />
        </Card>
      ) : (
        <Card className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr>
                <th>Institution</th>
                <th>Degree</th>
                <th>Field of study</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.data.map((education) => (
                <tr key={education.id}>
                  <td className="text-text">{education.institution}</td>
                  <td className="text-text-muted">{education.degree}</td>
                  <td className="text-text-muted">{education.fieldOfStudy}</td>
                  <td>
                    <div className="flex gap-1">
                      <button onClick={() => openEditModal(education)} className="rounded p-1.5 text-text-faint hover:bg-surface-alt hover:text-text" aria-label="Edit">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => handleDelete(education.id)} className="rounded p-1.5 text-text-faint hover:bg-primary-950 hover:text-primary-400" aria-label="Delete">
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? "Edit education" : "Add education"}>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input placeholder="Institution" value={values.institution} onChange={(e) => handleChange("institution", e.target.value)} />
          <Input placeholder="Degree" value={values.degree} onChange={(e) => handleChange("degree", e.target.value)} />
          <Input placeholder="Field of study" value={values.fieldOfStudy} onChange={(e) => handleChange("fieldOfStudy", e.target.value)} />
          <Input type="date" value={values.startDate} onChange={(e) => handleChange("startDate", e.target.value)} />
          <Input type="date" placeholder="End date" value={values.endDate ?? ""} onChange={(e) => handleChange("endDate", e.target.value || null)} />
          <Button type="submit" className="w-full">{editingId ? "Update" : "Create"}</Button>
        </form>
      </Modal>
    </div>
  );
};

export default Education;
