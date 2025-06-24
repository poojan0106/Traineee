import { LightningElement, track,api } from 'lwc';
import QRCode from './qrcode.js';

export default class QR_Code_Generator_LWC extends LightningElement {
        @api recordId;
        recId;

    renderedCallback() {
        //code
        this.recId = this.recordId;
            console.log('🎯 recordId in renderedCallback:', this.recId);
        if (this.recordId ) {
            this.renderQR(this.recordId);
        }
    }

    renderQR(value) {
        const qr = new QRCode(0, 'H');
        qr.addData(value);
        qr.make();

        const element = this.template.querySelector('.qrcode2');
        if (element) {
            element.innerHTML = qr.createSvgTag({});
        }
    }
}