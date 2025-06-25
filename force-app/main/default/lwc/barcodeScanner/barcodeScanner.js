// import { LightningElement, track } from "lwc";
// import { getBarcodeScanner } from "lightning/mobileCapabilities";
// import FORM_FACTOR from "@salesforce/client/formFactor";
// import updateRecordName from '@salesforce/apex/Demo3.updateRecordName';
// import { ShowToastEvent } from 'lightning/platformShowToastEvent';

// export default class BarcodeScanner extends LightningElement {
//  barcodeScanner;
//   @track showModal = false;
//   @track scannedData = '';

//  connectedCallback() {
//    this.barcodeScanner = getBarcodeScanner();
//  }


//  startScanning() {
//    const scanningOptions = {
//      barcodeTypes: [this.barcodeScanner.barcodeTypes.QR],
//      scannerSize: "FULLSCREEN",
//      cameraFacing: "BACK",
//      showSuccessCheckMark: true,
//      enableBulkScan: true,
//      enableMultiScan: true,
//    };


//    // Make sure BarcodeScanner is available before trying to use it
//    if (this.barcodeScanner != null && this.barcodeScanner.isAvailable()) {
//      this.scannedBarcodes = [];
//      this.barcodeScanner
//        .scan(scanningOptions)
//        .then((results) => {
//          this.processScannedBarcodes(results);
//        })
//        .catch((error) => {
//          this.processError(error);
//        })
//        .finally(() => {
//          this.barcodeScanner.dismiss();
//        });
//    } else {
//      console.log("BarcodeScanner unavailable. Non-mobile device?");
//    }
//  }


// processScannedBarcodes(barcodes) {
//   if (barcodes && barcodes.length > 0) {
//     this.scannedData = barcodes.map(b => b.value).join(', ');
//     this.updateRecord();
//   }
// }

//   updateRecord() {
//     const recordId = this.scannedData;

//     if (!recordId) {
//       this.showToast('Error', 'Invalid QR code: No record ID found.', 'error');
//       return;
//     }

//     updateRecordName({ recordId })
//       .then(() => {
//         // Ensure DOM update happens AFTER scan
//         this.showToast('Success', 'Record updated successfully!', 'success');
//       })
//       .catch((error) => {
//         const errorMsg = error.body?.message || 'Unexpected error';
//         this.showToast('Error', 'Failed to update record: ' + errorMsg, 'error');
//       });
//   }
//   showToast(title, message, variant) {
//     const toast = new ShowToastEvent({
//       title,
//       message,
//       variant,
//     });
//     this.dispatchEvent(toast);
//   }

//  processError(error) {
//    // Error handling
//  }

// }

import { LightningElement, track } from "lwc";
import { getBarcodeScanner } from "lightning/mobileCapabilities";
import getCampaignsForContact from "@salesforce/apex/qrCodeProcessor.getCampaignMember";
import updateSingleJunctionStatus from "@salesforce/apex/qrCodeProcessor.updateSingleCampaignMemberStatus";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class BarcodeScanner extends LightningElement {
  barcodeScanner;
  @track scannedData = "";
  @track relatedCampaigns = [];
  @track spinner1 = false;

  columns = [
    { label: "Campaign Name", fieldName: "CampaignName" },
    { label: "Status", fieldName: "status" },
    {
      type: "button",
      typeAttributes: {
        label: "RSVP",
        name: "rsvp",
        title: "RSVP",
        variant: "brand",
        disabled: { fieldName: "isComplete" }
      }
    }
  ];

  connectedCallback() {

    this.barcodeScanner = getBarcodeScanner();    
  }

  startScanning() {
    const scanningOptions = {
      barcodeTypes: [this.barcodeScanner.barcodeTypes.QR],
      scannerSize: "FULLSCREEN",
      cameraFacing: "BACK"
    };

    if (this.barcodeScanner && this.barcodeScanner.isAvailable()) {
      this.barcodeScanner
        .scan(scanningOptions)
        .then((results) => {
          const contactId = results[0]?.value;
          this.scannedData = contactId;
          this.spinner1 = true;
          this.fetchRelatedCampaigns(contactId);
        })
        .catch((error) => {
         this.spinner1 = false;
          this.showToast("Error", error.message, "error");
        })
        .finally(() => {
          this.barcodeScanner.dismiss();
        });
    } else {
         this.spinner1 = false;

      this.showToast("Error", "Scanner not available", "error");

    }
  }

  fetchRelatedCampaigns(contactId) {
    getCampaignsForContact({ contactId })
      .then((result) => {
        this.relatedCampaigns = result.map((rec) => ({
          id: rec.Id,
          CampaignName: rec.Campaign.Name,
          status: rec.Status,
          isComplete: rec.Status === "Responded"
        }));
                 this.spinner1 = false;

      })
      .catch((error) => {
        this.showToast("Error", "Failed to fetch Campaigns", "error");
         this.spinner1 = false;

      });
  }

  handleRowAction(event) {
    const actionName = event.detail.action.name;
    const row = event.detail.row;
     this.spinner1 = true;

    if (actionName === "rsvp") {
      updateSingleJunctionStatus({ junctionId: row.id })
        .then(() => {
                   this.spinner1 = false;

          this.showToast("Success", "RSVP Complete", "success");
          setTimeout(() => {
            // this.spinner1 = true;
            // this.relatedCampaigns = [];
            // this.fetchRelatedCampaigns(this.scannedData);
            window.location.reload(); // Reload the page to refresh data
          }, 1000); // Delay to allow UI update 
        })
        .catch((error) => {
          this.showToast("Error", "Failed to update RSVP", "error");
        });
    }
  }

  showToast(title, message, variant) {
    this.dispatchEvent(
      new ShowToastEvent({
        title,
        message,
        variant
      })
    );
  }
}

