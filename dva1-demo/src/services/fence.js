import request from '../utils/request';
import SELF from '../../config';

let BASE_URL = SELF.url;

export async function updateFence(params) {
  let url = `${BASE_URL}/geofence/${params.id}`;
  let req = request(url, {
    method: 'PUT',
    body: JSON.stringify(params),
  });
  return req;
}

export async function deleteFence(params) {
  let url = `${BASE_URL}/geofence/${params}`;
  let req = request(url, { method: 'DELETE' });
  return req;
}

export async function getOverview(params) {
  let url = `${BASE_URL}/geofence/overview`;
  let req = request(url, { method: 'GET' });
  return req;
}

export async function getFence(params) {
  let url = `${BASE_URL}/geofence`;
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

export async function bulkBindFence(params) {
  let url = `${BASE_URL}/device/multi/bind`;
  let req = request(url, {
    method: 'PUT',
    body: JSON.stringify(params),
  });
  return req;
}
