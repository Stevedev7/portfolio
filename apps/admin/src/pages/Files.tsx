import { useRef, useState } from "react";
import { toast } from "sonner";
import { Upload, Trash2, Copy, FileIcon } from "lucide-react";
import { Button, Card, PageHeader, EmptyState } from "@portfolio/ui";
import { useGetFilesQuery, useUploadFileMutation, useDeleteFileMutation } from "../store/filesApi";

const isImage = (key: string) => /\.(png|jpe?g|gif|webp|svg)$/i.test(key);

const Files = () => {
	const { data, isLoading } = useGetFilesQuery();
	const [uploadFile, { isLoading: isUploading }] = useUploadFileMutation();
	const [deleteFile] = useDeleteFileMutation();
	const [isDragging, setIsDragging] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	const handleUpload = async (file: File) => {
		const formData = new FormData();
		formData.append("file", file);
		try {
			await uploadFile(formData).unwrap();
			toast.success("File uploaded");
		} catch {
			toast.error("Upload failed. Please try again.");
		}
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(false);
		const file = e.dataTransfer.files[0];
		if (file) handleUpload(file);
	};

	const handleDelete = async (key: string) => {
		if (!confirm("Delete this file?")) return;
		try {
			await deleteFile(key).unwrap();
			toast.success("File deleted");
		} catch {
			toast.error("Could not delete this file.");
		}
	};

	const handleCopy = (url: string) => {
		navigator.clipboard.writeText(url);
		toast.success("URL copied to clipboard");
	};

	if (isLoading) return <p className="text-text-faint">Loading...</p>;

	return (
		<div>
			<PageHeader
				eyebrow={`Content · ${data?.data.length ?? 0} files`}
				title="Files"
				action={
					<Button onClick={() => inputRef.current?.click()} disabled={isUploading} className="flex items-center gap-1.5">
						<Upload size={14} />
						{isUploading ? "Uploading..." : "Upload"}
					</Button>
				}
			/>

			<input
				ref={inputRef}
				type="file"
				className="hidden"
				onChange={(e) => {
					const file = e.target.files?.[0];
					if (file) handleUpload(file);
					e.target.value = "";
				}}
			/>

			<div
				onDragOver={(e) => {
					e.preventDefault();
					setIsDragging(true);
				}}
				onDragLeave={() => setIsDragging(false)}
				onDrop={handleDrop}
				className={`mb-4 rounded-xl border-2 border-dashed p-8 text-center transition-colors ${isDragging ? "border-primary-600 bg-primary-950/20" : "border-border"
					}`}
			>
				<p className="text-sm text-text-faint">Drag and drop a file here, or click Upload above</p>
			</div>

			{data?.data.length === 0 ? (
				<Card>
					<EmptyState icon={FileIcon} title="No files yet" description="Upload your first file to get started." />
				</Card>
			) : (
				<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
					{data?.data.map((file) => (
						<Card key={file.key} className="overflow-hidden">
							{isImage(file.key) ? (
								<img src={file.url} alt={file.key} className="h-28 w-full object-cover" />
							) : (
								<div className="flex h-28 w-full items-center justify-center bg-surface-alt">
									<FileIcon size={24} className="text-text-faint" />
								</div>
							)}
							<div className="p-2.5">
								<p className="mb-2 truncate text-xs text-text" title={file.key}>{file.key}</p>
								<div className="flex gap-1">
									<button onClick={() => handleCopy(file.url)} className="flex-1 rounded p-1.5 text-text-faint hover:bg-surface-alt hover:text-text" aria-label="Copy URL">
										<Copy size={13} />
									</button>
									<button onClick={() => handleDelete(file.key)} className="flex-1 rounded p-1.5 text-text-faint hover:bg-primary-950 hover:text-primary-400" aria-label="Delete">
										<Trash2 size={13} />
									</button>
								</div>
							</div>
						</Card>
					))}
				</div>
			)}
		</div>
	);
};

export default Files;
