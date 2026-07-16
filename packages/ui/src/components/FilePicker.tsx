import { Modal } from "./Modal";
import type { FileMeta } from "@portfolio/schemas";

interface FilePickerProps {
	isOpen: boolean;
	onClose: () => void;
	files: FileMeta[];
	onSelect: (url: string) => void;
}

const isImage = (key: string) => /\.(png|jpe?g|gif|webp|svg)$/i.test(key);

export const FilePicker = ({ isOpen, onClose, files, onSelect }: FilePickerProps) => {
	const imageFiles = files.filter((file) => isImage(file.key));

	return (
		<Modal isOpen={isOpen} onClose={onClose} title="Choose a file">
			{imageFiles.length === 0 ? (
				<p className="py-6 text-center text-sm text-text-faint">No images uploaded yet.</p>
			) : (
				<div className="max-h-80 overflow-y-auto pr-1">
					<div className="grid grid-cols-3 gap-2">
						{imageFiles.map((file) => (
							<button
								key={file.key}
								type="button"
								onClick={() => {
									onSelect(file.url);
									onClose();
								}}
								className="aspect-square overflow-hidden rounded-md border border-border hover:border-primary-600"
							>
								<img src={file.url} alt={file.key} className="h-full w-full object-cover" />
							</button>
						))}
					</div>
				</div>
			)}
		</Modal>
	);
};
