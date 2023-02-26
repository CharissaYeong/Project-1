// Data paths
const weeklyPath = "https://charissayeong.github.io/Project-1/Project%201/Data/weekly.json" // Weekly infectious disease records

// Weekly data
async function loadData() {
    const response = await axios.get(weeklyPath);
    return response.data
}

// Chart 1 data

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
    let cases = 0;
    let total = 0;
    let series_1 = []

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

async function filter_by_year(n) {
    let data = await transformData_1();
    let series_1 = []

    for (let dataPoint of data) {
        // find the year number that the data point is in
        let date = dataPoint.x;
        if (date.includes(n)) {
            series_1.push({
                'x': date.slice(-3),
                'y': dataPoint.y
            })
        }
    };
    return series_1
}

async function transformData_1_hf() {

    // Store promise results in variable
    let data = await loadData();

    // Filter only Dengue cases
    let filteredData = data.filter(function (dataPoint) {
        return dataPoint.disease == "Dengue Haemorrhagic Fever";

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

    console.log(series_1)
    return series_1

}

async function transformData_1_year_hf() {
    let data = await transformData_1_hf();

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

async function transformData_1_yearView_hf() {
    let data = await transformData_1_year_hf();
    let cases = 0;
    let total = 0;
    let series_1 = []

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

async function filter_by_year_hf(n) {
    let data = await transformData_1_hf();
    let series_1 = []

    for (let dataPoint of data) {
        // find the year number that the data point is in
        let date = dataPoint.x;
        if (date.includes(n)) {
            series_1.push({
                'x': date.slice(-3),
                'y': dataPoint.y
            })
        }
    };
    return series_1
}

// async function empty_series() {

//     let data = await transformData_1();
//     let empty_series = []

//     // console.log(data)

//     for (let i = 0; i < data.length; i++) {
//         empty_series.push(
//             {
//                 'x': data[i]['x'],
//                 'y': 0
//             })
//     // console.log(empty_series)
//     } 
    
//     return empty_series
// }


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
    },
    {
        name: 'Dengue_HF',
        type: 'column',
        data: [],
    },
    ],

    noData: {
        "text": "Loading..."
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'straight',
        width: [4, 0],
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
    // xaxis: {
    //     type: '',
    // },
    yaxis: [
        {
            title: {
                text: "Dengue Fever"
            },
            opposite: false
        },
        {
            title: {
                text: "Dengue Haemorrhagic Fever"
            },
            opposite: true,

        }
    ],
    legend: {
        horizontalAlign: 'left'
    },
    tooltip: {
        enabled: true,
    },
    theme: {
        palette: 'palette3' // upto palette10
    },
};
const chart_1 = new ApexCharts(
    document.querySelector("#chart_1"),
    options_1
);
chart_1.render();

// Empty Chart_2A
const options_2A = {
    "chart": {
        "type": "area",
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

// Charts series update

// Chart_1 update

window.addEventListener("DOMContentLoaded", async function () {

    let data_week = await transformData_1();
    let data_year = await transformData_1_yearView();
    let data_week_hf = await transformData_1_hf();
    let data_year_hf = await transformData_1_yearView_hf();
    let yearRange = document.getElementById('yearRange')
    let year_label = document.getElementById('year_label')
    let clear_btn = document.getElementById('clear_1')
    let clear_btn_year = document.getElementById('clear_1_year')
    let weekRadio = document.getElementById('weekView').checked;
    let yearRadio = document.getElementById('yearView').checked;

    let dengue_btn = document.getElementById('dengue');
    let dengueHF_btn = document.getElementById('dengue_HF');
    let dengue_check = document.getElementById('dengue').checked;
    let dengueHF_check = document.getElementById('dengue_HF').checked;
    let empty = await empty_series()


    async function checkbox_dengue(data1, data2) {
        console.log(dengue_check, dengueHF_check)

        if (dengue_check == true && dengueHF_check == false) {
            console.log('dengue')
            chart_1.updateSeries([
                {
                    "name": "Dengue",
                    "data": data1
                },
                {
                    "name": "Dengue_HF",
                    "data": []
                }
            ]);
        } else if (dengue_check == false && dengueHF_check == true) {
            console.log('HF')
            chart_1.updateSeries([
                {
                    "name": "Dengue",
                    "data": data1
                },
                {
                    "name": "Dengue_HF",
                    "data": data2
                }
            ]);
            chart_1.updateSeries([
                {
                    "name": "Dengue",
                    "data": []
                },
                {
                    "name": "Dengue_HF",
                    "data": data2
                }
            ])
        } else if (dengue_check == true && dengueHF_check == true) {
            console.log('dengue and HF')
            chart_1.updateSeries([
                {
                    "name": "Dengue",
                    "data": data1
                },
                {
                    "name": "Dengue_HF",
                    "data": data2
                }
            ]);
        } else if (dengue_check == false && dengueHF_check == false) {
            console.log('nothing')
            chart_1.updateSeries([
                {
                    "name": "Dengue",
                    "data": []
                },
                {
                    "name": "Dengue_HF",
                    "data": []
                }
            ]);
        }
    }

    checkbox_dengue(data_year, data_year_hf)
    // chart_1.updateSeries([
    //     {
    //         "name": "Dengue",
    //         "data": data_year
    //     },
    //     {
    //         "name": "Dengue_HF",
    //         "data": data_year_hf
    //     }
    // ]);

    const weekBtn = document.getElementById('weekView');
    const yearBtn = document.getElementById('yearView');

    weekBtn.addEventListener("click", function () {
        let weekRadio = document.getElementById('weekView').checked;
        let dengue_check = document.getElementById('dengue').checked;
        let dengueHF_check = document.getElementById('dengue_HF').checked;
        year_label.innerHTML = ''

        if (weekRadio == true) {
            console.log('week selected');
            checkbox_dengue(data_week, data_week_hf)
            // chart_1.updateSeries([
            //     {
            //         "name": "Dengue",
            //         "data": data_week
            //     },
            //     {
            //         "name": "Dengue_HF",
            //         "data": data_week_hf
            //     }
            // ]);
        }
    })

    yearBtn.addEventListener("click", function () {
        let yearRadio = document.getElementById('yearView').checked;
        year_label.innerHTML = ''

        if (yearRadio == true) {
            console.log('year selected');
            checkbox_dengue(data_year, data_year_hf)

            // chart_1.updateSeries([
            //     {
            //         "name": "Dengue",
            //         "data": data_year
            //     },
            //     {
            //         "name": "Dengue_HF",
            //         "data": data_year_hf
            //     }
            // ]);
        }
    });



    yearRange.addEventListener("input", async function () {
        let year = yearRange.value;
        year_label.innerHTML = year;
        let data_year_select = await filter_by_year(year);
        let data_year_select_hf = await filter_by_year_hf(year);

        checkbox_dengue(data_year_select, data_year_select_hf)
        // chart_1.updateSeries([
        //     {
        //         "name": "Dengue",
        //         "data": data_year_select
        //     },
        //     {
        //         "name": "Dengue_HF",
        //         "data": data_year_select_hf
        //     }

        // ])

    });

    dengue_btn.addEventListener("click", async function () {

        let weekRadio = document.getElementById('weekView').checked;
        let yearRadio = document.getElementById('yearView').checked;

        if (dengue_check == false) {
            dengue_check = true
        } else if (dengue_check == true) {
            dengue_check = false
        }

        if (yearRange.value >= 2012) {
            let year = yearRange.value;
            year_label.innerHTML = year;
            let data_year_select = await filter_by_year(year);
            let data_year_select_hf = await filter_by_year_hf(year);
            checkbox_dengue(data_year_select, data_year_select_hf)
        } else if (yearRange.value < 2012) {
            console.log(yearBtn.checked)
            if (yearRadio == true) {
                // console.log('Dengue selected')
                checkbox_dengue(data_year, data_year_hf)
                console.log('year')
            } else if (weekRadio == true) {
                // console.log('Dengue not selected')
                checkbox_dengue(data_week, data_week_hf)
                console.log('week')
            } else {
                checkbox_dengue(data_year, data_year_hf)
                console.log('both')
            }
        }
    });

    dengueHF_btn.addEventListener("click", async function () {

        let weekRadio = document.getElementById('weekView').checked;
        let yearRadio = document.getElementById('yearView').checked;

        if (dengueHF_check == false) {
            dengueHF_check = true
        } else if (dengueHF_check == true) {
            dengueHF_check = false
        }

        console.log(dengueHF_check)

        if (yearRange.value >= 2012) {
            let year = yearRange.value;
            year_label.innerHTML = year;
            let data_year_select = await filter_by_year(year);
            let data_year_select_hf = await filter_by_year_hf(year);
            checkbox_dengue(data_year_select, data_year_select_hf)
        } else if (yearRange.value < 2012) {
            if (yearRadio == true) {
                checkbox_dengue(data_year, data_year_hf)
                console.log('year')
            } else if (weekRadio == true) {
                checkbox_dengue(data_week, data_week_hf)
                console.log('week')
            } else {
                checkbox_dengue(data_year, data_year_hf)
                console.log('both')
            }
        }
    })

    clear_btn.addEventListener("click", async function () {

        chart_1.updateSeries([
            {
                "name": "Dengue",
                "data": data_year
            },
            {
                "name": "Dengue_HF",
                "data": data_year_hf
            }
        ])

    });

    clear_btn_year.addEventListener("click", async function () {
        checkbox_dengue(data_year, data_year_hf)

    });
})








// Chart 2A
