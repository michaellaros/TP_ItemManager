import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-error',
  templateUrl: './modal-error.component.html',
  styleUrls: ['./modal-error.component.scss'],
})
export class ModalErrorComponent {
  public errorList!: {
    id: string;
    ip: string;
    szRetailStoreId: string;
    storeName: string;
  }[];
  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: {
      id: string;
      ip: string;
      szRetailStoreId: string;
      storeName: string;
    }[]
  ) {
    {
      this.errorList = this.data;
      console.log(this.errorList);
    }
  }

  ngOnInit() {}
}
