import 'dotenv/config';
import { BlobServiceClient } from "@azure/storage-blob";

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING || "";

if (!AZURE_STORAGE_CONNECTION_STRING) {
  throw new Error("Azure Storage connection string not found in .env");
}

const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);

export const getBlobCSVContent = async (container: string, blobName: string): Promise<string> => {
  try {
    const containerClient = blobServiceClient.getContainerClient(container);
    const blobClient = containerClient.getBlobClient(blobName);
    const downloadBlockBlobResponse = await blobClient.download();
    const downloaded = await streamToString(downloadBlockBlobResponse.readableStreamBody);
    return downloaded;
  } catch (error: any) {
    if (error.statusCode === 404) {
      throw new Error(`El archivo "${blobName}" no existe en el contenedor "${container}".`);
    }
    throw error;
  }
};

const streamToString = async (stream: NodeJS.ReadableStream | null | undefined): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!stream) return resolve('');

    const chunks: Buffer[] = [];
    stream.on("data", (data) => chunks.push(Buffer.isBuffer(data) ? data : Buffer.from(data)));
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
    stream.on("error", reject);
  });
};



