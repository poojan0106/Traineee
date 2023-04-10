({
    displayImage : function(component, event, helper) {
         try{
        var imageURL = component.find("Img").get("v.value");
        component.set("v.imageURL" , imageURL);
         var description = component.find("description").get("v.value");
         component.set("v.description" , description);
         console.log("hello" , description);
         var fontSize = component.find("fontSize").get("v.value");
        component.set("v.fontSize" , fontSize);
        console.log("size" , fontSize);
        var fontColor = component.find("fontColor").get("v.value");
        component.set("v.fontColor" , fontColor);
        console.log("color" , fontColor);
        var bgColor = component.find("bgColor").get("v.value");
        component.set("v.bgColor" , bgColor);
        console.log("bgcolor" , bgColor);

     }catch( e){
        console.log("error gattingg" ,  e);
    }
    }
})