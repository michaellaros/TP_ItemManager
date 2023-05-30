import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpService } from '../../Services/http.service';
import { StatusService } from '../../Services/status.service';
import { Category } from '../../Models/Category';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modify-dialogue-category',
  templateUrl: './modify-dialogue-category.component.html',
  styleUrls: ['./modify-dialogue-category.component.scss'],
})
export class ModifyDialogueCategoryComponent {
  category!: Category;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Category,
    public dialogRef: MatDialogRef<ModifyDialogueCategoryComponent>,
    private http: HttpService,
    public status: StatusService
  ) {
    {
      this.category = this.data;
    }
  }
  categoryForm = new FormGroup({
    available: new FormControl(false),
    codConsumationAllowed: new FormControl(''),
    id: new FormControl(''),
    imagePath: new FormControl(''),
    name: new FormControl(''),
    dineIn: new FormControl(false),
    takeAway: new FormControl(false),
  });

  ngOnInit() {
    if (this.category != null) {
      this.categoryForm.patchValue({
        available: this.category.avaible,
        codConsumationAllowed: this.category.codConsumationAllowed,
        id: this.category.id?.toString(),
        imagePath: this.category.imagePath,
        name: this.category.name,
        dineIn: this.category.codConsumationAllowed?.includes('DI'),
        takeAway: this.category.codConsumationAllowed?.includes('TA'),
      });
    }
  }

  confirmObject() {}
}
