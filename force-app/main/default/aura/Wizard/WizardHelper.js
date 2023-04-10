({
    saveData : function(component, event, helper) {
        var action = component.get("c.save");
        action.setParams({
            accountData : component.get("v.accountData"),
            contactData : component.get("v.contactData"),
            EventData : component.get("v.EventData")}
                        );
        action.setCallback(this, function(response){
            var state = response.getState();
                var message = response.getReturnValue();
                console.log("message>>>>>>>>" +JSON.stringify(message));
                component.set("v.message", message);
            if(message == 'record successfully insert'){
                document.getElementById("showErrorrTractConfig").style.display = "none";
                document.getElementById("showMessageTractConfig").style.display = "block";
            }else{
                document.getElementById("showMessageTractConfig").style.display = "none";
                document.getElementById("showErrorrTractConfig").style.display = "block";
            }    
        });  
        $A.enqueueAction(action);
    }
})