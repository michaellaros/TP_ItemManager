import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CategoryFilterModel } from 'src/app/Models/CategoryFilterModel';
import { SearchedObject } from 'src/app/Models/SearchedObject';
import { HttpService } from 'src/app/Services/http.service';
import { StatusService } from 'src/app/Services/status.service';
import { MatDialog } from '@angular/material/dialog';
import { Category } from 'src/app/Models/Category';
import { ModalCategoryComponent } from 'src/app/Pages/modal-category/modal-category.component';
@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss'],
})
export class CategoryFilterComponent {
  public list: SearchedObject[] = [];
  filterForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    barcode: new FormControl(''),
  });

  constructor(
    private http: HttpService,
    public status: StatusService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.GetCategory();
  }

  GetCategory() {
    let id =
      this.filterForm.get('id')?.value != undefined
        ? this.filterForm.get('id')?.value!
        : '';
    let name =
      this.filterForm.get('name')?.value != undefined
        ? this.filterForm.get('name')?.value!
        : '';
    let list: SearchedObject[] = [];
    this.http
      .FilterCategory(new CategoryFilterModel(id, name, 0, 50))
      .subscribe((data) => {
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

  OpenDialogModifyCategory() {
    const dialogRef = this.dialog.open(ModalCategoryComponent);
    dialogRef.afterClosed().subscribe(() => this.GetCategory());
  }
}
