"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import "./styles.scss";

// TODO: LEARN THIS
type Props = {
	onFileSelect: (file: File) => void;
	previewUrl?: string | null;
};

export default function ImageDropzone({ onFileSelect, previewUrl }: Props) {
	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			const file = acceptedFiles[0];
			if (file) onFileSelect(file);
		},
		[onFileSelect],
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			"image/*": [],
		},
		multiple: false,
	});

	return (
		<div
			className={`image-dropzone ${isDragActive ? "image-dropzone--active" : ""}`}
			{...getRootProps()}
		>
			<input {...getInputProps()} />

			{previewUrl ? (
				<img
					style={{ margin: "0 auto" }}
					src={previewUrl}
					width={250}
					height={250}
					alt="preview"
				/>
			) : (
				<p className="image-dropzone__hint">
					{isDragActive
						? "Скиньте зображення сюди..."
						: "Перетягніть зображення мишкою або клікніть, щоб вибрати"}
				</p>
			)}
		</div>
	);
}
