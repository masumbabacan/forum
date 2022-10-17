const Mailjet = require('node-mailjet');
const mailjet = new Mailjet({
    apiKey: process.env.MJ_APIKEY_PUBLIC,
    apiSecret: process.env.MJ_APIKEY_PRIVATE
  });

const sendEmail = async ({to,receiverName,subject,html}) => {
    return mailjet.post('send',{'version': 'v3.1'}).request({
        "Messages" : [
            {
                "From" : {
                    "Email" : "forumsendemail@gmail.com",
                    "Name" : "Forum Var Ekibi",
                },
                "To" : [
                    {
                        "Email": to,
                        "Name": receiverName,
                    }
                ],
                "Subject" : subject,
                "HTMLPart" : html,
            }
        ]
    });
};

module.exports = sendEmail;