import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-chief-layout',
  templateUrl: './chief-layout.component.html',
  styleUrls: ['./chief-layout.component.css']
})
export class ChiefLayoutComponent implements OnInit {
  test: Date = new Date();

  constructor() {}

  ngOnInit(): void {
    var html = document.getElementsByTagName("html")[0];
    html.classList.add("chief-layout");
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("bg-default");
  }

  ngOnDestroy(): void {
    var html = document.getElementsByTagName("html")[0];
    html.classList.remove("chief-layout");
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("bg-default");
  }
}
