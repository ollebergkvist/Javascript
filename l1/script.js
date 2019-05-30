// JavaScript Document

// Declaration of variables
var input1Elem, input2Elem, resultElem;

function init() {
	input1Elem = document.getElementById("input1"); // Inläsning av textfält 1
	input2Elem = document.getElementById("input2"); // Inläsning av textfält 2
	resultElem = document.getElementById("result"); //
	document.getElementById("runBtn").onclick = testScript; // Koppling av funktion testScript till knappen
} // End init

window.onload = init;

function testScript() {
	var speed, time, distance, reactionTime, speedMS, car, accTime, acc;
	speed = Number(input1Elem.value);
	time = Number(input2Elem.value);
	distance = speed * time / 60;
	resultElem.innerHTML = "Sträckan blir: " + distance + " km. <br><br>";
	time = distance / (speed - 20) * 60;
	resultElem.innerHTML += "Tiden för samma sträcka, om hastigheten är 20 km/h lägre blir " + time + " minuter. <br><br>"
	reactionTime = 3;
	speedMS = speed * 1000 / 3600;
	distance = speedMS * reactionTime;
	resultElem.innerHTML += "Om reaktions tiden är " + reactionTime + " sekunder blir reaktionssträckan " + distance + " m. <br><br>";
	car = ["Volvo", "BMW", "Ferrari"];
	accTime = [10.5, 7, 4,3];
	speedMS = 100 * 1000 / 3600;
	distance = speedMS * accTime[0] / 2;
	resultElem.innerHTML += car[0] + " 0-100 på " + accTime[0] + " sek. på " + distance + " meter. <br>";
	distance = speedMS * accTime[1] / 2;
	resultElem.innerHTML += car[1] + " 0-100 på " + accTime[1] + " sek. på " + distance + " meter. <br>";
	distance = speedMS * accTime[2] / 2;
	resultElem.innerHTML += car[2] + " 0-100 på " + accTime[2] + " sek. på " + distance + " meter. <br><br>";
	distance = ((speed + 40) / 3.6) * 20 
	resultElem.innerHTML += "Sträckan, om hastigheten är 40 km/h högre, blir " + distance + " m. på 20 sekunder. <br><br>";
	acc = (speed / 3.6) / accTime[1]
	resultElem.innerHTML += "Accelerationen för en BMW är " + acc + " m/s^2";
	
} // End testScript