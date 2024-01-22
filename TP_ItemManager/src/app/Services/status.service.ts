import { EventEmitter, Injectable, Output } from '@angular/core';
import { Language } from '../Models/language';
import { ModalAvailabilityComponent } from '../Pages/modal-availability/modal-availability.component';

import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { HttpService } from './http.service';
import { CountryAvailability } from '../Models/CountryAvailability';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  public token!: string;
  public buttonValue: string = 'category';
  public languages: Language[] = [];
  public isLogged: string = 'false';
  public deleteMode: boolean = false;
  public user: string = '';
  public snackbarDuration: number = 1500;
  public listAvailable!: CountryAvailability[];
  @Output() public refresh = new EventEmitter();

  error: Boolean = false;
  constructor(private dialog: MatDialog, private http: HttpService) {}

  OpenDialogModifyItem(id: string, type: string) {
    this.http.GetAvailability(id, type).subscribe((data) => {
      this.listAvailable = data;
      const dialogRef = this.dialog.open(ModalAvailabilityComponent, {
        data: { list: this.listAvailable, id: id, type: type },
        width: '60vw',
      });
      dialogRef.afterClosed().subscribe(() => {});
    });
  }

  DeleteObject(id: string, type: string) {
    if (confirm('The element will be deleted permanently!')) {
      this.http.DeleteObject(type, id).subscribe(() => this.refresh.emit(null));
    }
  }
}
