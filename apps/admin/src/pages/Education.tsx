import { useState } from "react";
import { useForm, Button, Input, Modal } from "@portfolio/ui";
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = createEducationSchema.safeParse(values);
    if (!parsed.success) {
      alert(parsed.error.issues.map((i) => i.message).join(", "));
      return;
    }

    if (editingId) {
      await updateEducation({ id: editingId, body: parsed.data });
    } else {
      await createEducation(parsed.data);
    }
    setIsModalOpen(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this education entry?")) return;
    await deleteEducation(id);
  };

  if (isLoading) return <p className="text-ink-900 dark:text-canvas-100">Loading...</p>;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-ink-900 dark:text-canvas-100">Education</h1>
        <Button onClick={openCreateModal}>Add Education</Button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-canvas-400 bg-white dark:border-ink-700 dark:bg-ink-800">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-2">Institution</th>
              <th className="py-2">Degree</th>
              <th className="py-2">Field of Study</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.data.map((education) => (
              <tr key={education.id} className="border-b">
                <td className="py-2 px-2 text-ink-900 dark:text-canvas-100">{education.institution}</td>
                <td className="py-2 px-2 text-ink-900 dark:text-canvas-100">{education.degree}</td>
                <td className="py-2 px-2 text-ink-900 dark:text-canvas-100">{education.fieldOfStudy}</td>
                <td className="py-2 px-2 space-x-2">
                  <Button variant="secondary" onClick={() => openEditModal(education)}>Edit</Button>
                  <Button variant="danger" onClick={() => handleDelete(education.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? "Edit Education" : "Add Education"}>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input placeholder="Institution" value={values.institution} onChange={(e) => handleChange("institution", e.target.value)} />
          <Input placeholder="Degree" value={values.degree} onChange={(e) => handleChange("degree", e.target.value)} />
          <Input placeholder="Field of Study" value={values.fieldOfStudy} onChange={(e) => handleChange("fieldOfStudy", e.target.value)} />
          <Input
            type="date"
            value={values.startDate}
            onChange={(e) => handleChange("startDate", e.target.value)}
          />
          <Input
            type="date"
            placeholder="End Date"
            value={values.endDate ?? ""}
            onChange={(e) => handleChange("endDate", e.target.value || null)}
          />
          <Button type="submit" className="w-full">{editingId ? "Update" : "Create"}</Button>
        </form>
      </Modal>
    </div>
  );
};

export default Education;
