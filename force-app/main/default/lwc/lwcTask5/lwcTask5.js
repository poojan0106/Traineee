import { api, LightningElement, track } from 'lwc';
import searchRecords from '@salesforce/apex/lwcTask5.searchRecords';

const columns = [
  { label: 'Name', fieldName: 'Name', type: 'text' }
];
export default class lwcTask5 extends LightningElement {
  @track searchTerm = '';
  allObjects;
  @track selectedObjects = [];
  @api searchResults = null;
  columms = columns;
  // Get all objects available for search
  allObjects = [
    { label: 'Account', value: 'Account' },
    { label: 'Contact', value: 'Contact' },
    { label: 'Lead', value: 'Lead' }
  ];


  handleSearchTermChange(event) {
    // Update search term value
    this.searchTerm = event.target.value;
    // console.log("search" , this.searchTerm);
  }

  handleSelectedObjectsChange(event) {
    // Update selected objects value
    this.selectedObjects = event.detail.value;
    // console.log("selected Objects" ,JSON.stringify(this.selectedObjects) );
  }
  handleSearch() {
    searchRecords({ searchTerm: this.searchTerm, objectTypes: this.selectedObjects })
      .then(result => {
        this.searchResults = result;
      });
  }
  get resultGroups() {
    let groups = {};
    if (this.searchResults) {
      this.searchResults.forEach(result => {
        let objectName = result.ObjectName;
        if (!groups[objectName]) {
          groups[objectName] = {
            objectName: objectName,
            records: []
          };
        }
        groups[objectName].records.push(result);
        console.log("result record", JSON.stringify(groups[objectName].records));
      });
    }
    console.log("group", JSON.stringify(Object.values(groups)));
    return Object.values(groups);
  }

}