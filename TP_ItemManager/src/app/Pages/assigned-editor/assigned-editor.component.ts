import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, startWith, map } from 'rxjs';
import { AssignedObject } from 'src/app/Models/AssignedObject';
import { SearchedObject } from 'src/app/Models/SearchedObject';
import { HttpService } from 'src/app/Services/http.service';

@Component({
  selector: 'app-assigned-editor',
  templateUrl: './assigned-editor.component.html',
  styleUrls: ['./assigned-editor.component.scss'],
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
export class AssignedEditorComponent {
  @Input() AssignedObjects?: AssignedObject[];
  @Input() flg_insert!: boolean;
  @Input() type!: string;
  @Input() id!: string;

  public newAssignedObject: AssignedObject;
  public state: boolean = true;
  public options: SearchedObject[] = [];

  assignForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
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
    switch (this.type) {
      case 'CategoryItems-Category':
        this.http.FilterItems({}).subscribe((data) => {
          this.options = this.MapToArray(data);
          this.filteredOptions = this.options;
        });
        break;
      case 'CategoryItems-Item':
        this.http.FilterCategory({}).subscribe((data) => {
          this.options = this.MapToArray(data);
          this.filteredOptions = this.options;
        });
        break;
      case 'OptionItems-Item':
        this.http.FilterOption({}).subscribe((data) => {
          this.options = this.MapToArray(data);
          this.filteredOptions = this.options;
        });
        break;
      case 'OptionItems-Option':
        this.http.FilterItems({}).subscribe((data) => {
          this.options = this.MapToArray(data);
          this.filteredOptions = this.options;
        });
        break;
      case 'ItemOptions-Item':
        this.http.FilterOption({}).subscribe((data) => {
          this.options = this.MapToArray(data);
          this.filteredOptions = this.options;
        });
        break;
      case 'ItemOptions-Option':
        this.http.FilterItems({}).subscribe((data) => {
          this.options = this.MapToArray(data);
          this.filteredOptions = this.options;
        });
        break;
      case 'KioskCategory':
        this.http.FilterCategory({}).subscribe((data) => {
          this.options = this.MapToArray(data);
          this.filteredOptions = this.options;
        });
        break;
    }

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
    switch (this.type) {
      case 'CategoryItems-Category':
        this.http
          .UpdateAssignedObject(
            {
              idItem: object.id,
              idCategory: this.id,
              order: object.order,
            },
            'UpdateCategoryItemFromCategory'
          )
          .subscribe((data) => {
            this.AssignedObjects = data;
            console.log(this.AssignedObjects);
            this.ResetForm();
          });
        break;
      case 'CategoryItems-Item':
        this.http
          .UpdateAssignedObject(
            {
              idItem: this.id,
              idCategory: object.id,
              order: object.order,
            },
            'UpdateCategoryItemFromItem'
          )
          .subscribe((data) => {
            this.AssignedObjects = data;
            console.log(this.AssignedObjects);
            this.ResetForm();
          });
        break;
      case 'OptionItems-Item':
        this.http
          .UpdateAssignedObject(
            {
              idItem: this.id,
              idOption: object.id,
              order: object.order?.toString(),
            },
            'UpdateOptionItemFromItem'
          )
          .subscribe((data) => {
            this.AssignedObjects = data;
            console.log(this.AssignedObjects);
            this.ResetForm();
          });
        break;
      case 'OptionItems-Option':
        this.http
          .UpdateAssignedObject(
            {
              idItem: object.id,
              idOption: this.id,
              order: object.order?.toString(),
            },
            'UpdateOptionItemFromOption'
          )
          .subscribe((data) => {
            this.AssignedObjects = data;
            console.log(this.AssignedObjects);
            this.ResetForm();
          });
        break;
      case 'ItemOptions-Item':
        this.http
          .UpdateAssignedObject(
            {
              idItem: this.id,
              idOption: object.id,
              order: object.order?.toString(),
            },
            'UpdateItemOptionFromItem'
          )
          .subscribe((data) => {
            this.AssignedObjects = data;
            console.log(this.AssignedObjects);
            this.ResetForm();
          });
        break;
      case 'ItemOptions-Option':
        this.http
          .UpdateAssignedObject(
            {
              idItem: object.id,
              idOption: this.id,
              order: object.order?.toString(),
            },
            'UpdateItemOptionFromOption'
          )
          .subscribe((data) => {
            this.AssignedObjects = data;
            console.log(this.AssignedObjects);
            this.ResetForm();
          });
        break;
      case 'KioskCategory':
        this.http
          .UpdateAssignedObject(
            {
              Kiosk_id: this.id,
              Category_id: object.id,
              CategoryOrder: object.order,
            },
            'UpdateKioskCategory'
          )
          .subscribe((data) => {
            this.AssignedObjects = data;
            console.log(this.AssignedObjects);
            this.ResetForm();
          });
        break;
    }
  }

  DeleteAssignedObject(object: AssignedObject) {
    if (!confirm('The element will be deleted permanently!')) {
      return;
    }
    switch (this.type) {
      case 'CategoryItems-Category':
        this.http
          .DeleteAssignedObject(
            {
              idItem: object.id,
              idCategory: this.id,
            },
            'DeleteCategoryItemFromCategory'
          )
          .subscribe((data) => {
            this.AssignedObjects = data;
            console.log(this.AssignedObjects);
            this.ResetForm();
          });
        break;
      case 'CategoryItems-Item':
        this.http
          .DeleteAssignedObject(
            {
              idItem: this.id,
              idCategory: object.id,
            },
            'DeleteCategoryItemFromItem'
          )
          .subscribe((data) => {
            this.AssignedObjects = data;
            console.log(this.AssignedObjects);
            this.ResetForm();
          });
        break;
      case 'OptionItems-Item':
        this.http
          .DeleteAssignedObject(
            {
              idItem: this.id,
              idOption: object.id,
            },
            'DeleteOptionItemFromItem'
          )
          .subscribe((data) => {
            this.AssignedObjects = data;
            console.log(this.AssignedObjects);
            this.ResetForm();
          });
        break;
      case 'OptionItems-Option':
        this.http
          .DeleteAssignedObject(
            {
              idItem: object.id,
              idOption: this.id,
            },
            'DeleteOptionItemFromOption'
          )
          .subscribe((data) => {
            this.AssignedObjects = data;
            console.log(this.AssignedObjects);
            this.ResetForm();
          });
        break;
      case 'ItemOptions-Item':
        this.http
          .DeleteAssignedObject(
            {
              idItem: this.id,
              idOption: object.id,
            },
            'DeleteItemOptionFromItem'
          )
          .subscribe((data) => {
            console.log(data);
            this.AssignedObjects = data;
            console.log(this.AssignedObjects);
            this.ResetForm();
          });
        break;
      case 'ItemOptions-Option':
        this.http
          .DeleteAssignedObject(
            {
              idItem: object.id,
              idOption: this.id,
            },
            'DeleteItemOptionFromOption'
          )
          .subscribe((data) => {
            this.AssignedObjects = data;
            console.log(this.AssignedObjects);
            this.ResetForm();
          });
        break;
      case 'KioskCategory':
        this.http
          .DeleteAssignedObject(
            {
              Kiosk_id: this.id,
              Category_id: object.id,
            },
            'DeleteKioskCategory'
          )
          .subscribe((data) => {
            this.AssignedObjects = data;
            console.log(this.AssignedObjects);
            this.ResetForm();
          });
        break;
    }
  }

  InsertAssignedObject() {
    console.log(this.type);
    if (!this.assignForm.valid) return;

    const id = this.options.find(
      (option) => option.name == this.assignForm.get('name')!.value!
    )?.id;

    if (id == null) {
      this._snackBar.open('Select a valid item!', 'Ok');
      return;
    }

    switch (this.type) {
      case 'CategoryItems-Category':
        this.http
          .InsertAssignedObject(
            {
              idItem: id,
              idCategory: this.id,
              order: this.assignForm.get('order')!.value!,
            },
            'InsertCategoryItemFromCategory'
          )
          .subscribe((data) => {
            this.AssignedObjects = data;
            console.log(this.AssignedObjects);
            this.ResetForm();
          });
        break;
      case 'CategoryItems-Item':
        this.http
          .InsertAssignedObject(
            {
              idItem: this.id,
              idCategory: id,
              order: this.assignForm.get('order')!.value!,
            },
            'InsertCategoryItemFromItem'
          )
          .subscribe((data) => {
            this.AssignedObjects = data;
            console.log(this.AssignedObjects);
            this.ResetForm();
          });
        break;
      case 'OptionItems-Item':
        this.http
          .InsertAssignedObject(
            {
              idOption: id,
              idItem: this.id,
              order: this.assignForm.get('order')!.value!.toString(),
            },
            'InsertOptionItemFromItem'
          )
          .subscribe((data) => {
            this.AssignedObjects = data;
            console.log(this.AssignedObjects);
            this.ResetForm();
          });
        break;
      case 'OptionItems-Option':
        console.log('pogo');
        this.http
          .InsertAssignedObject(
            {
              idItem: id,
              idOption: this.id,
              order: this.assignForm.get('order')!.value!.toString(),
            },
            'InsertOptionItemFromOption'
          )
          .subscribe((data) => {
            this.AssignedObjects = data;
            console.log(this.AssignedObjects);
            this.ResetForm();
          });
        break;
      case 'ItemOptions-Item':
        this.http
          .InsertAssignedObject(
            {
              idOption: id,
              idItem: this.id,
              order: this.assignForm.get('order')!.value!.toString(),
            },
            'InsertItemOptionFromItem'
          )
          .subscribe((data) => {
            this.AssignedObjects = data;
            console.log(this.AssignedObjects);
            this.ResetForm();
          });
        break;
      case 'ItemOptions-Option':
        this.http
          .InsertAssignedObject(
            {
              idOption: this.id,
              idItem: id,
              order: this.assignForm.get('order')!.value!.toString(),
            },
            'InsertItemOptionFromOption'
          )
          .subscribe((data) => {
            this.AssignedObjects = data;
            console.log(this.AssignedObjects);
            this.ResetForm();
          });
        break;
      case 'KioskCategory':
        console.log({
          Kiosk_id: this.id,
          Category_id: id,
          CategoryOrder: this.assignForm.get('order')!.value!,
        });
        this.http
          .InsertAssignedObject(
            {
              Kiosk_id: this.id,
              Category_id: id,
              CategoryOrder: this.assignForm.get('order')!.value!,
            },
            'InsertKioskCategory'
          )
          .subscribe((data) => {
            this.AssignedObjects = data;
            console.log(this.AssignedObjects);
            this.ResetForm();
          });
        break;
    }
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
