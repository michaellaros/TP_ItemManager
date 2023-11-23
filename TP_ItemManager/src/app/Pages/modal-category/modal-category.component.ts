import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../Services/http.service';
import { StatusService } from '../../Services/status.service';
import { Category } from '../../Models/Category';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImagePickerComponent } from '../image-picker/image-picker.component';

@Component({
  selector: 'app-modal-category',
  templateUrl: './modal-category.component.html',
  styleUrls: ['./modal-category.component.scss'],
})
export class ModalCategoryComponent {
  category: Category;
  public flg_insert: boolean;

  categoryForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    available: new FormControl(true),
    dineIn: new FormControl(true),
    takeAway: new FormControl(true),
    order: new FormControl(999, [Validators.max(999), Validators.min(1)]),
  });

  constructor(
    @Inject('IMAGES_URL') public imageUrl: string,
    @Inject(MAT_DIALOG_DATA) private data: Category,
    public dialogRef: MatDialogRef<ModalCategoryComponent>,
    private http: HttpService,
    public status: StatusService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    {
      this.category = this.data || new Category();
      this.flg_insert = this.data == null;
    }
  }

  ngOnInit() {
    this.UpdateForm();
  }

  OpenDialogModifyItem(itemId: string, type: string) {
    this.status.OpenDialogModifyItem(itemId, type);
  }

  public SubmitForm() {
    if (this.categoryForm.valid) {
      if (this.flg_insert) {
        this.http
          .InsertCategory(this.GetCategoryFromForm())
          .subscribe((data) => {
            console.log(data);
            this.category = data;
            this.UpdateForm();
            this.flg_insert = false;
            console.log(this.flg_insert);
            this._snackBar.open('Category successfully created!', 'Ok', {
              duration: this.status.snackbarDuration,
            });
          });
      } else {
        this.http
          .UpdateCategory(this.GetCategoryFromForm())
          .subscribe((data) => {
            this.category = data;
            this.UpdateForm();
            this._snackBar.open('Category successfully updated!', 'Ok', {
              duration: this.status.snackbarDuration,
            });
          });
      }
    }
  }

  GetCategoryFromForm(): Category {
    return new Category(
      this.category.id != undefined ? this.category.id : undefined,
      this.categoryForm.get('name')!.value!,
      this.category.imagePath,
      this.categoryForm.get('available')!.value!,
      this.categoryForm.get('dineIn')!.value! &&
      this.categoryForm.get('takeAway')!.value!
        ? 'DI-TA'
        : this.categoryForm.get('dineIn')!.value!
        ? 'DI'
        : this.categoryForm.get('takeAway')!.value!
        ? 'TA'
        : '',
      999 // this.categoryForm.get('order')!.value!
    );
  }

  UpdateForm() {
    if (this.category != null) {
      this.categoryForm.patchValue({
        available: this.category.available,
        name: this.category.name,
        dineIn: this.category.codConsumationAllowed?.includes('DI'),
        takeAway: this.category.codConsumationAllowed?.includes('TA'),
        order: 999, //  this.category.categoryOrder,
      });
    }
  }

  ChangeImage() {
    const dialogRef = this.dialog.open(ImagePickerComponent, {
      data: { image: this.category.imagePath, folderName: 'Categories' },
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data != null) this.category.imagePath = data;
    });
  }
}
