({
getAccountList1 : function(component) {
var action = component.get("c.fetchAcc1");
action.setCallback(this, function(response) {
var state = response.getState();
if (state === "SUCCESS") {
component.set("v.accData1", response.getReturnValue());
}
});
$A.enqueueAction(action);
},
getContactList1 : function(component, accId) {
    var action = component.get("c.fetchCon1");
    action.setParams({ accId : accId });
    action.setCallback(this, function(response) {
        var state = response.getState();
        if (state === "SUCCESS") {
            component.set("v.conData1", response.getReturnValue());
        }
    });
    $A.enqueueAction(action);
},
  getAccountList2 : function(component) {
var action2 = component.get("c.fetchAcc2");
action2.setCallback(this, function(response) {
var state = response.getState();
if (state === "SUCCESS") {
component.set("v.accData2", response.getReturnValue());
}
});
$A.enqueueAction(action2);
},
getContactList2 : function(component, accId) {
    var action2 = component.get("c.fetchCon2");
    action2.setParams({ accId : accId });
    action2.setCallback(this, function(response) {
        var state = response.getState();
        if (state === "SUCCESS") {
            component.set("v.conData2", response.getReturnValue());
        }
    });
    $A.enqueueAction(action2);
},
saveDraggedItem : function(component,conId,accId) {
    console.log("--------",accId);
    console.log("-1-------",conId);
var action = component.get("c.updateRecord");
action.setParams({
"accId": accId,
"conId": conId

});
 
action.setCallback(this, function(response) {
var state = response.getState();
if (state === "SUCCESS") {
// Reload the data on the UI
component.getEvent("ReloadDataEvent").fire();
}
else if (state === "ERROR") {
var errors = response.getError();
if (errors) {
if (errors[0] && errors[0].message) {
console.log("Error message: " + errors[0].message);
}
} else {
console.log("Unknown error");
}
}
});
$A.enqueueAction(action);

}

})