// import { LightningElement, track } from 'lwc';
// import sendCalendarInvite from '@salesforce/apex/Demo3.sendCalendarInvite';

// export default class CalendarInvite extends LightningElement {
//     @track emails = '';
//     @track success = false;
//     @track error;

//     handleEmailChange(event) {
//         this.emails = event.target.value;
//     }

//     async sendInvite() {
//         this.success = false;
//         this.error = null;

//         const emailList = this.emails.split(',').map(e => e.trim()).filter(Boolean);
//         if (emailList.length === 0) {
//             this.error = 'Please enter at least one email address.';
//             return;
//         }

//         const icsContent = this.generateICS(emailList);

//         try {
//             await sendCalendarInvite({
//                 emailAddresses: emailList,
//                 icsContent: icsContent
//             });
//             this.success = true;
//         } catch (err) {
//             this.error = err.body?.message || err.message;
//         }
//     }

//     generateICS(emailList) {
//     const uid = 'poojan@resonantcloud.info';
//     const dtStamp = this.formatDateToICS(new Date());
//     const dtStart = this.formatDateToICS(new Date('2025-07-01T15:00:00Z'));
//     const dtEnd = this.formatDateToICS(new Date('2025-07-01T16:00:00Z'));
//     const summary = 'Salesforce Webinar';
//     const location = 'https://meet.google.com/zyk-xoty-xsz';
//     const description = 'Join our webinar to learn more about Salesforce.\nGoogle Meet: ' + location;
//     const url = location;

//     const attendees = emailList
//         .map(email => `ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=TRUE;CN=${email}:mailto:${email}`)
//         .join('\n');

//     return `BEGIN:VCALENDAR
// VERSION:2.0
// METHOD:REQUEST
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
// ORGANIZER;CN=Salesforce Team:mailto:no-reply@yourdomain.com
// ${attendees}
// END:VEVENT
// END:VCALENDAR`;
// }

// //     generateICS(emailList) {
// //         const uid = 'poojan@resonantcloud.info';
// //         const dtStamp = this.formatDateToICS(new Date());
// //         const dtStart = this.formatDateToICS(new Date('2025-07-01T15:00:00Z'));
// //         const dtEnd = this.formatDateToICS(new Date('2025-07-01T16:00:00Z'));
// //         const summary = 'Salesforce Webinar';
// //         const location = 'https://meet.google.com/zyk-xoty-xsz';
// //         const description = 'Join our webinar to learn more about Salesforce.\nGoogle Meet: ' + location;
// //         const url = location;

// //         const attendees = emailList
// //             .map(email => `ATTENDEE;CN=${email};RSVP=TRUE:mailto:${email}`)
// //             .join('\n');

// //         return `BEGIN:VCALENDAR
// // VERSION:2.0
// // PRODID:-//Your Company//EN
// // BEGIN:VEVENT
// // UID:${uid}
// // DTSTAMP:${dtStamp}
// // DTSTART:${dtStart}
// // DTEND:${dtEnd}
// // SUMMARY:${summary}
// // DESCRIPTION:${description}
// // LOCATION:${location}
// // URL:${url}
// // ${attendees}
// // END:VEVENT
// // END:VCALENDAR`;
// //     }

//     formatDateToICS(date) {
//         return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
//     }

//     openGoogleCalendar() {
//         const title = 'Salesforce Webinar';
//         const start = '20250701T150000Z';
//         const end = '20250701T160000Z';
//         const details = 'Join us to learn more about Salesforce.\nGoogle Meet: https://meet.google.com/zyk-xoty-xsz';
//         const location = 'https://meet.google.com/zyk-xoty-xsz';

//         const url = `https://calendar.google.com/calendar/render?action=TEMPLATE
//             &text=${encodeURIComponent(title)}
//             &dates=${start}/${end}
//             &details=${encodeURIComponent(details)}
//             &location=${encodeURIComponent(location)}`.replace(/\n/g, '');

//         window.open(url, '_blank');
//     }
// }




