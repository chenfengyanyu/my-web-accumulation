import book from '../models/book'

const getSubject = async function (ctx) {
  let { session_key: session } = ctx.query;
  if (!session) {
    ctx.body = {
      fail: true,
      errmsg: 'session_key 不能为空！'
    }
  } else {
    const data = await book.getSubjectLists(session);
    ctx.body = data;
  }
}

const getVip = async function (ctx) {
  let { session_key: session } = ctx.query;
  if (!session) {
    ctx.body = {
      fail: true,
      errmsg: 'session_key 不能为空！'
    }
  } else {
    const data = await book.getVip(session);
    ctx.body = data;
  }
}

const getGrade = async function(ctx) {
  let { session_key: session } = ctx.query;
  if (!session) {
    ctx.body = {
      fail: true,
      errmsg: 'session_key 不能为空！'
    }
  } else {
    const data = await book.getGradeList(session);
    ctx.body = data;
  }
}

const getSwitchLists = async function (ctx) {
  let {session_key, subject, type, mastery_type } = ctx.query;
  if(!subject) {
    ctx.body = {
      fail: true,
      errmsg: '学科不能为空！'
    }
  } else if (!session_key ) {
    ctx.body = {
      fail: true,
      errmsg: 'session_key 不能为空！'
    }
  } else {
    let result = [];
    if (type && type === '1' && subject === 'math') {
      if (mastery_type) {
        ctx.body = await book.getChapters(session_key,mastery_type);
      } else {
        ctx.body = {
          fail: true,
          errmsg: '年级不能为空！'
        }
      }
    } else {
      ctx.body = await book.getWrongLists(session_key,subject);
    } 
  }
}

export default {
  getSubject,
  getVip,
  getSwitchLists,
  getGrade
}