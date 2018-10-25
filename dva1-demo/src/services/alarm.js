import request from '../utils/request';
import SELF from '../../config';

let BASE_URL = SELF.url;

export async function queryAlarmLogs(params) {
  let url = `${BASE_URL}/noticelog/list`;
  let _query = '';
  for (let k in params) {
    if (params[k]) {
      _query += `${k}=${params[k]}&`;
    }
  }

  if (_query) {
    url += `?${_query}`;
  }

  return request(url);
}
