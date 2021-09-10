const nodemailer = require('nodemailer');




let transport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'sultan4106230@cloud.neduet.edu.pk',
    pass: 'tehreem0515tkUNI'
  }
})

//send mail
const emailsend=(useremail)=>{
  console.log("useremail",useremail)
    console.log('sending email..');
    const message = {
    from: 'sultan4106230@cloud.neduet.edu.pk', // Sender address
    to: `${useremail}`,         // recipients
    subject: 'You are now a registered user', // Subject line
    text: 'login to the website' // Plain text body
};
transport.sendMail(message, function(err, info) {
    if (err) {
      console.log(err)
    } else {
      console.log('mail has sent.');
      console.log(info);
      res.send({
        message:"mail has been successfully send"
    })
    }
});
}

module.exports=emailsend;