declare module "@salesforce/apex/QuickFormHome.getFormRecords" {
  export default function getFormRecords(): Promise<any>;
}
declare module "@salesforce/apex/QuickFormHome.searchForms" {
  export default function searchForms(param: {searchkey: any}): Promise<any>;
}
declare module "@salesforce/apex/QuickFormHome.getFormsByStatus" {
  export default function getFormsByStatus(param: {id: any, searchkey: any}): Promise<any>;
}
declare module "@salesforce/apex/QuickFormHome.deleteFormRecord" {
  export default function deleteFormRecord(param: {id: any, searchkey: any}): Promise<any>;
}
declare module "@salesforce/apex/QuickFormHome.renameFormRecord" {
  export default function renameFormRecord(param: {id: any, rename: any, searchkey: any}): Promise<any>;
}
declare module "@salesforce/apex/QuickFormHome.sendemail" {
  export default function sendemail(param: {name: any, email: any, subject: any, body: any, fname: any, fbase64: any}): Promise<any>;
}
declare module "@salesforce/apex/QuickFormHome.getProgressindicator" {
  export default function getProgressindicator(): Promise<any>;
}
declare module "@salesforce/apex/QuickFormHome.getCaptchatype" {
  export default function getCaptchatype(): Promise<any>;
}
declare module "@salesforce/apex/QuickFormHome.f_Get_Types" {
  export default function f_Get_Types(): Promise<any>;
}
declare module "@salesforce/apex/QuickFormHome.Get_Captcha_Types" {
  export default function Get_Captcha_Types(): Promise<any>;
}
declare module "@salesforce/apex/QuickFormHome.siteUrl" {
  export default function siteUrl(param: {Formid: any}): Promise<any>;
}
