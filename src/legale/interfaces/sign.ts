import type { SignerInfo } from './signer-info.js';

export interface Sign {
    id:             number;
    signMethod:     string;
    signerInfo:     SignerInfo;
}