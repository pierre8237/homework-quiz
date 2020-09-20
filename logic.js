$(document).ready(function () {
  ("use strict");
  const viewHighScore = document.getElementById("view-button");
  const playerNameButton = document.getElementById("player-name");
  const startButton = document.getElementById("start-button");
  const nextButton = document.getElementById("next-question-button");
  const submitButton = document.getElementById("submit-quiz-button");
  let score = 0;
  let counter = 0;
  let values = [];
  let count = parseInt($("#theTarget").html());
  const questionsSet = [
    {
      question: "Question 1: What is HTML an acronymn for?",
      answers: {
        a: "A: Hyperscript mark-up language",
        b: "B: Hypertext mark-up protocol",
        c: "C: Hypertext mark-up language",
        d: "D: Hypertext mark-up loop",
      },
      correctAnswer: "a",
    },
    {
      question: "Question 2: What is an array in Javascript?",
      answers: {
        a: "A: A function with a length equal to it's total length minus 1.",
        b: "B: An object with an ordered set of values.",
        c: "C: A set of functions with defined key-value pairs.",
        d: "D: A coordinate system controlled through a css stylesheet.",
      },
      correctAnswer: "b",
    },
    {
      question:
        "Question 3: Who is widely credited with the creation of the internet?",
      answers: {
        a: "A: Tim Berners-Lee.",
        b: "B: Al Gore.",
        c: "C: Gore Vidal.",
        d: "D: Stan Lee.",
      },
      correctAnswer: "a",
    },
    {
      question: "Question 4: What does JSON an acronymn for?",
      answers: {
        a: "A: Java-Syntax operating system.",
        b: "B: Java-script object notation.",
        c: "C: Java-script operating network.",
        d: "D: Joint-syntax operating notation.",
      },
      correctAnswer: "b",
    },
    {
      question: "Question 5: What is the file extension for a CSS file?",
      answers: {
        a: "A: .CVS",
        b: "B: .HTMLS",
        c: "C: .coffefe",
        d: "D: .css",
      },
      correctAnswer: "d",
    },
  ];

  function onload() {
    $.when($.ready).then(function () {
      $(startButton).prop("disabled", false);
      $(playerNameButton).prop("disabled", true);
      $(".btn").prop("disabled", true);
      $(nextButton).prop("disabled", true);
      $(submitButton).prop("disabled", true);
    });
  }
  onload();

  function startQuiz() {
    $(startButton).on("click", function () {
      $(startButton).prop("disabled", true);
      $(".btn").prop("disabled", false);
      $("#questionContainer").text(questionsSet[0].question);
      $("#row_a").text(questionsSet[0].answers.a);
      $("#row_b").text(questionsSet[0].answers.b);
      $("#row_c").text(questionsSet[0].answers.c);
      $("#row_d").text(questionsSet[0].answers.d);
    });
  }
  startQuiz();

  function startTimer() {
    $(startButton).on("click", function () {
      let timer = setInterval(function () {
        count = parseInt($("#theTarget").html());
        if (count !== 0) {
          $("#theTarget").html(count - 1);
        } else if (counter == parseInt([questionsSet.length])) {
          clearInterval(timer);
        } else {
          return;
        }
      }, 1000);
      clearInterval();
    });
  }
  startTimer();

  function selectAnswer() {
    $(".btn").on("click", function () {
      $(nextButton).prop("disabled", true);
      for (let i = 0; i < questionsSet.length; i++) {
        if (this.id == questionsSet[counter].correctAnswer) {
          score++;
          counter++;
          $(".btn").prop("disabled", true);
          $(nextButton).prop("disabled", false);
        } else {
          counter++;
          $("#theTarget").text(count - 5);
          count - 5;
          $(".btn").prop("disabled", true);
          $(nextButton).prop("disabled", false);
        }
        if (counter == questionsSet.length) {
          $(nextButton).prop("disabled", true);
          $(playerNameButton).prop("disabled", false);
          $(startButton).prop("disabled", true);
          $(".btn").prop("disabled", true);
          $(submitButton).prop("disabled", false);
          $("#theTarget").text((count = 0));
          alert(
            "You got " +
              (score / parseInt(questionsSet.length)) * 100 +
              " % !" +
              "\n" +
              'Please press "Submit Quiz" to save your score.'
          );
        }
        return;
      }
    });
  }
  selectAnswer();

  function nextQuestion() {
    $(nextButton).on("click", function () {
      $(".btn").prop("disabled", false);
      $(nextButton).prop("disabled", true);
      $("#questionContainer").text(questionsSet[counter].question);
      $("#row_a").text(questionsSet[counter].answers.a);
      $("#row_b").text(questionsSet[counter].answers.b);
      $("#row_c").text(questionsSet[counter].answers.c);
      $("#row_d").text(questionsSet[counter].answers.d);
    });
  }
  nextQuestion();

  function submitQuiz() {
    $(submitButton).on("click", function () {
      alert("Enter your name to see your the high scores page!");
    });
  }
  submitQuiz();

  function setScoreToStorage() {
    $(playerNameButton).on("click", function () {
      score = (score / parseInt(questionsSet.length)) * 100;
      let name = $("#player_name_input").val().trim();
      let player = { name, score };
      localStorage.setItem(name, JSON.stringify(player));
      var input = $("#player_name_input");
      input.innerHTML = "";
      window.location.href = "highScores.html";
    });
  }
  setScoreToStorage();

  function getHighScore() {
    $.when($.ready).then(function () {
      if (values.length === 0) {
        keys = Object.keys(localStorage).forEach(function (key) {
          values.push(JSON.parse(localStorage.getItem(key)));
        });
      }
      values.sort(function (a, b) {
        if (a.score !== b.score) return b.score - a.score;
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        if (a.name.toLowerCase() === b.name.toLowerCase()) return 0;
      });
    });
  }

  getHighScore();

  function printHighScore() {
    $(viewHighScore).on("click", function () {
      let playerRow = $("<ul>");
      for (let i = 0; i < values.length; i++) {
        playerRow.addClass("player-name");
        playerRow.attr("id", "results-" + i);
        $("#highScore").append(playerRow);
        $(".player-name").append(
          "<li>" + values[i].name + "  |  " + values[i].score + "</li>"
        );
      }
    });
  }
  printHighScore();
});
