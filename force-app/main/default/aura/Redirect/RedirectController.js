({
    doInit: function(component, event, helper) {
     var workspaceAPI = component.find("workspace");
        workspaceAPI.getFocusedTabInfo().then(function(response) {
            var focusedTabId = response.tabId;
            workspaceAPI.openSubtab({
                parentTabId: focusedTabId,
                url: '/apex/Redirect1',
                focus: true
            });
        })
        .catch(function(error) {
            console.log(error);
        });
    }
})