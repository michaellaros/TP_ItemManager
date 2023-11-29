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
import { DiscountedObject } from 'src/app/Models/DiscountedObject';
import { DiscountedItemType } from 'src/app/Models/Enums/DiscountedItemType';
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
  @Input() DiscountedObjects?: DiscountedObject[];
  @Input() public type!: string;
  @Input() flg_insert!: boolean;
  @Input() id!: string;

  public types?: DiscountedItemType[];

  public newAssignedObject: DiscountedObject;
  public state: boolean = true;

  assignForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    type: new FormControl(''),
    order: new FormControl(999, [
      Validators.max(999),
      Validators.min(1),
      Validators.required,
    ]),
  });

  public items: DiscountedObject[] = [];
  public itemGroups: DiscountedObject[] = [];
  public discounts: DiscountedObject[] = [];
  public filteredOptions?: DiscountedObject[];

  public constructor(
    private http: HttpService,
    private _snackBar: MatSnackBar
  ) {
    this.newAssignedObject = new DiscountedObject();
    console.log(this.type);
  }

  ngOnInit() {
    this.types =
      this.type === 'Discount'
        ? [DiscountedItemType.Item, DiscountedItemType.Group]
        : [DiscountedItemType.Discount];
    this.assignForm.patchValue({
      name: '',
      type:
        this.type == 'Discount'
          ? DiscountedItemType.Item
          : DiscountedItemType.Discount,
    });

    if (this.type !== 'Discount') this.assignForm.get('type')!.disable();

    this.http.FilterItemGroups({}).subscribe((data) => {
      this.itemGroups = this.MapToArray(data).map((itemGroup) => {
        itemGroup.type = DiscountedItemType.Group;
        return itemGroup;
      });
    });

    this.http.FilterDiscounts({}).subscribe((data) => {
      this.discounts = this.MapToArray(data).map((discount) => {
        discount.type = DiscountedItemType.Discount;
        return discount;
      });
      if (this.type != 'Discount') {
        this.filteredOptions = this.discounts;
        this._filter('');
      }
    });
    this.http.FilterItems({}).subscribe((data) => {
      this.items = this.MapToArray(data).map((itemGroup) => {
        itemGroup.type = DiscountedItemType.Item;
        return itemGroup;
      });

      if (this.type == 'Discount') {
        this.filteredOptions = this.items;
        this._filter('');
      }
    });
    this.assignForm
      .get('name')!
      .valueChanges.pipe(map((value) => this._filter(value || '')))
      .subscribe();
    this.assignForm
      .get('type')!
      .valueChanges.subscribe(() => this.assignForm.patchValue({ name: '' }));
  }

  toggle(): void {
    if (!this.flg_insert) {
      this.state = !this.state;
    }
  }

  private _filter(value: string) {
    console.log(this.DiscountedObjects);
    const filterValue = value.toLowerCase();
    switch (this.assignForm.get('type')!.value!) {
      case DiscountedItemType.Group:
        this.filteredOptions = this.itemGroups.filter(
          (itemGroup) =>
            itemGroup.name?.toLowerCase().includes(filterValue) &&
            this.DiscountedObjects?.findIndex(
              (assigned) => assigned.id == itemGroup.id
            ) == -1
        );
        break;
      case DiscountedItemType.Discount:
        this.filteredOptions = this.discounts.filter(
          (discount) =>
            discount.name?.toLowerCase().includes(filterValue) &&
            this.DiscountedObjects?.findIndex(
              (assigned) => assigned.id == discount.id
            ) == -1
        );
        break;
      case DiscountedItemType.Item:
      default:
        this.filteredOptions = this.items.filter(
          (item) =>
            item.name?.toLowerCase().includes(filterValue) &&
            this.DiscountedObjects?.findIndex(
              (assigned) => assigned.id == item.id
            ) == -1
        );
    }
  }

  DeleteAssignedObject(object: DiscountedObject) {
    if (!confirm('The element will be deleted permanently!')) {
      return;
    }
    console.log(this.assignForm.get('type')!.value!);

    switch (object.type) {
      case DiscountedItemType.Group:
        this.http
          .DeleteAssignedObject(
            {
              Discount_id: this.id,
              Item_group_id: object.id,
            },
            'DeleteDiscountItemGroupFromDiscount'
          )
          .subscribe((data) => {
            this.DiscountedObjects = data;
            this.ResetForm();
          });
        break;
      case DiscountedItemType.Discount:
        if (this.type == 'Item') {
          this.http
            .DeleteAssignedObject(
              {
                Discount_id: object.id,
                item_id: this.id,
              },
              'DeleteDiscountItemFromItem'
            )
            .subscribe((data) => {
              this.DiscountedObjects = data;
              this.ResetForm();
            });
        } else {
          this.http
            .DeleteAssignedObject(
              {
                Discount_id: object.id,
                item_group_id: this.id,
              },
              'DeleteDiscountItemGroupFromItemGroup'
            )
            .subscribe((data) => {
              this.DiscountedObjects = data;
              this.ResetForm();
            });
        }

        break;
      case DiscountedItemType.Item:
      default:
        this.http
          .DeleteAssignedObject(
            {
              Discount_id: this.id,
              Item_id: object.id,
            },
            this.type === 'Discount'
              ? 'DeleteDiscountItemFromDiscount'
              : 'DeleteDiscountItemFromItem'
          )
          .subscribe((data) => {
            this.DiscountedObjects = data;
            console.log(this.DiscountedObjects);
            this.ResetForm();
          });
    }
  }

  InsertAssignedObject() {
    if (!this.assignForm.get('name')!.valid) return;
    var id;
    switch (this.assignForm.get('type')!.value!) {
      case DiscountedItemType.Group:
        id = this.itemGroups.find(
          (itemGroup) => itemGroup.name == this.assignForm.get('name')!.value!
        )?.id;
        break;
      case DiscountedItemType.Discount:
        id = this.discounts.find(
          (discount) => discount.name == this.assignForm.get('name')!.value!
        )?.id;
        break;
      case DiscountedItemType.Item:
      default:
        id = this.items.find(
          (item) => item.name == this.assignForm.get('name')!.value!
        )?.id;
        break;
    }

    if (id == null) {
      this._snackBar.open('Select a valid item!', 'Ok');
      return;
    }
    switch (this.assignForm.get('type')!.value!) {
      case DiscountedItemType.Group:
        this.http
          .InsertAssignedObject(
            {
              Discount_id: this.id,
              item_group_id: id,
            },
            'InsertDiscountItemGroupFromDiscount'
          )
          .subscribe((data) => {
            this.DiscountedObjects = data;
            this.ResetForm();
          });
        break;
      case DiscountedItemType.Discount:
        if (this.type == 'Item') {
          this.http
            .InsertAssignedObject(
              {
                Discount_id: id,
                item_id: this.id,
              },
              'InsertDiscountItemFromItem'
            )
            .subscribe((data) => {
              this.DiscountedObjects = data;
              this.ResetForm();
            });
        } else {
          this.http
            .InsertAssignedObject(
              {
                Discount_id: id,
                item_group_id: this.id,
              },
              'InsertDiscountItemGroupFromItemGroup'
            )
            .subscribe((data) => {
              this.DiscountedObjects = data;
              this.ResetForm();
            });
        }

        break;
      case DiscountedItemType.Item:
      default:
        this.http
          .InsertAssignedObject(
            {
              Discount_id: this.id,
              Item_id: id,
            },
            'InsertDiscountItemFromDiscount'
          )
          .subscribe((data) => {
            this.DiscountedObjects = data;
            console.log(this.DiscountedObjects);
            this.ResetForm();
          });
    }
  }

  GetCategoryFromForm(): DiscountedObject {
    return new DiscountedObject(
      this.assignForm.get('id')!.value!,
      this.assignForm.get('name')!.value!
    );
  }

  MapToArray(map: any): DiscountedObject[] {
    let list: DiscountedObject[] = [];
    Object.keys(map).forEach((key) => {
      list.push(new DiscountedObject(key, map[key]));
    });
    return list.sort((a, b) => (a.name! < b.name! ? -1 : 1));
  }

  ResetForm() {
    this.assignForm.reset({
      name: '',
      type:
        this.type === 'Discount'
          ? DiscountedItemType.Item
          : DiscountedItemType.Discount,
    });
  }
}
