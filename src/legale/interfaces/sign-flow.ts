export enum SignFlow {
    /**
     * Available sign methods: `certification`, `local_certificate`, `sms`, `no_sms`, `fea`
     * 
     * Sign by myself, this means document will be signed by you. In this flow, you are the signer of document
     */
    Me = 'me',

    /**
     * Available sign methods: `sms`, `no_sms`, `fea`
     * 
     * Sign by other person, this means document will be signed by other person, not by legale user.
     */
    Other = 'other',

    /**
     * Available sign methods: `certification`, `no_certification`
     * 
     * Sign by legale user, this means document will be signed by other legale user.
     */
    Legale = 'legale',

    /**
     * Available sign methods: `approve`, `approve_legale`, `approve_api`
     * 
     * This flow is to approve document by some persons, not adding digital signature into document, just approve current document sign flow by person.
     */
    Approve = 'approve',

    /**
     * Available sign methods: `tablet_sign`
     * 
     * This flow is to send document to tablet, on the tablet, you can add fingerprint into the document.
     */
    Tablet = 'tablet',

    /**
     * Available sign methods: `signing_portal`
     * 
     * This flow is to send document to sign in signing portal.
     */
    SigningPortal = 'signing_portal'
};