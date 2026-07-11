import { useState } from "react";
import { useForm, Button, Input, Modal } from "@portfolio/ui";
import { createSkillSchema, type Skill, type CreateSkillInput } from "@portfolio/schemas";
import {
  useGetSkillsQuery,
  useCreateSkillMutation,
  useUpdateSkillMutation,
  useDeleteSkillMutation,
} from "../store/skillsApi";

const emptySkill: CreateSkillInput = { name: "", category: "", proficiency: "" };

const Skills = () => {
  const { data, isLoading } = useGetSkillsQuery();
  const [createSkill] = useCreateSkillMutation();
  const [updateSkill] = useUpdateSkillMutation();
  const [deleteSkill] = useDeleteSkillMutation();

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
    setValues({ name: skill.name, category: skill.category, proficiency: skill.proficiency ?? "" });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = createSkillSchema.safeParse(values);
    if (!parsed.success) {
      alert(parsed.error.issues.map((i) => i.message).join(", "));
      return;
    }

    if (editingId) {
      await updateSkill({ id: editingId, body: parsed.data });
    } else {
      await createSkill(parsed.data);
    }
    setIsModalOpen(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this skill?")) return;
    const result = await deleteSkill(id);
    if ("error" in result) {
      alert("Could not delete — this skill may still be referenced elsewhere.");
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Skills</h1>
        <Button onClick={openCreateModal}>Add Skill</Button>
      </div>

      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b">
            <th className="py-2">Name</th>
            <th className="py-2">Category</th>
            <th className="py-2">Proficiency</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.data.map((skill) => (
            <tr key={skill.id} className="border-b">
              <td className="py-2">{skill.name}</td>
              <td className="py-2">{skill.category}</td>
              <td className="py-2">{skill.proficiency}</td>
              <td className="py-2 space-x-2">
                <Button variant="secondary" onClick={() => openEditModal(skill)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(skill.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? "Edit Skill" : "Add Skill"}>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input placeholder="Name" value={values.name} onChange={(e) => handleChange("name", e.target.value)} />
          <Input placeholder="Category" value={values.category} onChange={(e) => handleChange("category", e.target.value)} />
          <Input placeholder="Proficiency" value={values.proficiency} onChange={(e) => handleChange("proficiency", e.target.value)} />
          <Button type="submit" className="w-full">{editingId ? "Update" : "Create"}</Button>
        </form>
      </Modal>
    </div>
  );
};

export default Skills;
