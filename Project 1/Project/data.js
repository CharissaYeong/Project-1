// Data paths
const weeklyPath = "https://charissayeong.github.io/Project-1/Project%201/Data/weekly.json" // Weekly infectious disease records

let series_1 = []

// Weekly data
async function loadData() {
    const response = await axios.get(weeklyPath);
    return response.data
}

async function transformData_1() {

    // Store promise results in variable
    let data = await loadData();

    // Filter only Dengue cases
    let filteredData = data.filter(function (dataPoint) {
        return dataPoint.disease == "Dengue Fever";

    });

    // Map the data
    let mappedData = filteredData.map(function (dataPoint) {
        return {
            "E_week": dataPoint.epi_week,
            "No_of_cases": dataPoint.no_of_cases
        }
    });


    let series_1 = []
    for (let i = 0; i < mappedData.length; i++) {
        series_1.push(
            {
                'x': mappedData[i]['E_week'],
                'y': mappedData[i]['No_of_cases']
            })
    };

    return series_1

}

async function transformData_1_year() {
    let data = await transformData_1();

    // Group Data into years
    let years = {
        "2012": [],  // Jan because month number starts at 0 for JavaScript
        "2013": [],
        "2014": [],
        "2015": [],
        "2016": [],
        "2017": [],
        "2018": [],
        "2019": [],
        "2020": [],
        "2021": [],
        "2022": []
    }

    for (let dataPoint of data) {
        // find the year number that the data point is in
        let date = dataPoint.x;
        let yearNum = date.slice(0, 4);

        // add the data point to that year's container (i.e array)
        if (date.includes(yearNum)) {
            years[yearNum].push(dataPoint);
        }
    };

    return years

}

async function transformData_1_yearView() {
    let data = await transformData_1_year();
    let series_1 = []
    let cases = 0;
    let total = 0;

    // extract each month from the `months` object

    for (let key of Object.keys(data)) {
        for (n of data[key]) {
            cases = parseInt(n['y']);
            total = total + cases
        };

        series_1.push({
            'x': parseInt(key),
            'y': total
        })

        total = 0;
    }
    return series_1
}

// Chart update series 

// Chart_1

window.addEventListener("DOMContentLoaded", async function () {
    // Weekly/yearly view radio buttons
    let radioWeek = document.getElementById('weekView').checked;
    console.log(radioWeek);
    let radioYear = document.getElementById('yearView').checked;
    console.log(radioYear);
    let series_1 = []

    if (radioWeek == true) {
        console.log("week radio button is selected");
        let series_1 = await transformData_1
    } else if (radioYear == true) {
        console.log("year radio button is selected");
        let series_1 = await transformData_1_year
    } else {
        console.log("default")
        let series_1 = await transformData_1
    }

    let series = series_1
    // let series = await transformData_1_yearView();

    chart_1.updateSeries([
        {
            "name": "e-week",
            "data": series
        },
    ]);
})
// Empty Charts

// Empty Chart_1
const options_1 = {
    "chart": {
        "type": "area",
        "height": "100%"
    },
    series: [{
        name: 'Dengue',
        type: 'area',
        data: []
    }
    ],

    noData: {
        "text": "loading"
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'straight'
    },

    title: {
        text: 'Weekly Report',
        align: 'left'
    },
    subtitle: {
        text: 'Dengue Fever',
        align: 'left'
    },
    labels: [],
    xaxis: {
        type: '',
    },
    yaxis: {
        opposite: false
    },
    legend: {
        horizontalAlign: 'left'
    },
    tooltip: {
        enabled: true,

    }

};


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