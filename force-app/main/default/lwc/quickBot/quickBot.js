import {
    api,
    track,
    LightningElement
} from 'lwc';
import {
    loadStyle
} from 'lightning/platformResourceLoader';
import QuickBotLogo from '@salesforce/resourceUrl/QuickBotLogo';
import QuickBotBody from '@salesforce/resourceUrl/QuickBotBody';
import QuickBot_Cross from '@salesforce/resourceUrl/QuickBot_Cross';
import QuickBotCSS from '@salesforce/resourceUrl/QuickBotCSS';
import quickbotheader from '@salesforce/label/c.QuickBot_Header';
// import sendemail from '@salesforce/apex/updateFieldsController.sendemail';
import sendemail from '@salesforce/apex/QuickFormHome.sendemail';
export default class QuickBot extends LightningElement {
    // @track spinnerdatatable = true;
    Logo = QuickBotLogo;
    Body = QuickBotBody;
    Cross = QuickBot_Cross;
    @api recordId;
    @track spinnerdatatable = false;
    @track first_icon = false;
    @track wel_message = false;
    @track feedback_form = false;
    @track showquickbot = false;
    @track showComponent = true;
    @track filename;
    @track filedata;
    @track filesData = [];
    @track FName = [];
    @track FBase64 = [];
    @track error_toast = true;
    @track totalsize = parseInt(0);


    quickbotname;
    quickbotemail;
    quickbotcc;
    quickbotmessage;
    quickbotsubject;
    emailsend;
    // file;
    fileSize;
    fileData1 = {};
    quickbotfiles = [];
    email_msg = true;
    cc_msg = true;
    name_msg = true;
    subject_msg = true;
    Message_msg = true;
    acceptedFormats = ['.jpg', '.jpeg', '.pdf', '.png'];
    fileDataMap = new Map();


    header = quickbotheader;
    get bgimg() {
        return `background-image:url(${QuickBotBody});background-repeat: no-repeat; background-size: cover;`;
    }

    connectedCallback() {
        this.spinnerdatatable = true;
        window.setTimeout(() => {
            this.spinnerdatatable = false;
        }, 4000);
        this.first_icon = true;
        window.setTimeout(() => {
            this.first_icon = true;
        }, 4000);
        this.wel_message = false;
        window.setTimeout(() => {
            this.wel_message = true;
        }, 4000);
        this.feedback_form = false;
        window.setTimeout(() => {
            this.feedback_form = true;
        }, 5500);
    }

    renderedCallback() {
        Promise.all([
                loadStyle(this, QuickBotCSS)
            ]).then(() => {
                console.log('check');
            })
            .catch(error => {
                this.message = 'Something Went Wrong In QuickBot Page';
                this.showerror(this.message);
                // console.log( error.body.message );
            });
    }

    Quickbot_name(event) {
        this.quickbotname = event.target.value;
        this.name_msg = true;
    }
    Quickbot_email(event) {
        this.quickbotemail = event.target.value;
        this.email_msg = true;
    }
    Quickbot_cc(event) {
        this.quickbotcc = event.target.value;
        this.cc_msg = true;
    }
    Quickbot_message(event) {
        this.quickbotmessage = event.target.value;
        this.Message_msg = true;

    }
    Quickbot_subject(event) {
        this.quickbotsubject = event.target.value;
        this.subject_msg = true;

    }

