const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

// helper.Mail property is an obj that takes in configs and spits out a Mailer; we want to customize the Mail class from SendGrid's library
class Mailer extends helper.Mail {
    // constructor allows us to setup for the instance
    // (?) why is the first parameter bracketed
    constructor({ subject, recipients }, content) {
        // make sure that constructor of Mail class is called
        super();

        this.sgApi = sendgrid(keys.sendGridKey);
        this.from_email = new helper.Email('no-reply@emaily.com');
        this.subject = subject;
        // content is the output of the template function
        this.body = new helper.Content('text/html', content);
        this.recipients = this.formatAddresses(recipients);

        // addContent() is a built-in func
        this.addContent(this.body);

        // enable clicktracking
        this.addClickTracking();

        this.addRecipients();
    }

    // helper func to format addresses
    formatAddresses(recipients) {
        return recipients.map(({ email }) => {
            return new helper.Email(email);
        });
    }

    // func to enable clicktracking
    addClickTracking() {
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }

    addRecipients() {
        const personalize = new helper.Personalization();
        this.recipients.forEach(recipient => {
            personalize.addTo(recipient);
        });
        this.addPersonalization(personalize);
    }

    async send() {
        const request = this.sgApi.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON()
        });

        // send req off to SendGrid
        const response = await this.sgApi.API(request);
        return response;
    }
}

module.exports = Mailer;