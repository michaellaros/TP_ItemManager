import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Kiosk } from 'src/app/Models/Kiosk';
import { HttpService } from 'src/app/Services/http.service';
import { StatusService } from 'src/app/Services/status.service';
import { ModalOptionComponent } from '../modal-option/modal-option.component';
import { ForceReplicationModel } from 'src/app/Models/ForceReplicationModel';

@Component({
  selector: 'app-modal-kiosk',
  templateUrl: './modal-kiosk.component.html',
  styleUrls: ['./modal-kiosk.component.scss'],
})
export class ModalKioskComponent {
  kiosk?: Kiosk;
  public flg_insert: boolean;

  kioskForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    ip: new FormControl('', [Validators.required]),
    flg_consumations: new FormControl(true),
    last_request_date: new FormControl(),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Kiosk,
    private http: HttpService,
    public status: StatusService,
    private _snackBar: MatSnackBar
  ) {
    {
      this.kiosk = this.data;
      this.flg_insert = this.data == null;
      this.kioskForm.get('last_request_date')!.disable();
    }
  }

  ngOnInit() {
    this.UpdateForm();

  }


  ForceReplication(ip:string){
    this.http.ForceReplication(ip).subscribe();

    this.SubmitForm();
  }

  public SubmitForm() {
    if (this.kioskForm.valid) {
      if (this.flg_insert) {
        this.http.InsertKiosk(this.GetKioskFromForm()).subscribe((data) => {
          this.kiosk = data;
          this.UpdateForm();
          this.flg_insert = false;
          this._snackBar.open('Kiosk successfully created!', 'Ok',{
            duration:this.status.snackbarDuration
          });
        });
      } else {
        this.http.UpdateKiosk(this.GetKioskFromForm()).subscribe((data) => {
          this.kiosk = data;
          this.UpdateForm();
          this._snackBar.open('Kiosk successfully updated!', 'Ok',{
            duration:this.status.snackbarDuration
          });
        });
      }
    }
  }

  GetKioskFromForm(): Kiosk {
    return new Kiosk(
      this.kiosk?.id != undefined ? this.kiosk.id : undefined,
      this.kioskForm.get('name')!.value!,
      this.kioskForm.get('ip')!.value!,
      this.kioskForm.get('flg_consumations')!.value!,
      this.kioskForm.get('last_request_date')!.value!
    );
  }

  UpdateForm() {
    console.log(this.kiosk);
    if (this.kiosk != null) {
      this.kioskForm.patchValue({
        name: this.kiosk.name,
        ip: this.kiosk.ip!,
        flg_consumations: this.kiosk.flg_consumations!,
        last_request_date: this.kiosk.last_request_date!,
      });
      console.log({
        name: this.kiosk.name!,
        ip: this.kiosk.ip!,
        flg_consumations: this.kiosk.flg_consumations!,
        last_request_date: this.kiosk.last_request_date!,
      });
    }
  }
}
