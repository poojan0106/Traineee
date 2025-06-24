import {
    LightningElement,
    track,
    api
} from 'lwc';
import GetStyles from '@salesforce/apex/FormBuilderController.GetStyles';
import StoreStyles from '@salesforce/apex/FormBuilderController.StoreStyles';
import StoreLabelStyles from '@salesforce/apex/FormBuilderController.StoreLabelStyles';
import StoreFormStyles from '@salesforce/apex/FormBuilderController.StoreFormStyles';
import StorePageStyles from '@salesforce/apex/FormBuilderController.StorePageStyles';
import UploadFormImage from '@salesforce/apex/FormBuilderController.UploadFormImage';
import UploadPageImage from '@salesforce/apex/FormBuilderController.UploadPageImage';
import StoreHoverStyles from '@salesforce/apex/FormBuilderController.StoreHoverStyles';
import StoreFocusStyles from '@salesforce/apex/FormBuilderController.StoreFocusStyles';
import RemoveFormImage from '@salesforce/apex/FormBuilderController.RemoveFormImage';
import RemovePageImage from '@salesforce/apex/FormBuilderController.RemovePageImage';
import StoreBtnStyles from '@salesforce/apex/FormBuilderController.StoreBtnStyles';
import StoreBtnposition from '@salesforce/apex/FormBuilderController.StoreBtnposition';
import formdetails from '@salesforce/apex/FormBuilderController.formdetails';
import getBGImages from '@salesforce/apex/FormBuilderController.getBGImages';
import imagecross from '@salesforce/resourceUrl/imagecross';
import plus from '@salesforce/resourceUrl/plusimage';
import designcss from '@salesforce/resourceUrl/designcss'
import {
    loadStyle,
    loadScript
} from 'lightning/platformResourceLoader';

export default class DesignSectionComponent extends LightningElement {
    @track StylesProp;
    @api recordid;
    @api recordId;
    @track formimageurl;
    @track formimage = false;
    @track pageimageurl;
    @track pageimage = false;
    @track spinnerdatatable = true;

    @track formproperties;
    @track pageproperties;
    @track labelproperties;
    @track hoverproperties;
    @track focusproperties;
    @track buttonproperties;
    @track fieldproperties;

    cross = imagecross;
    plus = plus;

    //Form
    @track formWidth;
    @track headpadding;
    @track footpadding;
    @track leftpadding;
    @track rightpadding;
    @track colorpicker;
    @track formbackSize;
    @track formbackpagePostion;
    @track formbackpageRepeat;
    @track formbackgroundPagefixposition;

    //Page
    @track toppadding;
    @track bottompadding;
    @track pagecolorpicker;
    @track backSize;
    @track backpagePostion;
    @track backpageRepeat;
    @track backgroundPagefixposition;
    @track formbordercolor;
    @track formborderStyle;
    @track formborderwidth;
    @track formborderradius;

    //Label
    @track labelalign;
    @track labelfontfamily;
    @track labelfontweight;
    @track labelfontstyle;
    @track labelfontsize;
    @track labelineheight;
    @track labelcolor;
    @track labeltopmargin;
    @track labelbottommargin;

    //Input
    @track bgInput;
    @track borderInput;
    @track borderStyle;
    @track borderWidth;
    @track borderRadius;
    @track inputfontfamily;
    @track inputfontweight;
    @track inputfontstyle;
    @track inputfontsize;
    @track inputlineheight;
    @track bordertextcolor;
    @track inputHpadding;
    @track inputVpadding;

    //Button
    @track btnJustify;
    @track btncolor;
    @track btnborderstyle;
    @track btnborderwidth;
    @track btnborderradius;
    @track buttonfontfamily;
    @track buttonfontweight;
    @track buttonfontstyle;
    @track buttonfontsize;
    @track btnWidth;
    @track btnHeight;
    @track btnGap;
    @track btnHorizontalPadding;
    @track btnVerticalPadding;

    //Hover
    @track fieldhoverbg;
    @track fieldhoverborderColor;
    @track fieldhovercolor;
    @track hoverlabelcolor;


    //Focus
    @track fieldfocusbg;
    @track fieldfocusborderColor;
    @track fieldfocuscolor;
    @track focuslabelcolor;


    fileData = {};
    fileData1 = {};
    showquickform = false;

    //error_popup
    @api error_popup = false;
    @track message;

    //Design Drop Down Options Creation
    get optlabelalign() {
        if (this.StylesProp != null) {
            return this.optionsCreater(this.StylesProp.AlignmentProp);
        }
    }
    get optlabelfontfamily() {
        if (this.StylesProp != null) {
            return this.optionsCreater(this.StylesProp.FontProp);
        }
    }
    //   get optlabelfontweight(){
    //    if(this.StylesProp!=null)
    //    {return this.optionsCreater(this.StylesProp.FontWeightProp);}
    //   }
    get optlabelfontstyle() {
        if (this.StylesProp != null) {
            return this.optionsCreater(this.StylesProp.FontStyleProp);
        }
    }
    get optlabelineheight() {
        if (this.StylesProp != null) {
            return this.optionsCreater(this.StylesProp.FontLineHeightProp);
        }
    }
    get optbackSize() {
        if (this.StylesProp != null) {
            return this.optionsCreater(this.StylesProp.BgsizeProp);
        }
    }
    get optbackpagePostion() {
        if (this.StylesProp != null) {
            return this.optionsCreater(this.StylesProp.BgPositionProp);
        }
    }
    get optbackpageRepeat() {
        if (this.StylesProp != null) {
            return this.optionsCreater(this.StylesProp.BgRepeatProp);
        }
    }

