import type { SignFlow } from './sign-flow.js';
import type { SignMethod } from './sign-method.js';

export interface SignerListItem {
    /**
     * Sign flow type.
     */
    signFlow: SignFlow;

    /**
     * Sign method you wanna to use to sign document.
     */
    signMethod: SignMethod;

    /**
     * Signer email.
     */
    email: string;

    /**
     * Signer phone to use receive OTP. This parameter is needed when you set sign_method as sms.
     */
    phone?: string;

    /**
     * Signer first name.
     */
    firstname?: string;

    /**
     * Signer first last name.
     */
    lastname1?: string;

    /**
     * Signer second last name.
     */
    lastname2?: string;

    /**
     * Device ID of your tablet or mobile device that you wanna send to sign. This parameter is
     * needed when you set sign_method as tablet_sign.
     */
    deviceId?: string;

    /**
     * To require the video validation of signer in Remote and Remote SMS method.
     */
    videoValidation: boolean;

    /**
     * To require the selfie validation of signer in Remote and Remote SMS.
     */
    selfieValidation: boolean;

    /**
     * To require the Identity Documentation validation of signer in Remote and Remote SMS.
     */
    idValidation: boolean;

    /**
     * To require fingerprint when you sign document on mobile device. This parameter is needed when
     * you set sign_method as tablet_sign.
     */
    isFingerprint?: boolean;

    /**
     * To require national ID image when you sign document on mobile device. This parameter is needed
     * when you set sign_method as tablet_sign.
     */
    isNID?: boolean;

    /**
     * Signature image position coordinate. (x1, y1) is the left bottom corner, (x2, y2) is the top
     * right corner. Origin of coordinate is bottom left corner of document. Recommended ratio of width to height of signature image position is 3:1.
     */
    x1?: number;

    /**
     * Signature image position coordinate. (x1, y1) is the left bottom corner, (x2, y2) is the top
     * right corner. Origin of coordinate is bottom left corner of document. Recommended ratio of
     * width to height of signature image position is 3:1.
     */
    y1?: number;

    /**
     * Signature image position coordinate. (x1, y1) is the left bottom corner, (x2, y2) is the top
     * right corner. Origin of coordinate is bottom left corner of document. Recommended ratio of
     * width to height of signature image position is 3:1.
     */
    x2?: number;

    /**
     * Signature image position coordinate. (x1, y1) is the left bottom corner, (x2, y2) is the top
     * right corner. Origin of coordinate is bottom left corner of document. Recommended ratio of
     * width to height of signature image position is 3:1.
     */
    y2?: number;

    /**
     * Page number of document to insert the signature image in. The first page of document is 1.
     */
    pageno?: number;

    /**
     * The specific word in your document which you want to put the signature image on. The start point
     * of anchor text will be the top left corner of the signature image. The sign image size will
     * be 180 * 60 px rectangle by default.
     */
    anchor?: string;

    /**
     * If set true, system will not send an email to remote signer or approver, you can get sign urls
     * from response.
     */
    skipEmail?: boolean;

    /**
     * Sign callback URL of your service to get back the callback request of every sign status, system
     * will send to this url the sign status.
     */
    signStatusCallbackUrl?: string;   
}