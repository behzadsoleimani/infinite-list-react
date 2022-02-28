

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

// tslint:disable: no-empty-interface
export interface IHttpConfig extends AxiosRequestConfig {
    staticBaseUrl?: string;
}

export interface IHttpResponse<T = any> extends AxiosResponse<T> { }

export interface IHttpError<T = any> extends AxiosError<T> { }
// tslint:enable: no-empty-interface

export enum HttpMethod {
    "common",
    "get",
    "delete",
    "head",
    "options",
    "post",
    "put",
    "patch"
}

export interface IHttpErrorTable {
    lookup?: string[];
    messages?: {
        [key: string]: string;
    };
}

class HttpClient {
    public instance: AxiosInstance;
    public errorTable: IHttpErrorTable | undefined;

    public constructor(config?: IHttpConfig, errorTable?: IHttpErrorTable) {
        this.instance = axios.create(config);
        this.errorTable = errorTable;

        this.instance.defaults.timeout = 1000 * 60 * 5;
    }

    public addHeader(name: string, value?: string, method: HttpMethod = HttpMethod.common) {
        if (!this.instance.defaults.headers) {
            this.instance.defaults.headers = {};
        }
        if (!this.instance.defaults.headers[HttpMethod[method]]) {
            this.instance.defaults.headers[HttpMethod[method]] = {};
        }

        this.instance.defaults.headers[HttpMethod[method]][name] = value;
    }

    public removeHeader(name: string, method: HttpMethod = HttpMethod.common) {
        if (
            this.instance.defaults.headers &&
            this.instance.defaults.headers[HttpMethod[method]] &&
            this.instance.defaults.headers[HttpMethod[method]][name]
        ) {
            delete this.instance.defaults.headers[HttpMethod[method]][name];
        }
    }

    public clearHeader(method: HttpMethod = HttpMethod.common) {
        if (
            this.instance.defaults.headers &&
            this.instance.defaults.headers[HttpMethod[method]]
        ) {
            delete this.instance.defaults.headers[HttpMethod[method]];
        }
    }

    public setBaseUrl(baseURL?: string) {
        this.instance.defaults.baseURL = baseURL;
    }

    public setRequestTimeout(timeout?: number) {
        this.instance.defaults.timeout = timeout;
    }

    public addParameter(name: string, value?: any) {
        if (!this.instance.defaults.params) {
            this.instance.defaults.params = new URLSearchParams();
        }

        this.instance.defaults.params.append(name, value);
    }

    public removeParameter(name: string) {
        if (this.instance.defaults.params && this.instance.defaults.params.has(name)) {
            this.instance.defaults.params.delete(name);
        }
    }

    public addErrorHandling(errorTable?: IHttpErrorTable) {
        this.errorTable = errorTable;
    }

    public request<T = any, R = AxiosResponse<T>>(config: IHttpConfig): Promise<R> { return this.instance.request<T, R>(config); }

    public get<T = any, R = AxiosResponse<T>>(url: string, config?: IHttpConfig): Promise<R> { return this.instance.get<T, R>(url, config); }

    public delete<T = any, R = AxiosResponse<T>>(url: string, config?: IHttpConfig): Promise<R> { return this.instance.delete<T, R>(url, config); }

    public head<T = any, R = AxiosResponse<T>>(url: string, config?: IHttpConfig): Promise<R> { return this.instance.head<T, R>(url, config); }

    public post<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: IHttpConfig): Promise<R> { return this.instance.post<T, R>(url, data, config); }

    public put<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: IHttpConfig): Promise<R> { return this.instance.put<T, R>(url, data, config); }

    public patch<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: IHttpConfig): Promise<R> { return this.instance.patch<T, R>(url, data, config); }
}

export default HttpClient;
