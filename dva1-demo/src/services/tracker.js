import request from '../utils/request';
import SELF from '../../config';

let BASE_URL = SELF.url;

export async function getTracker(params) {
  let url = `${BASE_URL}/device/list`;
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

export async function getOverview(params) {
  let url = `${BASE_URL}/device/overview`;
  let req = request(url, { method: 'GET' });
  return req;
}

export async function getOneDevice(params) {
  let url = `${BASE_URL}/device/one/${params}`;
  let req = request(url, { method: 'GET' });
  return req;
}

export async function bindDevice(sn, params) {
  let url = `${BASE_URL}/device/${sn}/bind`;
  let req = request(url, {
    method: 'POST',
    body: JSON.stringify(params),
  });
  return req;
}

export async function unbindFence(params) {
  let url = `${BASE_URL}/device/unbind/${params.sn}/${params.gid}`;
  let req = request(url, { method: 'DELETE' });
  return req;
}

export async function deleteDevice(params) {
  let url = `${BASE_URL}/device/${params}`;
  let req = request(url, { method: 'DELETE' });
  return req;
}

export async function updateCycle(params) {
  let url = `${BASE_URL}/device/multi/cycle`;
  let req = request(url, {
    method: 'PUT',
    body: JSON.stringify(params),
  });
  return req;
}

export async function updateDevice(sn, params) {
  let url = `${BASE_URL}/device/${sn}/edit`;
  let req = request(url, {
    method: 'PUT',
    body: JSON.stringify(params),
  });
  return req;
}

export async function pullDevice() {
  let url = `${BASE_URL}/device/pull`;
  let req = request(url, { method: 'GET' });
  return req;
}