    handleUploadFinished(event) {
        const file = event.target.files;
        // let file = event.target.files;
        console.log('file ==>', file);
        if (event.target.files.length > 0) {
            // console.log('len of file ==>',event.target.files.length);
            for (let i = 0; i < event.target.files.length; i++) {
                var filesize = event.target.files[i].size;
                this.totalsize += parseInt(event.target.files[i].size);
                console.log('totalsize:-' + this.totalsize);
                if (this.totalsize > 3000000) {
                // if (event.target.files[i].size > this.totalsize){    
                    this.totalsize = this.totalsize - filesize;
                    console.log('totalsize after removing last file :- ' + this.totalsize);
                    // this.showToast('Error!', 'error', 'File size exceeded the upload size limit.');
                    // let toast_error_msg = 'Total size of all image cannot be greater than 3MB please try again by restarting quick bot sorry for the inconvenience.';
                    // let toast_error_msg = 'The image size exceeds the size limit. Please try again later.';
                    let toast_error_msg = 'The image was rejected by the server because the total file size is exceeds the limit.';
                    this.error_toast = true;
                    this.template.querySelector('c-toast-component').showToast('error', toast_error_msg, 3000);
                    // this.totalsize = this.totalsize - parseInt(event.target.files[i].size);
                    // console.log('total size when size is above 4MB ==>',this.totalsize);
                    // return;
                }
                else {
                let file = event.target.files[i];
                    // this.totalsize += parseInt(event.target.files[i].size);
                let reader = new FileReader();
                reader.onload = e => {
                        // var fileContents = reader.result.split(',')[1]
                    var base64 = reader.result.split(',')[1];
                        // console.log('base64 ==>', base64);
                    this.filename = file.name;
                    this.filedata = base64;
                        // this.fileDataMap.set(this.filename, this.filedata);
                        // console.log('fileDataMap ==> ' + this.fileDataMap.size);
                    this.filesData.push({
                        'fileName': file.name,
                        'filedata': base64
                    });
                    this.FName.push(file.name);
                    this.FBase64.push(base64);
                    console.log('base64 List ==> ', JSON.stringify(this.FBase64));
                };
                reader.readAsDataURL(file);
            }
            }
        }

        // ========== 
        // var file1 = [];
        // const file = event.target.files;
        // console.log('file ==>',file);
        // file1 = event.target.files;
        // console.log('file1', file1);
        // var reader = new FileReader()
        // console.log('before onload');
        // reader.onload = () => {
        //     console.log('in onload');
        //     var base64 = reader.result.split(',')[1]
        //     console.log('base64', base64);
        //     this.fileData1 = {
        //         'filename': file.name,
        //         'base64': base64,
        //         'recordId': this.recordId
        //     }
        //     console.log('filedata>>>', this.fileData1);
        //     console.log('file size ==> ', this.fileData1.base64.length);
        //     var ftype = this.fileData1.filename.split('.')[1];
        //     console.log(ftype);
        //     if (this.fileData1.base64.length <= 4194304) {
        //         // this.image = true;
        //         this.filename = this.fileData1.filename;
        //         this.filedata = this.fileData1.base64;
        //         const result = 'url("data:image/png;base64,' + this.fileData1.base64;
        //         let ele = this.template.querySelector('.imagepre');
        //         ele.style = 'height:100px; width:200px; background-image:' + result;
        //     } else {
        //         console.log('toast else');
        //         this.error_toast = true;
        //         let toast_error_msg = 'You cannot upload a image which is greater than 3MB in size.';
        //         // let toast_error_msg = 'there was an error while sending the mail';
        //         this.template.querySelector('c-toast-component').showToast('error', toast_error_msg, 3000);
        //         // var ele = this.template.querySelector('c-toast-component');
        //         // while(ele == null) {
        //         //     var ele = this.template.querySelector('c-toast-component');
        //         // }
        //         // console.log(ele);
        //         // ele.showToast('error', toast_error_msg, 3000);
        //     }
        // }
        // reader.readAsDataURL(file);
        // ================= 


        // if (fileSize > 4194304) {
        //     const event = new ShowToastEvent({
        //         title: 'Error',
        //         message: 'File size exceeds the 4MB limit',
        //         variant: 'error',
        //     });
        //     this.dispatchEvent(event);
        // }
        // const uploadedFiles = event.detail.files;
        // uploadedFiles.forEach(file => {
        //     const fileSize = file.size;
        //     console.log('File size details : ' + fileSize);
        //     // Do something with the file size here
        // });

        // console.log('uploaded files ==> ',JSON.stringify(uploadedFiles));
        // let fileList = [];
        // for (let i = 0; i < uploadedFiles.length; i++) {
        //     fileList.push(uploadedFiles[i].contentVersionId);
        // }
        // this.quickbotfiles = fileList;
    }

    removeReceiptImage(event) {
        // var index = event.currentTarget.dataset.id;
        // console.log('total size before :- ' + this.totalsize);
        // console.log('size of index ==> '+this.FBase64[index].length);
        // this.totalsize = parseInt(this.totalsize) - parseInt(this.FBase64[index].length);
        // console.log('total size after :- ' + this.totalsize);
        // this.filesData.splice(index, 1);

        // var index = event.currentTarget.dataset.id;
        // this.FBase64.splice(index,1);
        // console.log('updated list of base64 ==>  ',JSON.stringify(this.base64));


        var index = event.currentTarget.dataset.id;
        console.log('total size before :- ' + this.totalsize);
        console.log('Index-->>',index);
        console.log('size of index ==> '+this.FBase64[index].length);

        var binaryString = atob(this.FBase64[index]);
        // console.log('binaryString ==>',binaryString);    
        var byteArray = Uint8Array.from(binaryString, c => c.charCodeAt(0));
        // console.log('byteArray ==>',byteArray);   
        var sizeInBytes = byteArray.length;
        // console.log('sizeInBytes>>>',sizeInBytes);

        binaryString = parseInt(0);
        byteArray = parseInt(0);
        this.totalsize = parseInt(this.totalsize) - parseInt(sizeInBytes);
        console.log('total size after :- ' + this.totalsize);
        this.filesData.splice(index, 1);
        console.log('this.FBase64-->>',this.FBase64);
        this.FBase64.splice(index,1);
        console.log('after splice this.FBase64-->>',this.FBase64);
        console.log('this.FName-->>',this.FName);
        this.FName.splice(index,1);
        console.log('this.FName after splice-->>',this.FName);
        // let newArray = FBase64.slice(0, -1);
        // let newArray1 = FName.slice(0, -1);
        console.log('updated list of base64 ==>  ',JSON.stringify(this.FBase64));
    }

