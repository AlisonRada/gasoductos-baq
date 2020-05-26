import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  file: any;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  // called each time file input changes
  onSelectFile(event) {
    this.file = event.target.files[0]
  }

}
