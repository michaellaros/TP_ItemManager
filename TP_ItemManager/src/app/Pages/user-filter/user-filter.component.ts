import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserModel } from 'src/app/Models/UserModel';
import { HttpService } from 'src/app/Services/http.service';
import { StatusService } from 'src/app/Services/status.service';
import { SearchedObject } from 'src/app/Models/SearchedObject';


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
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.GetUsers();
  }

  GetUsers() {
    let name =
      this.filterForm.get('name')?.value!;
    let id=
    this.filterForm.get('id')?.value!;


    this.http.GetUsers({Name:name,Id:id}).subscribe((data) => {
      if (data == null) {
        this.list = [];
      } else {
        console.log(data)
        this.list = data
        console.log(this.list)
      }
    });
  }

}
