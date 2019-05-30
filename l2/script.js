// JavaScript

// Globala variabler
var inputElem; // Användarinput sparas 
var msgElem; // Textmeddelande till användare
var fruitNames; // Namn på frukter
var fruitNr; // Nummer för frukter
var selFruitsElem; // Antal frukter

// Funktion som körs då hela webbsidan är inladdad, dvs då all HTML-kod är utförd.
// Initiering av globala variabler samt koppling avfunktioner till knapparna.
function init() {
	inputElem=[]; 
	inputElem[1] = document.getElementById("input1");
	inputElem[2] = document.getElementById("input2");
	inputElem[3] = document.getElementById("input3");
	msgElem = document.getElementById("message");
	document.getElementById("btn1").onclick = showFruit;
	fruitNames=["ingen frukt","äpple","banan","citron","apelsin","päron"];
	fruitNr = 0;
	document.getElementById("btn2").onclick = checkName;
	selFruitsElem = document.getElementById("selectedFruits");
	document.getElementById("btn3").onclick = addFruits;
} // End init
window.onload = init; // Ser till att init aktiveras då sidan är inladdad


// Funktion för att ändra bild genom userinput värde
function showFruit() {
	var nr; // Användarinput för att bestämma bild
	var fruitUrl; // Variabel för att ändra bild
	nr = getNr(1,5);
	if (nr != null) {
		fruitUrl = "pics/fruit" + nr +".jpg";
		document.getElementById("fruitImg").src = fruitUrl;
		fruitNr = nr;
	}
} 

function checkName() {
	var name; // Variabel för fruktnamn
	name = (inputElem[2].value);
	name = name.toLowerCase(); // Omvandling till småbokstäver
	
	if (fruitNr == 0) {
		msgElem.innerHTML = "Välj frukt först";
		return;
	}
	
	if (name == fruitNames[fruitNr]) {
		msgElem.innerHTML = "Rätt namn.";
	}
	
	else {
		msgElem.innerHTML = "Fel namn.";
	}
	
}

function getNr(elemNr, high) {
	var nr;
	nr = Number(inputElem[elemNr].value);
	if (isNaN(nr)) {
		msgElem.innerHTML = "Du måste skriva ett tal med siffror.";
		return null;
	}
	
	if (nr < 1 || nr > high) {
		msgElem.innerHTML = "Du kan endast ange heltal mellan 1-5.";
		return null;
	}
	
	nr = parseInt(nr); // Omvandlar till heltal
	inputElem[elemNr].value = nr; // Korrigerat tal visas i textfältet
	return nr;	
}

function addFruits () {
	var amount;
	var imgList;
	var i;
	amount = (inputElem[3].value);
	if (fruitNr == 0) {
		msgElem.innerHTML = "Välj frukt först";
		return;
	}
	amount = getNr(3,9)
	if (amount != 0) {
		imgList = "";
		for (i=0; i<amount; i++) {
			imgList += "<img src='pics/fruit" + fruitNr + ".jpg' alt='frukt'>";
		}
		selFruitsElem.innerHTML += imgList;
	}
}