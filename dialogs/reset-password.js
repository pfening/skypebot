var builder = require('botbuilder');
var passwd = require('./../password');

const library = new builder.Library('resetPassword');

library.dialog('/', [
    (session) => {
        var newPassword = passwd.customPassword();
        session.send('Your new password is _' + newPassword + '_');
        session.send('Good bye!');
        session.endDialogWithResult({ resumed: builder.ResumeReason.completed });
    }
]).cancelAction('cancel', null, { matches: /^cancel/i });

module.exports = library;