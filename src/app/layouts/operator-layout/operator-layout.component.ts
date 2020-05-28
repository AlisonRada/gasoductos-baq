import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-operator-layout',
  templateUrl: './operator-layout.component.html',
  styleUrls: ['./operator-layout.component.css']
})
export class OperatorLayoutComponent implements OnInit {
  test: Date = new Date();

  constructor() { }

  ngOnInit(): void {
    var html = document.getElementsByTagName("html")[0];
    html.classList.add("operator-layout");
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("bg-default");
  }

  ngOnDestroy(): void {
    var html = document.getElementsByTagName("html")[0];
    html.classList.remove("operator-layout");
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("bg-default");
  }
}
