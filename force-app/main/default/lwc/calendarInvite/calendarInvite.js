import { LightningElement, track } from 'lwc';
import sendCalendarInvite from '@salesforce/apex/Demo3.sendCalendarInvite';

export default class CalendarInvite extends LightningElement {
    @track emails = '';
    @track success = false;
    @track error;

    handleEmailChange(event) {
        this.emails = event.target.value;
    }

    async sendInvite() {
        this.success = false;
        this.error = null;

        const emailList = this.emails.split(',').map(e => e.trim()).filter(Boolean);
        if (emailList.length === 0) {
            this.error = 'Please enter at least one email address.';
            return;
        }

        const icsContent = this.generateICS(emailList);

        try {
            await sendCalendarInvite({
                emailAddresses: emailList,
                icsContent: icsContent
            });
            this.success = true;
        } catch (err) {
            this.error = err.body?.message || err.message;
        }
    }

    generateICS(emailList) {
    const uid = 'poojan@resonantcloud.info';
    const dtStamp = this.formatDateToICS(new Date());
    const dtStart = this.formatDateToICS(new Date('2025-07-01T15:00:00Z'));
    const dtEnd = this.formatDateToICS(new Date('2025-07-01T16:00:00Z'));
    const summary = 'Salesforce Webinar';
    const location = 'https://meet.google.com/zyk-xoty-xsz';
    const description = 'Join our webinar to learn more about Salesforce.\nGoogle Meet: ' + location;
    const url = location;

    const attendees = emailList
        .map(email => `ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=TRUE;CN=${email}:mailto:${email}`)
        .join('\n');

    return `BEGIN:VCALENDAR
VERSION:2.0
METHOD:REQUEST
PRODID:-//Your Company//EN
BEGIN:VEVENT
UID:${uid}
DTSTAMP:${dtStamp}
DTSTART:${dtStart}
DTEND:${dtEnd}
SUMMARY:${summary}
DESCRIPTION:${description}
LOCATION:${location}
URL:${url}
ORGANIZER;CN=Salesforce Team:mailto:no-reply@yourdomain.com
${attendees}
END:VEVENT
END:VCALENDAR`;
}

//     generateICS(emailList) {
//         const uid = 'poojan@resonantcloud.info';
//         const dtStamp = this.formatDateToICS(new Date());
//         const dtStart = this.formatDateToICS(new Date('2025-07-01T15:00:00Z'));
//         const dtEnd = this.formatDateToICS(new Date('2025-07-01T16:00:00Z'));
//         const summary = 'Salesforce Webinar';
//         const location = 'https://meet.google.com/zyk-xoty-xsz';
//         const description = 'Join our webinar to learn more about Salesforce.\nGoogle Meet: ' + location;
//         const url = location;

//         const attendees = emailList
//             .map(email => `ATTENDEE;CN=${email};RSVP=TRUE:mailto:${email}`)
//             .join('\n');

//         return `BEGIN:VCALENDAR
// VERSION:2.0
// PRODID:-//Your Company//EN
// BEGIN:VEVENT
// UID:${uid}
// DTSTAMP:${dtStamp}
// DTSTART:${dtStart}
// DTEND:${dtEnd}
// SUMMARY:${summary}
// DESCRIPTION:${description}
// LOCATION:${location}
// URL:${url}
// ${attendees}
// END:VEVENT
// END:VCALENDAR`;
//     }

    formatDateToICS(date) {
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    }

    openGoogleCalendar() {
        const title = 'Salesforce Webinar';
        const start = '20250701T150000Z';
        const end = '20250701T160000Z';
        const details = 'Join us to learn more about Salesforce.\nGoogle Meet: https://meet.google.com/zyk-xoty-xsz';
        const location = 'https://meet.google.com/zyk-xoty-xsz';

        const url = `https://calendar.google.com/calendar/render?action=TEMPLATE
            &text=${encodeURIComponent(title)}
            &dates=${start}/${end}
            &details=${encodeURIComponent(details)}
            &location=${encodeURIComponent(location)}`.replace(/\n/g, '');

        window.open(url, '_blank');
    }
}