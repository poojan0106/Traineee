import {
    LightningElement,
    api,
    track
} from 'lwc';
import {
    loadStyle,
    loadScript
} from 'lightning/platformResourceLoader';
import progressbar from '@salesforce/resourceUrl/progressbar'

export default class ProgressIndicator extends LightningElement {
    @track currentpage = 2;
    @track totalpage = 3;
    @track getprogreshbar = 'Select';
    @track pages = [];

    @track Progress_Bar = false;
    @track Custom_Steps = false;
    @track Standard_Steps = false;
    @track Page_Count = false;
    @track progress_bar_value = 90;
    @api progress = 'Select';

    connectedCallback() {
        this.tesmethod(this.progress);
        loadStyle(this, progressbar);
    }
    // renderedCallback() {
    //     loadStyle(this, progressbar);
    // }

    @api
    calculation(progressbar, pageindex, totalpages) {
        if (progressbar != undefined && pageindex != undefined && totalpages != undefined) {
            this.progress = progressbar;
            this.currentpage = pageindex;
            this.totalpage = totalpages;
            this.tesmethod(this.progress);
        }
    }

    @api tesmethod(strString) {
        if (strString != undefined) {
            this.getprogreshbar = strString;
            console.log('this.getprogreshbar>>', this.getprogreshbar);
            if (this.getprogreshbar == 'Select') {
                this.Progress_Bar = false;
                this.Custom_Steps = false;
                this.Standard_Steps = false;
                this.Page_Count = false;
            }
            if (this.getprogreshbar == 'Progress_Bar') {
                this.Progress_Bar = true;
                this.Custom_Steps = false;
                this.Standard_Steps = false;
                this.Page_Count = false;
                if (this.totalpage != undefined && this.currentpage != undefined) {
                    this.progress_bar_value = Math.round(((this.currentpage) / this.totalpage) * 100);
                }
            }
            if (this.getprogreshbar == 'Custom_Steps') {
                this.Progress_Bar = false;
                this.Custom_Steps = true;
                this.Standard_Steps = false;
                this.Page_Count = false;
                if (this.pages.length == 0) {
                    if (this.totalpage != undefined) {
                        for (let i = 1; i <= this.totalpage; i++) {
                            this.pages.push({
                                label: 'Page' + i,
                                value: i
                            });
                        }
                    }
                }
            }
            if (this.getprogreshbar == 'Standard_Steps') {
                this.Progress_Bar = false;
                this.Custom_Steps = false;
                this.Standard_Steps = true;
                this.Page_Count = false;
                if (this.pages.length == 0) {
                    if (this.totalpage != undefined) {
                        for (let i = 1; i <= this.totalpage; i++) {
                            this.pages.push({
                                label: 'Page' + i,
                                value: i
                            });
                        }
                    }
                }
            }
            if (this.getprogreshbar == 'Page_Count') {
                this.Progress_Bar = false;
                this.Custom_Steps = false;
                this.Standard_Steps = false;
                this.Page_Count = true;
            }
        }
    }
    @api test2() {
        alert('you are in childe');
    }


}