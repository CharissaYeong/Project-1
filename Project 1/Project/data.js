// Data paths
const weeklyPath = "https://charissayeong.github.io/Project-1/Project%201/Data/weekly.json" // Weekly infectious disease records
const quarterlyPath = "https://charissayeong.github.io/Project-1/Project%201/Data/quarterly_cases.csv"
const serology = "https://charissayeong.github.io/Project-1/Project%201/Data/dengue_serology.csv" // Dengue serotype distribution
const habitats = "https://charissayeong.github.io/Project-1/Project%201/Data/breeding_habitats_year.csv" // Mosquito breeding habitats
const rainyPath = "https://data.gov.sg/api/action/datastore_search?resource_id=8b94f596-91fd-4545-bf9e-7a426493b674&limit=493" // Number of rainy days

// Weekly data
async function loadData(path) {
    const response = await axios.get(path);
    return response.data
}

// Test chart

//   Test chart end

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

// CSV data
async function load_CSV(path) {
    const response = await axios.get(path);
    // console.log(response.data);
    let json = await csv().fromString(response.data);
    // console.log(json)
    return json;
}

async function CSV_year_view(path, param, year) {
    let data = await load_CSV(path);
    let series_csv = []
    let total = 0
    let cases = 0

    let years = year

    if (years == 'all') {
        years = [2018, 2019, 2020, 2021, 2022]
    }

    years.forEach(function (item) {
        data.forEach(function (dataPoint) {
            let yr = dataPoint['year'];
            if (yr.includes(item)) {
                // console.log(dataPoint)
                cases = parseFloat(dataPoint[param]);
                total = total + cases;
            }
        });
        series_csv.push({
            'x': item,
            'y': parseInt(total)
        })
        total = 0;
    });
    // console.log(series_csv)
    return series_csv
}

async function CSV_q_view(path, param, year, quarter) {
    let data = await load_CSV(path)
    let series_csv = []
    let years = year
    let Q = quarter

    if (Q == 'all') {
        Q = ['Q1', 'Q2', 'Q3', 'Q4']
    }

    if (years == 'all') {
        years = [2018, 2019, 2020, 2021, 2022]
    }

    years.forEach(function (item) {
        data.forEach(function (dataPoint) {
            let yr = dataPoint['year'];
            let q = dataPoint['quarter'];
            if (yr.includes(item) && Q.includes(q)) {
                series_csv.push({
                    'x': yr + ' ' + dataPoint['quarter'],
                    'y': dataPoint[param]
                })
            }
        });

    });

    // years.map((year) => {
    //     data.map((dp) => {
    //         series_csv.push({
    //             'x': year + ' ' + dp['quarter'],
    //             'y': dp[param]
    //         })
    //     })
    // })

    // console.log(series_csv)
    return series_csv
}

// Chart_2 data
async function denv_year(param, year) {
    let data = await CSV_year_view(serology, param, year);
    let denv_series = []

    for (let n of data) {
        denv_series.push(n['y'])
    }
    return denv_series
}

async function denv_q(year, quarter) {

    let data1 = await CSV_q_view(serology, 'denv_1', year, quarter);
    let data2 = await CSV_q_view(serology, 'denv_2', year, quarter);
    let data3 = await CSV_q_view(serology, 'denv_3', year, quarter);
    let data4 = await CSV_q_view(serology, 'denv_4', year, quarter);

    let denv_series = []

    for (let n of data1) {
        denv_series.push(parseFloat(n['y']))
    }

    for (let n of data2) {
        denv_series.push(parseFloat(n['y']))
    }

    for (let n of data3) {
        denv_series.push(parseFloat(n['y']))
    }
    for (let n of data4) {
        denv_series.push(parseFloat(n['y']))
    }

    // denv_series = denv_series.toString()
    // console.log(denv_series)
    return denv_series
}

// Chart_Map data
async function map(year, param) {
    let data = await load_CSV(habitats);
    let series_csv = []
    let total = 0
    let cases = 0
    let years = year

    if (years == 'all') {
        years = [2018, 2019, 2020, 2021, 2022]
    }

    let Data = data.filter(function (dataPoint) {
        return dataPoint.habitat == param
    });

    years.forEach(function (item) {
        Data.forEach(function (dataPoint) {
            if (dataPoint.year == item) {
                cases = parseInt(dataPoint.points)
                total = total + cases
            }
        })
    });

    series_csv.push(
        {
            'x': param,
            'y': total
        }
    )

    total = 0
    return series_csv
}

// Chart_3 data start

