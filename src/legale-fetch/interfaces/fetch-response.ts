export interface FetchResponse {
    ok:             boolean;
    url:            string;
    status:         number;
    statusText:     string;
    headers:        Headers;
    redirected:     boolean;

    json:           () => Promise<any>;
    text:           () => Promise<string>;
    arrayBuffer:    () => Promise<ArrayBuffer>;
}