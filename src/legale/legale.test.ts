import type { GetDocumentsResponse, DocumentDetail, Folder, Document } from './interfaces/index.js';
import type { LegaleFetchObject } from '@/legale-auth/index.js';

import { FailedFetchResponseError } from '@/legale-fetch/index.js';
import { Legale } from './legale.js';
import test from 'ava';

const legaleFetch: LegaleFetchObject = {
    fetch:          () => Promise.reject('Not implemented'),
    fetchBuffer:    () => Promise.reject('Not implemented'),
    fetchJSON:      async path => {
        switch (path) {
            case 'api/token': {
                return { token: 'joder-chaval' };
            }

            case 'api/folder': {
                return [
                    {
                        id: 999,
                        owned: true,
                        totalDocumentNumber: 3,
                        hasSftp: false,
                        owner: 'perreo.ijoueputa',
                        title: 'test-folder',
                        autoSign: false,
                        updatedAt: new Date('2021-10-19T16:05:44.158662Z'),
                        parent: null
                    },
                    {
                        id: 666,
                        owned: true,
                        totalDocumentNumber: 6,
                        hasSftp: true,
                        owner: 'perreo.ijoueputa-dsbm',
                        title: 'test-folder',
                        autoSign: false,
                        updatedAt: new Date('2022-10-19T16:05:44.158662Z'),
                        parent: null
                    }
                ] as Folder[];
            }

            case 'api/documents': {
                return {
                    count: 666,
                    next: 'http://www.joder-chaval.io/',
                    previous: null,
                    results: [
                        { GUID: 'xxx-1' },
                        { GUID: 'xxx-2' },
                        { GUID: 'xxx-3' },
                        { GUID: 'xxx-4' },
                        { GUID: 'xxx-5' }
                    ]
                } as GetDocumentsResponse;
            }

            case 'api/document/get/xxx-3': {
                return {
                    GUID: 'xxx-3',
                    createdAt: new Date('2021-10-19T16:05:44.158662Z'),
                    updatedAt: new Date('2021-10-19T16:05:44.158662Z'),
                    owner: {
                        email: 'perreo.ijoeputa@hotmail.com'
                    },
                    signList: [
                        {
                            id: 666,
                            signMethod: 'jodeeer',
                            signerInfo: {
                                id: 777,
                                email: 'pendejo'
                            }
                        }
                    ]
                } as DocumentDetail;
            }

            case 'api/document/create': {
                return {
                    GUID: 'xxx-6',
                    fileName: 'root/hola/mundo/joder.pdf',
                    description: 'Archivo de prueba'
                } as Document;
            }

            default: {
                throw new FailedFetchResponseError(404, 'Path not found');
            }
        }
    }
}

test('Test getDocuments', async t => {
    const legale = new Legale({ legaleFetch });
    await legale.getToken('perreo-ijoeputa@frigosorno.cl', 'aaathats3as');
    const result = await legale.getDocuments(1, 5);
    
    t.is(legale.token, 'joder-chaval');
    t.deepEqual(result, {
        count: 666,
        next: 'http://www.joder-chaval.io/',
        previous: null,
        results: [
            { GUID: 'xxx-1' },
            { GUID: 'xxx-2' },
            { GUID: 'xxx-3' },
            { GUID: 'xxx-4' },
            { GUID: 'xxx-5' }
        ]
    });
});

test('Test getDocumentDetail', async t => {
    const legale = new Legale({ legaleFetch });
    await legale.getToken('perreo-ijoeputa@frigosorno.cl', 'aaathats3as');
    const result = await legale.getDocumentDetail('xxx-3');
    
    t.is(legale.token, 'joder-chaval');
    t.deepEqual(result, {
        GUID: 'xxx-3',
        createdAt: new Date('2021-10-19T16:05:44.158662Z'),
        updatedAt: new Date('2021-10-19T16:05:44.158662Z'),
        owner: {
            email: 'perreo.ijoeputa@hotmail.com'
        },
        signList: [
            {
                id: 666,
                signMethod: 'jodeeer',
                signerInfo: {
                    id: 777,
                    email: 'pendejo'
                }
            }
        ]
    });
});

test('Test getFolders', async t => {
    const legale = new Legale({ legaleFetch });
    await legale.getToken('perreo-ijoeputa@frigosorno.cl', 'aaathats3as');
    const result = await legale.getFolders();
    
    t.is(legale.token, 'joder-chaval');
    t.deepEqual(result, [
        {
            id: 999,
            owned: true,
            totalDocumentNumber: 3,
            hasSftp: false,
            owner: 'perreo.ijoueputa',
            title: 'test-folder',
            autoSign: false,
            updatedAt: new Date('2021-10-19T16:05:44.158662Z'),
            parent: null
        },
        {
            id: 666,
            owned: true,
            totalDocumentNumber: 6,
            hasSftp: true,
            owner: 'perreo.ijoueputa-dsbm',
            title: 'test-folder',
            autoSign: false,
            updatedAt: new Date('2022-10-19T16:05:44.158662Z'),
            parent: null
        }
    ]);
});

test('Test createDocument', async t => {
    const legale = new Legale({ legaleFetch });
    await legale.getToken('perreo-ijoeputa@frigosorno.cl', 'aaathats3as');
    const documento = await legale.createDocument({
        file: Buffer.from([1, 2, 3]),
        fileName: 'root/hola/mundo/joder.pdf',
        description: 'Archivo de prueba'
    });

    t.deepEqual(documento, {
        GUID: 'xxx-6',
        fileName: 'root/hola/mundo/joder.pdf',
        description: 'Archivo de prueba'
    });
});