import { Component, Input } from '@angular/core';
import { Translation } from 'src/app/Models/Translation';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';


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
  public state : string = "collapsed";
  @Input() flg_isEditable!: boolean;

  constructor(){}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(    this.flg_isEditable
      )
  }
  toggle(): void {
    if(this.flg_isEditable === true){
      this.state =
      this.state === 'collapsed' ? 'expanded' : 'collapsed';
      console.log(this.state)
    }
  }


}
