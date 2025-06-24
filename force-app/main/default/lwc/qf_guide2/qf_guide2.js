import {
  LightningElement,
  track,
  wire,
  api
} from 'lwc';
import getSites from '@salesforce/apex/qf_guide2_Controller.getSites';
import getSettingData from '@salesforce/apex/qf_guide2_Controller.getSettingData';
import saveSecureUrl from '@salesforce/apex/qf_guide2_Controller.saveSecureUrl';
import assignPermissionSet from '@salesforce/apex/qf_guide2_Controller.assignPermissionSet';

export default class Qf_guide2 extends LightningElement {

  @track isModalOpen = false;
  @track issiteModelopen = false;
  @track sites = [];
  @track selectedSite;
  @track preselectedSiteName = '';
  @track selectedSiteName = '';
  @track spinnerdatatable = false;
  error_toast = true;
  // @api siteId;

  //error_popup
  @api error_popup = false;
  @track message;
  
  connectedCallback() {
    this.spinnerdatatable = true;
    this.getSiteDetails();
  }

  getSiteDetails() {
    getSites()
      .then(result => {
        console.log("result : " + JSON.stringify(result));
        var tempSite = [];
        result.forEach(siteval => {
          tempSite.push({
            label: siteval.MasterLabel,
            value: siteval.Id
          });
        });
        this.sites = tempSite;
        console.log('this.sites ==> ', JSON.stringify(this.sites));
        getSettingData()
          .then(result => {
            this.selectedSite = result;
            this.spinnerdatatable = false;
          })
          .catch(error => {
            console.log(error);
            this.spinnerdatatable = false;
            this.message = 'Something Went Wrong In qf_guid2';
            this.showerror();
          });
      })
      .catch(error => {
        console.error(error);
        this.spinnerdatatable = false;
        this.message = 'Something Went Wrong In qf_guid2';
        this.showerror();
      });
  }

  // Handle the button click event
  handleSave() {
    this.spinnerdatatable = true;
    console.log('enter');
    console.log(this.selectedSite);
    if (this.selectedSite) {
      console.log('inside if : ' + this.selectedSite);
      saveSecureUrl({
          selectedSiteid: this.selectedSite
        })
        .then(result => {
          console.log("result : " + JSON.stringify(result));
          this.spinnerdatatable = false;
          this.error_toast = true;
          this.template.querySelector('c-toast-component').showToast('success', 'Successfully Inserted', 3000);
        })
        .catch(error => {
          console.error(error);
          this.spinnerdatatable = false;
          this.error_toast = true;
          this.template.querySelector('c-toast-component').showToast('error', 'Uh oh, something went wrong', 3000);
        });
      assignPermissionSet({
        oldselectedSiteName : this.preselectedSiteName,
        newselectedSiteName : this.selectedSiteName
      }) 
      .then(result => {
        console.log("result : " + JSON.stringify(result));
        this.spinnerdatatable = false;
        this.error_toast = true;
        this.template.querySelector('c-toast-component').showToast('success', 'Successfully Assign Permission Set To Selected Site User', 3000);
      })
      .catch(error => {
        console.error(error);
        this.spinnerdatatable = false;
        this.error_toast = true;
          this.template.querySelector('c-toast-component').showToast('success', 'Uh oh, something went wrong', 3000);
        });
    }
  }

  handleSiteChange(event) {
    console.log('event ==> ',JSON.stringify(event));
    console.log({event});
    console.log(event);
    this.selectedSite = event.detail.value;
    console.log(this.selectedSite);
    const selectedLabel = this.sites.find(option => option.value === this.selectedSite).label;
    console.log('OUTPUT : ',selectedLabel);
    this.preselectedSiteName = this.selectedSiteName;
    this.selectedSiteName = selectedLabel;
    // var selectedName = '';
    // console.log('site --->',JSON.stringify(this.sites));
    // this.sites.forEach(data => {
    //   if(data.value == this.selectedSite) {
    //     selectedName = data.label;
    //   }
    // });
    // this.selectedSiteName = selectedName;
    // console.log('selectedSiteName -===> ',this.selectedSiteName);
  }

  renderedCallback() {
    this.template.querySelectorAll("a").forEach(element => {
      element.addEventListener("click", evt => {
        let target = evt.currentTarget.dataset.tabId;

        this.template.querySelectorAll("a").forEach(tabel => {
          if (tabel === element) {
            tabel.classList.add("active-tab");
          } else {
            tabel.classList.remove("active-tab");
          }
        });
        this.template.querySelectorAll(".tab").forEach(tabdata => {
          tabdata.classList.remove("active-tab-content");
        });
        this.template.querySelector('[data-id="' + target + '"]').classList.add("active-tab-content");
      });
    });
  }


  closesiteModel() {
    this.isModalOpen = false;

    const target = "tab1";
    this.template.querySelectorAll("a").forEach(tabel => {
      tabel.classList.remove("active-tab");
    });
    this.template.querySelectorAll(".tab").forEach(tabdata => {
      tabdata.classList.remove("active-tab-content");
    });
    this.template.querySelector('[data-tab-id="' + target + '"]').classList.add("active-tab");
    this.template.querySelector('[data-id="' + target + '"]').classList.add("active-tab-content");
  }

  openModel() {
    this.isModalOpen = true;
  }

  openCreateEditModel() {
    this.issiteModelopen = true;
  }

  closeModel() {
    this.issiteModelopen = false;

    const target = "tab1";
    this.template.querySelectorAll("a").forEach(tabel => {
      tabel.classList.remove("active-tab");
    });
    this.template.querySelectorAll(".tab").forEach(tabdata => {
      tabdata.classList.remove("active-tab-content");
    });
    this.template.querySelector('[data-tab-id="' + target + '"]').classList.add("active-tab");
    this.template.querySelector('[data-id="' + target + '"]').classList.add("active-tab-content");
  }

  opensite() {
    try {
      const baseUrl = window.location.origin + '/lightning/setup/CustomDomain/home';
      window.open(baseUrl, '_blank');
    } catch (error) {
      console.error(error);
      this.message = 'Something Went Wrong In qf_guid2';
      this.showerror();
    }
  }
  tabing() {
    const target = "tab1";
    this.template.querySelectorAll("a").forEach(tabel => {
      tabel.classList.remove("active-tab");
    });
    this.template.querySelectorAll(".tab").forEach(tabdata => {
      tabdata.classList.remove("active-tab-content");
    });
    this.template.querySelector('[data-tab-id="' + target + '"]').classList.add("active-tab");
    this.template.querySelector('[data-id="' + target + '"]').classList.add("active-tab-content");
  }
  errorpopupcall(event){
      location.reload();
  }

  @api showerror(){
      console.log('this.error_popup => ',this.error_popup);
      this.error_popup = true;
        console.log('guide 2 this.error_popup => ',this.error_popup);
        let errordata = {header_type: 'Qf_guide',Message : this.message};
      const showpopup = new CustomEvent('showerrorpopup',{detail:errordata});
      this.dispatchEvent(showpopup);
  }

  showerrorpopup(event){
      console.log('showerrorpopup',event.detail.Message);
      this.template.querySelector('c-errorpopup').errormessagee(event.detail.header_type,event.detail.Message);
  }
}