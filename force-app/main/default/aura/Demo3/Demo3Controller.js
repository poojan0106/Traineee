({
    doinit : function(component, event, helper) {
        helper.getAccountList1(component);
         helper.getAccountList2(component);
        let action = component.get("c.fetchAcc1");
         let action1 = component.get("c.fetchAcc2");
        action.setCallback(this, function(response){
            let state = response.getState();
            if(state === "SUCCESS"){
                let allValues = response.getReturnValue();
                console.log("allValues--->>> " + allValues);
                component.set("v.accData1", allValues);
            }
            else if(state === "ERROR") {
                let errors = response.getError();
                if(errors){
                    if(errors[0] && errors[0].message){
                        console.log("Error Message: " + errors[0].message);
                    }
                }
                else{
                    console.log("Unknown Error");
                }
            }
        });
        
        $A.enqueueAction(action);
     
    },
    searchKeyChange1: function(component, event) {
    let searchKey1 = component.find("searchKey1").get("v.value");
    let action = component.get("c.findByName1");
    action.setParams({
        "searchKey1": searchKey1
    });
    action.setCallback(this, function(response) {
        component.set("v.accData1", response.getReturnValue())
    });
    $A.enqueueAction(action);
	},
    showCon1 : function(component, event, helper){
        component.set("v.show1",true);
        let idx = event.target.getAttribute('data-index');
        console.log('idx---->>> ' + idx);
        let rowRecord = component.get("v.accData1")[idx];
        console.log('rowRecord---->>> ' + JSON.stringify(rowRecord));
        let action = component.get('c.fetchCon1');
        action.setParams({recordId : rowRecord.Id});
        action.setCallback(this, function(response){
            let state = response.getState();
            if(state === "SUCCESS"){
                let allValues = response.getReturnValue();
                console.log("allValues--->>> " + JSON.stringify(allValues));
                component.set('v.conData1', allValues);
            }
            else if(state === "ERROR") {
                let errors = response.getError();
                if(errors){
                    if(errors[0] && errors[0].message){
                        console.log("Error Message: " + errors[0].message);
                    }
                }
                else{
                    console.log("Unknown Error");
                }
            }
        });
        $A.enqueueAction(action);
    },
    searchKeyChange2: function(component, event) {
    let searchKey2 = component.find("searchKey2").get("v.value");
    let action = component.get("c.findByName2");
    action.setParams({
        "searchKey2": searchKey2
    });
    action.setCallback(this, function(response) {
        component.set("v.accData2", response.getReturnValue())
    });
    $A.enqueueAction(action);
	},
    showCon2 : function(component, event, helper){
        component.set("v.show2",true);
        let idx = event.target.getAttribute('data-index');
        console.log('idx---->>> ' + idx);
        let rowRecord = component.get("v.accData2")[idx];
        console.log('rowRecord---->>> ' + JSON.stringify(rowRecord));
        let action = component.get('c.fetchCon2');
        action.setParams({recordId : rowRecord.Id});
        action.setCallback(this, function(response){
            let state = response.getState();
            if(state === "SUCCESS"){
                let allValues = response.getReturnValue();
                console.log("allValues--->>> " + JSON.stringify(allValues));
                component.set('v.conData2', allValues);
            }
            else if(state === "ERROR") {
                let errors = response.getError();
                if(errors){
                    if(errors[0] && errors[0].message){
                        console.log("Error Message: " + errors[0].message);
                    }
                }
                else{
                    console.log("Unknown Error");
                }
            }
        });
        $A.enqueueAction(action);
    },
 
   handleDragStart: function(component, event, helper) {
  let dragId = event.currentTarget.dataset.dragId;
  console.log("Dragged contact ID:", dragId);
  event.dataTransfer.setData("dragId", dragId);
       component.set("v.dragId",dragId);
       console.log("dragId>>>>>>>>>" + dragId);
      

 },

    
    handleDragOver: function(component, event, helper) {
        event.preventDefault();
    },



    handleDrop: function(component, event, helper) {
        var drpId = event.target.getAttribute("data-id");
        component.set("v.dropId", drpId);
        let dragId = component.get("v.dragId");
        var dropId = component.get("v.dropId");
        console.log("dropId=>" , dropId);
        var sourceData = component.get("v.conData1");
        var targetData = component.get("v.conData2");
        var dragItem = sourceData.find(function(row) {
          return row.Id === dragId;
        });
        
        var dropItem = dragItem; // Assign dragItem directly to dropItem
        
        if (dragItem && dropItem) {
          var dragIndex = sourceData.indexOf(dragItem);
          sourceData.splice(dragIndex, 1);
          dragItem.AccountId = dropId ;
          targetData.push(dragItem);
          component.set("v.conData1", sourceData);
          component.set("v.conData2", targetData);
          console.log("Contact dropped innn section:", targetData);
        console.log("Contact dropped from section:", sourceData);
        console.log("Dropped contact details:", dropItem);
        component.set("v.dropItem",dropItem);
        helper.saveDraggedItem(component,dragId,dropId);

        }
        
      },

      handleDrop1: function(component, event, helper) {
        var drpId = event.target.getAttribute("data-id");
        component.set("v.dropId", drpId);
        let dragId = component.get("v.dragId");
        var dropId = component.get("v.dropId");
        console.log("dropId=>" , dropId);
        var sourceData = component.get("v.conData2");
        var targetData = component.get("v.conData1");
        console.log("tarData--",targetData);
        console.log("srcData--",sourceData);
        var dragItem = sourceData.find(function(row) {
          return row.Id === dragId;
        });
        console.log("drgfrom2--" ,dragItem);
        var dropItem = dragItem; // Assign dragItem directly to dropItem
        
        if (dragItem && dropItem) {
          var dragIndex = sourceData.indexOf(dragItem);
          sourceData.splice(dragIndex, 1);
          dragItem.AccountId = dropId ;
          targetData.push(dragItem);
          component.set("v.conData2", sourceData);
          component.set("v.conData1", targetData);
          console.log("Contact dropped innn section:", targetData);
        console.log("Contact dropped from section:", sourceData);
        console.log("Dropped contact details:", dropItem);
        component.set("v.dropItem",dropItem);
        helper.saveDraggedItem(component,dragId,dropId);

        }
        
      }

})