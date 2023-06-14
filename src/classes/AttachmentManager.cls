public class AttachmentManager {

    public static List<Attachment> getAttachmentsByParentIds(List<String> parentIds) {
        List<Attachment> attachments = new List<Attachment>();
        if (parentIds != null && !parentIds.isEmpty()) {
            attachments = [SELECT Id, Name FROM Attachment WHERE ParentId IN : parentIds];
        }
        return attachments;
    }
}