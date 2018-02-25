module.exports = {
  port: process.env.port || process.env.PORT || '3005',
  mongoUrl: process.env.MONGODB_URI || `mongodb://root:root@ds239648.mlab.com:39648/heroku_42sf462w`
}