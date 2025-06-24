import {
    LightningElement,
    track,
    api
} from 'lwc';

// import GetFormPage from '@salesforce/apex/FormBuilderController.GetFormPage'; // Form Page 
// import getFieldsRecords from '@salesforce/apex/FormBuilderController.getFieldsRecords'; // Form Field
// import getFormCSS from '@salesforce/apex/FormBuilderController.getFormCSS'; // Form
// import getPageCSS from '@salesforce/apex/FormBuilderController.getPageCSS';// Form
// import getButtonCSS from '@salesforce/apex/FormBuilderController.getButtonCSS'; // Form
// import getprogressbar from '@salesforce/apex/FormBuilderController.getprogressbar'; // Form
// import getcaptcha from '@salesforce/apex/FormBuilderController.getcaptcha'; // Form
import formdetails from '@salesforce/apex/previewFormcmp.formdetails';
import formfielddetails from '@salesforce/apex/previewFormcmp.formfielddetails';
import formpagedetails from '@salesforce/apex/previewFormcmp.formpagedetails';
// import getInactiveForms from '@salesforce/apex/previewFormcmp.getInactiveForms';
import processDecryption from '@salesforce/apex/EncryptDecryptController.processDecryption';
import bgimages from '@salesforce/apex/previewFormcmp.bgimages';
import getthankyoupage from '@salesforce/apex/qfthankyou.getthankyoupage';
import sendemailaftersubmission from '@salesforce/apex/previewFormcmp.sendemailaftersubmission';
import BackButton from '@salesforce/resourceUrl/BackButton';

import {
    NavigationMixin
} from "lightning/navigation";

// add by yash
import getFieldsRecords_page from '@salesforce/apex/FormBuilderController.getFieldsRecords_page';
import GetFormObject from '@salesforce/apex/FormBuilderController.GetFormObject';
import createrecord from '@salesforce/apex/FormBuilderController.createrecord';
import createrecord_for_secod_object from '@salesforce/apex/FormBuilderController.createrecord_for_secod_object';
import createrecord_for_third_object from '@salesforce/apex/FormBuilderController.createrecord_for_third_object';
import GetFormValidation from '@salesforce/apex/FormBuilderController.GetFormValidation';
import findlookupfildes from '@salesforce/apex/FormBuilderController.findlookupfildes';
import update_ext_list from '@salesforce/apex/FormBuilderController.update_ext_list';

import {
    loadStyle
} from 'lightning/platformResourceLoader';
import prevpreviewcss from '@salesforce/resourceUrl/prevpreviewcss';

export default class PreviewFormCmp extends NavigationMixin(LightningElement) {

    BackButton = BackButton;

    @api formid;
    @track getFieldCSS;
    @track page = [];
    @track PageList = [];
    @track Mainlist = [];
    @track pageindex = 1;
    @track spinnerDataTable = false;
    @track isIndexZero = true;
    @track isIndexLast = false;
    @track isPageNotFoud = false;
    @track isPreviewForm = true;
    @track Progressbarvalue;
    @track captchavalue;
    @track verify;
    @track buttonscss;
    @track PageCSS;
    @api activepreviews = false;

    @track hovercss;
    @track focuscss;
    @track fcss;
    @track pagecss;
    @track formcss;
    @track btncss;
    @track lcss;
    @track isPreviewView;
    @track filesignread;

    // add by yash
    @track PageFieldList = [];
    @track PageFieldListName = [];
    fieldvalues = [];
    @track listofkey = [];
    @track listofvalue = [];
    // @track list_third_obj;
    @track first_object;
    @track second_object;
    @track third_object;
    @track ext_object;
    @track first_object_4_pdf = {};
    @track second_object_4_pdf = {};
    @track third_object_4_pdf = {};
    @track ext_object_4_pdf = {};
    @track form_object = [];
    @track form_mapped_Objects = [];
    @track obj;
    @track s_ob;
    @track list_first_obj = {
        'sobjectType': 'filde_vlue'
    };
    @track list_second_obj = {
        'sobjectType': 'filde_vlue'
    };
    @track list_third_obj = {
        'sobjectType': 'filde_vlue'
    };
    @track list_ext_obj = {
        'sobjectType': 'Extra'
    };
    @track all_filde_value = {
        'sobjectType': 'filde_vlue'
    };
    @track all_filde_value_second = {
        'sobjectType': 'filde_vlue'
    };
    @track all_filde_value_third = {
        'sobjectType': 'filde_vlue'
    };
    @track all_filde_value_ext = {
        'sobjectType': 'Extra'
    };
    @track list_validetion = {};
    @track checkbool = true;
    @track current_bt;
    @track datawithleabel;
    @track form_validation;
    @track custom_validation;
    @track error_validation_json = {};
    @track first_list = [];
    @track second_list = [];
    @track third_list = [];
    @track ex_list = [];
    @track sin_data_id;
    @track sig_con_id;
    @track sig_filde_id;
    @track sub_id;
    formname = '';
    @api nosubmission = false;
    @track add_input_val;
    @track show_captchavalue = true;
    @track file_upload = {};
    // FormBuilderController.createrecord(file_upload);
    @track file_upload_fildeid = [];
    @track file_upload_id;
    @track file_upload_url;
    // @track file_u_map = new Map();
    @track file_u_map = {};
    @track sig_u_map = {};
    @track sig_upload = {};
    @track sig_fildeid = [];
    @track lookup_2obj = [];
    @track lookup_3obj = [];
    @track lookup_filde_json = {};
    @track create_chi = true;
    @track create_chi_2 = true;


    // error_josn_key_list = new Set();
    @track error_josn_key_list = [];
    // @track chack_bt = 0;

    //error_popup
    @api error_popup = false;
    @track message;
    @api pageURL;

