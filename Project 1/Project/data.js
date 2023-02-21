// Data

// Data paths
const weeklyPath = "https://charissayeong.github.io/Project-1/Project%201/Data/weekly.json" // Weekly infectious disease records

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
    }); console.log(mappedData);

    


    let series_1 = []
    for (let i = 0; i < mappedData.length; i++) {
        series_1.push(
            {
                'x': mappedData[i]['E_week'],
                'y': mappedData[i]['No_of_cases']
            })
    };
    console.log(series_1);
    return series_1
}




// Charts

window.addEventListener("DOMContentLoaded", async function () {
    const data = await loadData();
    const series_1 = await transformData();
    console.log(series_1);
    chart_1.updateSeries([{
        "name": "Dengue",
        "data": series_1
    }]);
})


// Empty Charts

// Empty Chart_1
const options_1 = {
    "chart": {
        "type": "area",
        "height": "100%"
    },
    series: [],  // look ma, no data!!
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
        text: 'Weekly Infectious Disease Report 2012 - 2022',
        align: 'left'
    },
    subtitle: {
        text: 'Dengue Fever and Dengue Haemmorrahgic Fever',
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