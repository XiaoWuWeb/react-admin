const axios = require('axios')
const querystring = require('query-string')

// const baseUrl = 'https://cnodejs.org/api/v1'
const baseUrl = 'http://192.168.0.110:8080/PayPay'

module.exports = function (req, res, next) {
  const path = req.path // 借口地址
  const user = req.session.user || {} // 用户是否登录
  const needAccesssToken = req.query.needAccesssToken // 是否需要token

  if (needAccesssToken && !user.accessToken) {
    res.status(401).send({
      success: false,
      msg: 'need login'
    })
  }

  const query = Object.assign({}, req.query, { // 重新定义query，怕上面有自己写的东西
    accesstoken: (needAccesssToken && req.method === 'GET') ? user.accessToken : ''
  })
  if (query.needAccesssToken) delete query.needAccesssToken

  axios(`${baseUrl}${path}`, {
    method: req.method,
    params: query,
    //  {'accesstoken': 'xxxx'}      'accessstoken:xxxx'
    data: querystring.stringify(Object.assign({}, req.body, {
      accesstoken: (needAccesssToken && req.method === 'POST') ? user.accessToken : ''
    })),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(resp => {
    if (resp.status === 200) {
      res.send(resp.data)
    } else {
      res.status(resp.status).send(resp.data)
    }
  }).catch(err => {
    if (err.response) {
      res.status(500).send(err.response.data)
    } else {
      res.status(500).send({
        success: false,
        msg: '未知错误'
      })
    }
  })
}
