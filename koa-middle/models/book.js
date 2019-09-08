import qs from 'querystring';
import request from '../util/request';
import config from '../config';

const getSubjectLists =  async function (session) {
  return await request.get(
    `${config.host}/user_profile/subjects`,
    {session_key: session}
  )
}

const getVip = async function (session) {
  return await request.get(
    `${config.host}/user_profile/vip_profile`,
    {session_key: session}
  )
}

const getGradeList =  async function (session) {
  return await request.get(
    `${config.host}/user_profile/clazz_list`,
    {session_key: session}
  )
}

const getChapters =  async function (session, gid) {
  return await request.post(
    `${config.host}/homework/chapters`,
    {session_key: session, mastery_type: gid}
  )
}

const getWrongLists = async function (session, subject) {
  return await request.get(
    `${config.host}/exam/list`,
    {session_key: session, subject}
  )
}

export default {
  getSubjectLists,
  getVip,
  getChapters,
  getWrongLists,
  getGradeList
}