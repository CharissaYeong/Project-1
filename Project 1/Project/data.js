// Data paths
const weeklyPath = "https://charissayeong.github.io/Project-1/Project%201/Data/weekly.json" // Weekly infectious disease records
const rainyPath = "https://data.gov.sg/api/action/datastore_search?resource_id=8b94f596-91fd-4545-bf9e-7a426493b674&limit=493"


// Weekly data
async function loadData(path) {
    const response = await axios.get(path);
    return response.data
}

// Chart 1 data start
async function transformData_1() {

    // Store promise results in variable
    let data = await loadData(weeklyPath);

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
        "2012": [],
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
    let data = await loadData(weeklyPath);

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
// Chart_1 data end

// Chart_2 data start
// Chart_2 data end

// Chart_3 data start

async function transformData_3() {

    let data = await loadData(rainyPath);
    data = data.result.records
    // console.log(data)

    let series_3 = []

    let years = {
        "2012": [],
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
    };

    for (let dataPoint of data) {
        // find the year number that the data point is in
        let date = dataPoint.month;
        let yearNum = date.slice(0, 4);

        // add the data point to that year's container (i.e array)
        for (let yearNum in years) {
            if (date.includes(yearNum)) {
                years[yearNum].push(dataPoint)
            }
        }
    };

    return years
}

async function transformData_3_yearView() {
    let data = await transformData_3();
    let cases = 0;
    let total = 0;
    let series_3 = []

    // extract each month from the `months` object

    for (let key of Object.keys(data)) {
        for (n of data[key]) {
            console.log(n)
            cases = parseInt(n['no_of_rainy_days']);
            total = total + cases
        };

        series_3.push({
            'x': parseInt(key),
            'y': total
        })

        total = 0;
    }
    console.log(series_3)
    return series_3
}

transformData_3_yearView()


// Chart_3 data end

// Empty Charts

// Empty Chart_1

const options_1 = {
    series: [{
    name: 'Dengue',
    type: 'area',
    data: []
  }, {
    name: 'Degue_HF',
    type: 'column',
    data: []
  }
],
    chart: {
    height: '100%',
    type: 'line',
    stacked: false,
  },
  stroke: {
    width: [4, 1],
    curve: 'smooth'
  },
  plotOptions: {
    bar: {
      columnWidth: '50%'
    }
  },
  
  fill: {
    opacity: [0.8, 0.35],
    gradient: {
      inverseColors: false,
      shade: 'light',
      type: "vertical",
      opacityFrom: 0.85,
      opacityTo: 0.55,
      stops: [0, 100, 100, 100]
    }
  },
  labels: [
  ],
  markers: {
    size: 0
  },

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
  tooltip: {
    shared: true,
    intersect: false,
  },
    theme: {
        palette: 'palette6' // upto palette10
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
        "type": "line",
        "height": "100%"
    },
    series: [],
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
    series: [{
        name: 'Rainy_days',
        type: 'area',
        data: []
      }, {
        name: 'Dengue_cases',
        type: 'line',
        data: []
      }],
        chart: {
        height: '100%',
        type: 'line'
      },
      stroke: {
        curve: 'smooth'
      },
      fill: {
        type:'solid',
        opacity: [0.35, 1],
      },
      labels: [],
      markers: {
        size: 0
      },
      yaxis: [
        {
          title: {
            text: 'Number of rainy days',
          },
        },
        {
          opposite: true,
          title: {
            text: 'Dengue cases',
          },
        },
      ],
      tooltip: {
        shared: true,
        intersect: false,
      },
      theme: {
        palette: 'palette6' // upto palette10
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
    let week_btn = document.getElementById('weekView')
    let year_btn = document.getElementById('yearView')

    let dengue_btn = document.getElementById('dengue');
    let dengueHF_btn = document.getElementById('dengue_HF');
    let dengue_check = document.getElementById('dengue').checked;
    let dengueHF_check = document.getElementById('dengue_HF').checked;

    async function checkbox_dengue(data1, data2) {
        // console.log(dengue_check, dengueHF_check)

        if (dengue_btn.checked == true && dengueHF_btn.checked == false) {
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
        } else if (dengue_btn.checked == false && dengueHF_btn.checked == true) {
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
        } else if (dengue_btn.checked == true && dengueHF_btn.checked == true) {
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
        } else if (dengue_btn.checked == false && dengueHF_btn.checked == false) {
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

    const weekBtn = document.getElementById('weekView');
    const yearBtn = document.getElementById('yearView');

    weekBtn.addEventListener("click", function () {
        yearRange.value = '2023';
        year_label.innerHTML = ''
        // let weekRadio = document.getElementById('weekView').checked;
        yearRange.value = '2023';
        year_label.innerHTML = ''

        if (weekBtn.checked == true) {
            console.log('week selected');
            checkbox_dengue(data_week, data_week_hf)

        }
    })

    yearBtn.addEventListener("click", function () {
        yearRange.value = '2023';
        year_label.innerHTML = ''
        let yearRadio = document.getElementById('yearView').checked;
        year_label.innerHTML = ''

        if (yearRadio == true) {
            console.log('year selected');
            checkbox_dengue(data_year, data_year_hf)

        }
    });



    yearRange.addEventListener("input", async function () {
        yearView.checked = true;
        weekView.checked = false;
        let year = yearRange.value;
        year_label.innerHTML = year;
        let data_year_select = await filter_by_year(year);
        let data_year_select_hf = await filter_by_year_hf(year);

        if (year > 2022) {
            checkbox_dengue(data_year, data_year_hf)
        } else {
            checkbox_dengue(data_year_select, data_year_select_hf)
        }




    });

    dengue_btn.addEventListener("click", async function () {

        if (yearRange.value <= 2022) {
            let year = yearRange.value;
            year_label.innerHTML = year;
            let data_year_select = await filter_by_year(year);
            let data_year_select_hf = await filter_by_year_hf(year);
            checkbox_dengue(data_year_select, data_year_select_hf)
        } else if (yearRange.value > 2022) {
            console.log(yearBtn.checked)
            if (year_btn.checked == true) {
                checkbox_dengue(data_year, data_year_hf)
                console.log('year')
            } else if (week_btn.checked == true) {
                checkbox_dengue(data_week, data_week_hf)
                console.log('week')
            }
        }
    });

    dengueHF_btn.addEventListener("click", async function () {

        console.log(dengueHF_check)

        if (yearRange.value <= 2022) {
            let year = yearRange.value;
            year_label.innerHTML = year;
            let data_year_select = await filter_by_year(year);
            let data_year_select_hf = await filter_by_year_hf(year);
            checkbox_dengue(data_year_select, data_year_select_hf)
        } else if (yearRange.value > 2022) {
            if (year_btn.checked == true) {
                checkbox_dengue(data_year, data_year_hf)
                console.log('year')
            } else if (week_btn.checked == true) {
                checkbox_dengue(data_week, data_week_hf)
                console.log('week')
            }
        }
    })

    clear_btn.addEventListener("click", async function () {

        yearView.checked = true;
        weekView.checked = false;
        dengueHF_btn.checked = true;
        dengue_btn.checked = true;
        yearRange.value = '2023';
        year_label.innerHTML = ''

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
        yearView.checked = true;
        weekView.checked = false;
        yearRange.value = '2023';
        year_label.innerHTML = ''
        checkbox_dengue(data_year, data_year_hf)

    });
})

// Chart_2A update

// Chart_3 update
window.addEventListener("DOMContentLoaded", async function () {
    let series_A = await transformData_3_yearView();
    let series_B = await transformData_1_yearView()
    chart_3.updateSeries([
        {
            "name": "Rainy_days",
            "data": series_A
        },
        {
            "name": "Dengue_cases",
            "data": series_B
        },
    ]);
})
