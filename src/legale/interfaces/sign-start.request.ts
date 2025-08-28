import type { SharedListItem } from './shared-list-item.js';
import type { SignerListItem } from './signer-list-item.js';
import type { FlowType } from './flow-type.js';

export interface SignStartRequest {
    /**
     * Available values are priority, simultaneously. Default value is priority. If you
     * set this value priority, document sign flow will flow one signer by one signer. This
     * means document will be sent to next signer after completing the current signer's sign
     * flow. If you set this value simultaneously, document will sent to all signer's at the
     * same time, signers can sign document regardless other signers signed or not.
     */
    flowType?: FlowType;

    /**
     * This parameter is to determine the expiration date. It should be number in days.
     */
    expiration?: number;

    /**
     * This parameter is to determine the email notification after sign. Default value is false.
     * If you set this value as true, all signers will receive signed document email notification
     * after sign process finished.
     */
    shareSignedDocument?: boolean;

    signerList: SignerListItem[];

    sharedList: SharedListItem[];
}