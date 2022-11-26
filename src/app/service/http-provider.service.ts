import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {WebApiService} from './web-api.service';

var apiUrl = "/api";
// var apiUrl = "http://localhost:8080/api";

var httpLink = {
  getAllInvoices: apiUrl + "/facturas",
  deleteInvoiceById: apiUrl + "/facturas",
  getInvoiceDetailById: apiUrl + "/facturas",
  saveInvoice: apiUrl + "/facturas"
}

@Injectable({
  providedIn: 'root'
})
export class HttpProviderService {

  constructor(private webApiService: WebApiService) {
  }

  public getAllInvoices(): Observable<any> {
    return this.webApiService.get(httpLink.getAllInvoices);
  }

  public deleteInvoiceById(model: any): Observable<any> {
    return this.webApiService.delete(httpLink.deleteInvoiceById + '/' + model, "");
  }

  public getInvoiceDetailById(model: any): Observable<any> {
    return this.webApiService.get(httpLink.getInvoiceDetailById + '/' + model);
  }

  public saveInvoice(model: any): Observable<any> {
    return this.webApiService.post(httpLink.saveInvoice, model);
  }

}
