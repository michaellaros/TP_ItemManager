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

interface valueType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-modal-discount',
  templateUrl: './modal-discount.component.html',
  styleUrls: ['./modal-discount.component.scss'],
})
export class ModalDiscountComponent {
  discount?: Discount;
  public flg_insert: boolean;
  discountType: valueType[] = [
    { value: 'Percent', viewValue: 'Percentage' },
    { value: 'FixPrice', viewValue: 'Fix price' },
    { value: 'AmountOff', viewValue: 'Amount off' },
  ];

  discountForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    id: new FormControl(''),
    type: new FormControl(this.discountType[0].viewValue),
    value: new FormControl<number>(0, [Validators.required, Validators.min(1)]),
    quantity: new FormControl<number>(1, [
      Validators.required,
      Validators.min(1),
      Validators.max(99),
    ]),
    flg_discountedItems: new FormControl<boolean>(true),
    flg_distribute: new FormControl<boolean>(true),
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
    if (this.flg_insert) {
      this.http.InsertDiscount(this.GetDiscountFromForm()).subscribe((data) => {
        this.discount = data;

        this.UpdateForm();
        this.flg_insert = false;
        this._snackBar.open('Discount successfully created!', 'Ok', {
          duration: this.status.snackbarDuration,
        });
      });
    } else {
      this.http.UpdateDiscount(this.GetDiscountFromForm()).subscribe((data) => {
        this.discount = data;

        //this.UpdateForm();
        this._snackBar.open('Discount successfully updated!', 'Ok', {
          duration: this.status.snackbarDuration,
        });
      });
    }
  }

  GetDiscountFromForm(): Discount {
    return new Discount(
      this.discount?.id != undefined ? this.discount.id : undefined,
      this.discountForm.get('name')!.value!,
      this.discountForm.get('type')!.value!,
      this.discountForm.get('value')!.value!,
      this.discountForm.get('description')!.value!,
      this.discountForm.get('quantity')!.value!,
      this.discountForm.get('flg_discountedItems')!.value!,
      this.discountForm.get('flg_distribute')!.value!
    );
  }

  UpdateForm() {
    console.log(this.discount);
    if (this.discount != null) {
      this.discountForm.patchValue({
        name: this.discount.name,
        id: this.discount.id,
        description: this.discount.description,
        value: this.discount.value,
        type: this.discount.type,
        quantity: this.discount.quantity,
        flg_discountedItems: this.discount.flg_discountedItems,
        flg_distribute: this.discount.flg_distribute,
      });
    }
  }
}
