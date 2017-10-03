var builder = require('botbuilder');

module.exports = [
    function (session) {
        builder.Prompts.text(session, 'What is your log in ID for WINDOWS?');
     },     
    function (session,results,next) {
        session.userData.usrid = results.response;
        session.send('You entered: %s', results.response);
        next();
    },

    function(session){
        builder.Prompts.text(session, 'Please type your old password');
    },
    function (session,results,next) {
        session.userData.opwd = results.response;
        session.send('You entered: %s', results.response);
        next();
    },

    function (session) {
        builder.Prompts.text(session, 'Please enter your destination');
    },
    function (session, results, next) {
        session.userData.destination = results.response;
        session.send('You entered: %s', results.response);
        next();
    },

    function (session) {
        if(session.userData.opwd=='123456'){ 
        //session.beginDialog('IsPwdMatch');
        session.send("Your new password is bullshit!");
        }else{
            builder.Prompts.text(session, "Your old password did not matched");
        }
        session.send(session.userData.usrid +" / "+session.userData.opwd);
        session.endDialog();
    },
    function (session, results) {
        session.endDialogWithResult({ resumed: builder.ResumeReason.completed });
    }
];