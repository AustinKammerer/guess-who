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
  // access the name of the face clicked
  let name = self.data().name;
  // check if the name of the face clicked matches the randomized nameToGuess
  if (name === nameToGuess) {
    // if so, add the success class and delay its removal as well an alert, then get a new nameToGuess
    self.addClass("success");
    setTimeout(function () {
      self.removeClass("success");
      nameRandomizer();
      setTimeout(function () {
        alert("Correct! New Person to Find!");
      }, 10);
    }, 1500);
  }
  // if not, add the fail class and delay its removal as well as an alert, game continues
  else {
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
  // randomize an index for the people array and set that person to nameToGuess
  nameToGuess = people[randomNumber(0, people.length - 1)].name;
  $("#nameToGuess").text(nameToGuess);
}

// random number function
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
    let t = arr[i]; // set temporary holder 't' to current value
    arr[i] = arr[j]; // set current value to the value at randomized index
    arr[j] = t; // set the value at the randomized index to 't' which is holding the original current value
    // effect: starting at the end of the array and working backwards, each element is swapped with a random element that precedes it in the array
  }
  return arr;
}
