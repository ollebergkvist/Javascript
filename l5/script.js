// JavaScript Document

// Globala variabler
var carImgElem;		// Referens till bild med bil
var msgElem;		// Referens till elementet för meddelanden
var carImgs;		// Array med filnamn för bilderna med bilen
var carDir;			// Riktning för bilen
var xStep, yStep;	// Antal pixlar som bilen ska förflytta sig i x- resp. y-led i varje steg
var timerRef;		// Referens till timern för bilens förflyttning
var timerStep;		// Tid i ms mellan varje steg i förflyttningen
/* === Tillägg i labben === */
var pigImgElem; // Referens till bild med vildsvin
var pigTimerRef; // Timer
var pigDuration; // Timer längd i s
var cSize; // Storlek av bil bild
var pSize; // Storlek av vildsvin bild
var pigNr; // Räknare för aktuellt vildsvin
var hitCounter; // Räknare för antalet kollisioner
var pigNrElem; // Referens till elementet för utskrivning av antalet vildsvin
var hitCounterElem; // Referens till elementet för utskrivning av antalet kollisioner
var catchedPig; // Registrering av en kollision

// Initiera globala variabler och koppla funktion till knapp
function init() {
	carImgElem = document.getElementById("car");
	msgElem = document.getElementById("message");
	addListener(document,"keydown",checkKey);
	carImgs = ["car_up.png","car_right.png","car_down.png","car_left.png"];
	carDir = 1;
	addListener(document.getElementById("startBtn"),"click",startGame);
	addListener(document.getElementById("stopBtn"),"click",stopGame);
	xStep = 5;
	yStep = 5;
	timerRef = null;
	timerStep = 20;
	/* === Tillägg i labben === */
	pigImgElem = document.getElementById("pig");
	pigTimerRef = null;
	pigDuration = 2000;
	cSize = 80;
	pSize = 40;
	pigNrElem = document.getElementById("pigNr");
	hitCounterElem = document.getElementById("hitCounter");
} // End init
addListener(window,"load",init);

function checkKey(e) {
	var k = e.keyCode;
	switch (k) {
		case 37: // Pil vänster
		case 90: // Z
			carDir--;
			if (carDir < 0) carDir = 3;
			carImgElem.src = "pics/" + carImgs[carDir];
			break;
		case 39:  // Pil höger
		case 173: // -
			carDir++;
			if (carDir > 3) carDir = 0;
			carImgElem.src = "pics/" + carImgs[carDir];
			break;
	}
} // End checkKey

// Starta bilens rörelse
function startGame() {
	carImgElem.style.left = "0px";
	carImgElem.style.top = "0px";
	moveCar();
	/* === Tillägg i labben === */
	pigNr = 0;
	hitCounter = 0;
	pigTimerRef = setTimeout(newPig, pigDuration);
	catchedPig = true;
} // End startGame

// Stoppa bilen
function stopGame() {
	if (timerRef != null) clearTimeout(timerRef);
	/* === Tillägg i labben === */
	clearTimeout(pigTimerRef);
	pigImgElem.style.visibility = "hidden";
} // End stopGame

// Flytta bilen ett steg framåt i bilens riktning
function moveCar() {
	var x;	// x-koordinat (left) för bilen
	var y;	// y-koordinat (top) för bilen
	x = parseInt(carImgElem.style.left);
	y = parseInt(carImgElem.style.top);
	switch (carDir) {
		case 0: // Uppåtst
			y -= yStep;
			if (y < 0) y = 0;
			break;
		case 1: // Höger
			x += xStep;
			if (x > 720) x = 720;
			break;
		case 2: // Nedåt
			y += yStep;
			if (y > 420) y = 420;
			break;
		case 3: // Vänster
			x -= xStep;
			if (x < 0) x = 0;
			break;
	}
	/* === Tillägg i labben === */
	carImgElem.style.left = x + "px";
	carImgElem.style.top = y + "px";
	timerRef = setTimeout(moveCar,timerStep);
	checkHit();
} // End moveCar


/* === Tillägg av nya funktioner i labben === */

// Funktion för att lägga till vildsvin
function newPig() {
	if(pigNr < 10) { 
		var t; // Placering av vildsvin i höjdledd
		var l; // Placering av vildsvin i sidledd
		catchedPig = false;
		t = Math.floor(440*Math.random())+10;
		l = Math.floor(740*Math.random())+10;
		pigImgElem.style.top = t + "px";
		pigImgElem.style.left = l + "px";
		pigImgElem.src = "pics/pig.png";
		pigImgElem.style.visibility = "visible";
		pigTimerRef = setTimeout(newPig, pigDuration);
		pigNr++;
		pigNrElem.innerHTML = pigNr;
	}
	else {
		stopGame();
	}
} // End newPig

// Kontrollera antalet kollisioner
function checkHit () {
	if (catchedPig == true) {
		return;
	}
	var cT; // Bildstorlek höjd
	var cL; // Bildstorlek bredd
	var pT; // Bildstorlek höjd
	var pL; // Bildstorlek bredd
	cT = parseInt(carImgElem.style.top); 
	cL = parseInt(carImgElem.style.left); 
	pT = parseInt(pigImgElem.style.top); 
	pL = parseInt(pigImgElem.style.left); 
	if (cL+cSize-10 >= pL && cL+10 <= pL+pSize && cT+cSize-10 >= pT && cT+10 <= pT+pSize) {
		clearTimeout(pigTimerRef);
		pigImgElem.src = "pics/smack.png";
		pigTimerRef = setTimeout(newPig, pigDuration);
		hitCounter++;
		catchedPig = true;
		hitCounterElem.innerHTML = hitCounter;
	}
} // End checkHit