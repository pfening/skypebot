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
const ResetPasswordOption = 'New Password';
const ReservationOption = 'Meeting Room Reservation';
const LanguageOption = 'Language Poll';
const AgeOption = 'Age';

var bot = new builder.UniversalBot(connector, [
    (session) => {
        var name = session.message.user.name;
        console.log(name);
        session.send('Hello '+name);
        builder.Prompts.choice(session,            
            'What do yo want to do today?',
            [ChangePasswordOption, ResetPasswordOption, ReservationOption, LanguageOption,AgeOption],
            { listStyle: builder.ListStyle.button });
    },
    (session, result) => {
        if (result.response) {
            switch (result.response.entity) {
                case ChangePasswordOption:
                    session.beginDialog('test');
                    break;
                case ResetPasswordOption:
                    session.beginDialog('resetPassword');
                    break;
                case ReservationOption:
                    session.beginDialog('reservation');
                    break;
                case LanguageOption:
                    session.beginDialog('language');
                    break;
                case AgeOption:
                    session.beginDialog('age');
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
bot.dialog('resetPassword', require('./dialogs/reset-password'));
//bot.library(require('./dialogs/change-password'));
bot.dialog('reservation', require('./dialogs/reservation'));
bot.dialog('language', require('./dialogs/language'));
bot.dialog('test', require('./dialogs/test'));
//bot.dialog('age', require('./dialogs/age'));
bot.library(require('./dialogs/age'));
//bot.library(require('./dialogs/winpass'));
//bot.library(require('./dialogs/pampass'));
bot.dialog('winpass', require('./dialogs/winpass'));
//bot.dialog('pampass', require('./dialogs/pampass'));


server.post('/api/messages', connector.listen());
