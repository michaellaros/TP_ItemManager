import { Component } from '@angular/core';
import { StatusService } from 'src/app/Services/status.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

constructor(public status:StatusService){}
SetLabel(value:string){
this.status.buttonValue = value;
console.log(this.status.buttonValue);

}
}
