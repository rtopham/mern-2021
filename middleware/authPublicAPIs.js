const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function (req, res, next) {
  //Get API key from header
  const key = req.header('api-key')

  //Check if no key
  if (!key) {
    return res.status(401).json({ msg: 'Authorization denied, no api key.' })
  }

  //Verify key
  try {
    const apiKey = config.get('apiKey')
    if (key !== apiKey)
      return res
        .status(401)
        .json({ msg: 'Auhorization denied, invalid api key.' })
  } catch (err) {
    res
      .status(401)
      .json({ msg: 'Authorization denied, api auhorization error.' })
  }

  //Get token from header--token not required for open API calls, but will add user Id to req
  const token = req.header('x-auth-token')
  if (token) {
    try {
      const decoded = jwt.verify(token, config.get('jwtSecret'))
      req.user = decoded.user
    } catch (err) {
      res.status(500).json({ msg: 'Server Error: Invalid User Token' })
    }
  }
  next()
}
