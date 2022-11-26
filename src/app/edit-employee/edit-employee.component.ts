import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../service/http-provider.service';
import {InvoiceForm} from "../model/Invoice";

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {
  editInvoiceForm: InvoiceForm = new InvoiceForm();

  @ViewChild("invoiceForm")
  invoiceForm!: NgForm;

  isSubmitted: boolean = false;
  employeeId: any;

  constructor(private toastr: ToastrService, private route: ActivatedRoute, private router: Router,
    private httpProvider: HttpProviderService) { }

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.params['employeeId'];
    this.getInvoiceDetailById();
  }

  getInvoiceDetailById() {
    this.httpProvider.getInvoiceDetailById(this.employeeId).subscribe((data: any) => {
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.editInvoiceForm.id = resultData.id;
          this.editInvoiceForm.invoiceDate = resultData.invoiceDate;
          this.editInvoiceForm.biller = resultData.biller;
          this.editInvoiceForm.amount = resultData.amount;
          this.editInvoiceForm.description = resultData.description;
        }
      }
    },
      (error: any) => { });
  }

  EditInvoice(isValid: any) {
    this.isSubmitted = true;
    if (isValid) {
      this.httpProvider.saveInvoice(this.editInvoiceForm).subscribe(async data => {
        if (data != null && data.body != null) {
          var resultData = data.body;
          if (resultData != null && resultData.isSuccess) {
            if (resultData != null && resultData.isSuccess) {
              this.toastr.success(resultData.message);
              setTimeout(() => {
                this.router.navigate(['/Home']);
              }, 500);
            }
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

