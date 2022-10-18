const RequestIp = require("../models/RequestIp");
const getIP = require('external-ip')();

const requestIp = async (req,res,next) => {
    getIP(async (err, ip) => {
        if (err) {
            throw err;
        }
        const userAgent = req.headers['user-agent'];
        const ipAddress = ip;
        const userId = req.user.userId;

        const existingRequestIp = await RequestIp.findOne({ip: ipAddress, userAgent : userAgent});
        if (!existingRequestIp) {
            await RequestIp.create({ip : ipAddress, userAgent : userAgent, numberOfVisits : +1, user : userId});
            return next();
        }else{
            existingRequestIp.numberOfVisits = existingRequestIp.numberOfVisits + 1;
            await existingRequestIp.save();
            return next();
        }
    });
};

module.exports = {
    requestIp,
}