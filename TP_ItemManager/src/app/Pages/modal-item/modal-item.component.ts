import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Category } from 'src/app/Models/Category';
import { Item } from 'src/app/Models/Item';
import { HttpService } from 'src/app/Services/http.service';
import { StatusService } from 'src/app/Services/status.service';
import { ImagePickerComponent } from '../image-picker/image-picker.component';

@Component({
  selector: 'app-modal-item',
  templateUrl: './modal-item.component.html',
  styleUrls: ['./modal-item.component.scss'],
})
export class ModalItemComponent {
  item: Item;
  public flg_insert: boolean;

  itemForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    barcode: new FormControl('', [Validators.required]),
    price: new FormControl(0.0, [Validators.required]),
    imagePath: new FormControl('', [Validators.required]),
    flg_addToCart: new FormControl(true),
    flg_verifyAdult: new FormControl(false),
    flg_isMenu: new FormControl(false),
    available: new FormControl(true),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Item,
    public dialogRef: MatDialogRef<ModalItemComponent>,
    private http: HttpService,
    public status: StatusService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    {
      this.item = this.data || new Item();
      this.flg_insert = this.data == null;
    }
  }

  ngOnInit() {
    this.UpdateForm();
  }

  public SubmitForm() {
    if (this.itemForm.valid) {
      if (this.flg_insert) {
        this.http.InsertItem(this.GetItemFromForm()).subscribe((data) => {
          this.item = data;
          this.UpdateForm();
          this._snackBar.open('Item successfully created!', 'Ok');
        });
      } else {
        this.http.UpdateItem(this.GetItemFromForm()).subscribe((data) => {
          this.item = data;
          this.UpdateForm();
          this._snackBar.open('Item successfully updated!', 'Ok');
        });
      }
    }
  }

  GetItemFromForm(): Item {
    return new Item(
      this.item?.id != undefined ? this.item.id : undefined,
      this.itemForm.get('name')!.value!,
      this.itemForm.get('description')!.value!,
      this.itemForm.get('barcode')!.value!,
      this.itemForm.get('price')!.value!,
      this.itemForm.get('imagePath')!.value!,
      this.itemForm.get('flg_addToCart')!.value!,
      this.itemForm.get('flg_verifyAdult')!.value!,
      this.itemForm.get('flg_isMenu')!.value!,
      this.itemForm.get('available')!.value!
    );
  }

  UpdateForm() {
    if (this.item != null) {
      this.itemForm.patchValue({
        name: this.item.name,
        description: this.item.description,
        barcode: this.item.barcode,
        price: this.item.price,
        imagePath: this.item.imagePath,
        flg_addToCart: this.item.flg_addToCart,
        flg_verifyAdult: this.item.flg_verifyAdult,
        flg_isMenu: this.item.flg_isMenu,
        available: this.item.available,
      });
    }
  }
  ChangeImage() {
    const dialogRef = this.dialog.open(ImagePickerComponent, {
      data: this.item!.imagePath,
    });
    dialogRef.afterClosed().subscribe((data) => {
      this.item!.imagePath = data;
    });
  }
}
