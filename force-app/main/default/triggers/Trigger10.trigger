trigger Trigger10 on Account (after insert){
        Trigger10Handler.SubmitRecforApproval(Trigger.New);
    }