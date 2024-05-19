const sgMail = require('@sendgrid/mail')

// const sendgridAPIKey = 'SG.bcvfayhyergcgreijkyhyigweaefvrgvk'

sgMail.setApiKey(process.env.SENDGRIP_API_KEY)

// sgMail.send({
//     to: 'vasanthram0225@gmail.com',
//     from: 'vasanthram0225@gmail.com',
//     subject: 'This is my first mail from sendgrid',
//     text: 'successful mail from sendgrid'
// })

const sendWelcomeMail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'vasanthram0225@gmail.com',
        subject: 'Thanks for joining!',
        text: `Welcome to the app, ${name}`
    })
}

const sendCancelationMail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'vasanthram0225@gmail.com',
        subject: 'SUbscription Canceled',
        text: `This is to inform you that your plan is canceled. Let me know if you change your mind ${name}`
    })
}

module.exports = {
    sendWelcomeMail,
    sendCancelationMail
}