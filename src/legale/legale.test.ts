import type { GetDocumentsResponse, DocumentDetail, Folder, Document } from './interfaces/index.js';
import type { LegaleFetchObject } from '@/legale-auth/index.js';

import { FailedFetchResponseError } from '@/legale-fetch/index.js';
import { Legale } from './legale.js';
import test from 'ava';

const legaleFetch: LegaleFetchObject = {
    fetchBuffer:    async (path, options) => {
        switch (`${options?.method ?? 'get'}:${path}`) {
            case 'get:media/xxx-3': {
                return Buffer.from('ñeee', 'utf-8');
            }

            default: {
                throw new FailedFetchResponseError(404, 'Path not found');
            }
        }
    },
    fetch:          async (path, options) => {
        switch (`${options?.method ?? 'get'}:${path}`) {
            case 'delete:api/document/delete/xxx-6': {
                return;
            }

            case 'delete:api/folder/666': {
                return;
            }

            default: {
                throw new FailedFetchResponseError(404, 'Path not found');
            }
        }
    },
    fetchJSON:      async (path, options) => {
        switch (`${options?.method ?? 'get'}:${path}`) {
            case 'post:api/token': {
                return { token: 'joder-chaval' };
            }

            case 'get:api/folder': {
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

            case 'get:api/documents': {
                return {
                    count: 666,
                    next: 'http://www.joder-chaval.io/',
                    previous: null,
                    results: [
                        { guid: 'xxx-1' },
                        { guid: 'xxx-2' },
                        { guid: 'xxx-3' },
                        { guid: 'xxx-4' },
                        { guid: 'xxx-5' }
                    ]
                } as GetDocumentsResponse;
            }

            case 'get:api/document/get/xxx-3': {
                return {
                    guid: 'xxx-3',
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

            case 'get:api/document/get/xxx-6': {
                return new Promise<any>((resolve, reject) => {
                    const signal = options?.signal;
                    const timeout = setTimeout(() => {
                        if (listener) {
                            signal?.removeEventListener('abort', listener);
                        }

                        resolve({
                            guid: 'xxx-6',
                            createdAt: new Date('2022-10-01T23:00:00.666Z'),
                            updatedAt: new Date('2022-10-01T23:00:00.666Z'),
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
                    }, 10000);

                    const listener = signal?.addEventListener('abort', () => {
                        clearTimeout(timeout);
                        const error = new Error('ñeee');
                        reject(error);
                    });
                });
            }

            case 'post:api/document/create': {
                return {
                    guid: 'xxx-6',
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
            { guid: 'xxx-1' },
            { guid: 'xxx-2' },
            { guid: 'xxx-3' },
            { guid: 'xxx-4' },
            { guid: 'xxx-5' }
        ]
    });
});

test('Test getDocumentDetail', async t => {
    const legale = new Legale({ legaleFetch });
    await legale.getToken('perreo-ijoeputa@frigosorno.cl', 'aaathats3as');
    const result = await legale.getDocumentDetail('xxx-3');
    
    t.is(legale.token, 'joder-chaval');
    t.deepEqual(result, {
        guid: 'xxx-3',
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

test('Test getDocumentDetail (throws with `AbortController`)', async t => {
    const legale = new Legale({ legaleFetch });
    await legale.getToken('perreo-ijoeputa@frigosorno.cl', 'aaathats3as');
    t.is(legale.token, 'joder-chaval');

    await t.throwsAsync(
        async () => {
            const signal = AbortSignal.timeout(1000);
            await legale
                .getDocumentDetail('xxx-6', signal)
                .catch(err => {
                    if (err?.cause) {
                        throw err.cause;
                    } else {
                        throw err;
                    }
                });
            
        },
        {
            message: 'ñeee'
        }
    )
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

test('Test deleteFolder', async t => {
    const legale = new Legale({ legaleFetch });
    await legale.getToken('perreo-ijoeputa@frigosorno.cl', 'aaathats3as');
    await legale.deleteFolder(666);
    t.pass();
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
        guid: 'xxx-6',
        fileName: 'root/hola/mundo/joder.pdf',
        description: 'Archivo de prueba'
    });
});

test('Test downloadDocument', async t => {
    const legale = new Legale({ legaleFetch });
    await legale.getToken('perreo-ijoeputa@frigosorno.cl', 'aaathats3as');
    const buffer = await legale.downloadDocument('xxx-3');
    t.is(buffer.toString('utf-8'), 'ñeee');
});

test('Test deleteDocument', async t => {
    const legale = new Legale({ legaleFetch });
    await legale.getToken('perreo-ijoeputa@frigosorno.cl', 'aaathats3as');
    await legale.deleteDocument('xxx-6');
    t.pass();
});