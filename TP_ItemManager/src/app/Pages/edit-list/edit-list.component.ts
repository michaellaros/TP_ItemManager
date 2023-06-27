import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
  signal,
} from '@angular/core';
import { HttpService } from 'src/app/Services/http.service';
import { SearchedObject } from 'src/app/Models/SearchedObject';
import { MaterialModule } from 'src/app/Modules/material.module';

import { Item } from 'src/app/Models/Item';
import { Option } from 'src/app/Models/Option';
import { Category } from 'src/app/Models/Category';
import { MatDialog } from '@angular/material/dialog';
import { ModalItemComponent } from 'src/app/Pages/modal-item/modal-item.component';
import { ModalCategoryComponent } from 'src/app/Pages/modal-category/modal-category.component';
import { ModalOptionComponent } from 'src/app/Pages/modal-option/modal-option.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Kiosk } from 'src/app/Models/Kiosk';
import { ModalKioskComponent } from '../modal-kiosk/modal-kiosk.component';
import { UserModelRequest } from 'src/app/Models/UserModelRequest';
import { ModalUserComponent } from '../modal-user/modal-user.component';
import { StatusService } from 'src/app/Services/status.service';
@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss'],
})
export class EditListComponent implements OnChanges {

  @Input() public parentData?: SearchedObject[];
  @Input() public columnName: string = 'Name';
  @Output() public refresh = new EventEmitter();
  displayedColumns: string[] = ['id', 'name', 'delete'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource: MatTableDataSource<SearchedObject>;
  constructor(private status:StatusService,public http: HttpService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<SearchedObject>(this.parentData);
  }

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges) {
    this.dataSource.data = changes['parentData'].currentValue;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ModifyItem(id: string) {
    switch (this.columnName) {
      case 'Item':
        this.http.GetItem(id).subscribe((data) => {
          console.log(data);
          this.OpenDialogModifyItem(data);
        });
        break;
      case 'Category':
        this.http.GetCategory(id).subscribe((data) => {
          console.log(data);
          this.OpenDialogModifyCategory(data);
        });
        break;
      case 'Option':
        this.http.GetOption(id).subscribe((data) => {
          console.log(data);
          this.OpenDialogModifyOption(data);
        });
        break;
      case 'Kiosk':
        this.http.GetKiosk(id).subscribe((data) => {
          console.log(data);
          this.OpenDialogModifyKiosk(data);
        });
        break;
        case 'User':
        this.http.GetUser(id).subscribe((data) => {
          this.status.user = id;
          this.OpenDialogModifyUser(data);
        });
        break;
    }
  }

  OpenDialogModifyItem(item: Item) {
    const dialogRef = this.dialog.open(ModalItemComponent, {
      data: item,
      width: '60vw',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.refresh.emit(null);
    });
  }
  OpenDialogModifyCategory(category: Category) {
    const dialogRef = this.dialog.open(ModalCategoryComponent, {
      data: category,
      width: '60vw',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.refresh.emit(null);
    });
  }
  OpenDialogModifyOption(option: Option) {
    const dialogRef = this.dialog.open(ModalOptionComponent, {
      data: option,
      width: '60vw',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.refresh.emit(null);
    });
  }
  OpenDialogModifyKiosk(kiosk: Kiosk) {
    const dialogRef = this.dialog.open(ModalKioskComponent, {
      data: kiosk,
      width: '60vw',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.refresh.emit(null);
    });
  }

  OpenDialogModifyUser(user: UserModelRequest) {
    const dialogRef = this.dialog.open(ModalUserComponent, {
      data: user,
      width: '60vw',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.refresh.emit(null);
    });
  }

  DeleteObject(id: string) {
    if (confirm('The element will be deleted permanently!')) {
      //todo cambiare pop up
      this.http
        .DeleteObject(this.columnName, id)
        .subscribe(() => this.refresh.emit(null));
    }
  }
}
