import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResponseStoreUpdate } from 'src/app/Models/ResponseStoreUpdate';

@Component({
  selector: 'app-modal-error',
  templateUrl: './modal-error.component.html',
  styleUrls: ['./modal-error.component.scss'],
})
export class ModalErrorComponent {
  public errorList!: ResponseStoreUpdate[];
  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: ResponseStoreUpdate[]
  ) {
    {
      this.errorList = this.data;
    }
  }

  ngOnInit() {}
}
