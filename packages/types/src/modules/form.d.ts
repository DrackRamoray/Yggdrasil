export interface UploadFileData {
  name?: string;
  file: File | Blob;
  filename?: string;
  fields?: Record<string, any>;
}

export interface DownloadFileData {
  filename: string;
}
