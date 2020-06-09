import { Component, OnInit } from '@angular/core';
import {  TestService} from '../../services/test.service'
import { Question } from '../../services/question'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  public title: string
  public questions: Question[]
  public preloader: boolean = true;
  public error: boolean = false;

  constructor(private testService: TestService, private _activeRoute: ActivatedRoute) {
    this._activeRoute.params.subscribe( params=>{
      if (params!== undefined){
        this.testService.getTest(params['id']).subscribe((item)=>{
          this.preloader = false    
          if (item.payload.data() !== undefined) {
            this.title = item.payload.data()['title']
            this.questions = item.payload.data()['questions'] as Question[]        
          } else {
            this.error = true;
          }
        })        
      }
    })  
  }

  ngOnInit(): void {
  }

  onLevel(x: number[]) {
    console.log(`question: ${x[0]} selected: ${x[1]}`)
  }

}
