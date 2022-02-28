import { call, put, takeLatest, select } from "redux-saga/effects";

import { REQUEST_API_DATA, receiveApiData } from "./action";
import { fetchData } from "./api";

function* getApiData({ payload }: any) {
  try {

    const { page, filter } = payload;
    const currentData = yield select((state: any) => state.data.items);
    const filters = yield select((state: any) => state.data.filters);
    const objFilter = filters.filter((item: any) => item.selected)
    const filterTitle = objFilter && objFilter[0] && objFilter[0].title;
    const notChangeFilter = filterTitle === filter;
    const arrayFilter = [filter] || [];
    const data: any = yield call(() => fetchData(page || 1, currentData || [] , arrayFilter , notChangeFilter));
    yield put(receiveApiData(data));
  } catch (e) {
    console.log(e);
  }
}

export default function* mySaga() {
  yield takeLatest(REQUEST_API_DATA, getApiData);
}