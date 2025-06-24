declare module "@salesforce/apex/communityUserLoginRegistration.createContact" {
  export default function createContact(param: {Role: any, Standard: any, Subject: any, Experience: any, teacherName: any, studentSchool: any, Name: any, Email: any, password: any}): Promise<any>;
}
declare module "@salesforce/apex/communityUserLoginRegistration.updateContact" {
  export default function updateContact(param: {Name: any, Email: any, oldName: any, oldEmail: any}): Promise<any>;
}
declare module "@salesforce/apex/communityUserLoginRegistration.updateUser" {
  export default function updateUser(param: {Name: any, Email: any, oldName: any, oldEmail: any}): Promise<any>;
}
declare module "@salesforce/apex/communityUserLoginRegistration.authenticateUser" {
  export default function authenticateUser(param: {userName: any, password: any}): Promise<any>;
}
declare module "@salesforce/apex/communityUserLoginRegistration.forgotPasswordUser" {
  export default function forgotPasswordUser(param: {userName: any}): Promise<any>;
}
declare module "@salesforce/apex/communityUserLoginRegistration.resetPassword" {
  export default function resetPassword(param: {currentPassword: any, newPassword: any, verifyNewPassword: any}): Promise<any>;
}
declare module "@salesforce/apex/communityUserLoginRegistration.getTeacherNames" {
  export default function getTeacherNames(): Promise<any>;
}
declare module "@salesforce/apex/communityUserLoginRegistration.fetchCont" {
  export default function fetchCont(param: {teacherName: any}): Promise<any>;
}
declare module "@salesforce/apex/communityUserLoginRegistration.fetchCon" {
  export default function fetchCon(param: {Name: any}): Promise<any>;
}
declare module "@salesforce/apex/communityUserLoginRegistration.fetchTeach" {
  export default function fetchTeach(param: {teacherName: any}): Promise<any>;
}
declare module "@salesforce/apex/communityUserLoginRegistration.feedbackRec" {
  export default function feedbackRec(param: {Rating: any, Comments: any, StdntName: any, StdntId: any, TcherName: any}): Promise<any>;
}
declare module "@salesforce/apex/communityUserLoginRegistration.fetchStudent" {
  export default function fetchStudent(): Promise<any>;
}
