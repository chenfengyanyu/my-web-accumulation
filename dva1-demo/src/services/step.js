import request from '../utils/request';
import SELF from '../../config';

let BASE_URL = SELF.url;

export async function createFence(params) {
  let url = `${BASE_URL}/geofence`;
  let req = request(url, {
    method: 'POST',
    body: JSON.stringify(params),
  });
  return req;
}

