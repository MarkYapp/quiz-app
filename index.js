/*Create variables to keep track of current question and current score*/
let currentq = 0;
let currentscore = 0;

/*Begin the quiz when user clicks "Start!"*/
function beginQuiz() {
  $(".beginButton").click(event => {
    $(".introPage").addClass("hidden");
    $(".questionPage").removeClass("hidden");
    $("header").removeClass("hidden");
    updateCurrentQuestion();
    updateScore();
  });
}

/*Put the current question count, image, question and options on the DOM*/
function updateCurrentQuestion() {
  $(".currentQuestionCount").text(currentq+1);
  $(".questionPage").html(`
    <img class="currentImage image" src="${questions[currentq].imagesrc}" alt="${questions[currentq].imgalt}">
        <form class="optionForm">
          <legend>${questions[currentq].question}</legend>
          <div class="options">
          <input type="radio" id="optiona" value="a" name="option">
          <label class="optiona" for="optiona">${questions[currentq].a}</label>
          </div>
          <div class="options">
          <input type="radio" id="optionb" value="b" name="option">
          <label class="optionb" for="optionb">${questions[currentq].b}</label>
          </div>
          <div class="options">
          <input type="radio" id="optionc" value="c" name="option">
          <label class="optionc" for="optionc">${questions[currentq].c}</label><br>
          </div>
          <div class="options">
          <input type="radio" id="optiond" value="d" name="option">
          <label class="optiond" for="optiond">${questions[currentq].d}</label><br>
          </div>
          <input type="submit" value="Submit" class="formSubmitButton button">
        </form>`);
  $("input:checked").val([]);
}




/*Listen for user to submit their answer. Use a conditional statement to force a selection*/
function handleUserInput() {
  $(".questionPage").on("click", ".formSubmitButton", function(event) {
    event.preventDefault();
    if ($("input:checked").val() === undefined) {
      $(".selectOptionModal").removeClass("hidden");
    }
    else {
    let userAnswer = $("input:checked").val();
    console.log(`User's selection was ${userAnswer}`)
    feedback(userAnswer);
    }
  });
}

/*Hide the question. Use a conditional statement to check if user got it right. Load feedback modal*/
function feedback(answer) {
  $(".questionPage").addClass("hidden");
  if (answer === questions[currentq].correctanswer) {
    currentscore ++;
    currentq ++;
    updateScore();
    correctFeedback();
  }
  else {
    currentq ++;
    updateScore();
    incorrectFeedback();
  }
  $(".feedbackModal").removeClass("hidden");
}

function correctFeedback() {
  $(".feedbackModal p").text("That's correct!");
    $(".feedbackImage").attr("src", "http://www.abc.net.au/news/image/8672188-3x2-700x467.jpg");
  $(".feedbackImage").attr("alt", "Cyclist wins a race");
}

function incorrectFeedback() {
  let correctkey = questions[currentq-1].correctanswer;
  $(".feedbackModal p").text(`Doh! The right answer was:  ${questions[currentq-1][correctkey]}`);
  $(".feedbackImage").attr("src", "http://www.latimes.com/resizer/uywbs-T9g61P8NrVScC2rMgd13A=/1400x0/www.trbimg.com/img-5b4b7b24/turbine/la-1531673375-ymmdd5jxfy-snap-image");
  $(".feedbackImage").attr("alt", "Two cyclists in a crash");
}

/*Listen for user to click "Next", and iterate current question. Check if it's the last question and load either next question or summary page*/
function loadNextQuestion() {
  $(".nextQuestionButton").click(event => {
    if (currentq > questions.length-1) {
      loadSummary();
    }
    else {
      $(".feedbackModal").addClass("hidden");
      updateCurrentQuestion();
      $(".questionPage").removeClass("hidden");
    }
  });  
}

function updateScore() {
  $(".userCorrectScore").text(currentscore);
  $(".userIncorrectScore").text(currentq - currentscore);
}

/*Put summary page on the DOM*/
function loadSummary() {
  $(".feedbackModal").addClass("hidden");
  $("header").addClass("hidden");
  $(".summaryPage").removeClass("hidden");
  $(".summaryPageImage").attr("src", summaryImage[0]);
  $(".summaryPage p").text(`Overall Score: ${currentscore} out of 10!`);
}

/*listen for clicks on the "start over" button, and update DOM*/
function startOver() {
  $(".startOverButton").click(event => {
    $(".summaryPage").addClass("hidden");
    $(".introPage").removeClass("hidden");
    currentq = 0;
    currentscore = 0;
    updateCurrentQuestion();
  });
}

/*listen for clickse on "closeSelectOptionModal" button*/
function closeSelectOptionModal() {
  $(".closeSelectOptionModal").click(event => {
  $(".selectOptionModal").addClass("hidden");
  })
}

function runQuizApp() {
  beginQuiz();
  handleUserInput();
  loadNextQuestion();
  startOver();
  closeSelectOptionModal();
}

$(runQuizApp());