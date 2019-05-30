// JavaScript

// Globala variabler
var wordList; // Array med antal ord
var selectedWord; // Det ord som valts slumpmässigt och som användaren ska gissa på
var letterBoxes; // Array med referenser till de span-taggar som utgör rutor för bokstäverna i ordet.
var hangmanImg; // Referens till img-elementet med bilden för galgen och gubben
var hangmanImgNr; // Nummer för aktuell bil (0-6), för den bildfil som visas (så man sedan kan veta vilket som blir nästa bild)
var msgElem; // Meddelande till användaren
var startTime; // Variabel för starttiden
var startGameBtn; // Referens till startknappen
var letterButtons; // Array med referenser till bokstavsknapparna

// Funktion som körs då hela webbsidan är inladdad, dvs då all HTML-kod är utförd
// Initiering av globala variabler samt koppling av funktioner till knapparna.
function init() {
	wordList = ["BLOMMA","LASTBIL","SOPTUNNA","KÖKSBORD","RADIOAPPARAT","VINTER","SOMMAR","DATORMUS","LEJON","ELEFANTÖRA","JULTOMTE",
	"SKOGSHYDDA","BILNUMMER","BLYERTSPENNA","SUDDGUMMI","KLÄDSKÅP","VEDSPIS","LJUSSTAKE","SKRIVBORD","ELDGAFFEL","STEKPANNA",
	"KASTRULL","KAFFEBRYGGARE","TALLRIK","SOFFBORD","TRASMATTA","FLYGPLAN","FLYGPLATS","TANGENTBORD"];
	var i; // Loopvariabel
	startGameBtn = document.getElementById("startGameBtn");
	document.getElementById("startGameBtn").onclick = startGame;// startGame anropas då användaren klickar på knappen
	msgElem = document.getElementById("message");
	letterButtons = document.getElementById("letterButtons").getElementsByTagName("button");
	for (i=0; i<letterButtons.length; i++) letterButtons[i].onclick = guessLetter;
	hangmanImg = document.getElementById("hangman");
	msgElem = document.getElementById("message");	
	changeButtonActivation(true);
} // End init
window.onload = init; // Se till att init aktiveras då sidan är inladdad

// Funktion som anropas då en klickar på knappen "Starta spelet"
// Visa första bilden h0.pngs
function startGame () {
	var now; // Variabel för start av tiden
	randomWord ();
	showLetterBoxes ();
	hangmanImg.src = "pics/h0.png";
	hangmanImgNr = 0;
	now = new Date();
	changeButtonActivation(false);
	msgElem.innerHTML = "";
	startTime = now.getTime();
} // End starGame

// Funktion för att välja ord slumpmässigt samt för att kontrollera att användaren inte får samma ord igen
// Slumptal 29 ord
// Indexera lista med slumptalet och spara valt ord i en global variabel "choosenWord"
function randomWord () {
	var wordIndex; // Slumpat tal sparas här
	var oldWord; // Gammalt ord
	oldWord = selectedWord;
	while (oldWord == selectedWord) {
	wordIndex = wordList[Math.floor(28*Math.random())+1];
	selectedWord = wordIndex; 
	}
} // End randomWord

// Funktion för att visa bokstavsrutor
// Gå igenom valt ord och skapa en kod med ett span-element för varje bokstav
// Lägg in koden i elementet med id "letterBoxes"
function showLetterBoxes () {
	var newCode; // Textsträng med HTML-kod
	var i; // Loopvariabel
	newCode = ""; 
	for (i=0; i<selectedWord.length; i++) {
			newCode += "<span>&nbsp;</span>";
		}
	document.getElementById("letterBoxes").innerHTML = newCode;
	letterBoxes = document.getElementById("letterBoxes").getElementsByTagName("span");	
} // End showLetterBoxes

// Anropas då användaren klickar på en bokstavsknapp
function guessLetter () {
	var letter; // Bokstaven för knappen
	var i; // Loopvariabel
	var letterFound; // Flagga (true/false) för att avgöra om rätt bokstav är hittad
	var correctLettersCount; // Räknare för att avgöra antalet korrekta bokstäver
	this.disabled = true;
	letter = this.value;
	letterFound = false;
	correctLettersCount = 0;
	for (i=0; i<selectedWord.length; i++) {
		if (letter == selectedWord.charAt(i)) {
			letterFound = true;
			letterBoxes[i].innerHTML = letter;
		} if (letterBoxes[i].innerHTML != "&nbsp;") {
		correctLettersCount += 1;
		}
	}
	
	if (letterFound == false) {
		hangmanImgNr += 1;
		hangmanImg.src = "pics/h" + hangmanImgNr + ".png";
		
	if (hangmanImgNr == 6) {
		endGame(true);
		}
	} else if (correctLettersCount == selectedWord.length) {
		endGame(false);
	}	
} // End guestLetter

// Funktion för att avgöra hur spelet slutade samt tiden det tog
// Om gubben blir hängd skrivs meddelande med det rätta ordet
// Annars skrivs meddelande med en gratulation
function endGame (manHanged) {
	var now; // Variabel för slut på tiden
	var runTime; // Variabel för tiden mellan start och slut på spelet
	now = new Date();
	runTime = (now.getTime() - startTime) / 1000;
	if (manHanged == true) {
		msgElem.innerHTML = ("Tyvärr gubben hängdes. " + "Rätt svar är " + selectedWord) + ".";
	} else { 
		msgElem.innerHTML = ("Gratulerar, du kom fram till rätt ord.");
	}
	changeButtonActivation(true);
	msgElem.innerHTML += "<br>" + "Det tog " + runTime.toFixed(1) + " sekunder";
}

// Funktion för att aktivera / avaktivera knappar
function changeButtonActivation (status) {
	var i; // Loopvariabel
	if (status == true) {
		startGameBtn.disabled = false;
		for (i=0; i<letterButtons.length; i++) {
			letterButtons[i].disabled = true;	
		}
	}
	
	if (status == false) {
		startGameBtn.disabled = true;
		for (i=0; i<letterButtons.length; i++) {
			letterButtons[i].disabled = false;	
		}
	}
}