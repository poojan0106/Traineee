declare module "@salesforce/apex/fieldvalidation.getfieldvalidation" {
  export default function getfieldvalidation(param: {fieldId: any}): Promise<any>;
}
declare module "@salesforce/apex/fieldvalidation.deletefield" {
  export default function deletefield(param: {fieldId: any}): Promise<any>;
}
declare module "@salesforce/apex/fieldvalidation.savevalidation" {
  export default function savevalidation(param: {fieldId: any, fieldValidation: any, Label: any}): Promise<any>;
}
declare module "@salesforce/apex/fieldvalidation.copyfield" {
  export default function copyfield(param: {fieldId: any}): Promise<any>;
}
