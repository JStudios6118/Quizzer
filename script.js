// Question Set Loaded
var quiz = [];

// Stores responses after submit
var answers = [];

//All of the sets you can load currently
var sets = [

  [
    ["How are you today?", ["Good", "Fine", "Bad"], 0], ["Do you like cats?", ["Yes", "No"], 0], ["How much wood would a woodchuck chuck if a woodchuck could chuck wood?", ["300 Pounds", "700 Pounds", "600 Pounds", "1000 Pounds"], 2]
    ],

  [
    ["Which python statement will throw an error?", ["print(\"Hello\");", "print(\"hello\")", "this = true"], 1]
  ],

  [
    ["Which of the following foods are in the grains food group?", ["Salmon", "Bread", "Cheese", "Juice"], 2], ["Which of the following are in the extra group?", ["Candy", "Brussels Sprouts", "Beef", "All of the Above"], 1], ["Which of the following is a vegetable?", ["Apple", "Hamburger", "Cucumber", "Okra"], 4], ["Which of the following is in the fruit food group?", ["Tomato", "Cucumber", "Apple", "All of the Above"], 4], ["Which food is in the proteins group?", ["Orange", "Milk", "Eggs", "Donuts"], 3]
  ],

    [['What animal goes "Meow"?', ['Cat', 'Raccoon', 'Puppy', 'Axolotl'], 1], ['What animal goes "Woof!"?', ['Cat', 'Raccoon', 'Puppy', 'Axolotl'], 3], ['Which animal is endangered?', ['Cat', 'Raccoon', 'Puppy', 'Axolotl'], 4], ['Which animal eats trash?', ['Cat', 'Raccoon', 'Puppy', 'Axolotl'], 2], ['Which animal do you like most (all answers correct)', ['Cat', 'Raccoon', 'Puppy', 'Axolotl'], 0]]

]

// Stores hom many you got right/wrong
var right = 0
var wrong = 0

// Gives info about how you scored
function stats(){
  var codeString = ""
  for (y=0; y < answers.length; y++){
    // Creates Result List
    var current = answers[y].split(" ");
    var got = "";
    if (current[1] === current[2]){
      got = "Correct";
    }
    if(parseInt(current[2], 10) === 0){
      got = "Correct";
    } else if(current[1] !== current[2]) {
      got = "Incorrect";
    }
    codeString += "<h4>Question: " + current[0] + ": " + got + "</h4>";

  }
  // Show the results
  document.getElementById("allQuestions").innerHTML = codeString;
}

// Check Responses
function grabResponses(){
  document.getElementById("submitBTN").disabled = true;
  // Reset right/wrong/answers
  right = 0
  wrong = 0
  answers = [];
  var grabId = "";
  for(var t = 0; t < quiz.length; t++){
    var grabId = "answerInput" + t.toString();
    var val = document.getElementById(grabId).value;
    // Check the answers
    if (parseInt(val, 10) === quiz[t][2]){
      // Correct
      answers.push(t+1 + " " + val + " " + quiz[t][2]);
      right += 1
    } else if(quiz[t][2] === 0) {
      // Neutral
      answers.push(t+1 + " " + val + " " + quiz[t][2]);
      right += 1
    } else {
      // Incorrect
      answers.push(t+1 + " " + val + " " + quiz[t][2]);
      wrong += 1
    }
  }
  // Return data for the user
  document.getElementById("output").value = answers;
  document.getElementById("outOf").innerHTML = "<hr><h3>Results: " + right + "/" + (right+wrong) + " Correct";
  document.getElementById("right").innerHTML = "<h4 id='results'>Correct: " + right + "</h4>";
  document.getElementById("wrong").innerHTML = "<h4 id='results'>Incorrect: " + wrong + "</h4>";
  document.getElementById("reset").innerHTML = "<hr><button id='resetBTN' onclick='reset()'>Reset</button><input id='hideQ' value='Hide Questions' type='button' onclick='hideQuestions()'><p></p>";

  // Scroll to resetBTN button
  document.getElementById('resetBTN').scrollIntoView();
  stats()
}

// Display question stats
function reload(){
  var msg = "";
  var valid = true;

  // Tells how many questions are in the current quiz
  if(quiz.length > 0 && quiz.length < 2){
    msg = "There is one question";
  } else if (quiz.length > 1){
    msg = "There are " + quiz.length + " questions";
  } else {
    msg = "No quiz set has been loaded";
    valid = false;
  }
  document.getElementById("count").innerHTML = msg

  // Store HTML in string
  var codeString = ""

  // Load HTML if there is at least one question
  if (valid === true){
    for (var i = 0; i < quiz.length; i++){
      codeString = codeString + "<h2 id='quizTitle'>" + quiz[i][0] + "</h2>"
      for (var p = 1; p < quiz[i][1].length+1; p++){
        codeString = codeString + "<h3 id='answer'>" + p + ") " + quiz[i][1][p-1] + "</h3>";
      }
      codeString = codeString + "<input type='text' id='answerInput" + i + "' size='1' maxlength='2' placeholder='#'>";
    }
    document.getElementById("submit").innerHTML = "<br><button onclick='grabResponses()' id='submitBTN' href='#right'>Submit</button>"
  }

  // Attach HTML string into HTML
  document.getElementById("questions").innerHTML = codeString;
}

var setsSel = document.getElementById("sets");
var quest = document.getElementById("questionContainer");
var hidden = true;
var hide = false;

// Hides the questions
function hideQuestions(){
  if (hide === true){
    quest.style.display = "inline";
    document.getElementById("hideQ").value = "Hide Questions";
    hide = false;
    document.getElementById('resetBTN').scrollIntoView();
  } else {
    quest.style.display = "none";
    document.getElementById("hideQ").value = "Show Questions";
    hide = true;
  }
}

// Hides and shows the set select
function hideAndShow(){
  if (hidden === true){
    setsSel.style.display = "inline";
    hidden = false;
  } else {
    setsSel.style.display = "none";
    hidden = true;
  }
}

// Resets the quiz
function reset(){
  document.getElementById("submitBTN").disabled = false;
  quiz = [];
  window.location.reload(true);
  reload()
}

// Swaps sets
function changeSet(setData){
  quiz = []
  quiz = sets[setData];
  reload()
}

// Work in progress. Help with this is appreciated. I have some other HTML in the HTML file that is with the #sets div
function customSet(){
  data = document.getElementById("pasteCode").value
  sets.append(data)
}

// Sets up the site
reload();