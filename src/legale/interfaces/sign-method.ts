export enum SignMethod {
    /**
     * Available sign flows: `me`, `other`.
     * 
     * Sign document using Remote SMS, signer will receive the sign request through his email.
     * In this case, phone number is required, otherwise signer will not be able to receive OTP
     */
    Sms = 'sms',

    /**
     * Available sign flows: `me`, `other`.
     * 
     * Sign document using Remote, in this case, signer will receive the sign request through his email.
     * No need to pass the phone number
     */
    NoSms = 'no_sms',

    /**
     * Available sign flows: `me`, `other`.
     * 
     * Sign document using Firma avanzada remota, in this case, signer will receive the sign request through
     * his email. No need to pass the phone number
     */
    Fea = 'fea',

    /**
     * Available sign flows: `me`, `legale`.
     * 
     * Sign document using cloud certificate, in this case, signer can be you or other legale person. Signer
     * will receive sign request in his legale account
     */
    Certification = 'certification',

    /**
     * Available sign flows: `legale`.
     * 
     * Sign document using other sign method such as Remote or Remote SMS, in this case, signer can choose his
     * sign method except certification. Signer will receive sign request in his legale account
     */
    NoCertification = 'no_certification',

    /**
     * Available sign flows: `me`.
     * 
     * Sign document using local certificate, in this case, signer can be you or other legale person. Signer will
     * receive sign request in his legale account. Signer should have his local certificate. This method is working on only Windows 10 for now.
     */
    LocalCertificate = 'local_certificate',

    /**
     * Available sign flows: `approve`.
     * 
     * This is not digital sign. This method will send document to approver to approve current flow by himself.
     * Approver is not legale user in this case.
     */
    Approve = 'approve',

    /**
     * Available sign flows: `approve`.
     * 
     * This is not digital sign. This method will send document to approver to approve current flow by himself.
     * Approver should be legale user in this case.
     */
    ApproveLegale = 'approve_legale',

    /**
     * Available sign flows: `approve`.
     * 
     * This is not digital sign. You will receive a url from API response in this method, after that, you can approve
     * that document by sending a new POST request to that url.
     */
    ApproveApi = 'approve_api',

    /**
     * Available sign flows: `tablet`.
     * 
     * This is sign method to document to sign in mobile device.
     */
    TabletSign = 'tablet_sign',

    /**
     * Available sign flows: `signing_portal`.
     * 
     * This is sign method to document to sign in signing portal. After start sign process, you can search and sign
     * the documents from here.
     */
    SigningPortal = 'signing_portal'
}