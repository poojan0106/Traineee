import { LightningElement } from 'lwc';

export default class fileUpload extends LightningElement {
  uploadedImageFile;

  handleUploadImage(event) {
    this.uploadedImageFile = event.target.files[0];
  }
}





// import { api, LightningElement, track } from 'lwc';

// export default class fileUpload extends LightningElement {
//   @track imageUrl ; 
//   @api recordId ; 

//   handleUploadFinished(event) {
//     // this.uploadedImageFile = event.target.files;
//     const file = event.target.files[0];
//     console.log("all uploded files==>" ,file);
//     const reader = new FileReader();
//         reader.onload = () => {
//         this.imageUrl = reader.result;
//        console.log(this.imageUrl);
//         };
//       reader.readAsDataURL(file);
//   }
// }





// import { LightningElement, track, api } from 'lwc';

// export default class fileUploadPreview extends LightningElement {
//     @track imageUrl;
//     @api recordId;
//     handleFileChange(event) {
//         const file = event.target.files[0];
//         const reader = new FileReader();
//         reader.onload = () => {
//             this.imageUrl = reader.result;
//             console.log(this.imageUrl);
//         };
//         reader.readAsDataURL(file);
//     }
// }