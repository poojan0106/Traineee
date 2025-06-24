import { LightningElement, track } from "lwc";
import { getBarcodeScanner } from "lightning/mobileCapabilities";
import FORM_FACTOR from "@salesforce/client/formFactor";
import updateRecordName from '@salesforce/apex/Demo3.updateRecordName';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class BarcodeScanner extends LightningElement {
 barcodeScanner;
  @track showModal = false;
  @track scannedData = '';

 connectedCallback() {
   this.barcodeScanner = getBarcodeScanner();
 }


 startScanning() {
   const scanningOptions = {
     barcodeTypes: [this.barcodeScanner.barcodeTypes.QR],
     scannerSize: "FULLSCREEN",
     cameraFacing: "BACK",
     showSuccessCheckMark: true,
     enableBulkScan: true,
     enableMultiScan: true,
   };


   // Make sure BarcodeScanner is available before trying to use it
   if (this.barcodeScanner != null && this.barcodeScanner.isAvailable()) {
     this.scannedBarcodes = [];
     this.barcodeScanner
       .scan(scanningOptions)
       .then((results) => {
         this.processScannedBarcodes(results);
       })
       .catch((error) => {
         this.processError(error);
       })
       .finally(() => {
         this.barcodeScanner.dismiss();
       });
   } else {
     console.log("BarcodeScanner unavailable. Non-mobile device?");
   }
 }


processScannedBarcodes(barcodes) {
  if (barcodes && barcodes.length > 0) {
    this.scannedData = barcodes.map(b => b.value).join(', ');
    this.updateRecord();
  }
}

  updateRecord() {
    const recordId = this.scannedData;

    if (!recordId) {
      this.showToast('Error', 'Invalid QR code: No record ID found.', 'error');
      return;
    }

    updateRecordName({ recordId })
      .then(() => {
        // Ensure DOM update happens AFTER scan
        this.showToast('Success', 'Record updated successfully!', 'success');
      })
      .catch((error) => {
        const errorMsg = error.body?.message || 'Unexpected error';
        this.showToast('Error', 'Failed to update record: ' + errorMsg, 'error');
      });
  }
  showToast(title, message, variant) {
    const toast = new ShowToastEvent({
      title,
      message,
      variant,
    });
    this.dispatchEvent(toast);
  }

 processError(error) {
   // Error handling
 }

}