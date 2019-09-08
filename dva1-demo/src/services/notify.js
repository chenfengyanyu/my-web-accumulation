import request from '../utils/request';
import SELF from '../../config';

let BASE_URL = SELF.url;

export async function createNotify(params) {
  let url = `${BASE_URL}/notification/add`;
  let req = request(url, {
    method: 'POST',
    body: JSON.stringify(params),
  });
  return req;
}

export async function updateNotify(params) {
  let url = `${BASE_URL}/notification/${params.id}`;
  let req = request(url, {
    method: 'PUT',
    body: JSON.stringify(params),
  });
  return req;
}

export async function deleteNotify(params) {
  let url = `${BASE_URL}/notification/${params}`;
  let req = request(url, { method: 'DELETE' });
  return req;
}

export async function getNotify(params) {
  let url = `${BASE_URL}/notification`;
  let _query = '';
  for (let k in params) {
    if (params[k]) {
      _query += (`${k}=${params[k]}&`);
    }
  }

  if (_query) {
    url = `${url}?${_query}`;
  }
  return request(url);
}
