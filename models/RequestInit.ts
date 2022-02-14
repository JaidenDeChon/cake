export default interface RequestInit {
    method?: string;
    headers?: HeadersInit | { [index: string]: string };
    body?: BodyInit;
    mode?: RequestMode;
    credentials?: RequestCredentials;
    cache?: RequestCache;
}
