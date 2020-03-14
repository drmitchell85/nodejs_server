const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body;

        const survey = new Survey({
            title,
            subject,
            body,
            // split recipients, map over it, pass over an array function where every email returns an object of that email
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            // associate with a specific user
            _user: req.user.id,
            dateSent: Date.now()
        });

        // Great place to send an email
        const mailer = new Mailer(survey, surveyTemplate(survey));

        try { 
            await mailer.send();
            // save survey to DB
            await survey.save();
            // deduct a credit and save
            req.user.credits -= 1;
            const user = await req.user.save();

            res.send(user);
        } catch (err) {
            // unprocessable entity error
            res.status(422).send(err);
        }
    });
};