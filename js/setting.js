import { Quiz } from "./quiz.js";
export class Setting {
    /* constructor(){
        this.question;
        this.categoryElement = document.getElementById('category'); 
        this.difficultyElement = document.getElementsByName('difficulty')
        this.numberOfQuestionElement = document.getElementById('NumberOfQuestion');
        this.startBtn = document.getElementById('startBtn');
        this.startBtn.addEventListener('click',this.startQuize.bind(this));
        this.getCategory()
    }

    async startQuize(){
        this.category = this.categoryElement.value;
        this.amount = this.numberOfQuestionElement.value;
        this.difficulty = [...this.difficultyElement].filter(el=> el.checked)[0].value;
        this.question = await this.fetchURL(`https://opentdb.com/api.php?amount=${this.amount}&category=${this.category}&difficulty=${this.difficulty}`);
        if(this.question.length > 0){
        $('#setting').fadeOut(250,()=>{
            $('#quiz').fadeIn(250)
        })
        new Quiz(this.question)
       }
       
    }
    
    async fetchURL(URL){
        let result = await fetch(URL);
        result = await result.json();
        return result.results;
    }
    async getCategory(){
        let result = await fetch(`https://opentdb.com/api_category.php`);
        let {trivia_categories} = await result.json()
        document.getElementById('category').innerHTML += trivia_categories.map((el) => `
        <option value="${el.id}">${el.name}</option>`).join('')
   }   */

   constructor(){
    this.question;
    this.startBtn = document.getElementById('startBtn').addEventListener('click',this.startQuiz.bind(this));
    this.getCategory()
   }
   async startQuiz(){
    this.category = document.getElementById('category').value;
    this.amount = document.getElementById('NumberOfQuestion').value;
    this.difficulty = [...document.getElementsByName('difficulty')].filter(el => el.checked)[0].value;
    this.question = await this.fetchURL(`https://opentdb.com/api.php?amount=${this.amount}&category=${this.category}&difficulty=${this.difficulty}`);
    if(this.question.length > 0){
        $('#setting').fadeOut(250,()=>{
            $('#quiz').fadeIn(250)
        })
        new Quiz(this.question)
    }
   }
   async fetchURL(URL){
    let result = await fetch(URL);
    result = await result.json();
    return result.results
   }
   async getCategory(){
    let result = await fetch(`https://opentdb.com/api_category.php`);
    let {trivia_categories} = await result.json();
    this.opt= ``
    for(let i=0; i < trivia_categories.length; i++){
        this.opt +=`
        <option value="${trivia_categories[i].id}">${trivia_categories[i].name}</option>
        `
    }
    document.getElementById('category').innerHTML = this.opt;
   }
}
