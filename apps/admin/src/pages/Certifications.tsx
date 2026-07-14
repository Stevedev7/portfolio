import { useState } from "react";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Award } from "lucide-react";
import { useForm, Button, Input, Modal, MultiSelect, Card, PageHeader, EmptyState } from "@portfolio/ui";
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

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    const parsed = createCertificationSchema.safeParse(values);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Invalid certification data");
      return;
    }

    try {
      if (editingId) {
        await updateCertification({ id: editingId, body: parsed.data }).unwrap();
        toast.success("Certification updated");
      } else {
        await createCertification(parsed.data).unwrap();
        toast.success("Certification created");
      }
      setIsModalOpen(false);
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this certification?")) return;
    try {
      await deleteCertification(id).unwrap();
      toast.success("Certification deleted");
    } catch {
      toast.error("Could not delete this certification.");
    }
  };

  if (isLoading) return <p className="text-text-faint">Loading...</p>;

  return (
    <div>
      <PageHeader
        eyebrow={`Content · ${data?.data.length ?? 0} entries`}
        title="Certifications"
        action={
          <Button onClick={openCreateModal} className="flex items-center gap-1.5 w-fit px-4">
            <Plus size={14} />
            Add certification
          </Button>
        }
      />

      {data?.data.length === 0 ? (
        <Card>
          <EmptyState icon={Award} title="No certifications yet" description="Add your first certification to get started." action={<Button onClick={openCreateModal} className="mt-2">Add certification</Button>} />
        </Card>
      ) : (
        <Card className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr>
                <th>Name</th>
                <th>Issuing organization</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.data.map((certification) => (
                <tr key={certification.id}>
                  <td className="text-text">{certification.name}</td>
                  <td className="text-text-muted">{certification.issuingOrganization}</td>
                  <td>
                    <div className="flex gap-1">
                      <button onClick={() => openEditModal(certification)} className="rounded p-1.5 text-text-faint hover:bg-surface-alt hover:text-text" aria-label="Edit">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => handleDelete(certification.id)} className="rounded p-1.5 text-text-faint hover:bg-primary-950 hover:text-primary-400" aria-label="Delete">
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? "Edit certification" : "Add certification"}>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input placeholder="Name" value={values.name} onChange={(e) => handleChange("name", e.target.value)} />
          <Input placeholder="Issuing organization" value={values.issuingOrganization} onChange={(e) => handleChange("issuingOrganization", e.target.value)} />
          <Input type="date" value={values.issueDate} onChange={(e) => handleChange("issueDate", e.target.value)} />
          <Input type="date" placeholder="Expiry date (leave blank if none)" value={values.expiryDate ?? ""} onChange={(e) => handleChange("expiryDate", e.target.value || null)} />
          <Input placeholder="Credential URL" value={values.credentialUrl} onChange={(e) => handleChange("credentialUrl", e.target.value)} />
          <MultiSelect label="Skills" options={skillOptions} selectedIds={values.skillIds} onChange={(ids) => handleChange("skillIds", ids)} />
          <Button type="submit" className="w-full">{editingId ? "Update" : "Create"}</Button>
        </form>
      </Modal>
    </div>
  );
};

export default Certifications;