    get optBackgroundPagefixposition() {
        if (this.StylesProp != null) {
            return this.optionsCreater(this.StylesProp.FixPosProp);
        }
    }
    get optborderStyle() {
        if (this.StylesProp != null) {
            return this.optionsCreater(this.StylesProp.BorderStylesProp);
        }
    }
    get optFormdirection() {
        if (this.StylesProp != null) {
            return this.optionsCreater(this.StylesProp.FormDirectionProp);
        }
    }
    get optformbackSize() {
        if (this.StylesProp != null) {
            return this.optionsCreater(this.StylesProp.BgsizeProp);
        }

    }
    get optformbackpagePostion() {
        if (this.StylesProp != null) {
            return this.optionsCreater(this.StylesProp.BgPositionProp);
        }

    }
    get optformbackpageRepeat() {
        if (this.StylesProp != null) {
            return this.optionsCreater(this.StylesProp.BgRepeatProp);
        }

    }
    get optformbackgroundPagefixposition() {
        if (this.StylesProp != null) {
            return this.optionsCreater(this.StylesProp.FixPosProp);
        }
    }
    get optformborderStyle() {
        if (this.StylesProp != null) {
            return this.optionsCreater(this.StylesProp.BorderStylesProp);
        }
    }


    get optinputfontweight() {
        if (this.StylesProp != null) {
            const array = JSON.parse(JSON.stringify(this.StylesProp.FontWeightProp))
            let sortedarray = array.sort((p1, p2) => (p1.sr__c > p2.sr__c) ? 1 : (p1.sr__c < p2.sr__c) ? -1 : 0);
            return this.optionsCreater(sortedarray);
        }

    }

    get optinputfontstyle() {
        if (this.StylesProp != null) {
            return this.optionsCreater(this.StylesProp.FontStyleProp);
        }
    }
    get optinputlineheight() {
        if (this.StylesProp != null) {
            return this.optionsCreater(this.StylesProp.FontLineHeightProp);
        }
    }
    get optbtnborderstyle() {
        if (this.StylesProp != null) {
            return this.optionsCreater(this.StylesProp.BorderStylesProp);
        }
    }
    get optbtnJustify() {
        if (this.StylesProp != null) {
            const array = JSON.parse(JSON.stringify(this.StylesProp.Btn_AlignmentProp))
            let sortedarray = array.sort((p1, p2) => (p1.Sr__c > p2.Sr__c) ? 1 : (p1.Sr__c < p2.Sr__c) ? -1 : 0);
            return this.optionsCreater(sortedarray);
        }
    }
    get optbuttonfontfamily() {
        if (this.StylesProp != null) {
            return this.optionsCreater(this.StylesProp.FontProp);
        }

    }
    //    get optbuttonfontweight(){
    //     if(this.StylesProp!=null)
    //     {return this.optionsCreater(this.StylesProp.FontWeightProp);}

    //    }
    get optbuttonfontstyle() {
        if (this.StylesProp != null) {
            return this.optionsCreater(this.StylesProp.FontStyleProp);
        }

    }
    get optinputfontfamily() {
        if (this.StylesProp != null) {
            return this.optionsCreater(this.StylesProp.FontProp);
        }

    }

    renderedCallback() {
        loadStyle(this, designcss);
    }

    connectedCallback() {
        try {
        // loadStyle(this, designcss + '/designcss.css');
        this.spinnerdatatable = true;
        const cssevent1 = new CustomEvent("getpagecss", {
            detail: Array[0]
        });
        console.log('252 Event:-- ' + cssevent1);
        this.dispatchEvent(cssevent1);

        const cssevent2 = new CustomEvent("getformcss", {
            detail: Array[0]
        });
        console.log('258 Event:-- ' + cssevent2);
        this.dispatchEvent(cssevent2);

        const cssevent3 = new CustomEvent("getbuttoncss", {
            detail: Array[0]
        });
        console.log('264 Event:-- ' + cssevent3);
        this.dispatchEvent(cssevent3);
        //get Styles Metadata
        GetStyles({
                id: this.recordid
            })
            .then(result => {
                console.log('GetStyles called');
                this.StylesProp = result;
                console.log('Log->>>' + JSON.stringify(this.StylesProp));
            }).catch(error => {
                console.log(error);
                this.message = 'Something Went Wrong In Design Section Page';
                this.showerror();
            })

        getBGImages({
                id: this.recordid
            })
            .then(result => {
                console.log('bgimage --> ' + result);
                let str = String(result);
                let Arr = str.split(',');
                console.log('Arr0 --> ' + Arr[0]);
                console.log('Arr1 --> ' + Arr[1]);
                if (Arr[0] == '/sfc/servlet.shepherd/version/download/null') {
                    this.formimage = false;
                } else {
                    this.formimageurl = Arr[0];
                    this.formimage = true;
                }
                if (Arr[1] == '/sfc/servlet.shepherd/version/download/null') {
                    this.pageimage = false;
                } else {
                    this.pageimageurl = Arr[1];
                    this.pageimage = true;
                }
                this.spinnerdatatable = false;
            }).catch(error => {
                console.log(error);
                this.message = 'Something Went Wrong In Design Section Page';
                this.showerror();
            })

        formdetails({
                id: this.recordid
            })
            .then(result => {
                this.formproperties = result.Form_Styling__c;
                this.pageproperties = result.Page_CSS__c;
                this.buttonproperties = result.Button_CSS__c;
                this.buttonproperties = this.buttonproperties.concat(result.Button_Position__c);
                this.labelproperties = result.Label_CSS__c;
                this.fieldproperties = result.All_Field_Styling__c;
                this.hoverproperties = result.All_Field_Hover__c;
                this.focusproperties = result.All_Field_Focus__c;
                this.FormCSS();
                this.PageCSS();
                this.FieldCSS();
                this.ButtonCSS();
                this.HoverCSS();
                this.FocusCSS();
                this.LabelCSS();
            }).catch(error =>{
                this.spinnerdatatable = false;
                console.log('line 368',error);
                // this.message = 'Something Went Wrong In Design Section Page';
                // this.showerror();    
            })
        } catch (error) {
            this.spinnerdatatable = false;
            console.log('line 374',error);
            this.message = 'Something Went Wrong In Design Section Page';
            this.showerror();
        }

    }

