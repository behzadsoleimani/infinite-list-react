import { RECEIVE_API_DATA } from "./action";
import { combineReducers } from "redux";


const data = (state = {
  items: [],
  filters: []
}, { type , data }: any) => {
  switch (type) {
    case RECEIVE_API_DATA:
      return {...state , items : data.items , filters: data.filters};
    default:
      return state;
  }
};



export default combineReducers({
  data
});