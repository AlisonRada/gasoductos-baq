import { Component, OnInit } from '@angular/core';
import {  TestService} from '../../services/test.service'
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { Survey, Question} from './data-models';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css']
})
export class CreateTestComponent implements OnInit {
  testForm: FormGroup;
  private questions: Question[] = []

  constructor(private testService: TestService) { }

  ngOnInit(): void {
    this.initForm()
    
    let opciones: string[] = []
    opciones.push("Opcion1")
    opciones.push("Opcion2")
    opciones.push("Opcion3")
    this.addQuestion("¿Cómo?", opciones, 0)
    this.addQuestion("¿Dónde?", opciones, 0)
    this.addQuestion("¿Por qué?", opciones, 0)
    this.addQuestion("¿Entonces??", opciones, 0)
    let companie = "ibh4KOiOZPaJSPbeVgsWDSz8Y8p2";
    //this.addTest("Probando", 10, companie)
  }
  private initForm() {
    let surveyTitle = '';
    let testQuestions = new FormArray([]);

    this.testForm = new FormGroup({
      'testTitle': new FormControl(surveyTitle, [Validators.required]),
      'testQuestions': testQuestions,
      
    });

    this.onAddQuestion();

  }

  onAddQuestion() {
    
   
    const surveyQuestionItem = new FormGroup({
      'questionTitle': new FormControl('', Validators.required),
      
    });
    console.log(surveyQuestionItem);
    (<FormArray>this.testForm.get('testQuestions')).push(surveyQuestionItem);
    

  }


  
  
  

  private clearFormArray(formArray: FormArray) {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }

  addQuestion(enunciado: string, opciones: string[], respuesta: number){
    let q: Question = {
      text: enunciado,
      options: opciones,
      answer: respuesta
    }
    this.questions.push(q)
  }

  addTest(title: string, time: number, companie: string){
    this.testService.addTest(title, time, this.questions, companie)
    this.questions = []
  }
  postSurvey() {

    let formData = this.testForm.value;
    console.log(formData);

    console.log();
    let ID = 0;
    
    let Title = formData.surveyTitle;
  //  let Question: Question[] = [];
    let Questions = [];

    let surveyQuestions = formData.surveyQuestions;
    let optionArray = formData.surveyQuestions[0].questionGroup.options[0].optionText
    let survey = new Survey(ID,  Title,  Questions);


    surveyQuestions.forEach((question, index, array) => {


      let questionItem = {
        'ID': 0,
       
        "text": question.questionTitle,
        "options": [],
        "answer":question.answer

      }
     


      if (question.questionGroup.hasOwnProperty('options')) {



        question.questionGroup.options.forEach(option => {
         
          questionItem.options.push(option.optionText)
        });
      }

 
      survey.Question.push(questionItem)


    });


    console.log(survey);
    console.log('posting survey');


  }


  onSubmit() {

    this.postSurvey();

  }

}
