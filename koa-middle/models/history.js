import request from '../util/request';
import qs from 'querystring';
import config from '../config'

// http://wiki.17zuoye.net/pages/viewpage.action?pageId=38916369#id-%E6%8A%80%E6%9C%AF%E6%96%B9%E6%A1%88/%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3-4.1.2.6.1%E5%BE%97%E5%88%B0%E5%81%9A%E9%A2%98%E5%8E%86%E5%8F%B2%E5%88%97%E8%A1%A8

const total = async function (session) {
  return await request.get(
    `${config.host}/history/statics`,
    {session_key: session}
  )
}

const mathList = async function (session_key, subject, type, page, size) {
  console.log('******',session_key, subject, type, page, size);
  return await request.get(
    `${config.host}/homework/history`,
    {session_key, subject, type, page, size}
  )
}

const otherList = async function (session_key, subject, stamp) {
  let param = {};
  if(stamp) {
    param = {
      session_key,
      subject,
      stamp
    };
  } else {
    param = {
      session_key,
      subject
    };
  }

  return await request.get(
    `${config.host}/homework/history`,
    param
  )
}

export default {
  total,
  mathList,
  otherList
}