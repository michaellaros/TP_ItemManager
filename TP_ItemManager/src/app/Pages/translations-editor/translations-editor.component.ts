import { Component, Input } from '@angular/core';
import { Translation } from 'src/app/Models/Translation';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { HttpService } from 'src/app/Services/http.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-translations-editor',
  templateUrl: './translations-editor.component.html',
  styleUrls: ['./translations-editor.component.scss'],
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
export class TranslationsEditorComponent {
  @Input() public translations?: Translation[];
  public translation?: Translation;
  @Input() flg_isEditable!: boolean;
  @Input() id!: string;
  @Input() type!: string;
  public state: boolean = true;
  public newTranslation: Translation = new Translation();

  constructor(private http: HttpService) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(this.flg_isEditable);
  }
  toggle(): void {
    if (this.flg_isEditable) {
      this.state = !this.state;
      console.log(this.state);
    }
  }

  UpdateTranslation(translation: Translation) {
    switch (this.type) {
      case 'Item':
        this.http
          .UpdateItemTranslation(this.id, translation)
          .subscribe((data) => {
            this.translations = data;
            console.log(data);
          });
        break;

      case 'Category':
        this.http
          .UpdateCategoryTranslation(this.id, translation)
          .subscribe((data) => {
            this.translations = data;
            console.log(data);
          });
        break;

      case 'Option':
        this.http
          .UpdateOptionTranslation(this.id, translation)
          .subscribe((data) => {
            this.translations = data;
            console.log(data);
          });
        break;
    }
  }

  InsertTranslation(translation: Translation) {
    switch (this.type) {
      case 'Item':
        this.http
          .InsertItemTranslation(this.id, translation)
          .subscribe((data) => {
            this.translations = data;
            this.newTranslation = new Translation();

            console.log(data);
            console.log(this.newTranslation);
          });
        break;

      case 'Category':
        this.http
          .InsertCategoryTranslation(this.id, translation)
          .subscribe((data) => {
            this.translations = data;
            this.newTranslation = new Translation();

            console.log(data);
            console.log(this.newTranslation);
          });
        break;

      case 'Option':
        this.http
          .InsertOptionTranslation(this.id, translation)
          .subscribe((data) => {
            this.translations = data;
            this.newTranslation = new Translation();
            console.log(data);
            console.log(this.newTranslation);
          });
        break;
    }
  }
}