// import { LightningElement, track } from 'lwc';
// import sendCalendarInvite from '@salesforce/apex/Demo3.sendCalendarInvite';

// export default class CalendarInvite extends LightningElement {
//     @track emails = '';
//     @track success = false;
//     @track error;

//     handleEmailChange(event) {
//         this.emails = event.target.value;
//     }

//     async sendInvite() {
//         this.success = false;
//         this.error = null;

//         const emailList = this.emails.split(',').map(e => e.trim()).filter(Boolean);
//         if (emailList.length === 0) {
//             this.error = 'Please enter at least one email address.';
//             return;
//         }

//         const icsContent = this.generateICS(emailList);

//         try {
//             await sendCalendarInvite({ emailAddresses: emailList, icsContent });
//             this.success = true;
//         } catch (err) {
//             this.error = err.body?.message || err.message;
//         }
//     }

//     generateICS(emailList) {
//         const uid = 'poojangabani12@gmail.com';
//         const dtStamp = this.formatDateToICS(new Date());
//         const dtStart = this.formatDateToICS(new Date('2025-07-01T15:00:00Z'));
//         const dtEnd = this.formatDateToICS(new Date('2025-07-01T16:00:00Z'));
//         const summary = 'Salesforce Webinar';
//         const location = 'https://meet.google.com/zyk-xoty-xsz';
//         const description = 'Join us for a live Salesforce webinar.\nGoogle Meet: ' + location;

//         const attendees = emailList.map(email =>
//             `ATTENDEE;CN="${email}";RSVP=TRUE;ROLE=REQ-PARTICIPANT:mailto:${email}`
//         ).join('\n');

//         return `BEGIN:VCALENDAR
// VERSION:2.0
// METHOD:REQUEST
// PRODID:-//YourCompany//EN
// BEGIN:VEVENT
// UID:${uid}
// DTSTAMP:${dtStamp}
// DTSTART:${dtStart}
// DTEND:${dtEnd}
// SUMMARY:${summary}
// DESCRIPTION:${description}
// LOCATION:${location}
// ORGANIZER;CN=Salesforce Team:mailto:poojan@resonantcloud.info
// ${attendees}
// SEQUENCE:0
// STATUS:CONFIRMED
// TRANSP:OPAQUE
// END:VEVENT
// END:VCALENDAR`.trim();
//     }

//     formatDateToICS(date) {
//         return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
//     }
// }


// import { LightningElement, track } from 'lwc';
// import sendInvite from '@salesforce/apex/Demo3.sendInvite';

// export default class CalendarInvite extends LightningElement {
//     @track emails = '';
//     @track success = false;
//     @track error = '';

//     handleEmailChange(event) {
//         this.emails = event.target.value;
//     }

//     async sendInvite() {
//         this.success = false;
//         this.error = '';

//         const emailList = this.emails.split(',').map(e => e.trim()).filter(Boolean);
//         if (!emailList.length) {
//             this.error = 'Please enter at least one email.';
//             return;
//         }

//         const icsContent = this.generateICS(emailList);
//         const googleLink = this.buildGoogleCalendarLink();

//         try {
//             await sendInvite({ emailAddresses: emailList, icsContent, googleLink });
//             this.success = true;
//         } catch (err) {
//             this.error = err?.body?.message || err.message;
//         }
//     }

//     generateICS(emails) {
//         const uid = 'invite-' + Date.now() + '@yourdomain.com';
//         const dtStamp = this.formatICSDate(new Date());
//         const dtStart = this.formatICSDate(new Date('2025-07-01T15:00:00Z'));
//         const dtEnd = this.formatICSDate(new Date('2025-07-01T16:00:00Z'));
//         const location = 'https://meet.google.com/zyk-xoty-xsz';
//         const description = 'Join our Salesforce Webinar\nGoogle Meet: ' + location;

//         const attendees = emails.map(email =>
//             `ATTENDEE;CN="${email}";RSVP=TRUE;ROLE=REQ-PARTICIPANT:mailto:${email}`
//         ).join('\n');

