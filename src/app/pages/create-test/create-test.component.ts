import { Component, OnInit } from '@angular/core';
import {  TestService} from '../../services/test.service'
import { Question } from '../../services/question'

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css']
})
export class CreateTestComponent implements OnInit {

  private questions: Question[] = []

  constructor(private testService: TestService) { }

  ngOnInit(): void {
    let opciones: string[] = []
    opciones.push("Opcion1")
    opciones.push("Opcion2")
    opciones.push("Opcion3")
    this.addQuestion("¿Cómo?", opciones, 0)
    this.addQuestion("¿Dónde?", opciones, 0)
    this.addQuestion("¿Por qué?", opciones, 0)
    this.addQuestion("¿Entonces??", opciones, 0)
    let companie = "ibh4KOiOZPaJSPbeVgsWDSz8Y8p2";
    this.addTest("Probando", 10, companie)
  }

  addQuestion(enunciado: string, opciones: string[], respuesta: number){
    let q: Question = {
      enunciado: enunciado,
      opciones: opciones,
      respuesta: respuesta
    }
    this.questions.push(q)
  }

  addTest(title: string, time: number, companie: string){
    this.testService.addTest(title, time, this.questions, companie)
    this.questions = []
  }

}
