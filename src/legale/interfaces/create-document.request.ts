import type { AttachedFile } from './attached-file.js';

export interface CreateDocumentRequest {
  subject?: string;
  documentType?: string;
  fileName: string;
  description: string;
  folder?: string;
  file: string | Buffer;
  attachedFiles?: AttachedFile[];
}