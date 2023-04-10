import { LightningElement, api } from 'lwc';

export default class fileUploadPreview extends LightningElement {
  @api uploadedImageFile;

  get previewImageUrl() {
    return this.uploadedImageFile ? URL.createObjectURL(this.uploadedImageFile) : null;
  }
}




// import { LightningElement, api } from 'lwc';

// export default class FileUploadPreview extends LightningElement {
//     @api imageUrl;
//     @api recordId;
// }




//  import { LightningElement, api } from 'lwc';

//  export default class FileUploadPreview extends LightningElement {
//      @api recordId;
//      @api imageUrl;
//  }