import { request } from "@playwright/test";

export class PWRequest {
    protected options: Partial<{
        prefixUrl: string | URL,
        url: string | URL,
        method: string,
        headers: Record<string, string>
        params: {
            [key: string]: string | number | boolean
        }
        body: any
    }> & { url: string | URL } = { url: '' };
    
    public prefixUrl(prefixUrl: string | URL): this {
        this.options.prefixUrl = prefixUrl
        return this
    }       
    public url(url: string | URL): this {
        this.options.url = url
        return this
    }
    public method(method: string): this {
        this.options.method = method
        return this
    }
    public headers(headers: Record<string, string>): this {
        this.options.headers = this.options.headers ?? {}
        this.options.headers = {
            ...this.options.headers, 
            ...headers
        }
        return this
    }
    public searchParams(searchParams: {[key: string]: string | number | boolean}) {
        this.options.params = searchParams
        return this
    }
    public body(body: any) {
        this.options.body = body
        return this
    }
    public async send<T = never>() {
        if (this.options.url) {
            const reqContext = await request.newContext({
                baseURL: this.options.prefixUrl?.toString()
            })
        
        const response = await reqContext.fetch(this.options.url.toString(), {
            method: this.options.method,
            data: this.options.body,
            headers: this.options.headers,
            params: this.options.params,
            failOnStatusCode: true
        })
        return {
            body: await response.json() as T,
            headers: response.headers()
        }

    }
    throw new Error('[PWRequest] url is undefined')

}}