    FormCSS() {
        // getFormCSS({
        //     id: this.recordid
        // })
        // .then(result => {
        console.log('formproperties formwidth' + this.formproperties);
        let str = this.formproperties;

        this.formWidth = (((str.split('width:'))[1].split(';'))[0]).slice(0, -1);
        if (this.formWidth == null || this.formWidth == undefined) {
            this.formWidth = 100;
        }

        this.headpadding = (((str.split('padding-top:'))[1].split(';'))[0]).slice(0, -1);
        if (this.headpadding == null || this.headpadding == undefined) {
            this.headpadding = 0;
        }

        this.footpadding = (((str.split('padding-bottom:'))[1].split(';'))[0]).slice(0, -1);
        if (this.footpadding == null || this.footpadding == undefined) {
            this.footpadding = 0;
        }

        this.leftpadding = (((str.split('padding-left:'))[1].split(';'))[0]).slice(0, -1);
        if (this.leftpadding == null || this.leftpadding == undefined) {
            this.leftpadding = 0;
        }

        this.rightpadding = (((str.split('padding-right:'))[1].split(';'))[0]).slice(0, -1);
        if (this.rightpadding == null || this.rightpadding == undefined) {
            this.rightpadding = 0;
        }

        this.colorpicker = (((str.split('background-color:'))[1].split(';'))[0]);
        if (this.colorpicker == null || this.colorpicker == undefined) {
            this.colorpicker = '#FFFFFF';
        }

        this.formbackSize = (((str.split('background-size:'))[1].split(';'))[0]);
        if (this.formbackSize == null || this.formbackSize == undefined) {
            this.formbackSize = 'auto';
        }

        this.formbackpagePostion = (((str.split('background-position:'))[1].split(';'))[0]);
        if (this.formbackpagePostion == null || this.formbackpagePostion == undefined) {
            this.formbackpagePostion = 'top center';
        }

        this.formbackpageRepeat = (((str.split('background-repeat:'))[1].split(';'))[0]);
        if (this.formbackpageRepeat == null || this.formbackpageRepeat == undefined) {
            this.formbackpageRepeat = 'Repeat';
        }

        this.formbackgroundPagefixposition = (((str.split('background-attachment:'))[1].split(';'))[0]);
        if (this.formbackgroundPagefixposition == null || this.formbackgroundPagefixposition == undefined) {
            this.formbackgroundPagefixposition = 'Fixed';
        }

        // }).catch(error => {
        // console.log(error);
        // this.message = 'Something Went Wrong In Design Section Page';
        // this.showerror(this.message);
        // })
    }

    PageCSS() {
        // getPageCSS({
        //     id: this.recordid
        // })
        //     .then(result => {
        console.log('pagecss --> ' + this.pageproperties);
        let str = this.pageproperties;

        this.toppadding = (((str.split('padding-top:'))[1].split(';'))[0]).slice(0, -1);
        if (this.toppadding == null || this.toppadding == undefined) {
            this.toppadding = 0;
        }

        this.bottompadding = (((str.split('padding-bottom:'))[1].split(';'))[0]).slice(0, -1);
        if (this.bottompadding == null || this.bottompadding == undefined) {
            this.bottompadding = 0;
        }

        this.pagecolorpicker = (((str.split('background-color:'))[1].split(';'))[0]);
        if (this.pagecolorpicker == null || this.pagecolorpicker == undefined) {
            this.pagecolorpicker = '#FFFFFF';
        }

        this.formborderStyle = (((str.split('border-style:'))[1].split(';'))[0]);
        if (this.formborderStyle == null || this.formborderStyle == undefined) {
            this.formborderStyle = 'Solid';
        }

        this.formborderwidth = (((str.split('border-width:'))[1].split(';'))[0]).slice(0, -2);
        if (this.formborderwidth == null || this.formborderwidth == undefined) {
            this.formborderwidth = 0;
        }

        this.formborderradius = (((str.split('border-radius:'))[1].split(';'))[0]).slice(0, -2);
        if (this.formborderradius == null || this.formborderradius == undefined) {
            this.formborderradius = 0;
        }

        this.formbordercolor = (((str.split('border-color:'))[1].split(';'))[0]);
        if (this.formbordercolor == null || this.formbordercolor == undefined) {
            this.formbordercolor = '#000000';
        }

        this.backSize = (((str.split('background-size:'))[1].split(';'))[0]);
        if (this.backSize == null || this.backSize == undefined) {
            this.backSize = 'auto';
        }

        this.backpagePostion = (((str.split('background-position:'))[1].split(';'))[0]);
        if (this.backpagePostion == null || this.backpagePostion == undefined) {
            this.backpagePostion = 'top center';
        }

        this.backpageRepeat = (((str.split('background-repeat:'))[1].split(';'))[0]);
        if (this.backpageRepeat == null || this.backpageRepeat == undefined) {
            this.backpageRepeat = 'Repeat';
        }

        this.backgroundPagefixposition = (((str.split('background-attachment:'))[1].split(';'))[0]);
        if (this.backgroundPagefixposition == null || this.backgroundPagefixposition == undefined) {
            this.backgroundPagefixposition = 'Fixed';
        }

        // }).catch(error => {
        // console.log(error);
        // this.message = 'Something Went Wrong In Design Section Page';
        // this.showerror(this.message);
        // })
    }

