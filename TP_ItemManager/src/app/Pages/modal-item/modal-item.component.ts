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
import { VYItem } from 'src/app/Models/VYItem';

@Component({
  selector: 'app-modal-item',
  templateUrl: './modal-item.component.html',
  styleUrls: ['./modal-item.component.scss'],
})
export class ModalItemComponent {
  item: Item;
  vyItem: VYItem | null = null;

  public flg_insert: boolean;

  itemForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    barcode: new FormControl('', [Validators.required]),
    flg_addToCart: new FormControl(true),
    flg_verifyAdult: new FormControl(false),
    flg_isMenu: new FormControl(false),
    available: new FormControl(true),

    price: new FormControl('0', [Validators.required]),
    vat: new FormControl('0', [Validators.required]),
    receiptDescription: new FormControl('', [Validators.required]),
  });

  constructor(
    @Inject('IMAGES_URL') public imageUrl: string,
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
    this.itemForm.get('barcode')?.valueChanges.subscribe((data) => {
      if (
        this.itemForm.get('barcode')?.value == undefined ||
        this.itemForm.get('barcode')?.value == null ||
        this.itemForm.get('barcode')?.value == ''
      ) {
        this.itemForm.patchValue({
          price: '',
          vat: '',
          receiptDescription: '',
        });
      } else this.GetVYItem();
    });
  }

  public SubmitForm() {
    console.log('submit');
    if (this.itemForm.valid) {
      if (this.item.imagePath == null) {
        this._snackBar.open('Select item image!', 'Ok', {
          duration: this.status.snackbarDuration,
        });
        return;
      }

      if (this.flg_insert) {
        console.log(this.GetItemFromForm());
        this.http.InsertItem(this.GetItemFromForm()).subscribe((data) => {
          this.item = data;

          this.UpdateForm();
          this.flg_insert = false;
          this._snackBar.open('Item successfully created!', 'Ok', {
            duration: this.status.snackbarDuration,
          });
        });
      } else {
        console.log(this.GetItemFromForm());
        this.http.UpdateItem(this.GetItemFromForm()).subscribe((data) => {
          this.item = data;

          // this.GetVYItem();
          this.UpdateForm();
          this._snackBar.open('Item successfully updated!', 'Ok', {
            duration: this.status.snackbarDuration,
          });
        });
      }
      if (
        this.vyItem == null ||
        this.vyItem.price != this.itemForm.get('price')?.value ||
        this.vyItem.receiptDescription !=
          this.itemForm.get('receiptDescription')?.value ||
        this.vyItem.vat != this.itemForm.get('vat')?.value
      ) {
        this.UpdateVynamicItem();
      } else {
        this.GetVYItem();
      }
    }
  }

  GetItemFromForm(): Item {
    return new Item(
      this.item?.id != undefined ? this.item.id : undefined,
      this.itemForm.get('name')!.value!,
      this.itemForm.get('description')!.value!,
      this.itemForm.get('barcode')!.value!,
      this.itemForm.get('price')!.value != null
        ? Number.parseFloat(this.itemForm.get('price')!.value!)
        : 0,
      this.item.imagePath || '',
      this.itemForm.get('flg_addToCart')!.value!,
      this.itemForm.get('flg_verifyAdult')!.value!,
      this.itemForm.get('flg_isMenu')!.value!,
      this.itemForm.get('available')!.value!
    );
  }

  GetVYItem() {
    this.http
      .GetVYItem(this.itemForm.get('barcode')?.value!)
      .subscribe((data: VYItem | null) => {
        this.vyItem = data;
        if (data != null) {
          this.itemForm.patchValue({
            price: data.price,
            vat: data.vat,
            receiptDescription: data.receiptDescription,
          });
        } else {
          this.itemForm.patchValue({
            price: '',
            vat: '',
            receiptDescription: '',
          });
        }
      });
  }

  UpdateVynamicItem() {
    this.http
      .UpdateVynamicItem({
        barcode: this.itemForm.get('barcode')?.value!,
        price: this.itemForm.get('price')?.value!,
        receiptDescription: this.itemForm.get('receiptDescription')?.value!,
        vat: this.itemForm.get('vat')?.value!,
      })
      .subscribe((data: VYItem | null) => {
        this.vyItem = data;
        if (data != null) {
          this.itemForm.patchValue({
            price: data.price,
            vat: data.vat,
            receiptDescription: data.receiptDescription,
          });
        } else {
          this.itemForm.patchValue({
            price: '',
            vat: '',
            receiptDescription: '',
          });
        }
      });
  }

  UpdateForm() {
    console.log(this.item);
    if (this.flg_insert) {
      this.itemForm.patchValue({
        flg_addToCart: true,
        available: true,
      });
    } else {
      this.itemForm.patchValue({
        name: this.item.name,
        description: this.item.description,
        barcode: this.item.barcode,
        flg_addToCart: this.item.flg_addToCart,
        flg_verifyAdult: this.item.flg_verifyAdult,
        flg_isMenu: this.item.flg_isMenu,
        available: this.item.available,
      });

      if (this.itemForm.get('barcode')!.value! != '') {
        this.GetVYItem();
      }
    }
  }
  ChangeImage() {
    const dialogRef = this.dialog.open(ImagePickerComponent, {
      data: { image: this.item.imagePath, folderName: 'Items' },
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data != null) this.item!.imagePath = data;
    });
  }
}
