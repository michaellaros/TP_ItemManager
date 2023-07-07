import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { OptionFilterModel } from 'src/app/Models/OptionFilterModel';
import { SearchedObject } from 'src/app/Models/SearchedObject';
import { HttpService } from 'src/app/Services/http.service';
import { StatusService } from 'src/app/Services/status.service';
import { ModalOptionComponent } from 'src/app/Pages/modal-option/modal-option.component';
import { Option } from 'src/app/Models/Option';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-option-filter',
  templateUrl: './option-filter.component.html',
  styleUrls: ['./option-filter.component.scss'],
})
export class OptionFilterComponent {
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
    this.GetOptions();
  }
  ResetForm(){
    this.filterForm.reset();
    this.GetOptions();
  }
  GetOptions() {
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
      .FilterOption(new OptionFilterModel(id, name, 0, 50))
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
  OpenDialogModifyOption() {
    const dialogRef = this.dialog.open(ModalOptionComponent, {
      width: '60vw',
    });
    dialogRef.afterClosed().subscribe(() => this.GetOptions());
  }
}
