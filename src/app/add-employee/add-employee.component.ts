import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {HttpProviderService} from '../service/http-provider.service';
import {InvoiceForm} from "../model/Invoice";

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  addInvoiceForm: InvoiceForm = new InvoiceForm();

  @ViewChild("invoiceForm")
  invoiceForm!: NgForm;

  isSubmitted: boolean = false;

  constructor(private router: Router, private httpProvider: HttpProviderService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
  }

  AddInvoice(isValid: any) {
    this.isSubmitted = true;
    if (isValid) {
      this.httpProvider.saveInvoice(this.addInvoiceForm).subscribe(async data => {
          if (data != null && data.body != null) {
            var resultData = data.body;
            if (resultData != null && resultData.isSuccess) {
              this.toastr.success(resultData.message);
              setTimeout(() => {
                this.router.navigate(['/Home']);
              }, 500);
            }
          }
        },
        async error => {
          this.toastr.error(error.message);
          setTimeout(() => {
            this.router.navigate(['/Home']);
          }, 500);
        });
    }
  }

}

