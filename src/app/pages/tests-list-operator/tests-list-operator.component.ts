import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-tests-list-operator',
  templateUrl: './tests-list-operator.component.html',
  styleUrls: ['./tests-list-operator.component.css']
})
export class TestListOperatorComponent implements OnInit {

  public tests: Array<any> = []
  public preloader: boolean = true;

  constructor(private testService: TestService) {
    this.testService.getTests("SsTKYWTRsYWx4Frv4i9AKj1qKek1").subscribe((item)=>{
      this.tests = item
      this.preloader = false;
    })
  }

  ngOnInit(): void {
    
  }

}
