import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SearchedObject } from 'src/app/Models/SearchedObject';
import { HttpService } from 'src/app/Services/http.service';
import { StatusService } from 'src/app/Services/status.service';
import { ModalKioskComponent } from '../modal-kiosk/modal-kiosk.component';
import { ModalMenuComponent } from '../modal-menu/modal-menu.component';

@Component({
  selector: 'app-menu-filter',
  templateUrl: './menu-filter.component.html',
  styleUrls: ['./menu-filter.component.scss'],
})
export class MenuFilterComponent {
  public list!: SearchedObject[];
  filterForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
  });

  constructor(
    private http: HttpService,
    public status: StatusService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.GetMenus();
  }
  ResetForm() {
    this.filterForm.reset();
    this.GetMenus();
  }

  GetMenus() {
    let id =
      this.filterForm.get('id')?.value != undefined
        ? this.filterForm.get('id')?.value!
        : '';
    let name =
      this.filterForm.get('name')?.value != undefined
        ? this.filterForm.get('name')?.value!
        : '';

    let list: SearchedObject[] = [];

    this.http.FilterMenu({ Id: id, Name: name }).subscribe((data) => {
      if (data == null) {
        this.list = [];
      } else {
        Object.keys(data).forEach((key) => {
          list.push(new SearchedObject(key, data[key]));
        });
        this.list = list;
      }
    });
  }
  OpenDialogAddMenu() {
    const dialogRef = this.dialog.open(ModalMenuComponent, {
      minWidth: '100%',
      height: '100%',
    });
    dialogRef.afterClosed().subscribe(() => this.GetMenus());
  }
}