async function transformData_3_yearView(year) {
    let data = await loadData(rainyPath);
    data = data.result.records
    series = []
    let days = 0
    let total = 0
    let years = [year]

    if (years == 'all') {
        years = [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022]
    } else if (years == 'half') {
        years = [2018, 2019, 2020, 2021, 2022]
    }

    years.forEach(function (item) {
        data.forEach(function (dataPoint) {
            let yr = dataPoint.month;
            if (yr.includes(item)) {
                days = parseInt(dataPoint['no_of_rainy_days']);
                total = total + days;
            }
        });
        series.push({
            'x': item,
            'y': parseInt(total)
        })
        total = 0;
    });
    // console.log(series)
    return series
}

// Chart_sync data start

// Chart_sync1
async function transformData_rain_year() {

    let data = await loadData(rainyPath);
    data = data.result.records
    // console.log(data)

    let years = {
        "2018": [],
        "2019": [],
        "2020": [],
        "2021": [],
        "2022": []
    };

    for (let dataPoint of data) {
        let date = dataPoint.month;

        for (let yearNum in years) {
            if (date.includes(yearNum)) {
                years[yearNum].push(dataPoint)
            }
        }
    };
    // console.log(years)
    return years
}

async function transformData_rain_yearView() {
    let data = await transformData_rain_year();
    let cases = 0;
    let total = 0;
    let series_sync = []

    // extract each month from the `months` object

    for (let key of Object.keys(data)) {
        for (n of data[key]) {
            // console.log(n)
            cases = parseInt(n['no_of_rainy_days']);
            total = total + cases
        };

        series_sync.push({
            'x': parseInt(key),
            'y': total
        })

        total = 0;
    }
    // console.log(series_sync)
    return series_sync
}
// Chart_sync2

async function transformData_rain_q(year, quarter) {
    let data = await loadData(rainyPath);
    data = data.result.records
    let series = []
    let series_q = []
    let years = year
    let Q = quarter

    if (Q == 'all') {
        Q = ['Q1', 'Q2', 'Q3', 'Q4']
    }

    if (years == 'all') {
        years = [2018, 2019, 2020, 2021, 2022]
    }

    years.forEach(function (item) {
        data.forEach(function (dataPoint) {
            let date = dataPoint['month'];
            let yr = date.slice(0, 4)
            let q = date.slice(-2);
            q = q.toString()
            if (date.includes(item) && (q == '01' || q == '02' || q == '03')) {
                series.push({
                    'x': yr + ' ' + 'Q1',
                    'y': dataPoint['no_of_rainy_days']
                })
            }
            else if (date.includes(item) && (q == '04' || q == '05' || q == '06')) {
                series.push({
                    'x': yr + ' ' + 'Q2',
                    'y': dataPoint['no_of_rainy_days']
                })
            }
            else if (date.includes(item) && (q == '07' || q == '08' || q == '09')) {
                series.push({
                    'x': yr + ' ' + 'Q3',
                    'y': dataPoint['no_of_rainy_days']
                })
            }
            else if (date.includes(item) && (q == '10' || q == '11' || q == '12')) {
                series.push({
                    'x': yr + ' ' + 'Q4',
                    'y': dataPoint['no_of_rainy_days']
                })
            }
        });

    });

    async function rain_q(y, q) {
        let days = 0

        let sum = series.filter(function (dataPoint) {
            return dataPoint.x == y + ' ' + q;
        });

        sum.forEach(function (item) {
            days = days + parseInt(item.y)
        })

        series_q.push(
            {
                'x': y + ' ' + q,
                'y': days
            }
        )

    }

    years.forEach(function (year) {
        Q.forEach(function (qt) {
            rain_q(year, qt)
        })
    })


    console.log(series_q)
    return series_q
}

// Chart_sync3

// Chart_sync4


// Empty Chart_1
const options_1 = {
    series: [{
        name: 'Dengue',
        type: 'area',
        data: []
    },
    {
        name: 'Degue_HF',
        type: 'column',
        data: []
    },
    ],
    chart: {
        height: '100%',
        type: 'line',
        stacked: false,
    },
    stroke: {
        width: [4, 1, 4],
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

        },
    ],
    tooltip: {
        shared: true,
        intersect: false,
        y: {
            formatter: function (val) {
                return val + ' cases'
            }
        }
    },
    theme: {
        palette: 'palette6'
    },

};

const chart_1 = new ApexCharts(
    document.querySelector("#chart_1"),
    options_1
);
chart_1.render();

