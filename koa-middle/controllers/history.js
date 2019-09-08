import history from '../models/history';
import _ from 'lodash';

const total = async function(ctx) {
  let { session_key } = ctx.query;
  if (!session_key ) {
    ctx.body = {
      fail: true,
      errmsg: 'session_key 不能为空！'
    }
  }
  const result = await history.total(session_key);
  ctx.body = result;
}

const list = async function(ctx) {
  let { subject, type, stamp, session_key, page, size } = ctx.query;
  if (!subject) {
    ctx.body = {
      fail: true,
      errmsg: '学科不能为空！'
    }
  }

  if (!session_key ) {
    ctx.body = {
      fail: true,
      errmsg: 'session_key 不能为空！'
    }
  }

  if (subject === 'math') {
    if (!type) {
      ctx.body = {
        fail: true,
        errmsg: '缺少类型参数！'
      }
    } else if(!page || !size) {
      ctx.body = {
        fail: true,
        errmsg: '缺少分页数据！'
      }
    } else {
      let data = await history.mathList(session_key, subject, type, page, size);
      let newArrs = [];

      console.log(data);

      data = JSON.parse(data);

      if(data && data.data) {
        if(Object.keys(data.data).length === 0){
          data.data.items = [];
          ctx.body = data;
        } else {
          data.data.items.map(outer => {
            newArrs.push({
              period: outer.length > 0 ? outer[0].homework_show_period : '',
              result: outer
            })
          })
          data.data.items = newArrs;
          ctx.body = data;
        }
        
      } else {
        ctx.body = {
          fail: true,
          errmsg: '数据未格式化！'
        }
      }
    }
  } else {
    let data  = await history.otherList(session_key, subject, stamp);
    let newArrs = [];
   
    data = JSON.parse(data);

    if (data && data.data) {
      data.data.items.map(outer => {
        newArrs.push({
          period: outer.length > 0 ? outer[0].homework_show_period : '',
          result: outer
        })
      })
      data.data.items = newArrs;
      ctx.body = data;
    } else {
      ctx.body = {
        fail: true,
        errmsg: '数据未格式化！'
      }
    }
  }
}

export default {
  total,
  list
}