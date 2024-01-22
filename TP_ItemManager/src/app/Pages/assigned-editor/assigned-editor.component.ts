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
import { StorageManagerService } from 'src/app/Services/auth-services/storage-manager.service';
import { HttpService } from 'src/app/Services/http.service';
import { StatusService } from 'src/app/Services/status.service';

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
  @Input() country_id?: string;

  // public newAssignedObject: AssignedObject;
  public state: boolean = true;
  public options: SearchedObject[] = [];
  public managerLeveltypeList: string[] = [
    //need manager role or higher
    'DiscountStore',
    'StoreDiscount',
    'Item-ItemGroup',
    'ItemGroup-Item',
  ];

  assignForm = new FormGroup({
    name: new FormControl(
      {
        value: '',
        disabled: !this.storage.CheckPermission(
          this.storage.CountryManagerPermission
        ),
      },
      [Validators.required]
    ),
    order: new FormControl(
      {
        value: 999,
        disabled: !this.storage.CheckPermission(
          this.storage.CountryManagerPermission
        ),
      },
      [Validators.max(999), Validators.min(1), Validators.required]
    ),
  });
  public filteredOptions?: SearchedObject[];

  public constructor(
    private http: HttpService,
    private _snackBar: MatSnackBar,
    public storage: StorageManagerService,
    private status: StatusService
  ) {
    // this.newAssignedObject = new AssignedObject();
  }
  ngOnInit() {
    if (!this.flg_insert) {
      this.GetOptionList();
      if (this.IsDisabled()) {
        this.assignForm.disable();
      } else {
        this.assignForm.enable();
      }
    }
  }

  ngOnChanges() {
    if (!this.flg_insert) {
      this.GetOptionList();
      if (this.IsDisabled()) {
        this.assignForm.disable();
      } else {
        this.assignForm.enable();
      }
    }
  }

  GetOptionList() {
    switch (this.type) {
      case 'CategoryItems-Category':
        this.http.FilterItems({}).subscribe((data) => {
          this.options = this.MapToArray(data);
          this.filteredOptions = this._filter('');
        });
        break;
      case 'CategoryItems-Item':
        this.http.FilterCategory({}).subscribe((data) => {
          this.options = this.MapToArray(data);
          this.filteredOptions = this._filter('');
        });
        break;
      case 'OptionItems-Item':
        this.http.FilterOption({}).subscribe((data) => {
          this.options = this.MapToArray(data);
          this.filteredOptions = this._filter('');
        });
        break;
      case 'OptionItems-Option':
        this.http.FilterItems({}).subscribe((data) => {
          this.options = this.MapToArray(data);
          this.filteredOptions = this._filter('');
        });
        break;
      case 'ItemOptions-Item':
        this.http.FilterOption({}).subscribe((data) => {
          this.options = this.MapToArray(data);
          this.filteredOptions = this._filter('');
        });
        break;
      case 'ItemOptions-Option':
        this.http.FilterItems({}).subscribe((data) => {
          this.options = this.MapToArray(data);
          this.filteredOptions = this._filter('');
        });
        break;
      case 'KioskCategory':
        this.http.FilterCategory({}).subscribe((data) => {
          this.options = this.MapToArray(data);
          this.filteredOptions = this._filter('');
        });
        break;
      case 'Item-ItemGroup':
        this.http.FilterItemGroups({}).subscribe((data) => {
          this.options = this.MapToArray(data);
          this.filteredOptions = this._filter('');
        });
        break;
      case 'ItemGroup-Item':
        this.http.FilterItems({}).subscribe((data) => {
          this.options = this.MapToArray(data);
          this.filteredOptions = this._filter('');
        });
        break;
      case 'DiscountStore':
        this.http.GetStoresForLoggedUser(this.country_id!).subscribe((data) => {
          this.options = this.MapToArray(data);
          this.filteredOptions = this._filter('');
        });
        break;
      case 'StoreDiscount':
        this.http.GetCountryDiscounts(this.country_id!).subscribe((data) => {
          this.options = this.MapToArray(data);
          this.filteredOptions = this._filter('');
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
            this.ResetForm();
          });
        break;
      case 'ItemGroup-Item':
        this.http
          .UpdateAssignedObject(
            {
              idItemGroup: this.id,
              idItem: object.id,
              Order: object.order,
            },
            'UpdateItemGroupItem'
          )
          .subscribe((data) => {
            this.AssignedObjects = data;
            this.ResetForm();
          });
        break;
      case 'DiscountStore':
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
            this.ResetForm();
          });
        break;

      case 'StoreDiscount':
        this.http
          .UpdateAssignedObject(
            {
              Discount_id: object.id,
              store_id: this.id,
              StoreOrder: object.order,
            },
            'UpdateStoreDiscount'
          )
          .subscribe((data) => {
            this.AssignedObjects = data;
            this.ResetForm();
          });
        break;

      case 'Item-ItemGroup':
        this.http
          .UpdateAssignedObject(
            {
              idItem: this.id,
              idItemGroup: object.id,
              Order: object.order?.toString(),
            },
            'UpdateItemItemGroup'
          )
          .subscribe((data) => {
            this.AssignedObjects = data;
            this.ResetForm();
          });
        break;

      case 'ItemGroup-Item':
        this.http
          .UpdateAssignedObject(
            {
              idItem: object.id,
              idItemGroup: this.id,
              Order: object.order?.toString(),
            },
            'UpdateItemGroupItem'
          )
          .subscribe((data) => {
            this.AssignedObjects = data;
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
            this.AssignedObjects = data;
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
            this.ResetForm();
          });
        break;
      case 'DiscountStore':
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
            this.ResetForm();
          });
        break;

      case 'StoreDiscount':
        this.http
          .DeleteAssignedObject(
            {
              Discount_id: object.id,
              Store_id: this.id,
            },
            'DeleteStoreDiscount'
          )
          .subscribe((data) => {
            this.AssignedObjects = data;
            this.ResetForm();
          });
        break;

      case 'Item-ItemGroup':
        this.http
          .DeleteAssignedObject(
            {
              idItem: this.id,
              idItemGroup: object.id,
            },
            'DeleteItemItemGroup'
          )
          .subscribe((data) => {
            this.AssignedObjects = data;
            this.ResetForm();
          });
        break;

      case 'ItemGroup-Item':
        this.http
          .DeleteAssignedObject(
            {
              idItem: object.id,
              idItemGroup: this.id,
            },
            'DeleteItemGroupItem'
          )
          .subscribe((data) => {
            this.AssignedObjects = data;
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
      this._snackBar.open('Select a valid item!', 'Ok', {
        duration: this.status.snackbarDuration,
      });
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
            this.ResetForm();
          });
        break;
      case 'OptionItems-Option':
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
            this.ResetForm();
          });
        break;
      case 'KioskCategory':
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
            this.ResetForm();
          });
        break;
      case 'DiscountStore':
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
            this.ResetForm();
          });
        break;

      case 'StoreDiscount':
        this.http
          .InsertAssignedObject(
            {
              Discount_id: id,
              Store_id: this.id,
              StoreOrder: this.assignForm.get('order')!.value!,
            },
            'InsertStoreDiscount'
          )
          .subscribe((data) => {
            this.AssignedObjects = data;
            this.ResetForm();
          });
        break;

      case 'Item-ItemGroup':
        this.http
          .InsertAssignedObject(
            {
              idItem: this.id,
              idItemGroup: id,
              Order: this.assignForm.get('order')!.value!,
            },
            'InsertItemGroupItem'
          )
          .subscribe((data) => {
            this.AssignedObjects = data;
            this.ResetForm();
          });
        break;

      case 'ItemGroup-Item':
        this.http
          .InsertAssignedObject(
            {
              idItem: id,
              idItemGroup: this.id,
              Order: this.assignForm.get('order')!.value!,
            },
            'InsertItemItemGroups'
          )
          .subscribe((data) => {
            this.AssignedObjects = data;
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

  public IsDisabled(): boolean {
    return (
      !this.storage.CheckPermission(this.storage.CountryManagerPermission) &&
      this.managerLeveltypeList.includes(this.type)
      // this.IsType(this.type)
    );
    // return (
    //   this.storage.CheckPermission(this.storage.CountryManagerPermission) &&
    //   this.IsType(this.type)
    // );
  }

  // IsType(type: string): boolean {
  //   for (type in this.typeList) {
  //     return true;
  //   }
  //   return false;
  // }
}
