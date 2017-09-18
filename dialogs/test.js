var builder = require('botbuilder');
var passwd = require('./../password');

const WinOption = 'Windows Password';
const PamOption = 'PAM Password';

module.exports = [
    (session) => {
        builder.Prompts.choice(session,            
            'Which application\'s password would like to reset?', [WinOption, PamOption], { listStyle: builder.ListStyle.button });
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
];
