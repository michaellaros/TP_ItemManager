import { Component, Input } from '@angular/core';
import { Translation } from 'src/app/Models/Translation';

@Component({
  selector: 'app-translations-editor',
  templateUrl: './translations-editor.component.html',
  styleUrls: ['./translations-editor.component.scss'],
})
export class TranslationsEditorComponent {
  @Input() public translations?: Translation[];
}
