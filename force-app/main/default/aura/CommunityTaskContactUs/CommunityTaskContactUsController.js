({
        doInit : function(component, event, helper) {
            // helper.getStudent(component);
            
            var action1 = component.get("c.fetchStudent");
            var sResponse ;
            action1.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                     sResponse = response.getReturnValue();
                    // component.set("v.studentInfo", sResponse);
                    console.log("StudentEmail" , sResponse);
                }
                
            var createContactFlowId = component.find("createContactFlowId");
            console.log("log" , sResponse);
           var inputVariables = [
               {
                  name : "ReciverEmail",
                  type : "String",
                  value : sResponse
                   
                }
             ];
            console.log("flow goes to call");
           createContactFlowId.startFlow("Cont3" , inputVariables);
           console.log("flow called");
            });


            $A.enqueueAction(action1);
        }
})
