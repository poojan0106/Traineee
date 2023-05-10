trigger Interview on Account (after insert) {
    InterviewHandler.caContact(Trigger.new);
  }