import { TestBed, async, inject } from '@angular/core/testing';
import {
    HttpModule,
    Http,
    Response,
    ResponseOptions,
    RequestMethod,
    XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { RestService } from './rest.service';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
describe('RestService', () => {

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                { provide: environment, useValue: 'http://localhost:8081/' },
                RestService,
                { provide: XHRBackend, useClass: MockBackend },
                MockBackend
            ]
        });
    });
    it('should post an user',
        inject([RestService, MockBackend], (restService, mockBackend) => {

            const mockDataPost = [{
                "Name": {
                    "First": "Dawid",
                    "Last": "Poliszak"
                },
                "Email": "wawa@com",
                "Password": "password"
            }]

            restService.addUser(mockDataPost).subscribe((data) => {
                expect(data.length).toBe(4);
                expect(data.Name.First).toEqual('Dawid');
            })

        }))
})