console.log("Here are all the available people:", people);

let nameToGuess;

$(readyNow);

function readyNow() {
  console.log("JQ");
  // initialize faces on DOM in a random order
  for (let person of shuffle(people)) {
    let face = $(`
  <div class="face">
    <img src="https://github.com/${person.githubUsername}.png?size=250" alt="Profile image of ${person.name}">

  </div>
  `);
    $("#faceContainer").append(face);
    face.data(person);
  }
  // initialize nameToGuess
  nameRandomizer();
  // event listener
  $(`#faceContainer`).on(`click`, ".face", checkIfCorrect);
}

function checkIfCorrect() {
  // save this to variable so it can be correctly accessed in the setTimeout callbacks
  let self = $(this);
  let name = self.data().name;
  console.log(name);
  if (name === nameToGuess) {
    self.addClass("success");
    setTimeout(function () {
      self.removeClass("success");
      nameRandomizer();
      setTimeout(function () {
        alert("Correct! New Person to Find!");
      }, 10);
    }, 1500);
  } else {
    self.addClass("fail");
    setTimeout(function () {
      self.removeClass("fail");
      setTimeout(function () {
        alert("Sorry, Guess Again!");
      }, 10);
    }, 1500);
  }
}

function nameRandomizer() {
  nameToGuess = people[randomNumber(0, people.length - 1)].name;
  $("#nameToGuess").text(nameToGuess);
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (1 + max - min) + min);
}

// TODO function to shuffle people array
// using the Fisher-Yates shuffle algorithm found on https://javascript.info/task/shuffle
function shuffle(arr) {
  // loop over arr starting at the end and work backwards
  for (let i = arr.length - 1; i > 0; i--) {
    // generate a random index from 0 to current index
    let j = Math.floor(Math.random() * (i + 1));
    // swap the current element with the element at the random index
    let t = arr[i];
    arr[i] = arr[j];
    arr[j] = t;
    // effect: starting at the end of the array and working backwards, each element is swapped with a random element that precedes it in the array
  }
  return arr;
}
[0, 1, 2, 3, 4];
