// Data

// Data paths
const weeklyPath = "https://charissayeong.github.io/Project-1/Project%201/Data/weekly-infectious-disease-bulletin-cases/weekly.json" // Weekly infectious disease records

// Weekly data
async function loadData() {
    const response = await axios.get(weeklyPath);
    return response.data
}

console.log(loadData())

async function transformData() {

    // Store promise results in variable
    let data = await loadData();
    console.log(Array.isArray(data)); //check if it is array
    console.log(data)

    // Filter only Dengue cases
    let filteredData = data.filter(function (dataPoint) {
        return dataPoint.disease == "Dengue Fever";

    }); console.log(filteredData);

    // Map the data
    let mappedData = filteredData.map(function(dataPoint){
        return {
            "Epi_week": dataPoint.epi_week,
            "No_of_cases": dataPoint.no_of_cases 
        }
    }); console.log(mappedData);
}

transformData()



// Charts

// Empty Charts

// Empty Chart_1
const options_1 = {
    "chart": {
        "type": "line",
        "height": "100%"
    },
    series: [],  // look ma, no data!!
    noData: {
        "text": "loading"
    }
}
const chart_1 = new ApexCharts(
    document.querySelector("#chart_1"),
    options_1
);
chart_1.render();

// Empty Chart_2A
const options_2A = {
    "chart": {
        "type": "line",
        "height": "100%"
    },
    series: [],  // look ma, no data!!
    noData: {
        "text": "loading"
    }

}
const chart_2A = new ApexCharts(
    document.querySelector("#chart_2A"),
    options_2A
);
chart_2A.render();

// Empty Chart_2B
const options_2B = {
    "chart": {
        "type": "line",
        "height": "100%"
    },
    series: [],  // look ma, no data!!
    noData: {
        "text": "loading"
    }

}

const chart_2B = new ApexCharts(
    document.querySelector("#chart_2B"),
    options_2B
);
chart_2B.render();

// Empty Chart_3
const options_3 = {
    "chart": {
        "type": "line",
        "height": "100%"
    },
    series: [],  // look ma, no data!!
    noData: {
        "text": "loading"
    }

}
const chart_3 = new ApexCharts(
    document.querySelector("#chart_3"),
    options_3
);
chart_3.render();