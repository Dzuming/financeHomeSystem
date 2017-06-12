import { Component, OnInit } from '@angular/core';
import { Registration } from '../shared/models/registration.model'
import { RestService } from '../shared/services/rest.service'
@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
    private errorMessage: string;
    constructor(
        private restService: RestService) { }
    ngOnInit() {
    }
    addUser(user) {
         this.restService.addUser(user)
      .subscribe(
      () => { console.log('success')
      },
      error => this.errorMessage = <any>error);
    }
}
