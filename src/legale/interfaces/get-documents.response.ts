import type { Document } from './document.js';

export interface GetDocumentsResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Document[];
}