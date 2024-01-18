import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AssignedObject } from 'src/app/Models/AssignedObject';
import { Item } from 'src/app/Models/Item';
import { ItemGroup } from 'src/app/Models/ItemGroup';
import { StorageManagerService } from 'src/app/Services/auth-services/storage-manager.service';
import { HttpService } from 'src/app/Services/http.service';
import { StatusService } from 'src/app/Services/status.service';

@Component({
  selector: 'app-modal-itemgroup',
  templateUrl: './modal-itemgroup.component.html',
  styleUrls: ['./modal-itemgroup.component.scss'],
})
export class ModalItemgroupComponent {
  itemGroup: ItemGroup;
  public flg_insert: boolean;

  itemGroupForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl(''),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: ItemGroup,
    public dialogRef: MatDialogRef<ModalItemgroupComponent>,
    private http: HttpService,
    public status: StatusService,
    private _snackBar: MatSnackBar,
    public storage: StorageManagerService,
    private dialog: MatDialog
  ) {
    {
      this.itemGroup = this.data || new ItemGroup();
      this.flg_insert = this.data == null;
    }
  }

  ngOnInit() {
    this.UpdateForm();
  }

  public SubmitForm() {
    if (this.flg_insert) {
      this.http
        .InsertItemGroup(this.GetItemGroupFromForm())
        .subscribe((data) => {
          this.itemGroup = data;

          this.UpdateForm();
          this.flg_insert = false;
          this._snackBar.open('Item group successfully created!', 'Ok', {
            duration: this.status.snackbarDuration,
          });
        });
    } else {
      this.http
        .UpdateItemGroup(this.GetItemGroupFromForm())
        .subscribe((data) => {
          this.itemGroup = data;
          this.UpdateForm();
          this._snackBar.open('Item group successfully updated!', 'Ok', {
            duration: this.status.snackbarDuration,
          });
        });
    }
  }

  GetItemGroupFromForm(): ItemGroup {
    return new ItemGroup(
      this.itemGroup?.id != undefined ? this.itemGroup.id : undefined,
      this.itemGroupForm.get('name')!.value!,
      this.itemGroupForm.get('description')!.value !== undefined
        ? this.itemGroupForm.get('description')!.value!
        : ''
    );
  }

  UpdateForm() {
    if (this.itemGroup != null) {
      this.itemGroupForm.patchValue({
        name: this.itemGroup.name,
        description: this.itemGroup.description,
      });
    }
  }
}
