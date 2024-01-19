import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Timespan } from 'src/app/Models/Timespan';
import { StorageManagerService } from 'src/app/Services/auth-services/storage-manager.service';

import { HttpService } from 'src/app/Services/http.service';

@Component({
  selector: 'app-timespan-editor',
  templateUrl: './timespan-editor.component.html',
  styleUrls: ['./timespan-editor.component.scss'],
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
export class TimespanEditorComponent {
  public valueTranslation: string[] = ['Name', 'Description', 'Preview'];
  public fieldTranslation: string[] = ['EL', 'IT', 'EN'];
  @Input() public timespans?: Timespan[];
  public timespan?: Timespan;
  @Input() flg_isEditable!: boolean;
  @Input() id!: string;
  public state: boolean = true;

  timespanForm = new FormGroup({
    availableFrom: new FormControl(0, [Validators.min(0), Validators.max(24)]),
    availableTo: new FormControl(24, [Validators.min(0), Validators.max(24)]),
  });

  constructor(
    private http: HttpService,
    public storage: StorageManagerService
  ) {}

  ngOnInit() {
    if (!this.storage.CheckPermission(this.storage.CountryManagerPermission)) {
      this.timespanForm.disable();
    }
  }
  toggle(): void {
    if (this.flg_isEditable) {
      this.state = !this.state;
    }
  }
  // GetTimespanFromForm(): Timespan {
  //   return new Timespan(
  //     this.timespanForm.get('availableFrom')!.value!,
  //     this.timespanForm.get('availableTo')!.value!
  //   );
  // }

  ResetTimespanFromForm() {
    this.timespanForm.reset({
      availableFrom: 0,
      availableTo: 0,
    });
  }
  UpdateTimespan(timespan: Timespan) {
    //todo gestione controlli input
    this.http
      .UpdateTimespan(
        timespan.id!,
        timespan.availableFrom!,
        timespan.availableTo!,
        this.id
      )
      .subscribe((data) => {
        this.timespans = data;
      });
  }
  InsertTimespan() {
    if (
      this.timespanForm.get('availableFrom')!.value! != null &&
      this.timespanForm.get('availableTo')!.value! != null
    ) {
      this.http
        .InsertTimespan(
          this.timespanForm.get('availableFrom')!.value!,
          this.timespanForm.get('availableTo')!.value!,
          this.id
        )
        .subscribe((data) => {
          this.timespans = data;
        });
    }
  }

  DeleteTimespan(id: string) {
    if (confirm('The element will be deleted permanently!')) {
      //todo cambiare pop up
      this.http
        .DeleteTimespan(id, this.id)
        .subscribe((data) => (this.timespans = data));
    }
  }
}
