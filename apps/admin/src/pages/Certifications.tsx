import { useState } from "react";
import { useForm, Button, Input, Modal, MultiSelect } from "@portfolio/ui";
import { createCertificationSchema, type Certification as CertificationType, type CreateCertificationInput } from "@portfolio/schemas";
import {
  useGetCertificationsQuery,
  useCreateCertificationMutation,
  useUpdateCertificationMutation,
  useDeleteCertificationMutation,
} from "../store/certificationsApi";
import { useGetSkillsQuery } from "../store/skillsApi";

const emptyCertification: CreateCertificationInput = {
  name: "",
  issuingOrganization: "",
  issueDate: "",
  expiryDate: null,
  credentialUrl: "",
  skillIds: [],
};

const Certifications = () => {
  const { data, isLoading } = useGetCertificationsQuery();
  const { data: skillsData } = useGetSkillsQuery();
  const [createCertification] = useCreateCertificationMutation();
  const [updateCertification] = useUpdateCertificationMutation();
  const [deleteCertification] = useDeleteCertificationMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const { values, handleChange, setValues, reset } = useForm<CreateCertificationInput>(emptyCertification);

  const skillOptions = (skillsData?.data ?? []).map((s) => ({ id: s.id, label: s.name }));

  const openCreateModal = () => {
    setEditingId(null);
    reset();
    setIsModalOpen(true);
  };

  const openEditModal = (certification: CertificationType) => {
    setEditingId(certification.id);
    setValues({
      name: certification.name,
      issuingOrganization: certification.issuingOrganization,
      issueDate: certification.issueDate,
      expiryDate: certification.expiryDate,
      credentialUrl: certification.credentialUrl ?? "",
      skillIds: certification.skillIds,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = createCertificationSchema.safeParse(values);
    if (!parsed.success) {
      alert(parsed.error.issues.map((i) => i.message).join(", "));
      return;
    }

    if (editingId) {
      await updateCertification({ id: editingId, body: parsed.data });
    } else {
      await createCertification(parsed.data);
    }
    setIsModalOpen(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this certification?")) return;
    await deleteCertification(id);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Certifications</h1>
        <Button onClick={openCreateModal}>Add Certification</Button>
      </div>

      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b">
            <th className="py-2">Name</th>
            <th className="py-2">Issuing Organization</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.data.map((certification) => (
            <tr key={certification.id} className="border-b">
              <td className="py-2">{certification.name}</td>
              <td className="py-2">{certification.issuingOrganization}</td>
              <td className="py-2 space-x-2">
                <Button variant="secondary" onClick={() => openEditModal(certification)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(certification.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? "Edit Certification" : "Add Certification"}>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input placeholder="Name" value={values.name} onChange={(e) => handleChange("name", e.target.value)} />
          <Input placeholder="Issuing Organization" value={values.issuingOrganization} onChange={(e) => handleChange("issuingOrganization", e.target.value)} />
          <Input
            type="date"
            value={values.issueDate}
            onChange={(e) => handleChange("issueDate", e.target.value)}
          />
          <Input
            type="date"
            placeholder="Expiry Date (leave blank if none)"
            value={values.expiryDate ?? ""}
            onChange={(e) => handleChange("expiryDate", e.target.value || null)}
          />
          <Input placeholder="Credential URL" value={values.credentialUrl} onChange={(e) => handleChange("credentialUrl", e.target.value)} />
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

export default Certifications;
