import request from '../utils/request';
import SELF from '../../config';

let BASE_URL = SELF.url;

export async function addAccount(params) {
  let url = `${BASE_URL}/users/add`;
  let req = request(url, {
    method: 'POST',
    body: JSON.stringify(params),
  });
  return req;
}

export async function updateAccount(params) {
  let url = `${BASE_URL}/users/${params.id}`;
  let req = request(url, {
    method: 'PUT',
    body: JSON.stringify(params.item),
  });
  return req;
}

export async function deleteAccount(params) {
  let url = `${BASE_URL}/users/${params}`;
  let req = request(url, { method: 'DELETE' });
  return req;
}

export async function getAccount(params) {
  let url = `${BASE_URL}/users/`;
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

export async function getAllot(params) {
  let url = `${BASE_URL}/device/allot/${params}/list`;
  let req = request(url, { method: 'GET' });
  return req;
}

export async function allotDevice(params, id) {
  let url = `${BASE_URL}/users/multi/${id}/allot`;
  let req = request(url, {
    method: 'PUT',
    body: JSON.stringify(params),
  });
  return req;
}
