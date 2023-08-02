import { Setting } from "./setting.js";
export class Quiz{
    constructor(question){
        this.question = question;
        this.currentQuestion = 0;
        this.totalQuestion = this.question.length;
        this.score = 0;
        this.isCorrect = false;
        this.submitBtn = document.getElementById('submitBtn');
        this.submitBtn.addEventListener('click',this.nextQuestion.bind(this))
        this.tryBtn = document.getElementById('tryBtn');
        this.tryBtn.addEventListener('click',this.tryAgain);
        this.showQuestion();
    }
    
    showQuestion(){
        document.getElementById('currentQuestion').innerHTML = this.currentQuestion +1;
        document.getElementById('totalQuestion').innerHTML = this.totalQuestion;
        document.getElementById('theQuestion').innerHTML = this.question[this.currentQuestion].question;
        this.getAnswer()
    }
    getAnswer(){
        this.answer = [this.question[this.currentQuestion].correct_answer,...this.question[this.currentQuestion].incorrect_answers];
        // to random answers because correct answer is alywes the first choice
        let currentIndex = this.answer.length,
            randomIndex;
            while (currentIndex != 0) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;
                [this.answer[currentIndex],this.answer[randomIndex]] = [this.answer[randomIndex],this.answer[currentIndex]]
            }
            this.answerChoice = ``
            for (let i = 0; i < this.answer.length; i++) {
                this.answerChoice += `
                <div class="form-check mt-2">
                <label class="form-check-label">
                <input type = "radio" class="form-check-input" name="answer" id="a: ${i}" value="${this.answer[i]}">
                ${this.answer[i]}
                </lable>
                </div>
                `
            }
            document.getElementById('rowAnswer').innerHTML = this.answerChoice; 
    }
    checkanswer(){
        this.userAnswer = document.getElementsByName('answer');
        this.userAnswer = [...this.userAnswer].filter(el => el.checked)[0].value;
        let correct_answer = this.question[this.currentQuestion].correct_answer;
        if(this.userAnswer == correct_answer){
            this.score++;
            this.isCorrect = true;
        }else{
            this.isCorrect = false
        }
    }
    nextQuestion(){
        this.checkanswer();
        (this.isCorrect) ? $('#correct').fadeIn(500,()=>{
            $('#correct').fadeOut(1000)
        }) : $('#inCorrect').fadeIn(500,()=>{
            $('#inCorrect').fadeOut(1000)
        })
        this.currentQuestion++
        if(this.currentQuestion < this.totalQuestion){
            this.showQuestion()
        }else{
            this.finish()
        }
    }
    finish(){
        $('#quiz').fadeOut(250,()=>{
            $('#finish').fadeIn(250)
        })
        document.getElementById('score').innerHTML = `${this.score} of ${this.totalQuestion}`;
        if(this.score < (this.totalQuestion / 2)){           
            document.getElementById('scoreMessage').innerHTML = `Don't be shy Go ahead and try again`;
            $('#scoreMessage').addClass('alert alert-danger')          
        }else{
            document.getElementById('scoreMessage').innerHTML = `Excellent you passed the exam`;
            $('#scoreMessage').addClass('alert alert-success')
        }
    }
    tryAgain(){
        $('#finish').fadeOut(500,()=>{
            $('#setting').fadeIn(250)
        })   
       new Setting().amount.value = '';  
    }
}