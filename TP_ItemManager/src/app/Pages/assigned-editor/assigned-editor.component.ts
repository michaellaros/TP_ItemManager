import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, Input } from '@angular/core';
import { AssignedObject } from 'src/app/Models/AssignedObject';

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

  public constructor() {
    this.newAssignedObject = new AssignedObject();
  }

  toggle(): void {
    if (!this.flg_insert) {
      this.state = !this.state;
    }
  }

  UpdateAssignedObject(object: AssignedObject) {}
  InsertAssignedObject(object: AssignedObject) {}
  SetNewObject() {
    this.newAssignedObject = new AssignedObject();
  }
}
