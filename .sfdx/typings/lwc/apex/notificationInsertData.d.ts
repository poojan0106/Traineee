declare module "@salesforce/apex/notificationInsertData.create" {
  export default function create(param: {acc: any}): Promise<any>;
}
declare module "@salesforce/apex/notificationInsertData.updated" {
  export default function updated(param: {updatelist: any}): Promise<any>;
}
declare module "@salesforce/apex/notificationInsertData.getContactList" {
  export default function getContactList(param: {form_id: any}): Promise<any>;
}
declare module "@salesforce/apex/notificationInsertData.getNotificationByStatus" {
  export default function getNotificationByStatus(param: {form_id: any, Status: any}): Promise<any>;
}
