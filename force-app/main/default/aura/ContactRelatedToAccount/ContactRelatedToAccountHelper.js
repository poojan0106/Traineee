({
        getAccountList: function(component) {
            var action = component.get('c.fetchAcc');
            var self = this;
            action.setCallback(this, function(actionResult) {
                component.set('v.accData', actionResult.getReturnValue());
            });
            $A.enqueueAction(action);
        }
    })