    LabelCSS() {
        // getLabelCSS({
        //     id: this.recordid
        // })
        //     .then(result => {
        console.log('labelcss --> ' + this.labelproperties);
        // console.log('getfieldCSS formwidth' + result);
        let str = this.labelproperties;

        this.labeltopmargin = (((str.split('margin-top:'))[1].split(';'))[0]).slice(0, -2);
        if (this.labeltopmargin == null || this.labeltopmargin == undefined) {
            this.labeltopmargin = 0;
        }

        this.labelbottommargin = (((str.split('margin-bottom:'))[1].split(';'))[0]).slice(0, -2);
        if (this.labelbottommargin == null || this.labelbottommargin == undefined) {
            this.labelbottommargin = 0;
        }

        this.labelcolor = (((str.split(';color:'))[1].split(';'))[0]);
        if (this.labelcolor == null || this.labelcolor == undefined) {
            this.labelcolor = '#000000';
        }

        this.labelalign = (((str.split('justify-content:'))[1].split(';'))[0]);
        if (this.labelalign == null || this.labelalign == undefined) {
            this.labelalign = 'Left';
        }

        this.labelfontfamily = (((str.split('font-family:'))[1].split(';'))[0]);
        if (this.labelfontfamily == null || this.labelfontfamily == undefined) {
            this.labelfontfamily = 'Arial';
        }

        this.labelfontweight = (((str.split('font-weight:'))[1].split(';'))[0]);
        if (this.labelfontweight == null || this.labelfontweight == undefined) {
            this.labelfontweight = 'Normal';
        }

        this.labelfontsize = (((str.split('font-size:'))[1].split(';'))[0]).slice(0, 2);
        if (this.labelfontsize == null || this.labelfontsize == undefined) {
            this.labelfontsize = 12;
        }

        this.labelfontstyle = (((str.split('font-style:'))[1].split(';'))[0]);
        if (this.labelfontstyle == null || this.labelfontstyle == undefined) {
            this.labelfontstyle = 'Normal';
        }

        this.labelineheight = (((str.split('line-height:'))[1].split(';'))[0]);
        if (this.labelineheight == null || this.labelineheight == undefined) {
            this.labelineheight = '1';
        }

        // }).catch(error => {
        // console.log(error);
        // this.message = 'Something Went Wrong In Design Section Page';
        // this.showerror(this.message);
        // })
    }

    FieldCSS() {
        // getFieldCSS({
        //     id: this.recordid
        // })
        //     .then(result => {
        console.log('fieldcss --> ' + this.fieldproperties);
        let str = this.fieldproperties;

        this.bgInput = (((str.split('background-color:'))[1].split(';'))[0]);
        if (this.bgInput == null || this.bgInput == undefined) {
            this.bgInput = '#FFFFFF';
        }

        this.borderInput = (((str.split('border-color:'))[1].split(';'))[0]);
        if (this.borderInput == null || this.borderInput == undefined) {
            this.borderInput = '#000000';
        }

        this.borderStyle = (((str.split('border-style:'))[1].split(';'))[0]);
        if (this.borderStyle == null || this.borderStyle == undefined) {
            this.borderStyle = 'Solid';
        }

        this.borderWidth = (((str.split('border-width:'))[1].split(';'))[0]).slice(0, -2);
        if (this.borderWidth == null || this.borderWidth == undefined) {
            this.borderWidth = 1;
        }

        this.borderRadius = (((str.split('border-radius:'))[1].split(';'))[0]).slice(0, -2);
        if (this.borderRadius == null || this.borderRadius == undefined) {
            this.borderRadius = 1;
        }

        this.inputfontfamily = (((str.split('font-family:'))[1].split(';'))[0]);
        if (this.inputfontfamily == null || this.inputfontfamily == undefined) {
            this.inputfontfamily = 'Arial';
        }

        this.inputfontweight = (((str.split('font-weight:'))[1].split(';'))[0]);
        console.log('inputfontweight --> ' + this.inputfontweight);
        if (this.inputfontweight == null || this.inputfontweight == undefined) {
            this.inputfontweight = 'Normal';
        }

        this.inputfontstyle = (((str.split('font-style:'))[1].split(';'))[0]);
        console.log('inputfontstyle --> ' + this.inputfontstyle);
        if (this.inputfontstyle == null || this.inputfontstyle == undefined) {
            this.inputfontstyle = 'Normal';
        }

        this.inputfontsize = (((str.split('font-size:'))[1].split(';'))[0]).slice(0, -2);
        if (this.inputfontsize == null || this.inputfontsize == undefined) {
            this.inputfontsize = 12;
        }


        this.bordertextcolor = (((str.split(';color:'))[1].split(';'))[0]);
        if (this.bordertextcolor == null || this.bordertextcolor == undefined) {
            this.bordertextcolor = '#000000';
        }

        this.inputHpadding = (((str.split('padding-right:'))[1].split(';'))[0]).slice(0, -2);
        if (this.inputHpadding == null || this.inputHpadding == undefined) {
            this.inputHpadding = 12;
        }

        this.inputVpadding = (((str.split('padding-top:'))[1].split(';'))[0]).slice(0, -2);
        if (this.inputVpadding == null || this.inputVpadding == undefined) {
            this.inputVpadding = 12;
        }

        this.inputlineheight = (((str.split('line-height:'))[1].split(';'))[0]);
        if (this.inputlineheight == null || this.inputlineheight == undefined) {
            this.inputlineheight = '1';
        }

        // }).catch(error => {
        // console.log(error);
        // this.message = 'Something Went Wrong In Design Section Page';
        // this.showerror(this.message);
        // })
    }