// Empty Chart_2A
const options_2A = {
    series: [{
        name: 'DENV_1',
        data: []
    }, {
        name: 'DENV_2',
        data: []
    }, {
        name: 'DENV_3',
        data: []
    }, {
        name: 'DENV_4',
        data: []
    }],
    noData: {
        "text": "Loading..."
    },
    chart: {
        type: 'bar',
        height: '100%',
        stacked: true,
        stackType: '100%'
    },
    plotOptions: {
        bar: {
            horizontal: true,
        },
    },
    stroke: {
        width: 1,
        colors: ['#fff']
    },
    title: {
        text: ''
    },
    xaxis: {
        categories: [2018, 2019, 2020, 2021, 2022]
    },
    tooltip: {
        y: {
            formatter: function (val) {
                return val + ' cases'
            }
        }
    },
    fill: {
        opacity: 1

    },
    legend: {
        position: 'top',
        horizontalAlign: 'left',
        offsetX: 40
    },
    theme: {
        palette: 'palette1' // upto palette10
    }
};

const chart_2A = new ApexCharts(
    document.querySelector("#chart_2A"),
    options_2A
);
chart_2A.render();

// Empty Chart_3
const options_3 = {
    series: [{
        name: 'Dengue Fever',
        type: 'column',
        data: []
    }, {
        name: 'Dengue Haemorrhagic Fever',
        type: 'column',
        data: []
    }, {
        name: 'Deaths',
        type: 'line',
        data: [],
    }],
    chart: {
        height: 350,
        type: 'line',
        stacked: false,
        height: '100%',
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        width: [1, 1, 4]
    },
    xaxis: {
        categories: [],
    },
    yaxis: [
        {
            axisTicks: {
                show: true,
            },
            axisBorder: {
                show: true,
                color: '#008FFB'
            },
            labels: {
                style: {
                    colors: '#008FFB',
                }
            },
            title: {
                text: "Dengue Fever",
                style: {
                    color: '#008FFB',
                }
            },
            tooltip: {
                enabled: true
            }
        },
        {
            seriesName: 'Income',
            opposite: true,
            axisTicks: {
                show: true,
            },
            axisBorder: {
                show: true,
                color: '#00E396'
            },
            labels: {
                style: {
                    colors: '#00E396',
                }
            },
            title: {
                text: "Dengue Haemorrhagic Fever",
                style: {
                    color: '#00E396',
                }
            },
        },
        {
            seriesName: 'Revenue',
            opposite: true,
            axisTicks: {
                show: true,
            },
            axisBorder: {
                show: true,
                color: '#FEB019'
            },
            labels: {
                style: {
                    colors: '#FEB019',
                },
            },
            title: {
                text: "Deaths",
                style: {
                    color: '#FEB019',
                }
            }
        },
    ],
    tooltip: {
        fixed: {
            enabled: true,
            position: 'topLeft',
            offsetY: 30,
            offsetX: 60
        },
    },
    legend: {
        horizontalAlign: 'left',
        offsetX: 40
    }
};

const chart_3 = new ApexCharts(
    document.querySelector("#chart_3"),
    options_3
);
chart_3.render();

// Empty tree map

const options_map = {
    series: [
        {
            data: [
                {
                    x: '1',
                    y: 0
                },
                {
                    x: '2',
                    y: 0
                },
                {
                    x: '3',
                    y: 0
                },
                {
                    x: '4',
                    y: 0
                },
                {
                    x: '5',
                    y: 0
                },
                {
                    x: '6',
                    y: 0
                },
                {
                    x: '7',
                    y: 0
                },
                {
                    x: '8',
                    y: 0
                },
                {
                    x: '9',
                    y: 0
                },
                {
                    x: '10',
                    y: 0
                },
                {
                    x: '11',
                    y: 0
                },
                {
                    x: '12',
                    y: 0
                },
                {
                    x: '13',
                    y: 0
                },
                {
                    x: '14',
                    y: 0
                }
            ]
        }
    ],
    legend: {
        show: false
    },
    chart: {
        height: '100%',
        width: '100%',
        type: 'treemap',
        toolbar: {
            show: false,
            offsetX: 0,
            offsetY: 0,
        },
    },
    dataLabels: {
        enabled: true,
        style: {
            fontSize: '12px',
        },
        formatter: function (text, op) {
            return [text, op.value]
        },
        offsetY: -4
    },
    plotOptions: {
        treemap: {
            enableShades: true,
            shadeIntensity: 0.5,
            reverseNegativeShade: true,
            colorScale: {
                ranges: [
                    {
                        from: -6,
                        to: 0,
                        color: '#CD363A'
                    },
                    {
                        from: 0.001,
                        to: 6,
                        color: '#52B12C'
                    }
                ]
            }
        }
    }
};

