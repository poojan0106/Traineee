({
   
    nextTab : function(component, event, helper) {
        component.set("v.setMessage", '');           
        var showAccount = component.get("v.showAccount");
        var showContact = component.get("v.showContact");
        var showEvent = component.get("v.showEvent");
        var showData = component.get("v.showData");
        
        
        if(showAccount == true){
            var next = "2";
            component.set("v.current", next);
            var accountName = component.find("Name").get("v.value");
            console.log('accountName:::'+accountName);
			var phone = component.find("phone__c").get("v.value");
            console.log('phone:::'+phone);
			var maxAmmount = component.find("Max_ammount__c").get("v.value");
            console.log('maxAmmount:::'+ maxAmmount);
            if(accountName =='' || accountName == null || phone=='' || phone=='' || maxAmmount=='' || maxAmmount=='' ){
                component.set("v.setMessage",'error');
            }
            if(component.get("v.setMessage")=='error')
            { 
                component.set("v.showContact",false);
                component.set("v.showEvent", false);
                component.set("v.showError", true);
                component.set("v.showData", false);
                
            }
            else
            { 
                component.set("v.showAccount", false);
                component.set("v.showContact", true);
                component.set("v.showEvent", false); 
                component.set("v.showError", false);
                component.set("v.showData", false);
            }
        }    
        if(showContact == true){
            var next = "3";
            component.set("v.current", next);
            var LastName = component.find("LastName").get("v.value");
            console.log('LastName:::'+LastName);
            if(LastName =='' || LastName == null){
                component.set("v.setMessage",'error'); 
            }
            if(component.get("v.setMessage")=='error')
            { 
                component.set("v.showAccount", false);
                component.set("v.showEvent", false);
                component.set("v.showError", true);
                component.set("v.showData", false);
            }
            else
            { 
                component.set("v.showAccount", false);
                component.set("v.showContact", false);
                component.set("v.showEvent", true);
                component.set("v.showError", false);
                component.set("v.showData", false);
            }
        }   
        
        if(showEvent == true){
            var next = "4";
            component.set("v.current", next);
            var Subject = component.find("Subject").get("v.value");
            console.log('EventSubject:::'+Subject);
			// var Duration = component.find("Duration").get("v.value");
            // console.log('EventSubject:::'+Duration);
			var End1 = component.find("EndDateTime").get("v.value");
			var oDateTime = component.find("oDateTime");
      	    oDateTime.set("v.value",End1 );
            component.set("v.EndDateTime",End1 );

			var start1 = component.find("StartDateTime").get("v.value");
			var sDateTime = component.find("sDateTime");
    	    sDateTime.set("v.value",start1 );
            component.set("v.StartDateTime",start1 );
            console.log('start:::'+sDateTime);
            component.set("v.ActivityDateTime" , start1 );
            var Type = component.find("Type").get("v.value");
            console.log('StageName:::'+Type);
            if((Subject =='' || Subject == null) || (Type =='' || Type == null) || (oDateTime =='' || oDateTime == null) || (sDateTime =='' || sDateTime == null)){
                component.set("v.setMessage",'error'); 
            }
            if(component.get("v.setMessage")=='error')
            { 
                component.set("v.showAccount", false);
                component.set("v.showContact", false);
                component.set("v.showError", true);
                component.set("v.showData", false);
                
            }
            else
            { 
                component.set("v.showEvent", false);
                component.set("v.showContact", false);
                component.set("v.showAccount", false)
                component.set("v.showError", false);
                component.set("v.showData", true);
            }
        }   
        
    },
    prevTab : function(component, event, helper) {
        var showAccount = component.get("v.showAccount");
        var showContact = component.get("v.showContact");
        var showEvent = component.get("v.showEvent");
        var showData = component.get("v.showData");
        
        
        if(showContact == true){
            component.set("v.showAccount", true);
            component.set("v.showContact", false);
            component.set("v.showEvent", false);
            component.set("v.showError", false);
            component.set("v.showData", false);
        }    
        if(showEvent == true){
            component.set("v.showAccount", false);
            component.set("v.showContact", true);
            component.set("v.showEvent", false);
            component.set("v.showError", false);
            component.set("v.showData", false);
        } 
        if(showData == true){
            component.set("v.showAccount", false);
            component.set("v.showContact", false);
            component.set("v.showEvent", true);
            component.set("v.showError", false);
            component.set("v.showData", false);
        }  
    },
    
    onSelectChange : function(component, event, helper) {
        var selected = component.find("Type").get("v.value");
        component.set("v.EventData.Type",selected);
        console.log('event::::'+JSON.stringify(selected));
    },
    
    saveRecord : function(component, event, helper) {
        helper.saveData(component, event, helper);               
    }
})