    ButtonCSS() {
        // getButtonCSS({
        //     id: this.recordid
        // })
        //     .then(result => {
        console.log('buttoncss --> ' + this.buttonproperties);
        let str = this.buttonproperties;

        this.btnJustify = (((str.split('justify-content:'))[1].split(';'))[0]);
        if (this.btnJustify == null || this.btnJustify == undefined) {
            this.btnJustify = 'Center';
        }

        this.btnTextColor = (((str.split(';color:'))[1].split(';'))[0]);
        if (this.btnTextColor == null || this.btnTextColor == undefined) {
            this.btnTextColor = '#000000';
        }

        this.btnBgColor = (((str.split('background-color:'))[1].split(';'))[0]);
        if (this.btnBgColor == null || this.btnBgColor == undefined) {
            this.btnBgColor = '#FFFFFF';
        }

        this.btncolor = (((str.split('border-color:'))[1].split(';'))[0]);
        if (this.btncolor == null || this.btncolor == undefined) {
            this.btncolor = '#000000';
        }

        this.btnborderstyle = (((str.split('border-style:'))[1].split(';'))[0]);
        console.log('test btnborderstyle' + this.btnborderstyle);
        if (this.btnborderstyle == null || this.btnborderstyle == undefined) {
            this.btnborderstyle = 'Solid';
        }

        this.btnborderwidth = (((str.split('border-width:'))[1].split(';'))[0]).slice(0, -2);
        console.log('test borderwidth' + this.btnborderwidth);
        if (this.btnborderwidth == null || this.btnborderwidth == undefined) {
            this.btnborderwidth = 1;
        }

        this.btnborderradius = (((str.split('border-radius:'))[1].split(';'))[0]).slice(0, -2);
        if (this.btnborderradius == null || this.btnborderradius == undefined) {
            this.btnborderradius = 1;
        }

        this.buttonfontfamily = (((str.split('font-family:'))[1].split(';'))[0]);
        if (this.buttonfontfamily == null || this.buttonfontfamily == undefined) {
            this.buttonfontfamily = 'Arial';
        }

        this.buttonfontweight = (((str.split('font-weight:'))[1].split(';'))[0]);
        if (this.buttonfontweight == null || this.buttonfontweight == undefined) {
            this.buttonfontweight = 'Normal';
        }

        this.buttonfontstyle = (((str.split('font-style:'))[1].split(';'))[0]);
        if (this.buttonfontstyle == null || this.buttonfontstyle == undefined) {
            this.buttonfontstyle = 'Normal';
        }

        this.buttonfontsize = (((str.split('font-size:'))[1].split(';'))[0]).slice(0, -2);
        if (this.buttonfontsize == null || this.buttonfontsize == undefined) {
            this.buttonfontsize = 12;
        }

        this.btnWidth = (((str.split('width:'))[1].split(';'))[0]).slice(0, -2);
        if (this.btnWidth == null || this.btnWidth == undefined) {
            this.btnWidth = '200';
        }

        this.btnHeight = (((str.split('height:'))[1].split(';'))[0]).slice(0, -2);
        if (this.btnHeight == null || this.btnHeight == undefined) {
            this.btnHeight = '200';
        }

        // this.btnGap = (((str.split('gap:'))[1].split(';'))[0]).slice(0, -2);
        // if (this.btnGap == null || this.btnGap == undefined) {
        //     this.btnGap = '200';
        // }


        // this.btnHorizontalPadding = (((str.split('padding-left:'))[1].split(';'))[0]).slice(0,-2);
        // if (this.btnHorizontalPadding == null || this.btnHorizontalPadding == undefined) {
        //   this.btnHorizontalPadding = 12;
        // }

        // this.btnVerticalPadding = (((str.split('padding-bottom:'))[1].split(';'))[0]).slice(0,-2);
        // if (this.btnVerticalPadding == null || this.btnVerticalPadding == undefined) {
        //   this.btnVerticalPadding = 12;
        // }


        // }).catch(error => {
        // console.log(error);
        // this.message = 'Something Went Wrong In Design Section Page';
        // this.showerror(this.message);
        // })
    }

