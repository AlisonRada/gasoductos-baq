import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AvatarDialogComponent } from "../../components/avatar-dialog/avatar-dialog.component";
import { Router } from '@angular/router';
import { CrudService } from '../../services/lista.service';

@Component({
  selector: 'app-new-operator',
  templateUrl: './new-operator.component.html',
  styleUrls: ['./new-operator.component.scss']
})
export class NewOperatorComponent implements OnInit {

  exampleForm: FormGroup;
  avatarLink: string = "https://s3.amazonaws.com/uifaces/faces/twitter/adellecharles/128.jpg";
  selected = 'CC';

  validation_messages = {
   'name': [
     { type: 'required', message: 'Por favor ingrese el nombre' }
   ],
   'email': [
     { type: 'required', message: 'Por favor ingrese el correo' }
   ],
   'password': [
     { type: 'required', message: 'Por favor ingrese una contraseña' },
   ],
   'address': [
    { type: 'required', message: 'Por favor ingrese una dirección' },
  ],
  
   'id': [
    { type: 'required', message: 'Por favor ingrese el número de documento' },
  ]
 };

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    public crudService: CrudService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.exampleForm = this.fb.group({
      name: ['', Validators.required ],
      address: ['', Validators.required ],
      email: ['', Validators.required ],
      password: ['', Validators.required ],
      id: ['', Validators.required ],
      tipoDocumento: this.selected,
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(AvatarDialogComponent, {
      height: '400px',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.avatarLink = result.link;
      }
    });
  }

  resetFields(){
    this.avatarLink = "https://s3.amazonaws.com/uifaces/faces/twitter/adellecharles/128.jpg";
    this.exampleForm = this.fb.group({
      name: ['', Validators.required ],
      address: ['', Validators.required ],
      email: ['', Validators.required ],
      password: ['', Validators.required ],
      id: ['', Validators.required ],
      tipoDocumento: this.selected,
    });
  }

  onSubmit(value){
    this.crudService.createUser(value, this.avatarLink)
    .then(
      res => {
        this.resetFields();
        this.router.navigate(['/operators-list']);
      }
    )
  }

}