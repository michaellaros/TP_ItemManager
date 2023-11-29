import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HttpService } from 'src/app/Services/http.service';
import { UserModelRequest } from 'src/app/Models/UserModelRequest';
import { StatusService } from 'src/app/Services/status.service';
import { SearchedObject } from 'src/app/Models/SearchedObject';
import { ModalUserComponent } from '../modal-user/modal-user.component';
import { StorageManagerService } from 'src/app/Services/auth-services/storage-manager.service';


@Component({
  selector: 'app-user-filter',
  templateUrl: './user-filter.component.html',
  styleUrls: ['./user-filter.component.scss']
})
export class UserFilterComponent {
  public list!: SearchedObject[];
  filterForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('')
  });


  constructor(
    private http: HttpService,
    public status: StatusService,
    public dialog: MatDialog,
    public storage:StorageManagerService
  ) {}

  ngOnInit() {
    this.GetUsers();
  }

  ResetForm(){
    this.filterForm.reset();
    this.GetUsers();
  }
  GetUsers() {
    let name =
    this.filterForm.get('name')?.value != undefined
    ? this.filterForm.get('name')?.value!
    : '';
    let id=
    this.filterForm.get('id')?.value != undefined
        ? this.filterForm.get('id')?.value!
        : '';


    this.http.GetUsers({Name:name,Id:id}).subscribe((data) => {
      if (data == null) {
        this.list = [];
      } else {
        this.list = data;
      }
    });
  }

  OpenDialogAddUser() {

    const dialogRef = this.dialog.open(ModalUserComponent, {
      width: '60vw',
    });
    dialogRef.afterClosed().subscribe(() => this.GetUsers());
  }

}
