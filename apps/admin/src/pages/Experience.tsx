import { useState } from "react";
import { useForm, Button, Input, Modal, MultiSelect } from "@portfolio/ui";
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...values,
      description: descriptionText.split("\n").filter((line) => line.trim() !== ""),
    };
    const parsed = createExperienceSchema.safeParse(payload);
    if (!parsed.success) {
      alert(parsed.error.issues.map((i) => i.message).join(", "));
      return;
    }

    if (editingId) {
      await updateExperience({ id: editingId, body: parsed.data });
    } else {
      await createExperience(parsed.data);
    }
    setIsModalOpen(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this experience entry?")) return;
    await deleteExperience(id);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Experience</h1>
        <Button onClick={openCreateModal}>Add Experience</Button>
      </div>

      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b">
            <th className="py-2">Company</th>
            <th className="py-2">Role</th>
            <th className="py-2">Location</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.data.map((experience) => (
            <tr key={experience.id} className="border-b">
              <td className="py-2">{experience.company}</td>
              <td className="py-2">{experience.role}</td>
              <td className="py-2">{experience.location}</td>
              <td className="py-2 space-x-2">
                <Button variant="secondary" onClick={() => openEditModal(experience)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(experience.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? "Edit Experience" : "Add Experience"}>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input placeholder="Company" value={values.company} onChange={(e) => handleChange("company", e.target.value)} />
          <Input placeholder="Role" value={values.role} onChange={(e) => handleChange("role", e.target.value)} />
          <Input placeholder="Location" value={values.location} onChange={(e) => handleChange("location", e.target.value)} />
          <Input
            type="date"
            placeholder="Start Date"
            value={values.startDate}
            onChange={(e) => handleChange("startDate", e.target.value)}
          />
          <Input
            type="date"
            placeholder="End Date (leave blank if present)"
            value={values.endDate ?? ""}
            onChange={(e) => handleChange("endDate", e.target.value || null)}
          />
          <textarea
            placeholder="Description (one bullet per line)"
            value={descriptionText}
            onChange={(e) => setDescriptionText(e.target.value)}
            className="w-full rounded border px-3 py-2 text-sm"
            rows={4}
          />
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

export default Experience;
