declare module 'xmlhttprequest' {
    export class XMLHttpRequest {
      onreadystatechange: (() => void) | null;
      readyState: number;
      responseText: string;
      status: number;
      open(method: string, url: string, async?: boolean, user?: string, password?: string): void;
      send(data?: Document | BodyInit | null): void;
      setRequestHeader(name: string, value: string): void;
      abort(): void;
      getAllResponseHeaders(): string;
      getResponseHeader(name: string): string | null;
      statusText: string;
      responseType: XMLHttpRequestResponseType;
      withCredentials: boolean;
      upload: XMLHttpRequestUpload;
      timeout: number;
      responseURL: string;
      responseXML: Document | null;
      response: any;
      onload: ((this: XMLHttpRequest, ev: Event) => any) | null;
      onerror: ((this: XMLHttpRequest, ev: Event) => any) | null;
    }
  }
  