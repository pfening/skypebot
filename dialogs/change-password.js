var builder = require('botbuilder');
var passwd = require('./../password');

const library = new builder.Library('changePassword');

const WinOption = 'Windows Password';
const PamOption = 'PAM Password';


library.dialog('/', [
    (session) => {
        builder.Prompts.choice(session,            
            'Which application\'s password would like to reset?',
            [WinOption, PamOption],
            { listStyle: builder.ListStyle.button });
    },
    (session, result) => {
        if (result.response) {
            switch (result.response.entity) {
                case WinOption:
                    session.beginDialog('winpass');
                    break;
                case PamOption:
                    session.beginDialog('pampass');
                    break;
            }
            session.endDialog();
        } else {
            session.send(`I am sorry but I didn't understand that. I need you to select one of the options below`);
        }
    }
]).cancelAction('cancel', null, { matches: /^cancel/i });

library.dialog('winpass', [
    function (session) {
        builder.Prompts.text(session, "Your new WINDOWS password is: " + passwd.customPassword());
    },
    function (session, results) {
        session.endDialogWithResult({ resumed: builder.ResumeReason.completed });
    }
]);

library.dialog('pampass', [
    function (session) {
        builder.Prompts.text(session, "Your new PAM password is: " + passwd.customPassword());
    },
    function (session, results) {
        session.endDialogWithResult({ resumed: builder.ResumeReason.completed });
    }
]);

module.exports = library;