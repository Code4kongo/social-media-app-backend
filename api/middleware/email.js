const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

const welcomeEmail = (email ) => {

    const msg = {
        to: email,
        from: 'code4kongo@gmail.com',
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
      };
      console.log(msg)
    sgMail
        .send(msg)
        .then(res => {
              console.log(res)
          })
        .catch(error => console.log(error))
}

    

    exports.welcomeEmail = welcomeEmail

