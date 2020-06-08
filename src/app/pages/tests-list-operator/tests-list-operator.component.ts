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
    this.testService.getTests("s1cCM1fg2PSlycpjgku3VAQgzdI3").subscribe((item)=>{
      this.tests = item
      this.preloader = false;
    })
  }

  ngOnInit(): void {
    
  }

}
