const redis = require("ioredis");
const redis_url = process.env.PORT || 6379;
const client = redis.createClient(redis_url);
const { StatusCodes } = require("http-status-codes");

module.exports = {
    getCached: (req, res, next) => {
      const { redis_key } = req.headers
      client.get(redis_key, function(err, data) {
        if (err) {
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Somethin Went Wrong" });
        }
        if (data == null) {
          next();
        } else {
          data = JSON.parse(data);
          res.status(StatusCodes.OK).json({ message: `işlem Başarılı`, NumberOfData : data.length, data: data});
        }
      });
    },
    caching: (key, data) => {
      client.set(key, JSON.stringify(data));
      client.expireat(key, parseInt((+new Date)/1000) + 21600);
    },
    delCache: (key) => {
      client.del(key);
    }
  }