    HoverCSS() {
        // getHoverCSS({
        //     id: this.recordid
        // })
        //     .then(result => {
        let str = this.hoverproperties;
        console.log('STR hoverproperties :--> ' + str);

        this.fieldhoverbg = (((str.split('background-color:'))[1].split(';'))[0]);
        if (this.fieldhoverbg == null || this.fieldhoverbg == undefined) {
            this.fieldhoverbg = '#FFFFFF';
        }

        this.fieldhoverborderColor = (((str.split('border-color:'))[1].split(';'))[0]);
        if (this.fieldhoverborderColor == null || this.fieldhoverborderColor == undefined) {
            this.fieldhoverborderColor = '#000000';
        }

        this.fieldhovercolor = (((str.split(';color:'))[1].split(';'))[0]);
        if (this.fieldhovercolor == null || this.fieldhovercolor == undefined) {
            this.fieldhovercolor = '#000000';
        }

        // this.hoverlabelcolor = (((str.split('lcolor:'))[1].split(';'))[0]);
        // if (this.hoverlabelcolor == null || this.hoverlabelcolor == undefined) {
        //     this.hoverlabelcolor = '#000000';
        // }
        // }).catch(error => {
        // console.log(error);
        // this.message = 'Something Went Wrong In Design Section Page';
        // this.showerror(this.message);
        // })
    }

    FocusCSS() {
        // getFocusCSS({
        //     id: this.recordid
        // })
        //     .then(result => {
        let str = this.focusproperties;
        console.log('STR focusproperties :--> ' + str);

        this.fieldfocusbg = (((str.split('background-color:'))[1].split(';'))[0]);
        if (this.fieldfocusbg == null || this.fieldfocusbg == undefined) {
            this.fieldfocusbg = '#FFFFFF';
        }

        this.fieldfocusborderColor = (((str.split('border-color:'))[1].split(';'))[0]);
        if (this.fieldfocusborderColor == null || this.fieldfocusborderColor == undefined) {
            this.fieldfocusborderColor = '#000000';
        }

        this.fieldfocuscolor = (((str.split(';color:'))[1].split(';'))[0]);
        if (this.fieldfocuscolor == null || this.fieldfocuscolor == undefined) {
            this.fieldfocuscolor = '#000000';
        }

        // this.focuslabelcolor = (((str.split('lcolor:'))[1].split(';'))[0]);
        // if (this.focuslabelcolor == null || this.focuslabelcolor == undefined) {
        //     this.focuslabelcolor = '#000000';
        // }
        // }).catch(error => {
        //     console.log(error);
        //     this.message = 'Something Went Wrong In Design Section Page';
        //     this.showerror(this.message);
        // })
    }


    openpagefileUpload(event) {
        const imageevent = new CustomEvent("imagespinner", {
            detail: Array[0]
        });
        console.log('747 Event:-- ' + imageevent);
        this.dispatchEvent(imageevent);
        console.log({
            event
        });
        var file1 = [];
        const file = event.target.files[0]
        file1 = event.target.files[0];
        console.log('file1', file1);
        var reader = new FileReader()
        reader.onload = () => {
            var base64 = reader.result.split(',')[1]
            console.log('base64', base64);
            this.fileData = {
                'filename': file.name,
                'base64': base64,
                'recordId': this.recordId
            }
            console.log('filedata>>>', this.fileData);
            var ftype = this.fileData.filename.split('.')[1];
            console.log(ftype);
            UploadPageImage({
                id: this.recordid,
                body: this.fileData.base64,
                FName: this.fileData.filename,
                Type: ftype
            }).then(result => {
                console.log(result);
                let Array = result.split(',');
                const cssevent = new CustomEvent("getpagecss", {
                    detail: Array[0]
                });
                console.log('779 Event:-- ' + cssevent);
                this.dispatchEvent(cssevent);
                console.log(Array[1]);
                this.pageimageurl = Array[1];
                this.pageimage = true;
                console.log('after queryselector');
            }).catch(error => {
                console.log(error);
                this.message = 'Something Went Wrong In Design Section Page';
                this.showerror();
            })
        }
        reader.readAsDataURL(file)
    }

    openformfileUpload(event) {
        const imageevent = new CustomEvent("imagespinner", {
            detail: Array[0]
        });
        console.log('797 Event:-- ' + imageevent);
        this.dispatchEvent(imageevent);
        console.log({
            event
        });
        var file1 = [];
        const file = event.target.files[0]
        file1 = event.target.files[0];
        console.log('file1', file1);
        var reader = new FileReader()
        reader.onload = () => {
            var base64 = reader.result.split(',')[1]
            console.log('base64', base64);
            this.fileData1 = {
                'filename': file.name,
                'base64': base64,
                'recordId': this.recordId
            }
            console.log('filedata>>>', this.fileData1);
            console.log('file size ==> ',this.fileData1.base64.length);
            var ftype = this.fileData1.filename.split('.')[1];
            console.log(ftype);
            if (this.fileData1.base64.length <= 4194304) {
                UploadFormImage({
                    id: this.recordid,
                    body: this.fileData1.base64,
                    FName: this.fileData1.filename,
                    Type: ftype
                }).then(result => {
                    console.log(result);
                    let Array = result.split(',');
                    const cssevent = new CustomEvent("getformcss", {
                        detail: Array[0]
                    });
                    console.log('829 Event:-- ' + cssevent);
                    this.dispatchEvent(cssevent);
                    console.log(Array[1]);
                    this.formimageurl = Array[1];
                    this.formimage = true;
                    console.log('after queryselector');
                }).catch(error => {
                    console.log(error);
                    this.message = 'Something Went Wrong In Design Section Page';
                this.showerror();
                })
            } else{
                console.log('size is to big!!!!');
            }
        }
        reader.readAsDataURL(file)
    }

