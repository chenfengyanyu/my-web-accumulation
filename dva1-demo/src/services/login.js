import request from '../utils/request';
import SELF from '../../config';

let BASE_URL = SELF.url;

export async function login(params) {
  let url = `${BASE_URL}/sessions`;
  let req = request(url, {
    method: 'post',
    body: JSON.stringify(params),
  });
  return req;
}

export async function logout(params) {
  let url = `${BASE_URL}/sessions/current`;
  let req = request(url, { method: 'delete' });
  return req;
}

export async function getUserInfo(params) {
  let url = `${BASE_URL}/users/me?session=${params}`;
  let req = request(url, { method: 'get' });
  return req;
}

export async function switchAccount(params) {
  let url = `${BASE_URL}/users/${params}/controlling`;
  let req = request(url, { method: 'POST' });
  return req;
}

export async function quitAccount(params) {
  let url = `${BASE_URL}/users/${params.id}/controlling`;
  let req = request(url, { method: 'DELETE' });
  return req;
}
