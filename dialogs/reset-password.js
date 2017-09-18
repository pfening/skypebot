var builder = require('botbuilder');
var passwd = require('./../password');

module.exports = [
    function (session) {
        var newPassword = passwd.customPassword();
        session.send('Your new password is _' + newPassword + '_');
        session.send('Good bye!');
        session.endDialogWithResult({ resumed: builder.ResumeReason.completed });
    }
];