    quickbot_Submit() {

        var pattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var validation1 = pattern.test(this.quickbotemail);
        var validation2 = true;
        // let email_cc = this.quickbotcc;
        // if (email_cc == undefined) {
        //     email_cc = '';
        // }
        // if (email_cc.length > 0) {
        //     validation2 = pattern.test(this.quickbotcc);
        // }

        // let ccemail = '';
        // if (validation2) {
        //     ccemail = this.quickbotcc;
        // }

        if ((this.quickbotname == undefined) || (this.quickbotname == '')) {
            this.name_msg = false;
        } else if (validation1 == false) {
            this.email_msg = false;
        } else if ((validation2 == false)) {
            this.cc_msg = false;
        } else if (this.quickbotsubject == undefined || (this.quickbotsubject == '')) {
            this.subject_msg = false;
        } else if (this.quickbotmessage == undefined || (this.quickbotmessage == '')) {
            this.Message_msg = false;
        } else {
            console.log('into else part ==>');
            this.email_msg = true;
            // const value = false;
            // const valueChangeEvent = new CustomEvent("valuechange", {
            //     detail: {
            //         value
            //     }
            // });
            // // Fire the custom event
            // this.dispatchEvent(valueChangeEvent);


            // console.log('in submit fileDataMap ==> ' + this.fileDataMap.size);
            console.log('submit fbase64: ' + this.FBase64);
            console.log('fbase64: ' + this.FBase64.length);
            sendemail({
                    // recordId: this.recordId,
                    name: this.quickbotname,
                    email: this.quickbotemail,
                    subject: this.quickbotsubject,
                    body: this.quickbotmessage,
                    // data: this.filedata,
                    // fileDataMap: this.fileDataMap,
                    fname: this.FName,
                    fbase64: this.FBase64,
                })
                .then(result => {
                    // this.totalsize = 0;
                    this.emailsend = true;
                    this.dispatchEvent(new CustomEvent('botclose', {
                        detail: this.emailsend
                    }));
                    this.dispatchEvent(new CustomEvent('success'));
                    console.log('send email', result);
                }).catch(error => {
                    this.emailsend = false;
                    this.dispatchEvent(new CustomEvent('botclose', {
                        detail: this.emailsend
                    }));
                    this.dispatchEvent(new CustomEvent('error'));
                    console.log('Send Email Error ==>', error);
                    this.message = 'Something Went Wrong In Quick Bot Page';
                    this.showerror(this.message);
                });

            const value = false;
            const valueChangeEvent = new CustomEvent("valuechange", {
                detail: {
                    value
                }
            });
            // Fire the custom event
            this.dispatchEvent(valueChangeEvent);
        }

        console.log('quickbotname -->', this.quickbotname);
        console.log('quickbotemail -->', this.quickbotemail);
        console.log('quickbotmessage -->', this.quickbotmessage);
        console.log('quickbotsubject -->', this.quickbotsubject);
    }

    quickboe_close(event) {
        this.showComponent = !this.showComponent;
        const value = false;
        const valueChangeEvent = new CustomEvent("valuechange", {
            detail: {
                value
            }
        });
        // Fire the custom event
        this.dispatchEvent(valueChangeEvent);

    }

    errorpopupcall(event) {
        location.reload();
    }

    @api showerror() {
        console.log('this.error_popup => ', this.error_popup);
        this.error_popup = true;
        let errordata = {
            header_type: 'Fiedback Form error',
            Message: this.message
        };
        const showpopup = new CustomEvent('showerrorpopup', {
            detail: errordata
        });
        this.dispatchEvent(showpopup);
    }

    showerrorpopup(event) {
        console.log('showerrorpopup', event.detail.Message);
        this.template.querySelector('c-errorpopup').errormessagee(event.detail.header_type, event.detail.Message);
    }

}