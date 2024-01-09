import { Component, OnInit } from '@angular/core';
import quizz_questions from '../../../assets/data/quizz_questions.json';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {
  title:string = ''

  questions:any
  questionSelected:any

  answers:string[] = []
  anserSelected:string=""

  questionIndex:number = 0
  questionMazIndex:number = 0

  finished:boolean = false

  constructor() { }

  ngOnInit(): void { //*rever melhor funçaõ de ngOnInit pois aqui ele recolhe os valores em nova constante
    if (quizz_questions){
      this.finished = false
      this.title = quizz_questions.title //*nessa linha o 1º title é da interpolação e o 2ºé do banco de dados que importamos do .json

      this.questions = quizz_questions.questions
      this.questionSelected = this.questions[this.questionIndex]

      this.questionIndex = 0
      this.questionMazIndex = this.questions.length

    }
  }

  playerChoose(value:string){
    this.answers.push(value)
    this.nextStep()
  }

  async nextStep(){
    this.questionIndex += 1

    if(this.questionMazIndex > this.questionIndex){
      this.questionSelected = this.questions[this.questionIndex]
    }else {
      const finalAnswer:string = await this.checkResult(this.answers)
      this.finished = true
      this.anserSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results]
    }
  }

  async checkResult(answers:string[]){

    const result = answers.reduce((previous, current, i, arr) => {
      if(arr.filter(item => item === previous).length > 
        arr.filter(item => item === current).length
          ){
        return previous
      }else{
        return current
      }
    })
    return result
  }

}
