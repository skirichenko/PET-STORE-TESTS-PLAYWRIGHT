import type { AxiosRequestConfig, Method } from 'axios'
import axios from 'axios'

export class JsonRequest {
    protected options: any = {
        responseType: 'json'
    }
    public url(url: string | URL): this {
        this.options.url = url
        return this
    }
    public method(method: Method) {
        this.options.method = method
        return this
    }
    public urlSearchParams(params: AxiosRequestConfig['params']): this {
        this.options.params = params
        return this
    }
    public body(body: any): this {
        this.options.data = body
        return this
    }
    public send<T>() {
        return axios<T>(this.options)

    }
}

