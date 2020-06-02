import { Component, OnInit } from '@angular/core';

import { CrudService } from '../../services/lista.service';
import { Router, Params } from '@angular/router';

@Component({
  selector: 'app-operators-list',
  templateUrl: './operators-list.component.html',
  styleUrls: ['./operators-list.component.scss']
})
export class OperatorsListComponent implements OnInit {
  
  searchValue: string = "";
  items: Array<any>;
  age_filtered_items: Array<any>;
  name_filtered_items: Array<any>;
  
  constructor( public crudService: CrudService,
    private router: Router) {}

  ngOnInit(): void {
    this.getData();
  }
  getData(){
    this.crudService.getUsers('a')
    .subscribe(result => {
      this.items = result;
      console.log(this.items);
      this.age_filtered_items = result;
      this.name_filtered_items = result;
    })
  }

  viewDetails(item){
    this.router.navigate(['/details/'+ item.payload.doc.id]);
  }

  capitalizeFirstLetter(value){
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  searchByName(){
    let value = this.searchValue.toLowerCase();
    this.crudService.searchUsers(value)
    .subscribe(result => {
      this.name_filtered_items = result;
      this.items = this.combineLists(result, this.age_filtered_items);
    })
  }

  setAvailability(item){
    this.crudService.available(item.payload.doc.id,item.payload.doc.data().available);
  }

  rangeChange(event){
    this.crudService.searchUsersByAge(event.value)
    .subscribe(result =>{
      this.age_filtered_items = result;
      this.items = this.combineLists(result, this.name_filtered_items);
    })
  }

  combineLists(a, b){
    let result = [];

    a.filter(x => {
      return b.filter(x2 =>{
        if(x2.payload.doc.id == x.payload.doc.id){
          result.push(x2);
        }
      });
    });
    return result;
  }

}

