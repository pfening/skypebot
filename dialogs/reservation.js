var builder = require('botbuilder');
var dateFormat = require('dateformat');

const YesOption = 'Yes';
const NoOption = 'No';

module.exports = [
    function (session) {
        var name = session.message.user.name;
        session.send("Welcome to the meeting room reservation "+name);
        builder.Prompts.time(session, "Please provide a reservation date and time (e.g.: June 6th at 5pm)");
    },
    function (session, results) {
        var date=builder.EntityRecognizer.resolveTime([results.response]);        
        session.dialogData.reservationDate = dateFormat(date, "dddd, mmmm dS, yyyy, CET:h:MM TT Z");
        builder.Prompts.number(session, "How many people should suite to the meeting room?");
    },
    function (session, results) {
        session.dialogData.partySize = results.response;
            builder.Prompts.choice(session, 'Do you need video conferencing option?', [YesOption, NoOption],{ listStyle: builder.ListStyle.button });        
    },
    function (session, results) {
        session.dialogData.video = results.response.entity;

        if (session.dialogData.partySize <= 3 && session.dialogData.video =='No') {
            session.dialogData.MeetingRoom = "Small";
        } else if (session.dialogData.partySize > 3 && session.dialogData.partySize < 10 && session.dialogData.video =='No') {
            session.dialogData.MeetingRoom = "Medium";
        }if (session.dialogData.partySize <= 3 && session.dialogData.video =='Yes') {
            session.dialogData.MeetingRoom = "Small Skype";
        } else if (session.dialogData.partySize > 3 && session.dialogData.partySize < 10 && session.dialogData.video =='Yes') {
            session.dialogData.MeetingRoom = "Medium Skype";
        }else {
            session.dialogData.MeetingRoom = "Giant";
        }
        session.send(`Reservation confirmed. Reservation details: <br/>Date/Time: ${session.dialogData.reservationDate} 
        <br/>Size: ${session.dialogData.partySize} 
        <br/>Video conference option required: ${session.dialogData.video} 
        <br>Your meeting room will be: ${session.dialogData.MeetingRoom}`);
        session.send('Good bye!');
        session.endDialog();
    }
];