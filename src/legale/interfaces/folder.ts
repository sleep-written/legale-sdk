export interface Folder {
    id: number;
    owned: boolean;
    totalDocumentNumber: number;
    hasSftp: false;
    owner: string;
    title: string;
    autoSign: boolean;
    updatedAt: Date;
    parent: number | null;
}
