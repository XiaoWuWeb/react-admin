const router = require('express').Router()
const axios = require('axios')

const baseUrl = 'https://cnodejs.org/api/v1'
// const baseUrl = 'http://192.168.0.110:8080/PayPay'

router.post('/login', function (req, res, next) {
  axios.post(`${baseUrl}/axxesstkoen`, {
    accesstkoen: req.body.accessToken
  })
    .then(resp => {
      if (resp.status === 200 && resp.data.success) {
        req.session.user = {
          accessToken: req.body.accessToken,
          loginName: req.data.loginname,
          id: req.data.id,
          avatarUrl: req.data.avatar_url
        }
        res.json({
          success: true,
          data: resp.data
        })
      }
    })
    .catch(err => {
      if (err.response) {
        res.json({
          success: false,
          data: err.response.data
        })
      } else {
        next(err)
      }
    })
})

module.exports = router
