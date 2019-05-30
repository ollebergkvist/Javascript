// JavaScript Document

// Globala variabler
var formElem;		// Referens till elementet med hela formuläret
var totalCostElem;	// Referens till elementet för totalpris
var re; // Array med reguljära uttryck
var errMsg; // Array med felmeddelanden

// Initiera globala variabler och koppla funktion till knapp
function init() {
	var i;		// Loopvariabel
	formElem = document.getElementById("booking");
	totalCostElem = document.getElementById("totalCost");
	for (i=0; i<formElem.roomType.length; i++) {
		addListener(formElem.roomType[i], "click", checkIfFamilyRoom);
		addListener(formElem.roomType[i], "click", calculateCost);
	}
	for (i=0; i<formElem.addition.length; i++) {
		addListener(formElem.addition[i], "click", calculateCost);
	}
	re = [
		/^\d{3} ?\d{2}$/,						// Postnummer
		/^0\d{1,3}[-/ ]?\d{5,8}$/				// Telefonnummer
	];
	errMsg = [
		"Postnumret måste bestå av fem siffror.",
		"Telnr måste börja med en 0:a och sedan 6-11 siffror."
	];
	addListener(formElem.nights, "change", calculateCost);
	addListener(formElem.city, "blur", checkCity);
	addListener(formElem.zipcode, "blur", checkZipcode);
	addListener(formElem.telephone, "blur", checkTelephone);
	checkIfFamilyRoom();
	calculateCost();
	addListener(formElem.campaigncode, "focus", startCheckCampaign);
	addListener(formElem.campaigncode, "keyup", checkCampaign);
	addListener(formElem.campaigncode, "blur", endCheckCampaign);
} // End init
addListener(window, "load", init);


// Funktion som kontrollerar familjerum
function checkIfFamilyRoom() {
	if (formElem.roomType[2].checked == true) {
		formElem.persons.disabled = false;
		formElem.persons.parentNode.style.color = "#000";
		formElem.addition[2].disabled = true;
		formElem.addition[2].parentNode.style.color = "#999";
	}
	else {
		formElem.persons.disabled = true;
		formElem.persons.parentNode.style.color = "#999";
		formElem.addition[2].disabled = false;
		formElem.addition[2].parentNode.style.color = "#000";
	}
} // End checkIfFamilyRoom

//Funktion för att beräkna kostnad
function calculateCost() {
	var i; // Loopvariabel
	var elemValue;
	var roomPrice; // Pris för valt rum
	var nightsIndex; // Referens till antal nätter
	var nrOfNights; // Antalet nätter
	for (i=0; i<formElem.roomType.length; i++) {
		if (formElem.roomType[i].checked == true) {
			elemValue = formElem.roomType[i].value;
			roomPrice = Number(elemValue.split(",")[1]);
			break;
		}
	}
	for (i=0; i<formElem.addition.length; i++) {
		if (formElem.addition[i].checked && ! formElem.addition[i].disabled) {
			elemValue = formElem.addition[i].value;
			roomPrice += Number(elemValue.split(",")[1]);
		}
	}
	nightsIndex = formElem.nights.selectedIndex;
	nrOfNights = Number(formElem.nights.options[nightsIndex].value);
	totalCostElem.innerHTML = nrOfNights * roomPrice;
} // End calculateCost 

// Textsträngen för ort konverteras till versaler
function checkCity() {
	var city; // Variabel för ort 
	city = formElem.city.value;
	city = city.toUpperCase();
	formElem.city.value = city;
}

// Kontrollera postnummer
function checkZipcode() {
	checkField(zipcode, 0);
} // End checkZipcode

// Kontrollera telefonnummer
function checkTelephone() {
	checkField(telephone, 1);
} // End checkTelephone

// Kontrollera innehållet i theField. index används till reguljärt uttryck och felmeddelande.
function checkField(theField,index) {
	var errMsgElem; // Referens till andra span-elementet
	errMsgElem = theField.parentNode.parentNode.getElementsByTagName("span")[1];
	errMsgElem.innerHTML = "";
	if (!re[index].test(theField.value)) {
		errMsgElem.innerHTML = errMsg[index];
		return false;
	}
	else return true;
} // checkField

// Innehållet markeras och bakgrundsfärgen ändras då användaren klickar i fältet
function startCheckCampaign() {
	this.style.backgroundColor = "#F99";
	this.select();
} // End startCheckCampaign

// Kampanjfältets färg bytes samt innehållet ändras till versaler
function endCheckCampaign() {
	var campaignCode;  //Kampanjkoden
	this.style.backgroundColor = "";
	campaignCode = formElem.campaigncode.value;
	campaignCode = campaignCode.toUpperCase();
	formElem.campaigncode.value = campaignCode;
} // End endCheckCampaign

// Innehållet i kampanjfältet kontrolleras, bakgrundsfärgen ändras från röd till grön vid korrekt kod
function checkCampaign() {
	var re; // Reguljärt uttryck för kontroll av kampanjkod
	re = /^[A-ZÅÄÖ]{3}-\d{2}-[A-ZÅÄÖ]{1}\d{1}/i;
	if (re.test(this.value)) {
		this.style.backgroundColor = "#6F9";
	}
	else {
		this.style.backgroundColor = "#F99";
	} 	
} // End CheckCampaign