export const REQUEST_API_DATA = "REQUEST_API_DATA";
export const RECEIVE_API_DATA = "RECEIVE_API_DATA";

export const requestApiData = (page?: number, filter?: string) => ({ type: REQUEST_API_DATA, payload: { filter, page } });
export const receiveApiData = (data: any) => ({ type: RECEIVE_API_DATA, data });