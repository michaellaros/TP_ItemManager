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
      state('collapsed, void', style({ height: '0px', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition(
        'expanded <=> collapsed, void => collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
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
  public filteredOptions!: Observable<SearchedObject[]>;

  public constructor(
    private http: HttpService,
    private _snackBar: MatSnackBar
  ) {
    this.newAssignedObject = new AssignedObject();
  }
  ngOnInit() {
    this.http.FilterItems({}).subscribe((data) => {
      this.options = this.MapToArray(data);
    });
    this.filteredOptions = this.assignForm.get('name')!.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
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
            this.AssignedObjects = this.MapToArray(data);
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
              order: object.order,
            },
            'UpdateOptionItemFromItem'
          )
          .subscribe((data) => {
            this.AssignedObjects = this.MapToArray(data);
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
              order: object.order,
            },
            'UpdateOptionItemFromOption'
          )
          .subscribe((data) => {
            this.AssignedObjects = this.MapToArray(data);
            console.log(this.AssignedObjects);
            this.ResetForm();
          });
        break;
      case 'ItemOption-Item':
        this.http
          .UpdateAssignedObject(
            {
              idItem: this.id,
              idOption: object.id,
              order: object.order,
            },
            'UpdateItemOptionFromItem'
          )
          .subscribe((data) => {
            this.AssignedObjects = this.MapToArray(data);
            console.log(this.AssignedObjects);
            this.ResetForm();
          });
        break;
      case 'ItemOption-Option':
        this.http
          .UpdateAssignedObject(
            {
              idItem: object.id,
              idOption: this.id,
              order: object.order,
            },
            'UpdateItemOptionFromOption'
          )
          .subscribe((data) => {
            this.AssignedObjects = this.MapToArray(data);
            console.log(this.AssignedObjects);
            this.ResetForm();
          });
        break;
    }
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
            this.AssignedObjects = this.MapToArray(data);
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
              order: this.assignForm.get('order')!.value!,
            },
            'InsertOptionItemFromItem'
          )
          .subscribe((data) => {
            this.AssignedObjects = this.MapToArray(data);
            console.log(this.AssignedObjects);
            this.ResetForm();
          });
        break;
      case 'OptionItems-Option':
        this.http
          .InsertAssignedObject(
            {
              idItem: id,
              idOption: this.id,
              order: this.assignForm.get('order')!.value!,
            },
            'InsertOptionItemFromOption'
          )
          .subscribe((data) => {
            this.AssignedObjects = this.MapToArray(data);
            console.log(this.AssignedObjects);
            this.ResetForm();
          });
        break;
      case 'ItemOption-Item':
        this.http
          .InsertAssignedObject(
            {
              idOption: id,
              idItem: this.id,
              order: this.assignForm.get('order')!.value!,
            },
            'InsertItemOptionFromItem'
          )
          .subscribe((data) => {
            this.AssignedObjects = this.MapToArray(data);
            console.log(this.AssignedObjects);
            this.ResetForm();
          });
        break;
      case 'ItemOption-Option':
        this.http
          .InsertAssignedObject(
            {
              idOption: this.id,
              idItem: id,
              order: this.assignForm.get('order')!.value!,
            },
            'InsertItemOptionFromOption'
          )
          .subscribe((data) => {
            this.AssignedObjects = this.MapToArray(data);
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
    return list;
  }

  ResetForm() {
    this.assignForm.reset({});
  }
}
