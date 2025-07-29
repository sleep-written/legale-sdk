import type { Owner } from './owner.js';
import type { Sign } from './sign.js';

export interface DocumentDetail {
    guid: string;
    docId: string;
    document: string;
    folder: string;
    originDocument: string;
    fileName: string;
    subject: null;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    signStatus: number;
    comment: null;
    signatureKey: null;
    base64: string;
    callbackUrl: null;
    callbackKey: null;
    deleteAfterCallback: false;
    isSkipNotification: false;
    owner: Owner;
    signList: Sign[];
}