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
import { ItemVat } from 'src/app/Models/ItemVat';
import { StorageManagerService } from 'src/app/Services/auth-services/storage-manager.service';

@Component({
  selector: 'app-modal-item',
  templateUrl: './modal-item.component.html',
  styleUrls: ['./modal-item.component.scss'],
})
export class ModalItemComponent {

  item: Item;
  itemVat!: ItemVat;
  public flg_insert: boolean;

  itemForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    //[Validators.required] rimosso perchè se nella creazione item non metti la descrizione
    //una volta creato se vuoi cambiare il nome sei obbligato per forza a
    // mettere una descrizione
    barcode: new FormControl(''),
    flg_addToCart: new FormControl(true),
    flg_verifyAdult: new FormControl(false),
    flg_isMenu: new FormControl(false),
    available: new FormControl(true),
  });

  itemvatform = new FormGroup({
    price: new FormControl({ value: '0', disabled: true }),
    vat: new FormControl({ value: '0', disabled: true }),
  });

  constructor(
    @Inject('IMAGES_URL') public imageUrl: string,
    @Inject(MAT_DIALOG_DATA) private data: Item,
    public dialogRef: MatDialogRef<ModalItemComponent>,
    private http: HttpService,
    public status: StatusService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    public storage: StorageManagerService
  ) {
    {
      this.item = this.data || new Item();
      this.flg_insert = this.data == null;
    }
  }

  ngOnInit() {
    this.UpdateForm();
    this.itemForm.get('barcode')?.valueChanges.subscribe((data) => {
      console.log(data);

      this.GetItemVat(data || '');
    });

    if (!this.storage.CheckPermission(this.storage.userPermission)) {
      console.log('permessi' + this.storage.CheckPermission(this.storage.userPermission))
      this.itemForm.get('name')?.disable();
      this.itemForm.get('description')?.disable();
      this.itemForm.get('barcode')?.disable();
      this.itemForm.get('flg_addToCart')?.disable();
      this.itemForm.get('flg_verifyAdult')?.disable();
      this.itemForm.get('flg_isMenu')?.disable();


    }
  }

  public SubmitForm() {
    console.log('submit');
    if (this.itemForm.valid) {
      if (this.item.imagePath == null) {
        this._snackBar.open('Select item image!', 'Ok', {
          duration: this.status.snackbarDuration,
        });
        return;
      } else {
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

            this.GetItemVat(this.item.barcode || '');
            this.UpdateForm();
            this._snackBar.open('Item successfully updated!', 'Ok', {
              duration: this.status.snackbarDuration,
            });
          });
        }
      }
    }
  }

  GetItemFromForm(): Item {
    return new Item(
      this.item?.id != undefined ? this.item.id : undefined,
      this.itemForm.get('name')!.value!,
      this.itemForm.get('description')!.value !== undefined ? this.itemForm.get('description')!.value! : '' ,
      this.itemForm.get('barcode')!.value!,
      0,
      this.item.imagePath,
      this.itemForm.get('flg_addToCart')!.value!,
      this.itemForm.get('flg_verifyAdult')!.value!,
      this.itemForm.get('flg_isMenu')!.value!,
      this.itemForm.get('available')!.value!
    );
  }

  GetItemVat(barcode: string) {
    console.log(barcode != null);
    console.log(barcode != undefined);
    console.log(barcode != '');
    if (barcode == undefined || barcode == null || barcode == '') {
      this.itemvatform.patchValue({
        price: '',
        vat: '',
      });
      return;
    }

    this.http.GetItemVat(barcode).subscribe((data) => {
      this.itemvatform.patchValue({
        price: data != null ? data.price + '€' : '',
        vat: data != null ? data.vat + '%' : '',
      });
    });
  }

  UpdateForm() {
    console.log(this.item);
    if (this.item != null) {
      this.itemForm.patchValue({
        name: this.item.name,
        description: this.item.description,
        barcode: this.item.barcode,
        flg_addToCart: this.item.flg_addToCart,
        flg_verifyAdult: this.item.flg_verifyAdult,
        flg_isMenu: this.item.flg_isMenu,
        available: this.item.available,
      });

      this.GetItemVat(this.item.barcode || '');
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
