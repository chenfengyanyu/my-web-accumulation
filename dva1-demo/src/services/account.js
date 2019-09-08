import request from '../utils/request';
import SELF from '../../config';

let BASE_URL = SELF.url;

export async function update(params) {
  let url = `${BASE_URL}/users/base/character`;
  let req = request(url, {
    method: 'PUT',
    body: JSON.stringify(params),
  });
  return req;
}

export async function reset(params) {
  let url = `${BASE_URL}/users/base/pwd`;
  let req = request(url, {
    method: 'PUT',
    body: JSON.stringify(params),
  });
  return req;
}
