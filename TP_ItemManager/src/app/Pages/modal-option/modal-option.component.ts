import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpService } from '../../Services/http.service';
import { StatusService } from '../../Services/status.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Option } from '../../Models/Option';

@Component({
  selector: 'app-modal-option',
  templateUrl: './modal-option.component.html',
  styleUrls: ['./modal-option.component.scss'],
})
export class ModalOptionComponent {
  option!: Option;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Option,
    public dialogRef: MatDialogRef<ModalOptionComponent>,
    private http: HttpService,
    public status: StatusService
  ) {
    {
      this.option = this.data;
    }
  }
  optionForm = new FormGroup({
    defaultQuantity: new FormControl(''),
    flg_addToCart: new FormControl(true),
    id: new FormControl(''),
    maxQuantity: new FormControl(''),
    minQuantity: new FormControl(''),
    name: new FormControl(''),
  });

  ngOnInit() {
    if (this.option != null) {
      this.optionForm.patchValue({
        defaultQuantity: this.option.defaultQuantity?.toString(),
        flg_addToCart: this.option.flg_addToCart,
        id: this.option.id?.toString(),
        maxQuantity: this.option.maxQuantity?.toString(),
        minQuantity: this.option.minQuantity?.toString(),
        name: this.option.name,
      });
    }
  }

  confirmObject() {}
}
