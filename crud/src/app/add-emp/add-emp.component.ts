import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-emp',
  templateUrl: './add-emp.component.html',
  styleUrls: ['./add-emp.component.scss']
})
export class AddEmpComponent implements OnInit {
  empForm: FormGroup;

  education: string[] = [
    'School',
    'Graduate',
    'Under Graduate',
    'Post Graduate'
  ];

  constructor(private _formBulder: FormBuilder, private _empService: EmployeeService, private _dialogRef: MatDialogRef<AddEmpComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.empForm = this._formBulder.group({
      firstName: '',
      lastName: '',
      email: '',
      bDate: '',
      gender: '',
      education: ''
    })
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this._empService.editEmployee(this.data.id, this.empForm.value).subscribe({
          next: (val: any) => {
            alert("Employee Update successfully")
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            alert(err)
          }
        })
      } else {
        this._empService.addEmployee(this.empForm.value).subscribe({
          next: (val:any) => {
            alert("Employee added successfully")
            this._dialogRef.close(true);
          }
        })
      }
    }
  }
}
