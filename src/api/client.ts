
import HttpClient from "../util/http-client";

export const getHttpClient = (config?: any) => (new HttpClient(config || {
    baseURL: `/`,
}));
