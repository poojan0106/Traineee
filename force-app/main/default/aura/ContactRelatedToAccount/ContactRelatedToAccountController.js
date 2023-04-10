({
    doinit : function(component, event, helper) {
        helper.getAccountList(component);
        var pageSize = component.get("v.pageSize");
        var action = component.get("c.fetchAcc");
        action.	setCallback(this, function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                var allValues = response.getReturnValue();
                console.log("allValues--->>> " + allValues);
                component.set("v.accData", allValues);
                component.set("v.totalSize", component.get("v.accData").length);
                component.set("v.start",0);
				component.set("v.end",pageSize-1);
				var paginationList = [];
				for(var i=0; i< pageSize; i++)
				{
					paginationList.push(response.getReturnValue()[i]);
				}
				component.set('v.paginationList', paginationList);
				//console.log(paginationList);
            }
            else if(state === "ERROR") {
                var errors = response.getError();
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
    OnSelectChange: function(component, event, helper) {
    var selected = parseInt(component.find("records").get("v.value"));
    var paginationList = [];
    var accData = component.get("v.accData");

    if (accData && Array.isArray(accData) && accData.length > 0) {
        paginationList = accData.slice(0, selected);
    }

    component.set("v.paginationList", paginationList);
	},
  
    searchKeyChange: function(component, event) {
    var searchKey = component.find("searchKey").get("v.value");
    var pageSize = component.get("v.pageSize");
    var action = component.get("c.findByName");
    action.setParams({
        "searchKey": searchKey
    });
    action.setCallback(this, function(response) {
        component.set("v.accData", response.getReturnValue());
        component.set("v.totalSize", component.get("v.accData").length);
        var paginationList = [];
        for(var i = 0; i < pageSize && i < response.getReturnValue().length; i++) {
            paginationList.push(response.getReturnValue()[i]);
        }
        component.set("v.paginationList", paginationList);
    });
    $A.enqueueAction(action);
	},

   first: function(component, event, helper) {
    var accList = component.get("v.accData");
    var pageSize = component.get("v.pageSize");
    var paginationList = [];
    for(var i=0; i<pageSize && i<accList.length; i++) {
        paginationList.push(accList[i]);
    }
    var start = 0;
    var end = Math.min(pageSize, accList.length);
    component.set("v.start", start);
    component.set("v.end", end);
    component.set('v.paginationList', paginationList);
	},

    previous: function(component, event, helper) {
    var accList = component.get("v.accData");
    var end = component.get("v.end");
    var start = component.get("v.start");
    var pageSize = component.get("v.pageSize");
    var paginationList = [];
    for(var i=start-2*pageSize; i<start-pageSize && i<accList.length; i++) {
        if(i >= 0) {
            paginationList.push(accList[i]);
        }
    }
    start = Math.max(0, start-pageSize);
    end = start + pageSize;
    component.set("v.start", start);
    component.set("v.end", end);
    component.set('v.paginationList', paginationList);
},

   next: function(component, event, helper) {
    var accList = component.get("v.accData");
    var end = component.get("v.end");
    var start = component.get("v.start");
    var pageSize = component.get("v.pageSize");
    var paginationList = [];
    for(var i=end; i<end+pageSize && i<accList.length; i++) {
        paginationList.push(accList[i]);
    }
    start = end;
    end = Math.min(end+pageSize, accList.length);
    component.set("v.start", start);
    component.set("v.end", end);
    component.set('v.paginationList', paginationList);
   },

   last: function(component, event, helper) {
    var accList = component.get("v.accData");
    var pageSize = component.get("v.pageSize");
    var totalSize = component.get("v.totalSize");
    var paginationList = [];
    var start = Math.max(totalSize - pageSize, 0);
    for(var i=start; i<totalSize; i++) {
        paginationList.push(accList[i]);
    }
    component.set('v.paginationList', paginationList);
},

    showCon : function(component, event, helper){
        component.set("v.show",true);
        var idx = event.target.getAttribute('data-index');
        console.log('idx---->>> ' + idx);
        var rowRecord = component.get("v.accData")[idx];
        console.log('rowRecord---->>> ' + JSON.stringify(rowRecord));
        var action = component.get('c.fetchCon');
        action.setParams({recordId : rowRecord.Id});
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                var allValues = response.getReturnValue();
                console.log("allValues--->>> " + JSON.stringify(allValues));
                component.set('v.conData', allValues);
            }
            else if(state === "ERROR") {
                var errors = response.getError();
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
    }
 
})