    removeFormBackground(event) {
        const imageevent = new CustomEvent("imagespinner", {
            detail: Array[0]
        });
        console.log('847 Event:-- ' + imageevent);
        this.dispatchEvent(imageevent);
        console.log('remove form bg image');
        RemoveFormImage({
                id: this.recordid
            })
            .then(result => {
                this.fileData1 = null;
                console.log(result);
                const cssevent = new CustomEvent("getformcss", {
                    detail: result
                });
                console.log('859 Event:-- ' + cssevent);
                this.dispatchEvent(cssevent);
                this.formimageurl = '';
                this.formimage = false;
                console.log('after queryselector');
            }).catch(error => {
                console.log(error);
                this.message = 'Something Went Wrong In Design Section Page';
                this.showerror();
            })
    }

    removePageBackground(event) {
        const imageevent = new CustomEvent("imagespinner", {
            detail: Array[0]
        });
        console.log('874 Event:-- ' + imageevent);
        this.dispatchEvent(imageevent);
        console.log('remove page bg image');
        RemovePageImage({
                id: this.recordid
            })
            .then(result => {
                this.fileData = null;
                console.log(result);
                const cssevent = new CustomEvent("getpagecss", {
                    detail: result
                });
                console.log('886 Event:-- ' + cssevent);
                this.dispatchEvent(cssevent);
                this.pageimageurl = '';
                this.pageimage = false;
                console.log('after queryselector ' + this.pageimage);
            }).catch(error => {
                console.log(error);
                this.message = 'Something Went Wrong In Design Section Page';
                this.showerror();
            })
    }



    // Creation of Combobox for Design part
    optionsCreater(Props) {
        try {
            let options = [];
            console.log('in optionsCreater', typeof (Props));
            for (let i = 0; i < Props.length; i++) {
                // console.log(value:Props[i].Label);
                // console.log(label:Props[i].Label);
                options.push({
                    value: Props[i].Label,
                    label: Props[i].Label
                });
                console.log('in for loop' + Props[i].Label);
            }
            options.sort();
            options.forEach(element => {
                console.log('check dataq --> ', element);
            });
            return options;
        } catch (error) {
            this.message = 'Something Went Wrong In Design Section Page';
            this.showerror();
        }
    }

    handlefieldhover(event) {
        let Name = event.target.dataset.name;
        let value = event.target.value;
        console.log(Name);
        console.log(value);
        let str = Name + value + ';';
        StoreHoverStyles({
                Value: str,
                id: this.recordid
            })
            .then(result => {
                console.log(result);
                const cssevent = new CustomEvent("hovercss", {
                    detail: result
                });
                console.log('938 Event:-- ' + cssevent);
                this.dispatchEvent(cssevent);
                console.log('after queryselector');
            }).catch(error => {
                console.log(error);
                this.message = 'Something Went Wrong In Design Section Page';
                this.showerror();
            })
    }

    handlefieldfocus(event) {
        let Name = event.target.dataset.name;
        let value = event.target.value;
        console.log(Name);
        console.log(value);
        let str = Name + value + ';';
        StoreFocusStyles({
                Value: str,
                id: this.recordid
            })
            .then(result => {
                console.log(result);
                const cssevent = new CustomEvent("focuscss", {
                    detail: result
                });
                console.log('962 Event:-- ' + cssevent);
                this.dispatchEvent(cssevent);
                console.log('after queryselector');
            }).catch(error => {
                console.log(error);
                this.message = 'Something Went Wrong In Design Section Page';
                this.showerror();
            })
    }

    handleFormCss(event) {
        let Name = event.target.dataset.name;
        let value = event.target.value;
        if (Name == 'width:' || Name == 'padding-top:' || Name == 'padding-bottom:' || Name == 'padding-left:' || Name == 'padding-right:') {
            if (value.toString().includes('+') || value.toString().includes('-') || value.toString() == null || value.toString() == undefined){
                event.target.value = 100;
                value = 100; 
            } else {

                if (value >= 100) {
                    value = 100;
                    event.target.value = 100;
                }
                if (value <= 0) {
                    value = 0;
                    event.target.value = 0;
                }
            }
            value += '%';
        }

        console.log('Name->' + Name);
        console.log('value->' + value);
        let str = Name + value + ';';
        StoreFormStyles({
                Value: str,
                id: this.recordid
            })
            .then(result => {
                console.log(result);
                const cssevent = new CustomEvent("getformcss", {
                    detail: result
                });
                console.log('995 Event:-- ' + cssevent);
                this.dispatchEvent(cssevent);
                console.log('after queryselector');
            }).catch(error => {
                console.log(error);
                this.message = 'Something Went Wrong In Design Section Page';
                this.showerror();
            })
    }

    handlepageCss(event) {
        let Name = event.target.dataset.name;
        let value = event.target.value;
        if (Name == 'width:' || Name == 'padding-top:' || Name == 'padding-bottom:' || Name == 'padding-left:' || Name == 'padding-right:') {
            if (value >= 100) {
                value = 100;
                event.target.value = 100;
            }
            if (value <= 0) {
                value = 0;
                event.target.value = 0;
            }
            value += '%';
        }
        if (Name == 'border-width:' || Name == 'border-radius:') {
            if (value <= 0){
                value = 0;
                event.target.value = 0;
            }
            value += 'px';
        }
        console.log('Name->' + Name);
        console.log('value->' + value);
        let str = Name + value + ';';
        StorePageStyles({
                Value: str,
                id: this.recordid
            })
            .then(result => {
                console.log(result);
                const cssevent = new CustomEvent("getpagecss", {
                    detail: result
                });
                console.log('1025 Event:-- ' + cssevent);
                this.dispatchEvent(cssevent);
                console.log('after queryselector');
            }).catch(error => {
                console.log(error);
                this.message = 'Something Went Wrong In Design Section Page';
                this.showerror();
            })
    }

