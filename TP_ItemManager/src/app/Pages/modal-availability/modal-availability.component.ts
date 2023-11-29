import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CountryAvailability } from 'src/app/Models/CountryAvailability';
import { StoreAvailability } from 'src/app/Models/StoreAvailability';
import { HttpService } from 'src/app/Services/http.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SetAvailabilityRequest } from 'src/app/Models/SetAvailabilityRequest';

@Component({
  selector: 'app-modal-availability',
  templateUrl: './modal-availability.component.html',
  styleUrls: ['./modal-availability.component.scss'],
})
export class ModalAvailabilityComponent {
  list!: CountryAvailability[];
  id!: string;
  type!: string;
  listToSend: SetAvailabilityRequest = { id: '', type: '', availabilities: [] };
  constructor(
    private http: HttpService,
    @Inject(MAT_DIALOG_DATA)
    public data: { list: CountryAvailability[]; id: string; type: string }
  ) {
    this.list = this.data.list;
    this.id = this.data.id;
    this.type = this.data.type;
  }

  selectedOptions = new FormControl([]);

  ToggleGroup(group: CountryAvailability) {
    group.stores!.forEach(
      (option: StoreAvailability) => (option.available = group.available)
    );
  }

  someComplete(group: CountryAvailability): boolean {
    if (group.stores!.every((store) => store.available)) {
      return false;
    }

    if (group.stores!.some((store) => store.available)) {
      return true;
    }
    return false;
  }
  allIncomplete(group: CountryAvailability): boolean {
    if (group.stores!.every((store) => !store.available)) {
      return true;
    } else {
      return false;
    }
  }

  ToggleCountry(group: CountryAvailability) {
    if (group.stores?.find((store) => store.available === false)) {
      group.available = false;
    } else {
      group.available = true;
    }
  }

  SendAvailabilities() {
    this.listToSend = { id: this.id, type: this.type, availabilities: [] };
    this.list.forEach((country) => {
      if (this.someComplete(country)) {
        country.stores?.forEach((store) => {
          if (!store.available) {
            this.listToSend.availabilities!.push(store.id!);
          }
        });
      } else if (this.allIncomplete(country)) {
        country.stores?.forEach((store) => {
          this.listToSend.availabilities?.push(store.id!);
        });
      }
    });

    this.http.SendAvailability(this.listToSend).subscribe();
  }
}
