import { PutObjectCommand, ListObjectsV2Command, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../config/minio";
import { env } from "../config/env";
import type { FileMeta } from "@portfolio/schemas";

export const uploadFile = async (key: string, body: Buffer, contentType: string): Promise<FileMeta> => {
	await s3Client.send(
		new PutObjectCommand({
			Bucket: env.MINIO_BUCKET,
			Key: key,
			Body: body,
			ContentType: contentType,
		})
	);

	return {
		key,
		size: body.length,
		lastModified: new Date().toISOString(),
		url: `${env.MINIO_PUBLIC_URL}/${key}`,
	};
};

export const listFiles = async (): Promise<FileMeta[]> => {
	const result = await s3Client.send(new ListObjectsV2Command({ Bucket: env.MINIO_BUCKET }));

	return (result.Contents ?? []).map((obj) => ({
		key: obj.Key!,
		size: obj.Size ?? 0,
		lastModified: obj.LastModified?.toISOString() ?? "",
		url: `${env.MINIO_PUBLIC_URL}/${obj.Key}`,
	}));
};

export const deleteFile = async (key: string): Promise<void> => {
	await s3Client.send(new DeleteObjectCommand({ Bucket: env.MINIO_BUCKET, Key: key }));
};
