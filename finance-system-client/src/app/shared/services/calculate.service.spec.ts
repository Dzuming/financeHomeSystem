// /* tslint:disable:no-unused-variable */

// import { TestBed, async, inject, } from '@angular/core/testing';
// import { MockBackend } from '@angular/http/testing';
// import { CalculateService } from './calculate.service';
// import { AppModule } from '../../app.module';
// import { Http, Response, Headers, RequestOptions,RequestMethod, XHRBackend, ResponseOptions } from '@angular/http';
// describe('ProductService', () => {
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         AppModule
//       ],
//       providers: [CalculateService,
//         { provide: XHRBackend, useClass: MockBackend }
//       ],

//     })
//       .compileComponents();
//   });

//   it('should create product.service', inject([CalculateService], (service: CalculateService) => {
//     expect(service instanceof CalculateService).toBeTruthy();
//   }));
//   it('Should instantiate service with "new"', inject([Http], (http: Http) => {
//     expect(http).not.toBeNull('http should be provided');
//     let service = new CalculateService(http);
//     expect(service instanceof CalculateService).toBe(true, 'new service should be ok');
//   }));
//   it('Should provide the mockBackend as XHRBackend',
//     inject([XHRBackend], (backend: MockBackend) => {
//       expect(backend).not.toBeNull('backend should be provided');
//     }));
//   it('should calculate budget', inject([CalculateService], (service: CalculateService) => {
//     let productSpending = [{
//       spending: 2
//     },
//     {
//       spending: 3
//     },
//     {
//       spending: 7
//     }
//     ]
//     expect(service.calculateBudget(productSpending, 32)).toEqual('44.00');
//     expect(service.calculateBudget(productSpending, 120)).toEqual('132.00');
//     expect(service.calculateBudget(productSpending, 150)).toEqual('162.00');
//     expect(service.calculateBudget(productSpending, 0)).toEqual('12.00');
//     expect(service.calculateBudget(productSpending, 2000)).toEqual('2012.00');
//   }));
//   it('Should getProducts fake data', inject([ProductService, XHRBackend], (ProductService, mockBackend) => {
//     const mockResponse = {
//       data: [
//         { id: 0, name: 'Product 0' },
//         { id: 1, name: 'Product 1' },
//         { id: 2, name: 'Product 2' },
//         { id: 3, name: 'Product 3' },
//       ]
//     };

//     mockBackend.connections.subscribe((connection) => {
//       connection.mockRespond(new Response(new ResponseOptions({
//         body: JSON.stringify(mockResponse)
//       })));
//     });
//     ProductService.getProducts().subscribe((products) => {
//       expect(products.data.length).toEqual(4);
//       expect(products.data[0].name).toEqual('Product 0');
//       expect(products.data[1].name).toEqual('Product 1');
//       expect(products.data[2].name).toEqual('Product 2');
//       expect(products.data[3].name).toEqual('Product 3');
//     });
//   }));
//   it('Should getCategory fake data', inject([ProductService, XHRBackend], (ProductService, mockBackend) => {
//     const mockResponse = {
//       data: [
//         { id: 0, name: 'Category 0' },
//         { id: 1, name: 'Category 1' },
//         { id: 2, name: 'Category 2' },
//         { id: 3, name: 'Category 3' },
//       ]
//     };

//     mockBackend.connections.subscribe((connection) => {
//       connection.mockRespond(new Response(new ResponseOptions({
//         body: JSON.stringify(mockResponse)
//       })));
//     });
//     ProductService.getCategory().subscribe((category) => {
//       expect(category.data.length).toEqual(4);
//       expect(category.data[0].name).toEqual('Category 0');
//       expect(category.data[1].name).toEqual('Category 1');
//       expect(category.data[2].name).toEqual('Category 2');
//       expect(category.data[3].name).toEqual('Category 3');
//     });
//   }));
//   it('Should getBudget fake data', inject([ProductService, XHRBackend], (ProductService, mockBackend) => {
//     const mockResponse = {
//       data: [
//         { id: 0, name: 'Budget 0' },
//         { id: 1, name: 'Budget 1' },
//         { id: 2, name: 'Budget 2' },
//         { id: 3, name: 'Budget 3' },
//       ]
//     };

//     mockBackend.connections.subscribe((connection) => {
//       connection.mockRespond(new Response(new ResponseOptions({
//         body: JSON.stringify(mockResponse)
//       })));
//     });
//     ProductService.getBudget().subscribe((budget) => {
//       expect(budget.data.length).toEqual(4);
//       expect(budget.data[0].name).toEqual('Budget 0');
//       expect(budget.data[1].name).toEqual('Budget 1');
//       expect(budget.data[2].name).toEqual('Budget 2');
//       expect(budget.data[3].name).toEqual('Budget 3');
//     });
//   }));
// 
//   it('Should post new Product', inject([ProductService, XHRBackend], (ProductService, mockBackend) => {
//     const mockResponse = {
//       data: [
//         { id: 0, name: 'Budget 0' },
//         { id: 1, name: 'Budget 1' },
//         { id: 2, name: 'Budget 2' },
//         { id: 3, name: 'Budget 3' },
//       ]
//     };
//     mockBackend.connections.subscribe((connection) => {
//       expect(connection.request.method).toBe(RequestMethod.Post);
//       connection.mockRespond(new Response(new ResponseOptions({
//         body: JSON.stringify(mockResponse),
//         status: 201
//       })));
//     });
//     ProductService.addProducts(mockResponse.data[0]).subscribe((Product) => {
//       expect(Product).toBeDefined();

//       expect(Product.status).toBe(201);
//     });
//   }));
// });
