import {LightningElement, api} from 'lwc';

import getAttachmentsToShow from '@salesforce/apex/ShowAttachmentsController.getAttachmentsToShow';

export default class ShowAttachments extends LightningElement {
    @api recordId;
    attachments;
    currentAttachment;
    attURN = '/servlet/servlet.FileDownload?file=';
    attachmentsCount = 0;

    isLoading = true;
    nextAttDisabled = false;
    prevAttDisabled = true;

    //заменить на коннектедколбэк
    connectedCallback() {
        getAttachmentsToShow({
            parentId: this.recordId
        })
            .then(data => {
                this.attachments = data;
                this.currentAttachment = this.attURN + data[0].Id;
            })
            .catch(error => console.log(error))
            .finally(() => this.isLoading = false);
    }

    showNextAttachment() {
        this.attachmentsCount++;
        this.buttonDisablingChecking(this.attachmentsCount);

        this.currentAttachment = this.attURN + this.attachments[this.attachmentsCount].Id;
    }

    showPreviousAttachment() {
        this.attachmentsCount--;
        this.buttonDisablingChecking(this.attachmentsCount);

        this.currentAttachment = this.attURN + this.attachments[this.attachmentsCount].Id;
    }

    clickAttachmentName(event) {
        let index = event.target.dataset.item;
        this.attachmentsCount = index;
        this.currentAttachment = this.attURN + this.attachments[index].Id;

        this.buttonDisablingChecking(index);
    }

    buttonDisablingChecking(index) {
        if (Number(index) === 0) {
            this.prevAttDisabled = true;
            this.nextAttDisabled = false;
        } else if (this.attachments.length === Number(index) + 1) {
            this.nextAttDisabled = true;
            this.prevAttDisabled = false;
        } else {
            this.prevAttDisabled = false;
            this.nextAttDisabled = false;
        }
    }
}