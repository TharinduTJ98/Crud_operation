import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddEmpComponent } from './add-emp/add-emp.component';
import { EmployeeService } from './services/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'CRUD';
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'bDate', 'gender', 'education', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog, private _empService: EmployeeService) {

  }

  ngOnInit(): void {
    this.getEmployeeList();
  }

  openAddEditDialog() {
    const dialogRef = this._dialog.open(AddEmpComponent)
    dialogRef.afterClosed().subscribe({
      next: (val) =>{
        if(val){
          this.getEmployeeList();
        }
      }
    })
  }

  getEmployeeList() {
    this._empService.getEmployeeList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  deleteEmployee(id:number){
    this._empService.deleteEmployee(id).subscribe({
      next: (res) => {
        alert("Successfull deleted")
        this.getEmployeeList();
      },
      error: (err:any) =>{
        console.log(err)
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openEditDialog(data:any) {
    const dialogRef =  this._dialog.open(AddEmpComponent, {data});
    {
      dialogRef.afterClosed().subscribe({
        next: (val) =>{
          if(val){
            this.getEmployeeList();
          }
        }
      })
    }
  }
}
