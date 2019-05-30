// JavaScript

//Globala variabler
	var allCards; // Array med nummer 
	var cardsElems; // Array med alla bilder
	var cardsCounter; // Räknare för antal vända kort
	var points; // Räknare för antal poäng
	var card1; // Variabel för vänt kort nummer 1
	var card2; // Variabel för vänt kort nummer 2
	var turns; // Variabel för antal kort som vänts
	var brickBack; // Referens till klass elementet brickBack
	var userTotPoints; // Referens till element som skriver ut total poäng till användaren
	var turnNr; // //Referens till element som skriver ut antalet vändor till användaren
	var msgElem; // Referens till div-element för utskrift av meddelande till användaren
	var nrOfBricksMenu; // Referens till element som bestämmer storlek på spelplan	

// Funktion som körs då hela webbsidan är inladdad, dvs då all HTML-kod är utförd
// Initiering av globala variabler samt händelsehanterare
function init() {
	// Variabler
	allCards = [0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7]; // Array
	turns = 0; // Räknaren startar på 0
	cardsCounter = 0; // Räknaren startar på 0
	points = 0; //  Räknaren startar på 0
	
	// Referenser till element i gränssnittet
	nrOfBricksMenu = document.getElementById("nrOfBricksMenu");
	cardsElems = document.getElementById("bricks").getElementsByTagName("img");
	userTotPoints = document.getElementById("userTotPoints");
	brickBack = document.getElementsByClassName("brickBack");
	turnNr = document.getElementById("turnNr");
	msgElem = document.getElementById("message");
	
	// Anrop av funktioner
	shuffle(allCards);
	getMyCookie();

	// Händelsehanterare
	addListener(document.getElementById("startGameBtn"),"click",startGame);
	addListener(document.getElementById("nextBtn"),"click",checkCards);
	
	// Aktivera/inaktivera knappar
	startGameBtn.disabled = false;	
	nextBtn.disabled = true;
	nrOfBricksMenu.disabled = false;
	
	// Kod för att återställa användarmeddelande
	msgElem.innerHTML = "";
	userTotPoints.innerHTML = Number(getCookie("myCookie"));
} // End init
	addListener(window,"load",init);

// Fisher-yates shuffle för att randomisera ordningen utav korten hämtat från: https://bost.ocks.org/mike/shuffle/
function shuffle(allCards) {
  var m = allCards.length, t, i;
  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);
    // And swap it with the current element.
    t = allCards[m];
    allCards[m] = allCards[i];
    allCards[i] = t;
  }
  return allCards;
}

// Funktion för att starta memory spelet
function startGame() {	
	//Lokala variabler & utskrifter
	var i; // Loopvariabel
	turns = 0; // Räknaren startar på 0 
	cardsCounter = 0; // Räknaren startar på 0 
	turnNr.innerHTML = turns; // Utskrift av antalet vändor
	
	// For loop
	for (i=0; i<cardsElems.length; i++) { 
		cardsElems[i].className = "brickBack";
		cardsElems[i].src = "pics/backside.png";
		cardsCounter = 0;
	}
	
	// Händelsehanterare
	for (i=0; i<cardsElems.length; i++) {
		addListener(cardsElems[i], "click", flipCards);
	}
	
	// Aktivera/inaktivera knappar
	startGameBtn.disabled = true;
	nextBtn.disabled = true;
	nrOfBricksMenu.disabled = true;
	
	// Kod för att återställa användarmeddelande
	msgElem.innerHTML = "";
} // End startGame

// Funktion för att vända kort
function flipCards() {
	var i; // Loopvariabel
	
	// For loop
	for(i=0; i<cardsElems.length; i++){
		if (this == cardsElems[i]) {
			if(cardsCounter > 1) { 
				return;
			}

			cardsElems[i].className = "brickFront";
			cardsElems[i].src = "pics/" + allCards[i] + ".png";
			removeListener(cardsElems[i], "click", flipCards);
			if (cardsCounter < 1) {
      			card1 = i;
			}
			else {
				card2 = i;
			}
			cardsCounter += 1;
		}	
	}
	
	if (cardsCounter < 2) { 
		nextBtn.disabled = true; // Avaktivera knapp
	}
	
	if (cardsCounter == 2) {
		turns += 1;
		turnNr.innerHTML = turns;
		nextBtn.disabled = false; // Aktivera knapp
	}
	
	if (brickBack.length == 0) {
		endGame();
	}
}  // End flipCards

// Funktion för att kontrollera par
function checkCards() {
	cardsCounter = 0; // Räknaren startar på 0
	nextBtn.disabled = true; // Avaktivera knapp
	
	// If och else sats
	if (allCards[card1] == allCards[card2]) {
		emptyCard(card1);
		emptyCard(card2);
	}
	else{
		resetCard(card1);
		resetCard(card2);
	}
} // End checkCards

// Funktion för att återställa kort
function resetCard(card){
	cardsElems[card].className = "brickBack";
	cardsElems[card].src = "pics/backside.png";
	addListener(cardsElems[card], "click", flipCards); // Händelsehanterare
} // End resetCard

// Funktion för att ta bort kort
function emptyCard(card){
	cardsElems[card].className = "brickEmpty";
	cardsElems[card].src = "pics/empty.png";
} // End emptyCard

// Funktion för att avsluta spel när alla 8 par har hittats
function endGame() {
	// Anrop av funktion
	calculatePoints();
	setCookie(myCookie, points);
	
	// Aktivera/inaktivera knappar
	startGameBtn.disabled = false;
	nextBtn.disabled = true;
	nrOfBricksMenu.disabled = false;
} // End endGame

// Funktion för att kalkylera antalet poäng efter avklarat spel där 20 poäng är max
function calculatePoints() {
	var roundPoints; // Variabel som sparar poäng per spelrunda
	roundPoints = (20 - (turns - 8) * 1.2);
	roundPoints = Math.round(roundPoints);
	
	// Om poängen för en runda skulle få ett negativt värde, sätts poängen till 0
	if (roundPoints < 0) {
		roundPoints = 0;
	}
	
	// Meddelande till användaren
	msgElem.innerHTML = "Du löste spelet på " + turns + " vändor, det blir " + roundPoints + " poäng.";
	
	// Anrop av funktion
	pointHistory(roundPoints);
} // End calculatePoints

// Funktion för poänghistorik
function pointHistory(roundPoints) {
	points += roundPoints;
	userTotPoints.innerHTML = "";
	userTotPoints.innerHTML = points;
	
	// Anrop av funktion
	saveMyCookie();
} // End pointHistory

// Spara poäng i cookien.
function saveMyCookie() {
	setCookie("myCookie", points);
} // End saveMyCookie

// Hämta cookien och lägg in den i points, ifall cookien finns.
function getMyCookie() {
	var cookieValue;	// Textsträng för cookiens innehåll
	cookieValue = getCookie("myCookie");
	if (cookieValue != null) {
		points += Number(cookieValue);
	}
} // End getMyCookie