//         return `BEGIN:VCALENDAR
// VERSION:2.0
// METHOD:REQUEST
// PRODID:-//Salesforce App//EN
// BEGIN:VEVENT
// UID:${uid}
// DTSTAMP:${dtStamp}
// DTSTART:${dtStart}
// DTEND:${dtEnd}
// SUMMARY:Salesforce Webinar
// LOCATION:${location}
// DESCRIPTION:${description}
// ORGANIZER;CN=Salesforce Host:mailto:poojangabani12@gmail.com
// ${attendees}
// STATUS:CONFIRMED
// SEQUENCE:0
// TRANSP:OPAQUE
// END:VEVENT
// END:VCALENDAR`.trim();
//     }

//     formatICSDate(date) {
//         return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
//     }

//     buildGoogleCalendarLink() {
//         const start = '20250701T150000Z';
//         const end = '20250701T160000Z';
//         const text = encodeURIComponent('Salesforce Webinar');
//         const details = encodeURIComponent('Join our Salesforce Webinar via Google Meet: https://meet.google.com/zyk-xoty-xsz');
//         const location = encodeURIComponent('https://meet.google.com/zyk-xoty-xsz');

//         return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${start}/${end}&details=${details}&location=${location}`;
//     }
// }

import { LightningElement, track } from 'lwc';
import sendInvite from '@salesforce/apex/Demo3.sendInvite';

export default class CalendarInvite extends LightningElement {
  @track emails = '';
  @track success = false;
  @track error = '';

  handleEmailChange(event) {
    this.emails = event.target.value;
  }

  async sendInvite() {
    this.success = false;
    this.error = '';

    const emailList = this.emails.split(',').map(e => e.trim()).filter(Boolean);
    if (!emailList.length) {
      this.error = 'Please enter at least one email.';
      return;
    }

    const icsContent = this.generateICS(emailList);
    const googleLink = this.buildGoogleCalendarLink();

    try {
      await sendInvite({ emailAddresses: emailList, icsContent, googleLink });
      this.success = true;
    } catch (err) {
      this.error = err?.body?.message || err.message;
    }
  }

  generateICS(emails) {
    const uid = 'invite-' + Date.now() + '@yourdomain.com';
    const dtStamp = this.formatICSDate(new Date());
    const dtStart = this.formatICSDate(new Date('2025-07-01T15:00:00Z'));
    const dtEnd = this.formatICSDate(new Date('2025-07-01T16:00:00Z'));
    const location = 'https://meet.google.com/zyk-xoty-xsz';
    const description = 'Join our Salesforce Webinar\nGoogle Meet: ' + location;

    const attendees = emails.map(email =>
      `ATTENDEE;CN="${email}";RSVP=TRUE;ROLE=REQ-PARTICIPANT:mailto:${email}`
    ).join('\n');

    return `BEGIN:VCALENDAR
VERSION:2.0
METHOD:REQUEST
PRODID:-//Salesforce App//EN
BEGIN:VEVENT
UID:${uid}
DTSTAMP:${dtStamp}
DTSTART:${dtStart}
DTEND:${dtEnd}
SUMMARY:Salesforce Webinar
LOCATION:${location}
DESCRIPTION:${description}
ORGANIZER;CN=Salesforce Host:mailto:poojangabani12@gmail.com
${attendees}
STATUS:CONFIRMED
SEQUENCE:0
TRANSP:OPAQUE
END:VEVENT
END:VCALENDAR`.trim();
  }

  formatICSDate(date) {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  }

  buildGoogleCalendarLink() {
    const start = '20250701T150000Z';
    const end = '20250701T160000Z';
    const text = encodeURIComponent('Salesforce Webinar');
    const details = encodeURIComponent('Join our Salesforce Webinar via Google Meet: https://meet.google.com/zyk-xoty-xsz');
    const location = encodeURIComponent('https://meet.google.com/zyk-xoty-xsz');

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${start}/${end}&details=${details}&location=${location}`;
  }
}