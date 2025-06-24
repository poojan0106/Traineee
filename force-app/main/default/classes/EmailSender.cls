global class EmailSender implements Messaging.InboundEmailHandler {

    global Messaging.InboundEmailResult handleInboundEmail(Messaging.InboundEmail email, 
                                                          Messaging.InboundEnvelope envelope) {
        // Example: Append user's email signature to the email body
        String userId = UserInfo.getUserId();
        User currentUser = [SELECT Id, signature__c FROM User WHERE Id = :userId LIMIT 1];

        if (currentUser != null && currentUser.signature__c != null) {
            String signature = currentUser.signature__c;

            // Determine email content type (HTML or plain text)
            String emailBody = '';
            if (email.htmlBody != null) {
                emailBody = email.htmlBody + '<br/><br/>' + signature;
            }

            // Modify the email content with the signature
            if (emailBody != '') {
                if (email.htmlBody != null) {
                    email.htmlBody = emailBody;
                }
            }
        }

        // Process the email as per your business logic
        // Example: Send the modified email
        Messaging.InboundEmailResult result = new Messaging.InboundEmailResult();
        return result;
    }
}