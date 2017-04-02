import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';

@Injectable()
export class ChildServiceService {

    private messenger = new Subject<boolean>();
    private formMsgr = new Subject<FormGroup>();

    constructor() { }

    public sendMessage(message: boolean): void {
        //message === true ? this.messenger.next(message, form)
        return this.messenger.next(message);
    }

    public getMessage(): Observable<boolean> {
        return this.messenger.asObservable();
    }

    public sendUpdatedForm(child: FormGroup): void {
        return this.formMsgr.next(child);
    }

    public getChildForm(): Observable<FormGroup> {
        return this.formMsgr.asObservable();
    }

}
