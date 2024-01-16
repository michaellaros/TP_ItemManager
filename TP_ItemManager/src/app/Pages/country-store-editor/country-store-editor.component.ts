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
import { count, map } from 'rxjs';
import { Country } from 'src/app/Models/Country';
import { CountryStoreObject } from 'src/app/Models/CountryStoreObject';
import { UserRelationshipType } from 'src/app/Models/Enums/UserRelationshipType';
import { Store } from 'src/app/Models/Store';
import { StorageManagerService } from 'src/app/Services/auth-services/storage-manager.service';
import { HttpService } from 'src/app/Services/http.service';

@Component({
  selector: 'app-country-store-editor',
  templateUrl: './country-store-editor.component.html',
  styleUrls: ['./country-store-editor.component.scss'],
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
export class CountryStoreEditorComponent {
  @Input() relatedObjects?: CountryStoreObject[];
  @Input() public type!: string;
  @Input() flg_insert!: boolean;
  @Input() id!: string;

  public types?: string[];

  public newAssignedObject: CountryStoreObject;
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

  public country: CountryStoreObject[] = [];
  public store: CountryStoreObject[] = [];
  public user: CountryStoreObject[] = [];
  public filteredOptions?: CountryStoreObject[];

  public constructor(
    private http: HttpService,
    private _snackBar: MatSnackBar,
    public storage: StorageManagerService
  ) {
    this.newAssignedObject = new CountryStoreObject();
  }

  FilterStorebyUser(data: Store[]) {
    let list: CountryStoreObject[] = [];
    data.forEach((store) => {
      list.push(
        new CountryStoreObject(store.id, store.name, UserRelationshipType.Store)
      );
    });
    return list;
  }
  filterCountryByUser(data: Country[]) {
    let list: CountryStoreObject[] = [];
    data.forEach((country) =>
      list.push(
        new CountryStoreObject(
          country.id,
          country.name,
          UserRelationshipType.Country
        )
      )
    );
    return list;
  }

  ngOnInit() {
    this.types =
      this.type === 'User'
        ? [UserRelationshipType.Country, UserRelationshipType.Store]
        : [UserRelationshipType.User];
    this.assignForm.patchValue({
      name: '',
      type:
        this.type == 'User'
          ? UserRelationshipType.Country
          : UserRelationshipType.User,
    });

    if (this.type !== 'User') this.assignForm.get('type')!.disable();

    this.http.FilterStore({}).subscribe((data) => {
      this.store = this.FilterStorebyUser(data);
    });
    this.http.FilterCountry({}).subscribe((data) => {
      this.country = this.filterCountryByUser(data);

      this._filter('');
    });

    this.http.FilterUser({}).subscribe((data) => {
      this.user = this.MapToArray(data).map((user) => {
        user.type = UserRelationshipType.User;
        return user;
      });

      this._filter('');
    });
    this.assignForm
      .get('name')!
      .valueChanges.pipe(map((value) => this._filter(value || '')))
      .subscribe();
    this.assignForm
      .get('type')!
      .valueChanges.subscribe(() => this.assignForm.patchValue({ name: '' }));
    console.log(this.type);
  }

  toggle(): void {
    if (!this.flg_insert) {
      this.state = !this.state;
    }
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();
    switch (this.assignForm.get('type')!.value!) {
      case UserRelationshipType.Store:
        this.filteredOptions = this.store.filter((store) => {
          return (
            store.name?.toLowerCase().includes(filterValue) &&
            this.relatedObjects?.findIndex(
              (assigned) => assigned.id == store.id
            ) == -1
          );
        });
        break;

      case UserRelationshipType.Country:
        this.filteredOptions = this.country.filter((country) => {
          return (
            country.name?.toLowerCase().includes(filterValue) &&
            this.relatedObjects?.findIndex(
              (assigned) => assigned.id == country.id
            ) == -1
          );
        });
        break;

      case UserRelationshipType.User:
      default:
        this.filteredOptions = this.user.filter((user) => {
          return (
            user.name?.toLowerCase().includes(filterValue) &&
            this.relatedObjects?.findIndex(
              (assigned) => assigned.id == user.id
            ) == -1
          );
        });
        break;
    }
  }

  DeleteAssignedObject(object: CountryStoreObject) {
    if (!confirm('The element will be deleted permanently!')) {
      return;
    }
    console.log(this.type + 'sono type');

    switch (object.type) {
      case UserRelationshipType.Store:
        this.http
          .DeleteAssignedObject(
            {
              related_id: object.id,
              user_id: this.id,
            },
            'DeleteStoreFromUser'
          )
          .subscribe((data) => {
            this.relatedObjects = data;
            this.ResetForm();
          });
        break;
      case UserRelationshipType.Country:
        this.http
          .DeleteAssignedObject(
            {
              user_id: object.id,
              related_id: this.id,
            },
            'DeleteCountryFromUser'
          )
          .subscribe((data) => {
            this.relatedObjects = data;
            this.ResetForm();
          });
        break;
      case UserRelationshipType.User:
        if (this.type === 'Country') {
          this.http
            .DeleteAssignedObject(
              {
                user_id: this.id,
                related_id: object.id,
              },
              'DeleteUserFromCountry'
            )
            .subscribe((data) => {
              this.relatedObjects = data;
              this.ResetForm();
            });
        } else {
          this.http
            .DeleteAssignedObject(
              {
                user_id: object.id,
                related_id: this.id,
              },
              'DeleteUserFromStore'
            )
            .subscribe((data) => {
              this.relatedObjects = data;
              this.ResetForm();
            });
        }
        break;
    }
  }

  InsertAssignedObject() {
    if (!this.assignForm.get('name')!.valid) return;
    var id;
    switch (this.assignForm.get('type')!.value!) {
      case UserRelationshipType.Store:
        id = this.store.find(
          (store) => store.name == this.assignForm.get('name')!.value!
        )?.id;
        break;
      case UserRelationshipType.User:
        id = this.user.find(
          (user) => user.name == this.assignForm.get('name')!.value!
        )?.id;
        break;
      case UserRelationshipType.Country:
        id = this.country.find(
          (country) => country.name == this.assignForm.get('name')!.value!
        )?.id;
        break;
    }

    if (id == null) {
      this._snackBar.open('Select a valid item!', 'Ok');
      return;
    }
    switch (this.assignForm.get('type')!.value!) {
      case UserRelationshipType.Store:
        this.http
          .InsertAssignedObject(
            {
              related_id: this.id,
              user_id: id,
            },
            'InsertStoreFromUser'
          )
          .subscribe((data) => {
            this.relatedObjects = data;
            this.ResetForm();
          });
        break;
      case UserRelationshipType.Country:
        this.http
          .InsertAssignedObject(
            {
              related_id: this.id,
              user_id: id,
            },
            'InsertCountryFromUser'
          )
          .subscribe((data) => {
            this.relatedObjects = data;
            this.ResetForm();
          });

        break;
      case UserRelationshipType.User:
        if (this.type === 'Country') {
          this.http
            .InsertAssignedObject(
              {
                related_id: id,
                user_id: this.id,
              },
              'InsertUserFromCountry'
            )
            .subscribe((data) => {
              this.relatedObjects = data;
              this.ResetForm();
            });
        } else {
          this.http
            .InsertAssignedObject(
              {
                related_id: id,
                user_id: this.id,
              },
              'InsertUserFromStore'
            )
            .subscribe((data) => {
              this.relatedObjects = data;
              this.ResetForm();
            });
        }
    }
  }

  GetCategoryFromForm(): CountryStoreObject {
    return new CountryStoreObject(
      this.assignForm.get('id')!.value!,
      this.assignForm.get('name')!.value!
    );
  }

  MapToArray(map: any): CountryStoreObject[] {
    let list: CountryStoreObject[] = [];
    Object.keys(map).forEach((key) => {
      list.push(new CountryStoreObject(key, map[key]));
    });
    return list.sort((a, b) => (a.name! < b.name! ? -1 : 1));
  }

  ResetForm() {
    this.assignForm.reset({
      name: '',
      type:
        this.type === 'User'
          ? UserRelationshipType.Country
          : UserRelationshipType.User,
    });
  }
}
