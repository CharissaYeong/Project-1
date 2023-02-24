// Data series
series_1 = []
series_2 = []
series_3 = []

// Weekly/yearly view radio buttons
let radioWeek = document.getElementById('weekView').checked;
console.log(radioWeek)

let radioYear = document.getElementById('yearView').checked;
console.log(radioYear)

if(radioWeek == true) {   
    console.log("week radio button is selected");
    series_1 = transformData_1   
} else if (radioYear == true) {
    console.log("year radio button is selected");
    series_1 = transformData_1_year
} else {
    console.log("default")
}


// Year range slider
let range = document.getElementById('yearRange').value
console.log(range)