const chart_map = new ApexCharts(
    document.querySelector("#chart_map"),
    options_map
);
chart_map.render();

// Empty Chart_4
const options_4 = {
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
        type: 'solid',
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
const chart_4 = new ApexCharts(
    document.querySelector("#chart_4"),
    options_4
);
chart_4.render();

// Sync charts
const options_sync1 = {

    chart: {
        id: 'sync_1',
        group: 'sync',
        type: "area",
        height: "180"
    },
    series: [],
    noData: {
        "text": "Loading..."
    },
    yaxis: {
        labels: {
            minWidth: 40
        }
    }
}

const chart_sync1 = new ApexCharts(
    document.querySelector("#sync1"),
    options_sync1
);
chart_sync1.render();

const options_sync2 = {

    chart: {
        id: 'sync_2',
        group: 'sync',
        type: "line",
        height: "180"
    },
    series: [],
    noData: {
        "text": "Loading..."
    },
    yaxis: {
        labels: {
            minWidth: 40
        }
    }
}

const chart_sync2 = new ApexCharts(
    document.querySelector("#sync2"),
    options_sync2
);
chart_sync2.render();

const options_sync3 = {

    chart: {
        id: 'sync_3',
        group: 'sync',
        type: "line",
        height: "180"
    },
    series: [],
    noData: {
        "text": "Loading..."
    },
    yaxis: {
        labels: {
            minWidth: 40
        }
    }
}

const chart_sync3 = new ApexCharts(
    document.querySelector("#sync3"),
    options_sync3
);
chart_sync3.render();

const options_sync4 = {

    chart: {
        id: 'sync_4',
        group: 'sync',
        type: "line",
        height: "180"
    },
    series: [],
    noData: {
        "text": "Loading..."
    },
    yaxis: {
        labels: {
            minWidth: 40
        }
    }
}

const chart_sync4 = new ApexCharts(
    document.querySelector("#sync4"),
    options_sync4
);
chart_sync4.render();


// Sync charts end

// Charts series update

// Chart_1 update
window.addEventListener("DOMContentLoaded", async function () {

    let data_rain = await transformData_3_yearView()
    let data_week = await transformData_1();
    let data_year = await transformData_1_yearView();
    let data_week_hf = await transformData_1_hf();
    let data_year_hf = await transformData_1_yearView_hf();
    let yearRange = document.getElementById('yearRange')
    let year_label = document.getElementById('year_label')
    let clear_btn = document.getElementById('clear_1')
    let clear_btn_year = document.getElementById('clear_1_year')
    let week_btn = document.getElementById('weekView')
    let year_btn = document.getElementById('yearView')

    let dengue_btn = document.getElementById('dengue');
    let dengueHF_btn = document.getElementById('dengue_HF');

    async function checkbox_dengue(data1, data2) {

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
                },
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
                },
            ]);
            chart_1.updateSeries([
                {
                    "name": "Dengue",
                    "data": []
                },
                {
                    "name": "Dengue_HF",
                    "data": data2
                },
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
                },
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
                },
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
window.addEventListener("DOMContentLoaded", async function () {

    let data1 = await denv_year('denv_1_cases', 'all')
    let data2 = await denv_year('denv_2_cases', 'all')
    let data3 = await denv_year('denv_3_cases', 'all')
    let data4 = await denv_year('denv_4_cases', 'all')



    chart_2A.updateSeries([
        {
            "name": "DENV_1",
            "data": data1,
        },
        {
            "name": "DENV_2",
            "data": data2
        },
        {
            "name": "DENV_3",
            "data": data3
        },
        {
            "name": "DENV_4",
            "data": data4
        },
    ]);
})

// Chart_2B Update
window.addEventListener("DOMContentLoaded", async function () {
    let data1 = await denv_q([2018], ['Q1'])

    async function draw_pie(data) {
        const options_2B = {
            series: data,
            noData: {
                "text": "Loading..."
            },
            chart: {
                type: 'pie',
                height: '100%',
                width: '100%'
            },
            labels: ['DENV_1', 'DENV_2', 'DENV_3', 'DENV_4'],
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val + '%'
                    }
                }
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: '100%',
                        height: '100%'
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        };

        const chart_2B = new ApexCharts(
            document.querySelector("#chart_2B"),
            options_2B
        );
        chart_2B.render();
    }

    draw_pie(data1)

})

