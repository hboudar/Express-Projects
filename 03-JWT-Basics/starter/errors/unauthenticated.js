const CustomAPIError = require('./custom-error')
const {StatusCode} = require('../utils/status-codes')

class Unauthenticated extends CustomAPIError {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = StatusCode.UNAUTHORIZED
  }
}

module.exports = Unauthenticated