    handleLabelCss(event) {
        let Name = event.target.dataset.name;
        let value = event.target.value;
        if (Name == 'font-size:' || Name == 'margin-top:' || Name == 'margin-bottom:') {
            if (value <= 0) {
                value = 0;
                event.target.value = 0;
            }
            value += 'px';
        }
        console.log('Name->' + Name);
        console.log('value->' + value);
        let str = Name + value + ';';
        StoreLabelStyles({
                Value: str,
                id: this.recordid
            })
            .then(result => {
                console.log(result);
                const cssevent = new CustomEvent("getlabelcss", {
                    detail: result
                });
                console.log('1052 Event:-- ' + cssevent);
                this.dispatchEvent(cssevent);
                console.log('after queryselector');
            }).catch(error => {
                console.log(error);
                this.message = 'Something Went Wrong In Design Section Page';
                this.showerror();
            })
    }

    handleFieldCss(event) {
        let Name = event.target.dataset.name;
        let value = event.target.value;
        let str = '';
        // if(Name == 'padding1'){
        //   str = 'padding-left:'+value+'px;padding-right'+value+'px;'; 
        // }
        // else if(Name == 'padding2'){
        //   str = 'padding-bottom:'+value+'px;padding-top'+value+'px;';
        // }
        // else{
        if (Name == 'font-size:' || Name == 'border-width:' || Name == 'border-radius:') {
            if (value <= 0) {
                value = 0;
                event.target.value = 0;
            }
            value += 'px';
        }
        console.log('Name->' + Name);
        console.log('value->' + value);
        str = Name + value + ';';
        // }

        if (Name == 'font-size:' || Name == 'border-width:' || Name == 'border-radius:' || Name == 'padding2' || Name == 'padding1' || Name == 'border-style:' || Name == 'font-family:' || Name == 'font-weight:' || Name == 'font-style:') {

            StoreHoverStyles({
                    Value: str,
                    id: this.recordid
                })
                .then(result => {
                    console.log(result);
                }).catch(error => {
                    console.log(error);
                    this.message = 'Something Went Wrong In Design Section Page';
                    this.showerror();
                })

            StoreFocusStyles({
                    Value: str,
                    id: this.recordid
                })
                .then(result => {
                    console.log(result);
                }).catch(error => {
                    console.log(error);
                    this.message = 'Something Went Wrong In Design Section Page';
                    this.showerror();
                })
        }
        console.log('OUTPUT : ', str);
        StoreStyles({
                Value: str,
                id: this.recordid
            })
            .then(result => {
                console.log(result);
                const cssevent = new CustomEvent("getnewcss", {
                    detail: result
                });
                console.log('1114 Event:-- ' + cssevent);
                this.dispatchEvent(cssevent);
                console.log('after queryselector');
            }).catch(error => {
                console.log(error);
                this.message = 'Something Went Wrong In Design Section Page';
                this.showerror();
            })
    }

    handleButtonCss(event) {
        let Name = event.target.dataset.name;
        let value = event.target.value;
        let str = '';
        if (Name == 'justify-content:' || Name == 'gap:') {
            if (Name == 'gap:') {
                if (value <= 0) {
                    value = 0;
                    event.target.value = 0;
                }
                value = value + 'px';
            }
            str = Name + value + ';';
            StoreBtnposition({
                    Value: str,
                    id: this.recordid
                })
                .then(result => {
                    console.log(result);
                    const cssevent = new CustomEvent("btnposition", {
                        detail: result
                    });
                    console.log('1138 Event:-- ' + cssevent);
                    this.dispatchEvent(cssevent);
                    console.log('after queryselector');
                }).catch(error => {
                    console.log(error);
                    this.message = 'Something Went Wrong In Design Section Page';
                    this.showerror();
                })
        } else {
                if (Name == 'font-size:' || Name == 'border-width:' || Name == 'border-radius:' || Name == 'width:' || Name == 'height:') {
                    if (value <= 0) {
                        value = 0;
                        event.target.value = 0;
                    }
                    value += 'px';
                }
                console.log('Name->' + Name);
                console.log('value->' + value);
                str = Name + value + ';';
            console.log('OUTPUT : ', str);
            StoreBtnStyles({
                    Value: str,
                    id: this.recordid
                })
                .then(result => {
                    console.log(result);
                    const cssevent = new CustomEvent("getbuttoncss", {
                        detail: result
                    });
                    console.log('1168 Event:-- ' + cssevent);
                    this.dispatchEvent(cssevent);
                    console.log('after queryselector');
                }).catch(error => {
                    console.log(error);
                    this.message = 'Something Went Wrong In Design Section Page';
                    this.showerror();
                })
        }
    }

    errorpopupcall(event) {
        location.reload();
    }

    @api showerror() {
        console.log('this.error_popup => ', this.error_popup);
        this.error_popup = true;
        let errordata = {
            header_type: 'Design Page',
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