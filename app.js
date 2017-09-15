var builder = require('botbuilder');
var restify = require('restify');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

const ChangePasswordOption = 'Change Password';
const ResetPasswordOption = 'Reset Password';
const ReservationOption = 'Reservation';
const LanguageOption = 'Language';

var bot = new builder.UniversalBot(connector, [
    (session) => {
        var name = session.message.user.name;
        console.log(name);
        session.send('Hello '+name);
        builder.Prompts.choice(session,            
            'What do yo want to do today?',
            [ChangePasswordOption, ResetPasswordOption, ReservationOption, LanguageOption],
            { listStyle: builder.ListStyle.button });
    },
    (session, result) => {
        if (result.response) {
            switch (result.response.entity) {
                case ChangePasswordOption:
                    session.beginDialog('changePassword:/');
                    break;
                case ResetPasswordOption:
                    session.beginDialog('resetPassword:/');
                    break;
                case ReservationOption:
                    session.beginDialog('reservation:/');
                    break;
                case LanguageOption:
                    session.beginDialog('language:/');
                    break;
            }
        } else {
            session.send(`I am sorry but I didn't understand that. I need you to select one of the options below`);
        }
    },
    (session, result) => {
        if (result.resume) {
            session.send('Your identity was not verified and your password cannot be reset');
            session.reset();
        }
    }
]);

//Sub-Dialogs
bot.library(require('./dialogs/reset-password'));
bot.library(require('./dialogs/change-password'));
bot.library(require('./dialogs/reservation'));
bot.library(require('./dialogs/language'));

server.post('/api/messages', connector.listen());
