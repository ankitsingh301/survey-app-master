import React , { Component } from 'react';
var firebase = require('firebase');
var uuid = require('uuid');

var config = {
   apiKey: "AIzaSyCtkgRK9cH7lT09v0_ctTqF2iD6Mwt82F8",
   authDomain: "usurvey-2c761.firebaseapp.com",
   databaseURL: "https://usurvey-2c761.firebaseio.com",
   projectId: "usurvey-2c761",
   storageBucket: "usurvey-2c761.appspot.com",
   messagingSenderId: "438726772526"
 };
 firebase.initializeApp(config);




class Usurvey extends Component {

submit(event){
  console.log("here i am");
  var studentName = this.refs.name.value;
  this.setState({studentName:studentName},function(){
    console.log(this.state);
  });

}
onSelected(event) {
var answers = this.state.answers;
if(event.target.name === "answer1"){
  answers.answer1 = event.target.value;
} else if(event.target.name === "answer2"){
  answers.answer2 = event.target.value;
} else if(event.target.name === "answer3"){
  answers.answer3 = event.target.value;
}
this.setState({answers:answers},function(){
  console.log(this.state);
});
}

onSubmitted() {
  firebase.database().ref("/uSurvey"+this.state.uid).set({
    studentName:this.state.studentName,
    answers:this.state.answers
  });
  this.setState({isSubmitted:true},function(){
    console.log(this.state);
  });

}

  constructor(props){
    super(props);

    this.state = {
      uid:uuid.v1(),
      studentName:'',
      answers:{
        answer1:'',
        answer2:'',
        answer3:''
      },
      isSubmitted:false
    };
    this.submit=this.submit.bind(this);
    this.onSubmitted=this.onSubmitted.bind(this);
    this.onSelected=this.onSelected.bind(this);
  }
  render(){
    var studentName;
    var question;
    if(this.state.studentName === '' && this.state.isSubmitted === false){
      studentName = <div>
        <h1> Hey student let us know your name: </h1>
        <form onSubmit={this.submit}>
          <input className="nammy" type="text" placeholder="enter your name" ref="name" />
        </form>
      </div>;
      question = ''
    }else if(this.state.studentName !== '' && this.state.isSubmitted  ===  false){
      studentName = <h1>Wellcome to Survey,{this.state.studentName}</h1>;



      question = <div><h2>Please answer some question,{this.state.studentName} :</h2>
       <form onSubmit={this.onSubmitted}>
       <div className="card">
       <p><b>what you field you like most ??</b></p>
      <input type="radio" name="answer1" value="Technology" onChange={this.onSelected} />Technology
      <input type="radio" name="answer1" value="Marketing" onChange={this.onSelected} />Marketing
      <input type="radio" name="answer1" value="Hardware" onChange={this.onSelected} />Hardware
       </div>

       <div className="card">
       <p><b>what you do now ??</b></p>
      <input type="radio" name="answer2" value="student" onChange={this.onSelected} />student
      <input type="radio" name="answer2" value="in-job" onChange={this.onSelected} />in-job
      <input type="radio" name="answer2" value="looking for job" onChange={this.onSelected} />looking for job
       </div>

       <div className="card">
       <p><b>which technology you like to work-on ??</b></p>
      <input type="radio" name="answer3" value="webkit" onChange={this.onSelected} />webkit
      <input type="radio" name="answer3" value="java" onChange={this.onSelected} />java
      <input type="radio" name="answer3" value="python" onChange={this.onSelected} />python
       </div>
       <input className="feedback-button" type="submit" value="submit" />
       </form>

      </div>;


    } else if(this.state.isSubmitted === true){
      studentName = <h1>Thanks,{this.state.studentName}</h1>;
    }
    return(
      <div>
           {studentName}
           ---------------
            {question}
      </div>
    );
  }
}
export default Usurvey;
