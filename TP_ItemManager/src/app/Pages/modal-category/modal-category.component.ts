import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../Services/http.service';
import { StatusService } from '../../Services/status.service';
import { Category } from '../../Models/Category';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal-category',
  templateUrl: './modal-category.component.html',
  styleUrls: ['./modal-category.component.scss'],
})
export class ModalCategoryComponent {
  category!: Category;
  public flg_insert: boolean;

  categoryForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    imagePath: new FormControl('', [Validators.required]),
    available: new FormControl(true),
    dineIn: new FormControl(true),
    takeAway: new FormControl(true),
    order: new FormControl(999, [
      Validators.max(999),
      Validators.min(1),
      Validators.required,
    ]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Category,
    public dialogRef: MatDialogRef<ModalCategoryComponent>,
    private http: HttpService,
    public status: StatusService,
    private _snackBar: MatSnackBar
  ) {
    {
      this.category = this.data;
      this.flg_insert = this.data == null;
    }
  }

  ngOnInit() {
    this.UpdateForm();
  }

  public SubmitForm() {
    if (this.categoryForm.valid) {
      if (this.flg_insert) {
        this.http
          .InsertCategory(this.GetCategoryFromForm())
          .subscribe((data) => {
            this.category = data;
            this.UpdateForm();
            this._snackBar.open('Category successfully created!', 'Ok');
          });
      } else {
        this.http
          .UpdateCategory(this.GetCategoryFromForm())
          .subscribe((data) => {
            this.category = data;
            this.UpdateForm();
            this._snackBar.open('Category successfully updated!', 'Ok');
          });
      }
    }
  }

  GetCategoryFromForm(): Category {
    return new Category(
      this.category?.id != undefined ? this.category.id : undefined,
      this.categoryForm.get('name')!.value!,
      this.categoryForm.get('imagePath')!.value!,
      this.categoryForm.get('available')!.value!,
      this.categoryForm.get('dineIn')!.value! &&
      this.categoryForm.get('takeAway')!.value!
        ? 'DI-TA'
        : this.categoryForm.get('dineIn')!.value!
        ? 'DI'
        : this.categoryForm.get('takeAway')!.value!
        ? 'TA'
        : '',
      this.categoryForm.get('order')!.value!
    );
  }

  UpdateForm() {
    if (this.category != null) {
      this.categoryForm.patchValue({
        available: this.category.available,

        imagePath: this.category.imagePath,
        name: this.category.name,
        dineIn: this.category.codConsumationAllowed?.includes('DI'),
        takeAway: this.category.codConsumationAllowed?.includes('TA'),
      });
    }
  }
}
