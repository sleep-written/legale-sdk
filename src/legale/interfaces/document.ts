export interface Document {
    guid: string;
    docId: string;
    folder: string;
    document: string;
    fileName: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    signStatus: number;
    comment: null;
    callbackUrl: null;
    callbackKey: null;
}