import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Discount } from 'src/app/Models/Discount';
import { HttpService } from 'src/app/Services/http.service';
import { StatusService } from 'src/app/Services/status.service';

@Component({
  selector: 'app-modal-discount',
  templateUrl: './modal-discount.component.html',
  styleUrls: ['./modal-discount.component.scss'],
})
export class ModalDiscountComponent {
  discount?: Discount;
  public flg_insert: boolean;

  discountForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    id: new FormControl(''),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Discount,
    private http: HttpService,
    public status: StatusService,
    private _snackBar: MatSnackBar
  ) {
    {
      this.discount = this.data;
      this.flg_insert = this.data == null;
    }
  }

  ngOnInit() {
    this.UpdateForm();
  }

  public SubmitForm() {
    console.log('submit');

    console.log(this.GetDiscountFromForm());
    this.http.UpdateDiscount(this.GetDiscountFromForm()).subscribe((data) => {
      this.discount = data;

      this.UpdateForm();
      this._snackBar.open('Discount successfully updated!', 'Ok', {
        duration: this.status.snackbarDuration,
      });
    });
  }

  GetDiscountFromForm(): Discount {
    return new Discount(
      this.discount?.id != undefined ? this.discount.id : undefined,
      this.discountForm.get('name')!.value!
    );
  }

  UpdateForm() {
    console.log(this.discount);
    if (this.discount != null) {
      this.discountForm.patchValue({
        name: this.discount.name,
        id: this.discount.id,
      });
    }
  }
}