// Chart_3A/3B
window.addEventListener("DOMContentLoaded", async function () {
    // let data1 = await CSV_year_view(quarterlyPath, 'dengue', 'all')
    // let data2 = await CSV_year_view(quarterlyPath, 'dengue_hf', 'all')
    // let data3 = await CSV_year_view(quarterlyPath, 'deaths', 'all')
    let data4 = await CSV_q_view(quarterlyPath, 'dengue', 'all', 'all')
    let data5 = await CSV_q_view(quarterlyPath, 'dengue_hf', 'all', 'all')
    let data6 = await CSV_q_view(quarterlyPath, 'deaths', 'all', 'all')

    chart_3.updateSeries([
        {
            "name": "Dengue",
            "data": data4
        },
        {
            "name": "Dengue HF",
            "data": data5
        },
        {
            "name": "Deaths",
            "data": data6
        },
    ]);
})

// Chart_map update
window.addEventListener("DOMContentLoaded", async function () {

    let data1 = await map('all', 'Bins (Litter/Refuse/Bulk)')
    let data2 = await map('all', 'Canvas/Plastic Sheet')
    let data3 = await map('all', 'Covered Drains')
    let data4 = await map('all', 'Discarded Receptacles')
    let data5 = await map('all', 'Domestic Containers')
    let data6 = await map('all', 'Fountains')
    let data7 = await map('all', 'Gully Traps')
    let data8 = await map('all', 'Inspection Chambers')
    let data9 = await map('all', 'Open Drains')
    let data10 = await map('all', 'Ornamental Containers')
    let data11 = await map('all', 'Plant Pots/Dish/Trays')
    let data12 = await map('all', 'Plants (Hardened soil and plant axils)')
    let data13 = await map('all', 'Toilet Bowls/Cisterns')
    let data14 = await map('all', 'Water Fountains')


    let data_list = [
        'Bins (Litter/Refuse/Bulk)',
        'Canvas/Plastic Sheet',
        'Covered Drains',
        'Discarded Receptacles',
        'Domestic Containers',
        'Fountains',
        'Gully Traps',
        'Inspection Chambers',
        'Open Drains',
        'Ornamental Containers',
        'Plant Pots/Dish/Trays',
        'Plants (Hardened soil and plant axils)',
        'Toilet Bowls/Cisterns',
        'Water Fountains']


    chart_map.updateSeries([
        {
            "name": 'Bins(Litter / Refuse / Bulk)',
            "data": data1
        },
        {
            "name": "Canvas/Plastic Sheet",
            "data": data2
        },
        {
            "name": "Covered Drains",
            "data": data3
        },
        {
            "name": "Discarded Receptacles",
            "data": data4
        },
        {
            "name": "Domestic Containers",
            "data": data5
        },
        {
            "name": "Fountains",
            "data": data6
        },
        {
            "name": "Gully Traps",
            "data": data7
        },
        {
            "name": "Inspection Chambers",
            "data": data8
        },
        {
            "name": "Open Drains",
            "data": data9
        },
        {
            "name": "Ornamental Containers",
            "data": data10
        },
        {
            "name": "Plant Pots/Dish/Trays",
            "data": data11
        },
        {
            "name": "Plants (Hardened soil and plant axils)",
            "data": data12
        },
        {
            "name": "Toilet Bowls/Cisterns",
            "data": data13
        },
        {
            "name": "Water Fountains",
            "data": data14
        },
    ]);
})



// Chart_5 update
window.addEventListener("DOMContentLoaded", async function () {
    let series_A = await transformData_3_yearView('all');
    let series_B = await transformData_1_yearView()
    chart_4.updateSeries([
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

// Chart_sync update
window.addEventListener("DOMContentLoaded", async function () {
    let data1 = await transformData_rain_q('all', 'all')
    // let data1 = await transformData_3_yearView('half');
    let data2 = await CSV_q_view(quarterlyPath, 'clusters', 'all', 'all')
    let data3 = await CSV_q_view(quarterlyPath, 'habitats', 'all', 'all')
    let data4 = await CSV_q_view(quarterlyPath, 'total_cases', 'all', 'all')

    chart_sync1.updateSeries([
        {
            "name": "Number of Rainy days",
            "data": data1
        },
    ]);

    chart_sync2.updateSeries([
        {
            "name": "Number of Active Clusters",
            "data": data2
        },
    ]);

    chart_sync3.updateSeries([
        {
            "name": "Number of Breeding Habitats",
            "data": data3
        },
    ]);

    chart_sync4.updateSeries([
        {
            "name": "Number of Dengue Cases",
            "data": data4
        },
    ]);
})