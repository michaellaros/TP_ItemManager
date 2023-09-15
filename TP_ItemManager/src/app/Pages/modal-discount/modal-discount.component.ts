import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Discount } from 'src/app/Models/Discount';
import { HttpService } from 'src/app/Services/http.service';
import { StatusService } from 'src/app/Services/status.service';

@Component({
  selector: 'app-modal-discount',
  templateUrl: './modal-discount.component.html',
  styleUrls: ['./modal-discount.component.scss']
})
export class ModalDiscountComponent {

  discount!: Discount;
  public flg_insert: boolean;

  discountForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    id: new FormControl(''),

  });


//mi si è accartocciata la get discount

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Discount,
    public dialogRef: MatDialogRef<ModalDiscountComponent>,
    private http: HttpService,
    public status: StatusService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    {
      this.discount = this.data || new Discount();
      this.flg_insert = this.data == null;
    }
  }

  ngOnInit() {
    this.UpdateForm();

  }

    public SubmitForm() {
      console.log('submit');

          if (this.flg_insert) {
            console.log(this.GetDiscountFromForm());
            this.http.InsertDiscount(this.GetDiscountFromForm()).subscribe((data) => {
              this.discount = data;

              this.UpdateForm();
              this.flg_insert = false;
              this._snackBar.open('Discount successfully created!', 'Ok',{
                duration:this.status.snackbarDuration
              });
            });
          } else {
            console.log(this.GetDiscountFromForm());
            this.http.UpdateItem(this.GetDiscountFromForm()).subscribe((data) => {
              this.discount = data;

              this.UpdateForm();
              this._snackBar.open('Discount successfully updated!', 'Ok',{
                duration:this.status.snackbarDuration
              });
            });
          }
        }


    GetDiscountFromForm(): Discount {
      return new Discount(
        this.discount?.id != undefined ? this.discount.id : undefined,
        this.discountForm.get('name')!.value!,
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

