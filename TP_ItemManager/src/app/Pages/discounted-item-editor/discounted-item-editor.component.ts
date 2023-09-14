import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs';
import { AssignedObject } from 'src/app/Models/AssignedObject';
import { DiscountedItemType } from 'src/app/Models/Enums/DiscountedItemType';
import { SearchedObject } from 'src/app/Models/SearchedObject';
import { HttpService } from 'src/app/Services/http.service';

@Component({
  selector: 'app-discounted-item-editor',
  templateUrl: './discounted-item-editor.component.html',
  styleUrls: ['./discounted-item-editor.component.scss'],
  animations: [
    trigger('bodyExpansion', [
      state('collapsed, void', style({ display: 'none' })),
      state('expanded', style({ display: 'block' })),
    ]),
    trigger('rotation', [
      state('collapsed', style({ transform: 'rotate(0)' })),
      state('expanded', style({ transform: 'rotate(-180deg)' })),
      transition('expanded => collapsed', animate('150ms ease-out')),
      transition('collapsed => expanded', animate('150ms ease-in')),
    ]),
  ],
})
export class DiscountedItemEditorComponent {
  @Input() AssignedObjects?: AssignedObject[];
  @Input() flg_insert!: boolean;
  @Input() id!: string;

  public types = Object.values(DiscountedItemType);

  public newAssignedObject: AssignedObject;
  public state: boolean = true;
  public options: SearchedObject[] = [];

  assignForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    type: new FormControl(this.types[0], [Validators.required]),
    order: new FormControl(999, [
      Validators.max(999),
      Validators.min(1),
      Validators.required,
    ]),
  });
  public filteredOptions?: SearchedObject[];

  public constructor(
    private http: HttpService,
    private _snackBar: MatSnackBar
  ) {
    this.newAssignedObject = new AssignedObject();
  }

  ngOnInit() {
    this.http.FilterStore({}).subscribe((data) => {
      let list: SearchedObject[] = [];
      data.forEach((store) => {
        list.push(new SearchedObject(store.id, store.name));
      });
      this.options = list;
      this.filteredOptions = this.options;
    });

    this.assignForm
      .get('name')!
      .valueChanges.pipe(map((value) => this._filter(value || '')))
      .subscribe((data) => (this.filteredOptions = data));
  }

  toggle(): void {
    if (!this.flg_insert) {
      this.state = !this.state;
    }
  }

  private _filter(value: string): SearchedObject[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(
      (option) =>
        option.name?.toLowerCase().includes(filterValue) &&
        this.AssignedObjects?.findIndex(
          (assigned) => assigned.id == option.id
        ) == -1
    );
  }

  UpdateAssignedObject(object: AssignedObject) {
    this.http
      .UpdateAssignedObject(
        {
          Discount_id: this.id,
          store_id: object.id,
          StoreOrder: object.order,
        },
        'UpdateDiscountStore'
      )
      .subscribe((data) => {
        this.AssignedObjects = data;
        console.log(this.AssignedObjects);
        this.ResetForm();
      });
  }

  DeleteAssignedObject(object: AssignedObject) {
    if (!confirm('The element will be deleted permanently!')) {
      return;
    }

    this.http
      .DeleteAssignedObject(
        {
          Discount_id: this.id,
          Store_id: object.id,
        },
        'DeleteDiscountStore'
      )
      .subscribe((data) => {
        this.AssignedObjects = data;
        console.log(this.AssignedObjects);
        this.ResetForm();
      });
  }

  InsertAssignedObject() {
    if (!this.assignForm.valid) return;

    const id = this.options.find(
      (option) => option.name == this.assignForm.get('name')!.value!
    )?.id;

    if (id == null) {
      this._snackBar.open('Select a valid item!', 'Ok');
      return;
    }

    this.http
      .InsertAssignedObject(
        {
          Discount_id: this.id,
          Store_id: id,
          StoreOrder: this.assignForm.get('order')!.value!,
        },
        'InsertDiscountStore'
      )
      .subscribe((data) => {
        this.AssignedObjects = data;
        console.log(this.AssignedObjects);
        this.ResetForm();
      });
  }

  GetCategoryFromForm(): AssignedObject {
    return new AssignedObject(
      this.assignForm.get('id')!.value!,
      this.assignForm.get('name')!.value!,
      this.assignForm.get('order')!.value!
    );
  }

  MapToArray(map: any): SearchedObject[] {
    let list: SearchedObject[] = [];
    Object.keys(map).forEach((key) => {
      list.push(new SearchedObject(key, map[key]));
    });
    this.options = list;
    return list.sort((a, b) => (a.name! < b.name! ? -1 : 1));
  }

  ResetForm() {
    this.assignForm.reset({ name: '', order: 999 });
  }
}
