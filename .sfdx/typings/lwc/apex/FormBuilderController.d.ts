declare module "@salesforce/apex/FormBuilderController.GetFieldsMetaData" {
  export default function GetFieldsMetaData(): Promise<any>;
}
declare module "@salesforce/apex/FormBuilderController.GetStyles" {
  export default function GetStyles(): Promise<any>;
}
declare module "@salesforce/apex/FormBuilderController.getFields" {
  export default function getFields(param: {id: any}): Promise<any>;
}
declare module "@salesforce/apex/FormBuilderController.UploadFormImage" {
  export default function UploadFormImage(param: {id: any, body: any, FName: any, Type: any}): Promise<any>;
}
declare module "@salesforce/apex/FormBuilderController.UploadPageImage" {
  export default function UploadPageImage(param: {id: any, body: any, FName: any, Type: any}): Promise<any>;
}
declare module "@salesforce/apex/FormBuilderController.RemoveFormImage" {
  export default function RemoveFormImage(param: {id: any}): Promise<any>;
}
declare module "@salesforce/apex/FormBuilderController.RemovePageImage" {
  export default function RemovePageImage(param: {id: any}): Promise<any>;
}
declare module "@salesforce/apex/FormBuilderController.StoreBtnStyles" {
  export default function StoreBtnStyles(param: {Value: any, id: any}): Promise<any>;
}
declare module "@salesforce/apex/FormBuilderController.StoreBtnposition" {
  export default function StoreBtnposition(param: {Value: any, id: any}): Promise<any>;
}
declare module "@salesforce/apex/FormBuilderController.StoreLabelStyles" {
  export default function StoreLabelStyles(param: {Value: any, id: any}): Promise<any>;
}
declare module "@salesforce/apex/FormBuilderController.StoreFormStyles" {
  export default function StoreFormStyles(param: {Value: any, id: any}): Promise<any>;
}
declare module "@salesforce/apex/FormBuilderController.StorePageStyles" {
  export default function StorePageStyles(param: {Value: any, id: any}): Promise<any>;
}
declare module "@salesforce/apex/FormBuilderController.StoreStyles" {
  export default function StoreStyles(param: {Value: any, id: any}): Promise<any>;
}
declare module "@salesforce/apex/FormBuilderController.getBGImages" {
  export default function getBGImages(param: {id: any}): Promise<any>;
}
declare module "@salesforce/apex/FormBuilderController.StoreHoverStyles" {
  export default function StoreHoverStyles(param: {Value: any, id: any}): Promise<any>;
}
declare module "@salesforce/apex/FormBuilderController.StoreFocusStyles" {
  export default function StoreFocusStyles(param: {Value: any, id: any}): Promise<any>;
}
declare module "@salesforce/apex/FormBuilderController.formdetails" {
  export default function formdetails(param: {id: any}): Promise<any>;
}
declare module "@salesforce/apex/FormBuilderController.getcaptcha" {
  export default function getcaptcha(param: {id: any}): Promise<any>;
}
declare module "@salesforce/apex/FormBuilderController.GetFormPage" {
  export default function GetFormPage(param: {Form_Id: any}): Promise<any>;
}
declare module "@salesforce/apex/FormBuilderController.getScaleRating" {
  export default function getScaleRating(): Promise<any>;
}
declare module "@salesforce/apex/FormBuilderController.CreateFieldRecord" {
  export default function CreateFieldRecord(param: {Form_Id: any, Name: any, Form_Page_Id: any, Position: any, isold: any, Field_Page_Id: any, obj: any}): Promise<any>;
}
declare module "@salesforce/apex/FormBuilderController.addPageBreak" {
  export default function addPageBreak(param: {FormId: any, Name: any, Form_Page_Id: any, Position: any, dropFieldId: any}): Promise<any>;
}
declare module "@salesforce/apex/FormBuilderController.ObjName" {
  export default function ObjName(param: {id: any}): Promise<any>;
}
declare module "@salesforce/apex/FormBuilderController.getFieldsRecords" {
  export default function getFieldsRecords(param: {id: any}): Promise<any>;
}
declare module "@salesforce/apex/FormBuilderController.reOrderField" {
  export default function reOrderField(param: {dropFieldId: any, currentFieldId: any, dropPageId: any}): Promise<any>;
}
declare module "@salesforce/apex/FormBuilderController.createPage" {
  export default function createPage(param: {totalPages: any, formId: any, pagename: any, pageNumber: any}): Promise<any>;
}
declare module "@salesforce/apex/FormBuilderController.updatePage" {
  export default function updatePage(param: {formId: any, pageId: any, pageTitle: any, pageNumber: any}): Promise<any>;
}
declare module "@salesforce/apex/FormBuilderController.renameform" {
  export default function renameform(param: {id: any, rename: any, FormId: any}): Promise<any>;
}
declare module "@salesforce/apex/FormBuilderController.renameMainform" {
  export default function renameMainform(param: {rename: any, FormId: any}): Promise<any>;
}
declare module "@salesforce/apex/FormBuilderController.deletePage" {
  export default function deletePage(param: {FormId: any, PageId: any}): Promise<any>;
}
declare module "@salesforce/apex/FormBuilderController.pageDetails" {
  export default function pageDetails(param: {FormId: any, PageId: any}): Promise<any>;
}
declare module "@salesforce/apex/FormBuilderController.editFormSubmit" {
  export default function editFormSubmit(param: {id: any, name: any, progressIn: any, captcha: any}): Promise<any>;
}
declare module "@salesforce/apex/FormBuilderController.getreferencevalue" {
  export default function getreferencevalue(param: {id: any, searchkey: any}): Promise<any>;
}
declare module "@salesforce/apex/FormBuilderController.getpicklistvalue" {
  export default function getpicklistvalue(param: {id: any}): Promise<any>;
}
declare module "@salesforce/apex/FormBuilderController.signatureSave" {
  export default function signatureSave(param: {fieldId: any, fieldData: any}): Promise<any>;
}
declare module "@salesforce/apex/FormBuilderController.SaveFile" {
  export default function SaveFile(param: {fieldId: any, fileName: any, base64Data: any, contentType: any}): Promise<any>;
}
declare module "@salesforce/apex/FormBuilderController.getFieldsRecords_page" {
  export default function getFieldsRecords_page(param: {id: any}): Promise<any>;
}
declare module "@salesforce/apex/FormBuilderController.GetFormObject" {
  export default function GetFormObject(param: {id: any}): Promise<any>;
}
declare module "@salesforce/apex/FormBuilderController.createrecord" {
  export default function createrecord(param: {acc: any, first_obj_list: any, sig_upload_jsone: any, sig_upload_fid_list: any, file_upload_jsone: any, file_upload_fid_list: any}): Promise<any>;
}
declare module "@salesforce/apex/FormBuilderController.createrecord_for_secod_object" {
  export default function createrecord_for_secod_object(param: {acc: any, first_obj_list: any, list_second_obj: any, sig_upload_jsone: any, sig_upload_fid_list: any, file_upload_jsone: any, file_upload_fid_list: any, create_chi: any, lookup_list: any}): Promise<any>;
}
declare module "@salesforce/apex/FormBuilderController.createrecord_for_third_object" {
  export default function createrecord_for_third_object(param: {acc: any, first_obj_list: any, list_second_obj: any, list_third_obj: any, sig_upload_jsone: any, sig_upload_fid_list: any, file_upload_jsone: any, file_upload_fid_list: any, create_chi: any, lookup_list: any, create_chi_2: any, lookup_list2: any}): Promise<any>;
}
declare module "@salesforce/apex/FormBuilderController.GetFormValidation" {
  export default function GetFormValidation(param: {form_id: any}): Promise<any>;
}
declare module "@salesforce/apex/FormBuilderController.update_ext_list" {
  export default function update_ext_list(param: {acc2: any, submit_id: any}): Promise<any>;
}
declare module "@salesforce/apex/FormBuilderController.findlookupfildes" {
  export default function findlookupfildes(param: {minobj: any, fsubobj: any}): Promise<any>;
}
