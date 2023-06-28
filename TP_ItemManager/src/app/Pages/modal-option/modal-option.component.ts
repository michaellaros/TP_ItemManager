import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../Services/http.service';
import { StatusService } from '../../Services/status.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Option } from '../../Models/Option';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal-option',
  templateUrl: './modal-option.component.html',
  styleUrls: ['./modal-option.component.scss'],
})
export class ModalOptionComponent {
  option?: Option;
  public flg_insert: boolean;

  optionForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    flg_addToCart: new FormControl(true),
    default_quantity: new FormControl(1, [
      Validators.max(99),
      Validators.min(0),
      Validators.required,
    ]),
    min_quantity: new FormControl(1, [
      Validators.max(99),
      Validators.min(0),
      Validators.required,
    ]),
    max_quantity: new FormControl(1, [
      Validators.max(99),
      Validators.min(0),
      Validators.required,
    ]),
    available: new FormControl(true),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Option,
    public dialogRef: MatDialogRef<ModalOptionComponent>,
    private http: HttpService,
    public status: StatusService,
    private _snackBar: MatSnackBar
  ) {
    {
      this.option = this.data;

      this.flg_insert = this.data == null;
    }
  }

  ngOnInit() {
    this.UpdateForm();

  }

  public SubmitForm() {
    if (this.optionForm.valid) {
      if (this.flg_insert) {
        this.http.InsertOption(this.GetOptionFromForm()).subscribe((data) => {
          this.option = data;
          this.UpdateForm();
          this.flg_insert = false;
          this._snackBar.open('Option successfully created!', 'Ok');
        });
      } else {
        this.http.UpdateOption(this.GetOptionFromForm()).subscribe((data) => {
          this.option = data;
          this.UpdateForm();
          this._snackBar.open('Option successfully updated!', 'Ok');
        });
      }
    }
  }

  GetOptionFromForm(): Option {
    return new Option(
      this.option?.id != undefined ? this.option.id : undefined,
      this.optionForm.get('name')!.value!,
      this.optionForm.get('flg_addToCart')!.value!,
      this.optionForm.get('default_quantity')!.value!,
      this.optionForm.get('max_quantity')!.value!,
      this.optionForm.get('min_quantity')!.value!,
      this.optionForm.get('available')!.value!
    );
  }

  UpdateForm() {
    if (this.option != null) {
      this.optionForm.patchValue({
        name: this.option.name,
        flg_addToCart: this.option.flg_addToCart,
        default_quantity: this.option.defaultQuantity,
        min_quantity: this.option.minQuantity,
        max_quantity: this.option.maxQuantity,
        available: this.option.available,
      });
    }
  }
}
