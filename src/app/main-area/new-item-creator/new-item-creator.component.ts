import { Component, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { SessionService } from '../../session.service';
import { NewItemCreatorService } from '../../new-item-creator.service';

@Component({
  selector: 'app-new-item-creator',
  templateUrl: './new-item-creator.component.html',
  styleUrls: ['./new-item-creator.component.css']
})

//Google Book API API key:  'AIzaSyBOQWG0XcRTL4bQvw4jIP9A-hLhwCKf-AY'
export class NewItemCreatorComponent implements OnInit {

    public itemAttributes: FormGroup;
    public

    constructor(private sessionService: SessionService, private creatorService: NewItemCreatorService) {



    }

    ngOnInit() {

    }

}
