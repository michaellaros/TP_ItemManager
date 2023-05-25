import { Component, Input  } from '@angular/core';
import { StatusService } from 'src/app/Services/status.service';
import { HttpService } from 'src/app/Services/http.service';
import { ItemFilterModel } from 'src/app/Models/ItemFilterModel';



@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss'],
})

export class EditListComponent {

  // displayedColumns: string[] = ['ID', '[tobedefined]', 'Actions'];
  // dataSource = ELEMENT_DATA;
  filter:ItemFilterModel= new ItemFilterModel(0,'','',0,0,'');
  constructor(public status:StatusService, public http:HttpService) {



     }

     ngOnInit() {
        this.http.GetItems(this.filter).subscribe(data=>{
          this.status.objectMap = data
        });
        console.log(this.status.objectMap)
     }
}