    connectedCallback() {
        this.spinnerDataTable = true;
        loadStyle(this, prevpreviewcss);
        if(this.pageURL == null || this.pageURL == undefined) {
            this.pageURL = window.location.href;
        }

        if (this.pageURL != undefined && this.pageURL != null && this.pageURL.includes("?access_key=")) {
            var accessKey = this.pageURL.split("?access_key=")[1];
            console.log('accessKey ---> ', accessKey);
            processDecryption({
                    encryptedData: accessKey
                })
                .then(result => {
                    console.log('result ---> ', result);
                    this.formid = result;
                    this.FormData(this.pageURL);
                }).catch(error => {
                    this.message = 'Something Went Wrong In preview Page';
                    this.showerror();
                });
        } else {
            this.FormData('');
        }

        // add by yash
        // GetFormObject({
        //         id: this.formid
        //     })
        //     .then(result => {
        //         this.form_object = result;
        //         console.log('result: ' + JSON.stringify(result));
        //         console.log('result: ' + JSON.stringify(this.form_object));
        //         this.testtocall();
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });


        GetFormValidation({
                form_id: this.formid
            })
            .then(result => {
                this.form_validation = result;
                console.log('fild val lenghy:-', this.form_validation);
                //  for(let i=0; i<this.form_validation.length; i++){
                //     console.log(' this list of fild validation :- ',JSON.stringify(this.form_validation[i].Field_Mapping__c));
                //  }
                //  console.log(' this list of fild validation :- ',JSON.stringify(this.form_validation.Field_Validations__c));
            })
            .catch(error => {
                console.log(error);
                this.message = 'Something Went Wrong In preview Page';
                this.showerror();
            });
    }

    renderedCallback() {
        console.log('In the Preview renderCallback ==>');
        // this.spinnerDataTable = true;
        if (this.Mainlist.length > 0) {
            let value;
            let arr = this.template.querySelectorAll('.btn1');
            for (let i = 0; i < arr.length; i++) {
                const element = arr[i];
                element.style = this.buttonscss;
            }
            let buttoncss = this.buttonscss.split(';');
            for (let i = 0; i < buttoncss.length; i++) {
                buttoncss[i] = buttoncss[i].split(':');
                let label = buttoncss[i][0];

                if (label == 'justify-content') {
                    value = 'justify-content:' + buttoncss[i][1];
                }
            }
            let Arr = this.template.querySelectorAll(".footer");
            for (let i = 0; i < Arr.length; i++) {
                const element = Arr[i];
                element.style = value;
            }
        }
        // this.spinnerDataTable = false;
    }

    FormData(pageURL) {
        try {
            formdetails({
                    id: this.formid,
                    webUrl: pageURL
                })
                .then(result => {
                    console.log('OUTPUT : Status -- ', result.Status__c);
                    if (result.Status__c == true) {
                        this.isPreviewForm = true;
                        this.isPreviewView = true;
                        this.filesignread = false;
                        this.Progressbarvalue = result.Progress_Indicator__c;
                        this.captchavalue = result.Captcha_Type__c;
                        this.getFieldCSS = result.Form_Styling__c;
                        this.buttonscss = result.Button_CSS__c;
                        this.buttonscss = this.buttonscss.concat(result.Button_Position__c);
                        this.PageCSS = result.Page_CSS__c;
                        this.hovercss = result.All_Field_Hover__c;
                        this.focuscss = result.All_Field_Focus__c
                        this.fcss = result.All_Field_Styling__c;
                        this.lcss = result.Label_CSS__c;
                        let array;
                        let value;
                        let pagebg = result.PageBgID__c;
                        let formbg = result.FormBgID__c;
                        this.formname = result.Name;
                        this.form_object = result.Mapped_Objects__c;
                        console.log('test yash this.form_object :- ', this.form_object);
                        this.testtocall();

                        console.log('OUTPUT : PageCSS --> ', this.PageCSS);
                        if (this.captchavalue == 'None' || this.captchavalue == '--None--' || this.captchavalue == undefined) {
                            this.show_captchavalue = false;

                        } else {
                            this.show_captchavalue = true;
                        }
                        //  close add by yash
                        if (formbg != null && formbg != undefined) {
                            bgimages({
                                    id: formbg,
                                    data: this.getFieldCSS
                                })
                                .then(result => {
                                    if (result != undefined && result != null) {
                                        array = this.template.querySelector('.myform');
                                        array.style = result;
                                        this.getFieldCSS = result;
                                    }
                                }).catch(error => {
                                    this.message = 'Something Went Wrong In preview Page';
                                    this.showerror();
                                })
                        }

                        if (pagebg != null && pagebg != undefined) {
                            bgimages({
                                    id: pagebg,
                                    data: this.PageCSS
                                })
                                .then(result => {
                                    if (result != undefined && result != null) {
                                        array = this.template.querySelectorAll('.page');
                                        for (let i = 0; i < array.length; i++) {
                                            const element = array[i];
                                            element.style = result;
                                        }
                                        this.PageCSS = result;
                                    }
                                }).catch(error => {
                                    console.log({
                                        error
                                    });
                                    this.spinnerDataTable = false;
                                    this.message = 'Something Went Wrong In Preview Form Page';
                                    this.showerror(this.message);
                                })
                        }

                        // FormCss
                        if (this.getFieldCSS != undefined) {
                            console.log('OUTPUT : first If');
                            array = this.template.querySelector('.myform');
                            console.log('OUTPUT : array -> ', array);
                            console.log('OUTPUT formcss ->: ', this.getFieldCSS);
                            array.style = this.getFieldCSS;
                            console.log('OUTPUT : first If complete');
                        }

                        // PageCss
                        if (this.PageCSS != undefined) {
                            console.log('OUTPUT : second If');
                            array = this.template.querySelectorAll('.page');
                            for (let i = 0; i < array.length; i++) {
                                const element = array[i];
                                element.style = this.PageCSS;
                            }
                            console.log('OUTPUT : second If complete');
                        }

                        //ButtonCss
                        if (this.buttonscss != undefined) {
                            array = this.template.querySelectorAll('.btn1');
                            for (let i = 0; i < array.length; i++) {
                                const element = array[i];
                                element.style = this.buttonscss;
                            }
                            let buttoncss = this.buttonscss.split(';');
                            for (let i = 0; i < buttoncss.length; i++) {
                                buttoncss[i] = buttoncss[i].split(':');
                                let label = buttoncss[i][0];

                                if (label == 'justify-content') {
                                    value = 'justify-content:' + buttoncss[i][1];
                                }
                            }

                            //ButtonPosition
                            array = this.template.querySelectorAll(".footer");
                            for (let i = 0; i < array.length; i++) {
                                const element = array[i];
                                element.style = value;
                            }
                        }
                        if (this.activepreviews == false) {
                            var element = this.template.querySelector('.scroll');
                            element.style = 'overflow-y:scroll; height: 79vh';
                            element = this.template.querySelector('.fieldDiv1');
                            element.style = 'overflow-y: scroll';

                        } else {
                            var element = this.template.querySelector('.scroll');
                            element.style = 'height: 72vh';
                            // element = this.template.querySelector('.fieldDiv1');
                            // element.style = 'overflow-y: scroll';
                        }

                        if (this.activepreviews == true) {
                            var element = this.template.querySelector('.myform');
                            element.style = this.getFieldCSS + ' margin: -3%;'
                        }
                        this.PageData();
                    } else {
                        this.isPreviewView = false;
                        this.isPageNotFoud = true;
                        this.spinnerDataTable = false;
                    }
                }).catch(error => {
                    console.log(error + 'preview Error');
                    this.spinnerDataTable = false;
                    this.message = 'Something Went Wrong In preview Page';
                    this.showerror();
                });
        } catch (error) {
            console.log(error + 'preview Error');
            this.spinnerDataTable = false;
            this.message = 'Something Went Wrong In preview Page';
            this.showerror();
        }

    }

    PageData() {
        try {
            formpagedetails({
                    id: this.formid
                })
                .then(result => {
                    //PageData
                    this.PageList = result;
                    this.FieldsData();
                }).catch(error => {
                    this.message = 'Something Went Wrong In preview Page';
                    this.showerror();
                });
        } catch (error) {
            console.log(error + 'preview Error');
            this.spinnerDataTable = false;
            this.message = 'Something Went Wrong In preview Page';
            this.showerror();
        }
    }

    FieldsData() {
        try {
            formfielddetails({
                    id: this.formid
                })
                .then(result => {
                    // FieldsData
                    this.setPageField(result);
                }).catch(error => {
                    console.log(error + 'preview Error');
                    this.spinnerDataTable = false;
                    this.message = 'Something Went Wrong In preview Page';
                    this.showerror();
                });
        } catch (error) {
            console.log(error + 'preview Error');
            this.spinnerDataTable = false;
            this.message = 'Something Went Wrong In preview Page';
            this.showerror();
        }
    }


    setPageField(fieldList) {
        try {
            let outerlist = [];
            let innerlist = [];
            let fieldtype;

            for (let i = 0; i < this.PageList.length; i++) {
                innerlist = [];
                for (let j = 0; j < fieldList.length; j++) {
                    if (this.PageList[i].Id == fieldList[j].Form_Page__c) {
                        if (fieldList[j].Name.split(',')[1] == 'Extra') {
                            fieldtype = false;
                        } else {
                            fieldtype = true;
                        }

                        let isdisabledcheck;
                        let isRequiredcheck;
                        let labelcheck;
                        let helptextcheck;
                        let placeholdercheck;
                        let prefixcheck;
                        let prefixvalue;
                        let labelvalue;
                        let helptext;
                        let placeholdervalue;
                        let salutationvalue = [];
                        let Richtext;

                        // add by yash
                        let minimum;
                        let maximum;
                        let minimumtime;
                        let maximumtime;
                        let minimumdatetime;
                        let maximumdatetime;
                        let minimumdate;
                        let maximumdate;


                        fieldList[j].Field_Validations__c = fieldList[j].Field_Validations__c.split('?$`~');
                        for (let i = 0; i < fieldList[j].Field_Validations__c.length; i++) {
                            fieldList[j].Field_Validations__c[i] = fieldList[j].Field_Validations__c[i].split('<!@!>');
                            let labels = fieldList[j].Field_Validations__c[i][0];
                            let value = fieldList[j].Field_Validations__c[i][1];

                            if (labels == 'isRequired') {
                                isRequiredcheck = JSON.parse(value);
                            } else if (labels == 'isDisabled') {
                                isdisabledcheck = JSON.parse(value);
                            } else if (labels == 'isLabel') {
                                labelcheck = JSON.parse(value);
                            } else if (labels == 'isHelpText') {
                                helptextcheck = JSON.parse(value);
                            } else if (labels == 'isPlaceholder') {
                                placeholdercheck = JSON.parse(value);
                            } else if (labels == 'isPrefix') {
                                prefixcheck = JSON.parse(value);
                            } else if (labels == 'Prefix') {
                                prefixvalue = value;
                            } else if (labels == 'Label') {
                                labelvalue = value;
                            } else if (labels == 'HelpText') {
                                helptext = value;
                            } else if (labels == 'Placeholder') {
                                placeholdervalue = value;
                            } else if (labels == 'Salutation') {
                                salutationvalue.push(value);
                            } else if (labels == 'Richtext') {
                                Richtext = value;
                            } else if (labels == 'Minimum') {
                                minimum = value;
                            } else if (labels == 'Maximum') {
                                maximum = value;
                            } else if (labels == 'MinimumTime') {
                                minimumtime = value;
                            } else if (labels == 'MaximumTime') {
                                maximumtime = value;
                            } else if (labels == 'MinimumDateTime') {
                                minimumdatetime = value;
                            } else if (labels == 'MaximumDateTime') {
                                maximumdatetime = value;
                            } else if (labels == 'MinimumDate') {
                                minimumdate = value;
                            } else if (labels == 'MaximumDate') {
                                maximumdate = value;
                            }

                        }
                        fieldList[j].Field_Validations__c = ({
                            isRequired: isRequiredcheck,
                            isDisabled: isdisabledcheck,
                            isLabel: labelcheck,
                            isHelptext: helptextcheck,
                            isPlaceholder: placeholdercheck,
                            isPrefix: prefixcheck,
                            Prefix: prefixvalue,
                            Label: labelvalue,
                            HelpText: helptext,
                            Placeholder: placeholdervalue,
                            Salutation: salutationvalue,
                            fieldtype: fieldtype,
                            Richtext: Richtext,
                            Minimum: minimum,
                            Maximum: maximum,
                            MinimumTime: minimumtime,
                            MaximumTime: maximumtime,
                            MinimumDateTime: minimumdatetime,
                            MaximumDateTime: maximumdatetime,
                            MinimumDate: minimumdate,
                            MaximumDate: maximumdate
                        });

                        innerlist.push(fieldList[j]);
                    }
                }
                let temp = {
                    pageName: this.PageList[i].Name,
                    pageId: this.PageList[i].Id,
                    FieldData: innerlist
                };
                outerlist.push(temp);
            }
            this.Mainlist = outerlist;
            this.page = outerlist[0];

            if (this.pageindex == this.PageList.length) {
                this.isIndexZero = true;
                this.isIndexLast = true;
            }
            this.spinnerDataTable = false;
            this.template.querySelector('c-progress-indicator').calculation(this.Progressbarvalue, this.pageindex, this.PageList.length);
        } catch (error) {
            console.log(error + 'preview Error');
            this.spinnerDataTable = false;
            this.message = 'Something Went Wrong In preview Page';
            this.showerror();
        }
    }

    backhome(event) {
        let cmpDef = {
            componentDef: "c:qf_home"
        };
        let encodedDef = btoa(JSON.stringify(cmpDef));
        this[NavigationMixin.Navigate]({
            type: "standard__webPage",
            attributes: {
                url: "/one/one.app#" + encodedDef
            }
        });
    }

    handlepagination(event) {
        let chack_bt = 0;
        this.current_bt = event.currentTarget.dataset.name;

        if (event.currentTarget.dataset.name == 'previous') {
            // this.error_josn_key_list = [];
            this.checkbool = true;
            this.spinnerDataTable = true;
            if (this.error_josn_key_list.length == 0) {
                if (this.pageindex == 1) {
                    this.isIndexZero = true;
                } else if (this.PageList.length > this.pageindex) {
                    this.pageindex--;
                    if (this.pageindex == 1) {
                        this.isIndexLast = false;
                        this.isIndexZero = true;
                    }
                } else if (this.PageList.length == this.pageindex) {
                    this.pageindex--;
                    this.isIndexLast = false;
                    if (this.pageindex == 1) {
                        this.isIndexLast = false;
                        this.isIndexZero = true;
                    }
                }
                this.page = this.Mainlist[this.pageindex - 1];
                this.spinnerDataTable = false;
                this.template.querySelector('c-progress-indicator').calculation(this.Progressbarvalue, this.pageindex, this.PageList.length);

            }
        } else if (event.currentTarget.dataset.name == 'next') {
            console.log('this.custom_validation :-', this.error_josn_key_list.length);
            if (this.error_josn_key_list.length == 0) {
                this.spinnerDataTable = true;
                console.log('total page :- ', JSON.stringify(this.PageList[this.pageindex - 1]));
                getFieldsRecords_page({
                        id: this.PageList[this.pageindex - 1].Id
                    })
                    .then(result => {
                        this.PageFieldList = result;
                        this.check_validation();
                        this.spinnerDataTable = false;
                    })
                    .catch(error => {
                        console.log(error);
                        this.spinnerDataTable = false;
                        this.message = 'Something Went Wrong In preview Page';
                        this.showerror();
                    });


            }

        } else if (event.currentTarget.dataset.name == 'submit') {
            if (this.error_josn_key_list.length == 0) {
                this.spinnerDataTable = true;
                console.log('u r in submit bt');
                console.log('crent page no :- ', this.pageindex);
                console.log('total page :- ', JSON.stringify(this.PageList[this.pageindex - 1]));
                console.log('crent page no of id :- ', JSON.stringify(this.PageList[this.pageindex - 1].Id));
                getFieldsRecords_page({
                        id: this.PageList[this.pageindex - 1].Id
                    })
                    .then(result => {
                        this.PageFieldList = result;
                        this.check_validation();
                        this.spinnerDataTable = false;
                    })
                    .catch(error => {
                        console.log(error);
                        this.spinnerDataTable = false;
                        this.message = 'Something Went Wrong In preview Page';
                        this.showerror();
                    });
            }
        }
    }

    verifycaptcha(event) {
        this.verify = event.detail;
    }

    // add by yash
    testtocall(event) {
        // console.log(' test method :- ',);
        // alert('testtocall');
        // console.log('form_object OUTPUT : ',JSON.stringify(this.form_object));
        // console.log('form_object OUTPUT : ====>'+ JSON.stringify(this.form_object[0].Mapped_Objects__c));
        // this.obj = this.form_object[0].Mapped_Objects__c;

        this.obj = this.form_object;




        // console.log('obj : ',this.obj);
        this.form_mapped_Objects = this.obj.split(',');
        // console.log('form_mapped_Objects :- ',this.form_mapped_Objects[0]);
        this.first_object = this.form_mapped_Objects[0];
        this.list_first_obj.sobjectType = this.form_mapped_Objects[0];
        this.all_filde_value.sobjectType = this.form_mapped_Objects[0];
        this.second_object = this.form_mapped_Objects[1];
        this.list_second_obj.sobjectType = this.form_mapped_Objects[1];
        this.all_filde_value_second.sobjectType = this.form_mapped_Objects[1];
        this.third_object = this.form_mapped_Objects[2];
        this.list_third_obj.sobjectType = this.form_mapped_Objects[2];
        this.all_filde_value_third.sobjectType = this.form_mapped_Objects[2];
        console.log('first_object: ', this.first_object);
        console.log(' this.second_object: ', this.second_object);
        console.log('third_object: ', this.third_object);
        console.log('form_mapped_Objects :- : ', this.form_mapped_Objects.length);
        if (this.form_mapped_Objects.length == 2) {
            findlookupfildes({
                    minobj: this.form_mapped_Objects[0],
                    fsubobj: this.form_mapped_Objects[1]
                })
                .then(result => {
                    this.lookup_2obj = result;
                    // alert('test by yash');
                    console.log('result list :- ', JSON.stringify(this.lookup_2obj));
                })
                .catch(error => {
                    console.log(error);
                });

        } else if (this.form_mapped_Objects.length == 3) {
            // alert('u r in elseif');
            for (let k = 1; k < this.form_mapped_Objects.length; k++) {
                // alert('u r in for loop');
                findlookupfildes({
                        minobj: this.form_mapped_Objects[0],
                        fsubobj: this.form_mapped_Objects[k]
                    })
                    .then(result => {
                        // var testdata = result;
                        // alert('test by yash 4 3obj');
                        this.lookup_filde_json[k] = result;
                        console.log('result list :- ', JSON.stringify(this.lookup_filde_json));

                    })
                    .catch(error => {
                        console.log(error);
                    });
            }

        }


    }
    check_validation(event) {
        console.log('PageFieldList ====>' + JSON.stringify(this.PageFieldList));
        for (let i = 0; i < this.PageFieldList.length; i++) {
            console.log('OUTPUT in next bt : ', this.PageFieldList[i].Field_Mapping__c);
            let test2 = this.PageFieldList[i].Field_Mapping__c;
            console.log('test2 : ', test2);
            let test3 = this.PageFieldList[i].Field_Validations__c;
            var fild_validetionArr = test3.split('?$`~');
            console.log('test3 : ', test3);
            console.log('fild_validetionArr : ', JSON.stringify(fild_validetionArr));
            console.log('fild_validetionArr 123 : ', fild_validetionArr[0]);
            let is_req = fild_validetionArr[0];
            var requiredArr = is_req.split('<!@!>');
            let req_value = requiredArr[1];
            console.log('req_value OUTPUT : ', req_value);
            var nameArr = test2.split('<!@!>');
            const fildAPI = nameArr[0];
            this.list_validetion[test2] = req_value;
            this.s_ob = nameArr[0];
            console.log('fildAPI : ', fildAPI);
            const objectAPI = nameArr[1];
            console.log('objectAPI : ', objectAPI);
            console.log('second_object : ', this.second_object);

            if (this.first_object == objectAPI) {
                console.log(' u r in next if condition 1');
                console.log('fildAPI : ', fildAPI);
                console.log('OUTPUT sec_ob : ', JSON.stringify(this.all_filde_value[fildAPI]));
                let fil_val = JSON.stringify(this.all_filde_value[fildAPI]);
                console.log('fil_val OUTPUT : ', fil_val);
                if (req_value == 'true') {
                    console.log('fil_val OUTPUT in if condition : ', fil_val);
                    if (fil_val != '' && fil_val != null && fil_val != ' ' && fil_val != undefined && fil_val != '""' && fil_val != 'undefined') {
                        console.log('u r in fil_val if condition');
                        this.checkbool = true;

                    } else {
                        this.checkbool = false;
                        let error_msg = 'Please fill out all required fields.';
                        this.template.querySelector('c-toast-component').showToast('error', error_msg, 3000);
                        break;
                    }
                }
            } else if (this.second_object == objectAPI) {
                console.log(' u r in next if condition 2');
                console.log('fildAPI : ', fildAPI);
                console.log('OUTPUT sec_ob : ', JSON.stringify(this.all_filde_value_second[fildAPI]));
                let fil_val = JSON.stringify(this.all_filde_value_second[fildAPI]);
                console.log('fil_val OUTPUT : ', fil_val);
                if (req_value == 'true') {
                    if (fil_val != '' && fil_val != null && fil_val != ' ' && fil_val != undefined && fil_val != '""') {
                        this.checkbool = true;
                    } else {
                        console.log('u r in else in submit vald');
                        this.checkbool = false;
                        let error_msg = 'Please fill out all required fields.';
                        this.template.querySelector('c-toast-component').showToast('error', error_msg, 3000);
                        break;
                    }
                }

            } else if (this.third_object == objectAPI) {
                console.log(' u r in next if condition 3');
                console.log('fildAPI : ', fildAPI);
                console.log('OUTPUT sec_ob : ', JSON.stringify(this.all_filde_value_third[fildAPI]));
                let fil_val = JSON.stringify(this.all_filde_value_third[fildAPI]);
                console.log('fil_val OUTPUT : ', fil_val);
                if (req_value == 'true') {
                    if (fil_val != '' && fil_val != null && fil_val != ' ' && fil_val != undefined && fil_val != '""') {
                        this.checkbool = true;

                    } else {
                        this.checkbool = false;
                        // alert('pls enter val');
                        let error_msg = 'Please fill out all required fields.';
                        this.template.querySelector('c-toast-component').showToast('error', error_msg, 3000);
                        break;
                    }
                }

            } else {
                console.log(' u r in next if condition 4');
                console.log('fildAPI : ', fildAPI);
                console.log('OUTPUT sec_ob : ', JSON.stringify(this.all_filde_value_ext[fildAPI]));
                let fil_val = JSON.stringify(this.all_filde_value_ext[fildAPI]);
                // console.log('fil_val OUTPUT : ', fil_val);
                // var error = this.template.querySelector(`[data-id="${test2}"]`).value;
                console.log(' crent fid val :- ', fil_val);
                if (req_value == 'true') {
                    console.log('fil_val OUTPUT in if condition : ', fil_val);
                    if (fil_val != '' && fil_val != null && fil_val != ' ' && fil_val != undefined && fil_val != '""' && fil_val != 'undefined') {
                        console.log('u r in fil_val if condition');
                        this.checkbool = true;

                    } else {
                        this.checkbool = false;
                        let error_msg = 'Please fill out all required fields.';
                        this.template.querySelector('c-toast-component').showToast('error', error_msg, 3000);
                        break;
                    }
                }

            }
        }
        console.log('list_validetion OUTPUT : ', JSON.stringify(this.list_validetion));
        if (this.checkbool == true) {
            console.log('u r in checkbool if');
            console.log('current_bt :- ', this.current_bt);
            if (this.current_bt == 'next') {
                if (this.pageindex == 1) {

                    if (this.pageindex == this.PageList.length) {
                        this.isIndexZero = false;
                        this.isIndexLast = true;
                    } else {
                        this.pageindex++;
                        this.isIndexZero = false;
                        this.isIndexLast = false;
                        if (this.pageindex == this.PageList.length) {
                            this.isIndexLast = true;
                        }
                    }
                } else if (this.PageList.length > this.pageindex) {
                    this.pageindex++;
                    if (this.pageindex == this.PageList.length) {
                        this.isIndexLast = true;
                    } else {
                        this.isIndexLast = false;
                    }
                } else if (this.PageList.length == this.pageindex) {}
                this.page = this.Mainlist[this.pageindex - 1];
                this.template.querySelector('c-progress-indicator').calculation(this.Progressbarvalue, this.pageindex, this.PageList.length);
            } else if (this.current_bt == 'submit') {
                console.log('u r clike submit bt ', );
                if (this.captchavalue == 'None' || this.captchavalue == '--None--' || this.captchavalue == undefined) {
                    this.remove_separator();

                } else {
                    if (this.verify == true) {
                        this.remove_separator();
                    } else {
                        let toast_error_msg = 'Invalid Captcha';
                        this.template.querySelector('c-toast-component').showToast('error', toast_error_msg, 3000);
                    }

                }


            }
        }
    } catch (error) {
        this.message = 'Something Went Wrong In Preview Form Page';
        this.showerror(this.message);
    }
    remove_separator() {
        console.log(this.verify);
        let toast_error_msg = 'your form is submitted successfully';
        this.template.querySelector('c-toast-component').showToast('success', toast_error_msg, 3000);
        // this.first_object_4_pdf = this.list_first_obj;
        // this.second_object_4_pdf = this.list_second_obj;
        // this.third_object_4_pdf = this.list_third_obj;
        // this.ext_object_4_pdf = this.ext_object;
        console.log(' this.first_list :- ', JSON.stringify(this.first_list));
        for (let j = 0; j < this.first_list.length; j++) {
            // console.log(' u r in test val loop');
            var test_f_val = this.list_first_obj[this.first_list[j]];
            // console.log('test_f_val :- ',test_f_val);
            var f_valArr = test_f_val.split('<QF>');
            var first_val = f_valArr[0];
            console.log('first_val------- ', first_val);
            if (first_val == 'select-one') {
                this.list_first_obj[this.first_list[j]] = f_valArr[1];

            } else if (first_val == 'textarea') {
                this.list_first_obj[this.first_list[j]] = f_valArr[1];

            } else if (first_val == 'fullname') {
                var f_name = f_valArr[1] + f_valArr[2] + f_valArr[3];
                this.list_first_obj[this.first_list[j]] = f_name;

            } else if (first_val == 'add') {
                var addres = f_valArr[1] + f_valArr[2] + f_valArr[3] + f_valArr[4] + f_valArr[5];
                this.list_first_obj[this.first_list[j]] = addres;

            } else if (first_val == 'm_pick') {
                console.log('y r in m_pic');
                let full_m_val = '';
                for (let k = 1; k < f_valArr.length; k++) {
                    if (f_valArr[k] != '' || f_valArr[k] != undefined) {
                        var m_pic_labele = f_valArr[k].split('<?QF>');
                        console.log(' u r in loop of m_pic :- ', m_pic_labele[1]);
                        console.log(' f_valArr.length :- ', f_valArr.length - 1);
                        if (m_pic_labele[0] != undefined) {
                            full_m_val = full_m_val + m_pic_labele[0];
                            console.log(' k :- ', k);
                            if (k < f_valArr.length - 2) {
                                full_m_val = full_m_val + ';';

                            }
                        }
                    }

                }
                // var val_m_pick = f_valArr[1]+f_valArr[2]+f_valArr[3];
                this.list_first_obj[this.first_list[j]] = full_m_val;
                console.log('after clin :- ', full_m_val);

            } else if (first_val == 'chk_box') {
                // var chk_list = '';
                // for (let k = 2; k < f_valArr.length; k++) {
                //     chk_list = chk_list + f_valArr[k];
                // }
                // var f_name = f_valArr[1]+f_valArr[2]+f_valArr[3];
                this.list_first_obj[this.first_list[j]] = f_valArr[1];
            } else if (first_val == 'refernce') {
                this.list_first_obj[this.first_list[j]] = f_valArr[2];

            } else if (first_val == 'datetime') {
                // alert('tets');
                const date = new Date(f_valArr[1]); // assuming the input datetime is in UTC format
                const offset = new Date().getTimezoneOffset(); // get the local time zone offset in minutes
                const offsetHours = Math.abs(Math.floor(offset / 60)).toString().padStart(2, '0'); // convert offset to hours and pad with leading zeros if necessary
                const offsetMinutes = Math.abs(offset % 60).toString().padStart(2, '0'); // get the remaining minutes of the offset and pad with leading zeros if necessary
                const offsetSign = offset >= 0 ? '-' : '+'; // determine the sign of the offset
                const isoString = date.toISOString().replace('Z', `${offsetSign}${offsetHours}:${offsetMinutes}`);
                this.list_first_obj[this.first_list[j]] = isoString;

            } else if (first_val == 'time') {
                this.list_first_obj[this.first_list[j]] = f_valArr[1] + ':00.000Z';

            } else {
                this.list_first_obj[this.first_list[j]] = f_valArr[0];
            }

            // this.list_first_obj[this.first_list[j]] = f_valArr[1];

        }
        console.log('clos 1');
        console.log('Store field data OUTPUT 1 : ', JSON.parse(JSON.stringify(this.list_first_obj)));
        for (let j = 0; j < this.second_list.length; j++) {
            // console.log(' u r in test val loop');
            var test_f_val = this.list_second_obj[this.second_list[j]];
            // console.log('test_f_val :- ',test_f_val);
            var f_valArr = test_f_val.split('<QF>');
            var first_val = f_valArr[0];
            if (first_val == 'select-one') {
                this.list_second_obj[this.second_list[j]] = f_valArr[1];

            } else if (first_val == 'textarea') {
                this.list_second_obj[this.second_list[j]] = f_valArr[1];

            } else if (first_val == 'fullname') {
                var f_name = f_valArr[1] + f_valArr[2] + f_valArr[3];
                this.list_second_obj[this.second_list[j]] = f_name;

            } else if (first_val == 'add') {
                var addres = f_valArr[1] + f_valArr[2] + f_valArr[3] + f_valArr[4] + f_valArr[5];
                this.list_second_obj[this.second_list[j]] = addres;

            } else if (first_val == 'm_pick') {
                let full_m_val = '';
                for (let k = 1; k < f_valArr.length; k++) {
                    if (f_valArr[k] != '' || f_valArr[k] != undefined) {
                        var m_pic_labele = f_valArr[k].split('<?QF>');
                        console.log(' u r in loop of m_pic :- ', m_pic_labele[1]);
                        console.log(' f_valArr.length :- ', f_valArr.length - 1);
                        if (m_pic_labele[0] != undefined) {
                            full_m_val = full_m_val + m_pic_labele[0];
                            console.log(' k :- ', k);
                            if (k < f_valArr.length - 2) {
                                full_m_val = full_m_val + ';';

                            }
                        }
                    }

                }
                // var val_m_pick = f_valArr[1]+f_valArr[2]+f_valArr[3];
                this.list_second_obj[this.second_list[j]] = full_m_val;
                console.log('after clin :- ', full_m_val);

            } else if (first_val == 'chk_box') {
                // var chk_list = '';
                // for (let k = 2; k < f_valArr.length; k++) {
                //     chk_list = chk_list + f_valArr[k];
                // }
                // var f_name = f_valArr[1]+f_valArr[2]+f_valArr[3];
                this.list_second_obj[this.second_list[j]] = f_valArr[1];
            } else if (first_val == 'refernce') {
                this.list_second_obj[this.second_list[j]] = f_valArr[2];

            } else if (first_val == 'datetime') {
                const date = new Date(f_valArr[1]); // assuming the input datetime is in UTC format
                const offset = new Date().getTimezoneOffset(); // get the local time zone offset in minutes
                const offsetHours = Math.abs(Math.floor(offset / 60)).toString().padStart(2, '0'); // convert offset to hours and pad with leading zeros if necessary
                const offsetMinutes = Math.abs(offset % 60).toString().padStart(2, '0'); // get the remaining minutes of the offset and pad with leading zeros if necessary
                const offsetSign = offset >= 0 ? '-' : '+'; // determine the sign of the offset
                const isoString = date.toISOString().replace('Z', `${offsetSign}${offsetHours}:${offsetMinutes}`);
                this.list_second_obj[this.list_second_obj[j]] = isoString;

            } else if (first_val == 'time') {
                this.list_second_obj[this.second_list[j]] = f_valArr[1] + ':00.000Z';

            } else {
                this.list_second_obj[this.second_list[j]] = f_valArr[0];
            }

            // this.list_first_obj[this.first_list[j]] = f_valArr[1];

        }
        console.log('clos 2');
        console.log('Store field data OUTPUT : ', JSON.parse(JSON.stringify(this.list_second_obj)));
        for (let j = 0; j < this.third_list.length; j++) {
            // console.log(' u r in test val loop');
            var test_f_val = this.list_third_obj[this.third_list[j]];
            // console.log('test_f_val :- ',test_f_val);
            var f_valArr = test_f_val.split('<QF>');
            var first_val = f_valArr[0];
            if (first_val == 'select-one') {
                this.list_third_obj[this.third_list[j]] = f_valArr[1];

            } else if (first_val == 'textarea') {
                this.list_third_obj[this.third_list[j]] = f_valArr[1];

            } else if (first_val == 'fullname') {
                var f_name = f_valArr[1] + f_valArr[2] + f_valArr[3];
                this.list_third_obj[this.third_list[j]] = f_name;

            } else if (first_val == 'add') {
                var addres = f_valArr[1] + f_valArr[2] + f_valArr[3] + f_valArr[4] + f_valArr[5];
                this.list_third_obj[this.third_list[j]] = addres;

            } else if (first_val == 'm_pick') {
                let full_m_val = '';
                for (let k = 1; k < f_valArr.length; k++) {
                    if (f_valArr[k] != '' || f_valArr[k] != undefined) {
                        var m_pic_labele = f_valArr[k].split('<?QF>');
                        console.log(' u r in loop of m_pic :- ', m_pic_labele[1]);
                        console.log(' f_valArr.length :- ', f_valArr.length - 1);
                        if (m_pic_labele[0] != undefined) {
                            full_m_val = full_m_val + m_pic_labele[0];
                            console.log(' k :- ', k);
                            if (k < f_valArr.length - 2) {
                                full_m_val = full_m_val + ';';

                            }
                        }
                    }

                }
                // var val_m_pick = f_valArr[1]+f_valArr[2]+f_valArr[3];
                this.list_first_obj[this.third_list[j]] = full_m_val;
                console.log('after clin :- ', full_m_val);

            } else if (first_val == 'chk_box') {
                // var chk_list = '';
                // for (let k = 2; k < f_valArr.length; k++) {
                //     chk_list = chk_list + f_valArr[k];
                // }
                // var f_name = f_valArr[1]+f_valArr[2]+f_valArr[3];
                this.list_third_obj[this.third_list[j]] = f_valArr[1];
            } else if (first_val == 'refernce') {
                this.list_third_obj[this.third_list[j]] = f_valArr[2];

            } else if (first_val == 'datetime') {
                const date = new Date(f_valArr[1]); // assuming the input datetime is in UTC format
                const offset = new Date().getTimezoneOffset(); // get the local time zone offset in minutes
                const offsetHours = Math.abs(Math.floor(offset / 60)).toString().padStart(2, '0'); // convert offset to hours and pad with leading zeros if necessary
                const offsetMinutes = Math.abs(offset % 60).toString().padStart(2, '0'); // get the remaining minutes of the offset and pad with leading zeros if necessary
                const offsetSign = offset >= 0 ? '-' : '+'; // determine the sign of the offset
                const isoString = date.toISOString().replace('Z', `${offsetSign}${offsetHours}:${offsetMinutes}`);
                this.list_third_obj[this.list_third_obj[j]] = isoString;

            } else if (first_val == 'time') {
                this.list_third_obj[this.list_third_obj[j]] = f_valArr[1] + ':00.000Z';

            } else {
                this.list_third_obj[this.third_list[j]] = f_valArr[0];
            }

            // this.list_first_obj[this.first_list[j]] = f_valArr[1];

        }
        console.log('clos 3');
        console.log('Store field data OUTPUT : ', JSON.parse(JSON.stringify(this.list_third_obj)));
        for (let j = 0; j < this.ex_list.length; j++) {
            // console.log(' u r in test val loop');
            var test_f_val = this.list_ext_obj[this.ex_list[j]];
            // console.log('test_f_val :- ',test_f_val);
            var f_valArr = test_f_val.split('<QF>');
            var first_val = f_valArr[0];
            if (first_val == 'select-one') {
                this.list_ext_obj[this.ex_list[j]] = f_valArr[1];

            } else if (first_val == 'textarea') {
                this.list_ext_obj[this.ex_list[j]] = f_valArr[1];

            } else if (first_val == 'fullname') {
                var f_name = f_valArr[1] + f_valArr[2] + f_valArr[3];
                this.list_ext_obj[this.ex_list[j]] = f_name;

            } else if (first_val == 'add') {
                var addres = f_valArr[1] + f_valArr[2] + f_valArr[3] + f_valArr[4] + f_valArr[5];
                this.list_ext_obj[this.ex_list[j]] = addres;

            } else if (first_val == 'm_pick') {
                let full_m_val = '';
                for (let k = 1; k < f_valArr.length; k++) {
                    if (f_valArr[k] != '' || f_valArr[k] != undefined) {
                        var m_pic_labele = f_valArr[k].split('<?QF>');
                        console.log(' u r in loop of m_pic :- ', m_pic_labele[1]);
                        console.log(' f_valArr.length :- ', f_valArr.length - 1);
                        if (m_pic_labele[0] != undefined) {
                            full_m_val = full_m_val + m_pic_labele[0];
                            console.log(' k :- ', k);
                            if (k < f_valArr.length - 2) {
                                full_m_val = full_m_val + ';';

                            }
                        }
                    }

                }
                // var val_m_pick = f_valArr[1]+f_valArr[2]+f_valArr[3];
                this.list_first_obj[this.ex_list[j]] = full_m_val;
                console.log('after clin :- ', full_m_val);

            } else if (first_val == 'chk_box') {
                var chk_list = '';
                for (let k = 2; k < f_valArr.length; k++) {
                    chk_list = chk_list + f_valArr[k];
                }
                // var f_name = f_valArr[1]+f_valArr[2]+f_valArr[3];
                this.list_ext_obj[this.ex_list[j]] = chk_list;
            } else if (first_val == 'refernce') {
                this.list_ext_obj[this.ex_list[j]] = f_valArr[2];

            } else if (first_val == 'redio') {
                this.list_ext_obj[this.ex_list[j]] = f_valArr[1];

            } else if (first_val == 'time') {
                this.list_ext_obj[this.list_ext_obj[j]] = f_valArr[1] + ':00.000Z';

            } else if (first_val == 'emoji') {
                this.list_ext_obj[this.ex_list[j]] = f_valArr[1];

            } else if (first_val == 'datetime') {
                const date = new Date(f_valArr[1]); // assuming the input datetime is in UTC format
                const offset = new Date().getTimezoneOffset(); // get the local time zone offset in minutes
                const offsetHours = Math.abs(Math.floor(offset / 60)).toString().padStart(2, '0'); // convert offset to hours and pad with leading zeros if necessary
                const offsetMinutes = Math.abs(offset % 60).toString().padStart(2, '0'); // get the remaining minutes of the offset and pad with leading zeros if necessary
                const offsetSign = offset >= 0 ? '-' : '+'; // determine the sign of the offset
                const isoString = date.toISOString().replace('Z', `${offsetSign}${offsetHours}:${offsetMinutes}`);
                this.list_ext_obj[this.list_ext_obj[j]] = isoString;

            } else {
                this.list_ext_obj[this.ex_list[j]] = f_valArr[0];
            }

            // this.list_first_obj[this.first_list[j]] = f_valArr[1];

        }
        console.log('clos 4');
        console.log('Store field data OUTPUT : ', JSON.parse(JSON.stringify(this.list_ext_obj)));
        this.onsubmit();
    }

    onsubmit(event) {
        if (this.nosubmission == false) {
            console.log(' url data :- ', this.sin_data_id);
            var submissionid;

            let list_submission_obj = {
                'sobjectType': 'Form_Submission__c'
            };
            console.log('u clike submit bt');
            list_submission_obj['Form__c'] = this.formid;
            list_submission_obj['First_object_data__c'] = JSON.stringify(this.list_first_obj);
            list_submission_obj['Second_object_data__c'] = JSON.stringify(this.list_second_obj);
            list_submission_obj['Third_object_data__c'] = JSON.stringify(this.list_third_obj);
            // list_submission_obj['Other_fields_data__c'] = JSON.stringify(this.list_ext_obj);
            console.log('this is list_submission_obj :- ', JSON.stringify(list_submission_obj));
            console.log('form_mapped_Objects.length :- ', this.form_mapped_Objects.length);
            if (this.form_mapped_Objects.length == 1) {
                console.log('y r in form_mapped_Objects.length = 1 if');
                var jsonString = JSON.stringify(this.file_upload);
                console.log('file upload in create record :- ', JSON.stringify(this.file_upload));
                console.log('file upload in create record :- ', JSON.stringify(this.file_upload));

                createrecord({
                        acc: list_submission_obj,
                        first_obj_list: this.list_first_obj,
                        // sin_id: this.sin_data_id,
                        sig_upload_jsone: JSON.stringify(this.sig_upload),
                        sig_upload_fid_list: this.sig_fildeid,
                        file_upload_jsone: JSON.stringify(this.file_upload),
                        file_upload_fid_list: this.file_upload_fildeid

                    })
                    .then(data => {
                        this.sub_id = data.SubmissionId;
                        // this.redirecttothankyou(submissionid);
                        this.sendnotification(this.sub_id);
                        this.file_u_map = data.File_upload_map;
                        this.sig_u_map = data.Sig_upload_map;
                        // console.log('size of the map is 3 :- ', JSON.stringify(data.File_upload_map));
                        // console.log('size of the map is 4 :- ', JSON.stringify(this.file_u_map));
                        // console.log('size of the map is 1 :- ', JSON.stringify(data.Sig_upload_map));
                        // console.log('size of the map is 2 :- ', JSON.stringify(this.sig_u_map));
                        let toast_error_msg = 'your form is submitted successfully';
                        this.template.querySelector('c-toast-component').showToast('success', toast_error_msg, 3000);
                        this.add_sig();

                    })
                    .catch(error => {
                        console.log({
                            error
                        });
                    this.message = 'Something Went Wrong In preview Page';
                    this.showerror();
                    })
            } else if (this.form_mapped_Objects.length == 2) {
                console.log('y r in form_mapped_Objects.length = 2 if');
                this.add_lookyp_fildes();
                createrecord_for_secod_object({
                        acc: list_submission_obj,
                        first_obj_list: this.list_first_obj,
                        list_second_obj: this.list_second_obj,
                        // sin_id: this.sin_data_id,
                        sig_upload_jsone: JSON.stringify(this.sig_upload),
                        sig_upload_fid_list: this.sig_fildeid,
                        file_upload_jsone: JSON.stringify(this.file_upload),
                        file_upload_fid_list: this.file_upload_fildeid,
                        create_chi: this.create_chi,
                        lookup_list: this.lookup_2obj

                    })
                    .then(data => {
                        console.log({
                            data
                        });
                        this.sub_id = data.SubmissionId;
                        // this.sig_con_id = data.SignatureId;
                        // submissionid = data;
                        this.file_u_map = data.File_upload_map;
                        this.sig_u_map = data.Sig_upload_map;
                        // this.redirecttothankyou(submissionid);
                        this.sendnotification(this.sub_id);
                        this.add_sig();

                        // alert('y r data is save');
                    })
                    .catch(error => {
                        console.log({
                            error
                        });
                    this.message = 'Something Went Wrong In preview Page';
                    this.showerror();
                    })

            } else if (this.form_mapped_Objects.length == 3) {
                console.log('y r in form_mapped_Objects.length = 3 if');
                this.lookup_2obj = this.lookup_filde_json['1'];
                this.lookup_3obj = this.lookup_filde_json['2'];
                console.log('lookup_2obj tep 3 :- ', JSON.stringify(this.lookup_2obj));
                console.log('lookup_3obj tep 3 :- ', JSON.stringify(this.lookup_3obj));
                this.add_lookyp_fildes();
                this.add_lookyp_fildes_2();
                createrecord_for_third_object({
                        acc: list_submission_obj,
                        first_obj_list: this.list_first_obj,
                        list_second_obj: this.list_second_obj,
                        list_third_obj: this.list_third_obj,
                        // sin_id: this.sin_data_id
                        sig_upload_jsone: JSON.stringify(this.sig_upload),
                        sig_upload_fid_list: this.sig_fildeid,
                        file_upload_jsone: JSON.stringify(this.file_upload),
                        file_upload_fid_list: this.file_upload_fildeid,
                        create_chi: this.create_chi,
                        lookup_list: this.lookup_2obj,
                        create_chi_2: this.create_chi_2,
                        lookup_list2: this.lookup_3obj
                    })
                    .then(data => {
                        console.log({
                            data
                        });
                        this.sub_id = data.SubmissionId;
                        // this.sig_con_id = data.SignatureId;
                        // submissionid = data;
                        this.file_u_map = data.File_upload_map;
                        this.sig_u_map = data.Sig_upload_map;
                        console.log(submissionid);
                        // this.redirecttothankyou(submissionid);
                        this.sendnotification(this.sub_id);
                        this.add_sig();

                        // alert('your data is save');
                    })
                    .catch(error => {
                        console.log({
                            error
                        });
                    this.message = 'Something Went Wrong In preview Page';
                    this.showerror();
                    })
            }
        }
        this.redirecttothankyou();
        this.regeneratecaptcha();
    }


    errorpopupcall() {
        location.reload();
    }
    next_val_by(event) {
        let key = event.detail;
        let push_val = 'yes';
        for (let i = 0; i < this.error_josn_key_list.length; i++) {
            console.log('for loop :- ', this.error_josn_key_list[i]);
            console.log('key :-', key);
            if (this.error_josn_key_list[i] == key) {
                push_val = 'no'
                break;
            }
        }
        if (push_val == 'yes') {
            this.error_josn_key_list.push(key);
        }
        // console.log('yash stru :- ',JSON.stringify(this.error_validation_json));
        // console.log('ysy error :-',JSON.stringify(this.error_josn_key_list));
        // console.log('len :-',Object.keys(this.error_josn_key_list).length);

    }
    next_val_true(event) {
        let key = event.detail;
        for (let i = 0; i < this.error_josn_key_list.length; i++) {
            console.log('for loop :- ', this.error_josn_key_list[i]);
            console.log('key :-', key);
            if (this.error_josn_key_list[i] == key) {
                this.error_josn_key_list.splice(i, 1);
            }
        }
        // console.log('yash stru t:- ',JSON.stringify(this.error_validation_json));
        // console.log('ysy error t:-',JSON.stringify(this.error_josn_key_list));
        // console.log('len t:-',Object.keys(this.error_josn_key_list).length);

    }
    add_input_val_josn(event) {
        let newval = event.detail;
        var newvalArr = newval.split('<!@!>');
        this.add_input_val = newvalArr[2];
        console.log('new val :- ', newval);
        // alert('yash');
        // alert('yash',newvalArr[2]);
        console.log(' newvalArr[2] :- ', newvalArr[2]);
        console.log(' newvalArr[2] :- ', this.add_input_val);

    }

    storefielddata(event) {
        console.log('OUTPUT yash test : ', event.detail);
        this.datawithleabel = event.detail;
        var nameArr = this.datawithleabel.split('<!@!>');
        console.log('data key OUTPUT : ', nameArr[0]);
        console.log('data object OUTPUT : ', nameArr[1]);
        console.log('data value OUTPUT : ', nameArr[2]);
        let testt = 'no';
        let ind;

        if (this.first_object == nameArr[1]) {
            for (let i = 0; i < this.list_first_obj.length; i++) {
                if (this.list_first_obj[i] == nameArr[0]) {
                    console.log('u r in for loop if ');
                    testt = 'yes'
                    ind = i;
                }
            }
            if (testt == 'yes') {
                console.log(' u r in testt if');
                this.list_first_obj[ind].filde_vlue = nameArr[2];
                this.all_filde_value[ind].filde_vlue = this.add_input_val;

            } else {
                console.log(' newvalArr[2] :- ', this.add_input_val);
                console.log(' u r in testt else');
                this.list_first_obj[nameArr[0]] = nameArr[2];
                console.log('all_filde_value[nameArr[0]] :- ', this.add_input_val);
                this.all_filde_value[nameArr[0]] = this.add_input_val;

                let pass_key = 'no';
                for (let i = 0; i < this.first_list.length; i++) {
                    if (nameArr[0] == this.first_list[i]) {
                        pass_key = 'yes';
                    }
                }
                if (pass_key == 'no') {
                    this.first_list.push(nameArr[0]);
                }

            }
        } else if (this.second_object == nameArr[1]) {
            for (let i = 0; i < this.list_second_obj.length; i++) {
                if (this.list_second_obj[i] == nameArr[0]) {
                    console.log('u r in for loop if ');
                    testt = 'yes'
                    ind = i;
                }
            }
            if (testt == 'yes') {
                console.log(' u r in testt if');
                this.list_second_obj[ind].filde_vlue = nameArr[2];
                this.all_filde_value_second[ind].filde_vlue = this.add_input_val;

            } else {
                console.log(' u r in testt else');
                this.list_second_obj[nameArr[0]] = nameArr[2];
                this.all_filde_value_second[nameArr[0]] = this.add_input_val;

                this.second_list.push(nameArr[0]);
                let pass_key = 'no';
                for (let i = 0; i < this.second_list.length; i++) {
                    if (nameArr[0] == this.second_list[i]) {
                        pass_key = 'yes';
                    }
                }
                if (pass_key == 'no') {
                    this.second_list.push(nameArr[0]);
                }

            }
        } else if (this.third_object == nameArr[1]) {
            for (let i = 0; i < this.list_third_obj.length; i++) {
                if (this.list_third_obj[i] == nameArr[0]) {
                    console.log('u r in for loop if ');
                    testt = 'yes'
                    ind = i;
                }
            }
            if (testt == 'yes') {
                console.log(' u r in testt if');
                this.list_third_obj[ind].filde_vlue = nameArr[2];
                this.all_filde_value_third[ind].filde_vlue = this.add_input_val;


            } else {
                console.log(' u r in testt else');
                this.list_third_obj[nameArr[0]] = nameArr[2];
                this.all_filde_value_third[nameArr[0]] = this.add_input_val;
                this.third_list.push(nameArr[0]);
                let pass_key = 'no';
                for (let i = 0; i < this.third_list.length; i++) {
                    if (nameArr[0] == this.third_list[i]) {
                        pass_key = 'yes';
                    }
                }
                if (pass_key == 'no') {
                    this.third_list.push(nameArr[0]);
                }

            }
        } else {
            for (let i = 0; i < this.list_ext_obj.length; i++) {
                if (this.list_ext_obj[i] == nameArr[0]) {
                    console.log('u r in for loop if ');
                    testt = 'yes'
                    ind = i;
                }
            }
            if (testt == 'yes') {
                console.log(' u r in testt if');
                this.list_ext_obj[ind].filde_vlue = nameArr[2];
                this.all_filde_value_ext[ind].filde_vlue = this.add_input_val;

            } else {
                console.log(' u r in testt else');
                this.list_ext_obj[nameArr[0]] = nameArr[2];
                this.all_filde_value_ext[nameArr[0]] = this.add_input_val;
                this.ex_list.push(nameArr[0]);
                let pass_key = 'no';
                for (let i = 0; i < this.ex_list.length; i++) {
                    if (nameArr[0] == this.ex_list[i]) {
                        pass_key = 'yes';
                    }
                }
                if (pass_key == 'no') {
                    this.ex_list.push(nameArr[0]);
                }

            }

        }
        console.log('Store field data OUTPUT : ', JSON.parse(JSON.stringify(this.list_first_obj)));
        console.log('Store field data OUTPUT : ', JSON.parse(JSON.stringify(this.list_second_obj)));
        console.log('Store field data OUTPUT : ', JSON.parse(JSON.stringify(this.list_third_obj)));
        console.log('Store field data OUTPUT : ', JSON.parse(JSON.stringify(this.list_ext_obj)));



        console.log('first_list :- ', JSON.stringify(this.all_filde_value));
        console.log('second_list :- ', JSON.stringify(this.all_filde_value_second));
        console.log('third_list :- ', JSON.stringify(this.all_filde_value_third));
        console.log('ex_list :- ', JSON.stringify(this.all_filde_value_ext));

    }
    add_sig(event) {
        // sig_filde_id
        // alert('yash');
        // console.log('this.sig_filde_id :- ', this.sig_filde_id);
        // this.list_ext_obj[this.sig_filde_id] = this.sig_con_id;

        // console.log(' file uplode json 1111 :- ',JSON.stringify(this.file_upload_fildeid));
        // let list_submission_obj_2 = {};
        // list_submission_obj_2['Other_fields_data__c'] = JSON.stringify(this.list_ext_obj);
        for (let k = 0; k < this.sig_fildeid.length; k++) {
            var sig_f_id = this.sig_fildeid[k];
            console.log('test :- ', sig_f_id);
            var sig_con_id = this.sig_u_map[sig_f_id];
            this.list_ext_obj[sig_f_id] = sig_con_id;
        }
        // for(let i=0; i<this.sig_fildeid.length; i++){
        //     var sigfildeid = this.sig_fildeid[i];
        //     // var only_f_id = fildeid.split('<!QF!>');
        //     console.log('for loop fildeid :- ',sigfildeid);
        //     var sigcon_id = this.sig_u_map[sigfildeid];
        //     this.list_ext_obj[sigfildeid] = sigcon_id;
        // }
        for (let i = 0; i < this.file_upload_fildeid.length; i++) {
            var fildeid = this.file_upload_fildeid[i];
            var only_f_id = fildeid.split('<!QF!>');
            console.log('for loop fildeid :- ', only_f_id[0]);
            var con_id = this.file_u_map[only_f_id[0]];
            this.list_ext_obj[only_f_id[0]] = con_id;
        }
        console.log(' last ex object list :- ', JSON.stringify(this.list_ext_obj));
        var ex_object_list = JSON.stringify(this.list_ext_obj);

        console.log('submit_id :- ', this.sub_id);
        update_ext_list({
                acc2: ex_object_list,
                submit_id: this.sub_id
            })
            .then(data => {
                console.log(data);

            })
            .catch(error => {
                console.log({
                    error
                });
            })

    }

    thankyou = false;
    thankyoutype;
    label;
    changelabel;
    text;
    richtext;
    url;

    redirecttothankyou(submissionid) {
        // TO REDIRECT TO THANK YOU PAGE
        getthankyoupage({
                currentformid: this.formid
            })
            .then(result => {
                this.thankyoutype = result.Thankyou_Page_Type__c;
                this.label = result.ThankYou_Label__c;
                this.changelabel = result.ThankYou_Label__c;
                this.text = result.Thankyou_Text__c;
                this.richtext = result.Thankyou_Text__c;
                this.url = result.Thank_you_URL__c;

                if (result.Thankyou_Page_Type__c == 'None') {} else if (result.Thankyou_Page_Type__c == 'Show Text') {
                    this.thankyou = true;
                    this.isPreviewForm = false;
                } else if (result.Thankyou_Page_Type__c == 'Show HTML block') {
                    this.thankyou = true;
                    this.isPreviewForm = false;
                } else if (result.Thankyou_Page_Type__c == 'Redirect to a webpage') {
                    window.open(result.Thank_you_URL__c);
                } else if (result.Thankyou_Page_Type__c == 'Show text, then redirect to web page') {
                    this.thankyou = true;
                    this.isPreviewForm = false;
                } else if (result.Thankyou_Page_Type__c == 'Show report of User data') {}
            })

            .catch(error => {
                console.log(error);
                this.spinnerDataTable = false;
                this.message = 'Something Went Wrong In preview Page';
                this.showerror();
            });
        // TO REDIRECT TO THANK YOU PAGE
    }
    sendnotification(submissionids) {
        sendemailaftersubmission({
                formid: this.formid,
                submissionid: submissionids
            })
            .then(result => {
                console.log(result);
            }).catch(error => {
                console.log('error;= ', JSON.stringify(error.body.message));
                this.message = 'Something Went Wrong In preview Page';
                this.showerror();
            })
    }
    convertedDataURIsin(event) {
        this.sin_data_id = event.detail.con_id;
        this.sig_filde_id = event.detail.filde_id;
        // console.log(' u r in per :- ', this.sin_data_id);
        // console.log(' u r in per sig_filde_id:- ', this.sig_filde_id);

        // @track sig_upload = {};
        // @track sig_fildeid = [];
        this.sig_upload[this.sig_filde_id] = this.sin_data_id;
        let add_id = 'yes';
        if (this.sig_fildeid.length == 0) {
            // this.sig_fildeid.push(this.file_upload_id); 
            this.sig_fildeid.push(this.sig_filde_id);
        }
        for (let i = 0; i < this.sig_fildeid.length; i++) {
            // alert('u r in loop');
            // if(this.file_upload_fildeid[i] == this.file_upload_id){
            if (this.sig_fildeid[i] == this.sig_filde_id) {
                // alert('u r in in of no');
                add_id = 'no';
            }
        }
        if (add_id == 'yes') {
            // alert('u r in in of yes');
            // this.sig_fildeid.push(this.file_upload_id); 
            this.sig_fildeid.push(this.sig_filde_id);

        }
        console.log(' file uplode json 1111 :- ', JSON.stringify(this.sig_upload));
        console.log(' file uplode json 1111 :- ', JSON.stringify(this.sig_fildeid));
    }
    add_file_upload_josn(event) {
        //     @track file_upload = {};
        // @track file_upload_fildeid = [];
        this.file_upload_id = event.detail.filde_id;
        this.file_upload_url = event.detail.con_id;
        let file_name = event.detail.fileName;
        let file_titel = event.detail.contentType;
        let add_id = 'yes';
        let full_id = this.file_upload_id + '<!QF!>' + file_name + '<!QF!>' + file_titel;
        console.log('full id :- ', full_id);
        // this.sin_data_id = event.detail.con_id;
        // this.sig_filde_id = event.detail.filde_id;


        // this.file_upload[this.file_upload_id] = this.file_upload_url;
        this.file_upload[full_id] = this.file_upload_url;
        console.log(' file uplode json :- ', JSON.stringify(this.file_upload));
        if (this.file_upload_fildeid.length == 0) {
            // this.file_upload_fildeid.push(this.file_upload_id); 
            this.file_upload_fildeid.push(full_id);
        }
        for (let i = 0; i < this.file_upload_fildeid.length; i++) {
            // alert('u r in loop');
            // if(this.file_upload_fildeid[i] == this.file_upload_id){
            if (this.file_upload_fildeid[i] == full_id) {
                // alert('u r in in of no');
                add_id = 'no';
            }
        }
        if (add_id == 'yes') {
            // alert('u r in in of yes');
            // this.file_upload_fildeid.push(this.file_upload_id); 
            this.file_upload_fildeid.push(full_id);

        }
        console.log(' file uplode json 1111 :- ', JSON.stringify(this.file_upload_fildeid));

        // console.log(' u r in per :- ', this.sin_data_id);
        // console.log(' u r in per sig_filde_id:- ', this.sig_filde_id);
    }

    @api showerror() {
        console.log('this.error_popup => ', this.error_popup);
        this.error_popup = true;
        let errordata = {
            header_type: 'Preview page',
            Message: message
        };
        const showpopup = new CustomEvent('showerrorpopup', {
            detail: errordata
        });
        this.dispatchEvent(showpopup);
    }

    regeneratecaptcha() {
        if (this.captchavalue == 'Normal_Captcha') {
            this.template.querySelector('c-captcha-type').generate_new_normal_captcha();
        } else if (this.captchavalue == 'Maths_Captcha') {
            this.template.querySelector('c-captcha-type').generate_new_math_captcha();
        } else if (this.captchavalue == 'Slider_Captcha') {
            this.template.querySelector('c-captcha-type').generate_new_slider_captcha();
        } else if (this.captchavalue == 'Image_Captcha') {
            this.template.querySelector('c-captcha-type').getrendomcolore();
        }
    }

    add_lookyp_fildes() {
        var apis_of_2obj = Object.keys(this.list_second_obj);
        for (let i = 0; i < apis_of_2obj.length; i++) {
            // alert('test by yash on submit');
            console.log(' 2 obj key :- ', apis_of_2obj[i]);
            for (let j = 0; j < this.lookup_2obj.length; j++) {
                if (apis_of_2obj[i] == this.lookup_2obj[j]) {
                    let filde_api = apis_of_2obj[i];
                    if (this.list_second_obj[filde_api] != null && this.list_second_obj[filde_api] != undefined && this.list_second_obj[filde_api] != '') {
                        this.create_chi = false;
                        // alert('done');
                    }
                }
            }
        }
    }
    add_lookyp_fildes_2() {
        var apis_of_3obj = Object.keys(this.list_third_obj);
        for (let i = 0; i < apis_of_3obj.length; i++) {
            // alert('test by yash on submit');
            console.log(' 3 obj key :- ', apis_of_3obj[i]);
            for (let j = 0; j < this.lookup_3obj.length; j++) {
                if (apis_of_3obj[i] == this.lookup_3obj[j]) {
                    let filde_api = apis_of_3obj[i];
                    if (this.list_third_obj[filde_api] != null && this.list_third_obj[filde_api] != undefined && this.list_third_obj[filde_api] != '') {
                        this.create_chi_2 = false;
                        
                    }
                }
            }
        }
    }
    @api show_msg_pop() {
        let toast_error_msg = 'your signature is save successfully';
        this.template.querySelector('c-toast-component').showToast('success', toast_error_msg, 3000);
    }

}