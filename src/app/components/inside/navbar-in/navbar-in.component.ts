import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar-in',
  templateUrl: './navbar-in.component.html',
  styleUrls: ['./navbar-in.component.css']
})
export class NavbarInComponent implements OnInit {

	@Output() SignOutEmitter = new EventEmitter<any>();

	SignOut(){
		this.SignOutEmitter.emit();
	}

  constructor() { }

  ngOnInit(): void {
  }

}
