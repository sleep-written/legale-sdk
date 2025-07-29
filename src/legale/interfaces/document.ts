export interface Document {
    guid: string;
    docId: string;
    document: string;
    fileName: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    sign_status: number;
    comment: null;
    callbackUrl: null;
    callbackKey: null;
}