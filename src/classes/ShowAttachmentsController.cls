public class ShowAttachmentsController {

    @AuraEnabled(cacheable = true)
    public static List<Attachment> getAttachmentsToShow(String parentId) {
        List<Attachment> result = AttachmentManager.getAttachmentsByParentIds(new List<String> { parentId });
        return result;
    }
}