$(document).ready(function () {

	// bind events //

	$('#formCalculate').submit(CalculateAverageVictims);


	// functions //

	function CalculateAverageVictims(event) {
		event.preventDefault();
		
		$("#result").html(GetAverageVictims());
		
	}
	function GetAverageVictims() {

		// get all input values
		var personA_AgeOfDeath = $("#txtPA_AgeOfDeath").val();
		var personA_YearOfDeath = $("#txtPA_YearOfDeath").val();
		var personB_AgeOfDeath = $("#txtPB_AgeOfDeath").val();
		var personB_YearOfDeath = $("#txtPB_YearOfDeath").val();
		
		// let's create Person objects
		var personA = new Person(personA_AgeOfDeath, personA_YearOfDeath);
		var personB = new Person(personB_AgeOfDeath, personB_YearOfDeath);

		// check if any of them has invalid value
		if (!personA.isValid() || !personB.isValid()) {
			return -1;
		}

		// find out the total victims on each persons born year
		var victimsOnBornYearA = CountVictimsOnYear(personA.getBornYear());
		var victimsOnBornYearB = CountVictimsOnYear(personB.getBornYear());

		// return the average
		return (victimsOnBornYearA + victimsOnBornYearB) / 2;

	}
	function CountVictimsOnYear(year) {

		var total = 0;
		var fibNumbers = [0, 1];
		var yearCounted = 2; // start counting from year 2, if year 1 then it will just skip the while loop

		// generate fibonacci numbers based on the year parameter
		while (yearCounted <= year) {
			var previousNum = fibNumbers[fibNumbers.length-2];
			var currentNum = fibNumbers[fibNumbers.length-1];
			fibNumbers.push(previousNum + currentNum);
			yearCounted++;
		}
		
		// sum all the numbers
		total = fibNumbers.reduce((prevValue, currValue) => prevValue + currValue, 0);

		return total;

	}

});

class Person {
	constructor(AgeOfDeath, YearOfDeath) {
		this.AgeOfDeath = AgeOfDeath;
		this.YearOfDeath = YearOfDeath;
	}

	isValid() {
		// rules:
		// ~ value must be numeric
		// ~ value must be above 0
		// ~ must born after the witch took control
		if ($.isNumeric(this.AgeOfDeath) && $.isNumeric(this.YearOfDeath)) {
			if (this.AgeOfDeath > 0 && this.YearOfDeath > 0) {
				if (this.getBornYear() > 0) {
					return true;
				}
			}
		}
		return false;
	}

	getBornYear() {
		return this.YearOfDeath - this.AgeOfDeath;
	}
}