var builder = require('botbuilder');

const library = new builder.Library('pampass');

library.dialog('/', [
    (session) => {
        builder.Prompts.text(session, 'What is your log in ID for PAM?');
    },
    function (session, results) {
        session.userData.usrid = results.response;
        console.log(session.userData.usrid);
        builder.Prompts.text(session, 'What is your old password for '+results.response+' ID?');
    },
    function (session, results) {
        session.userData.opwd = results.response;
        console.log(session.userData.opwd);
        //if(session.userData.opwd=='123456'){ 
        //session.beginDialog('IsPwdMatch');
        //}else{
        //    builder.Prompts.text(session, "Your old password did not matched");
        //}
        session.send(session.userData.uid +" / "+session.userData.opwd);
        session.endDialog();
    },
    function (session, results) {
        session.endDialogWithResult({ resumed: builder.ResumeReason.completed });
    }
]).cancelAction('cancel', null, { matches: /^cancel/i });

module.exports = library;