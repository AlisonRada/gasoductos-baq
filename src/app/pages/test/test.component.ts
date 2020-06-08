import { Component, OnInit } from '@angular/core';
import {  TestService} from '../../services/test.service'
import { Question } from '../../services/question'

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  public title: string
  public questions: Question[]

  constructor(private testService: TestService) {
    this.testService.getTest("W6EgkSSl9fiG4xalS5y5").subscribe((item)=>{
      this.title = item.payload.data()['title']
      this.questions = item.payload.data()['questions'] as Question[]
    })
  }

  ngOnInit(): void {
  }

  onLevel(x: number[]) {
    console.log(`question: ${x[0]} selected: ${x[1]}`)
  }

}
