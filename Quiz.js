class Quiz {
    constructor (){

    }

    
getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
}
update(state){
    database.ref('/').update({
      gameState: state
    });
  }
    

async start(){
    if(gameState === 0){
        contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val()
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }
  play(){
    question.hide();
    background("lightGreen")
    fill(0)
    textSize(30)
    text("result of the quiz ",340,50)
    text("-----------------",320,65)
    Contestant.getPlayerInfo()
    if(allContestants!==undefined){
      var display_answer = 230;
      fill("blue")
      textSize(20)
      text("*NOTE:contestant who answer are highlighted in grey",130,230);
      for(var plr in allContestants){
        var correctAnswer= "2";
        if(correctAnswer===allContestants[plr].answer){
          fill("grey")

        }
        else{
         fill("red")
        }
        display_answer+=30
        textSize(20)
        text(allContestants[plr].name + ": " + allContestants[plr].answer, 250,display_answer)
      }
    }

  }
}
