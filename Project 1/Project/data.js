// // Data paths
// const weeklyPath = "https://data.gov.sg/api/action/datastore_search?resource_id=ef7e44f1-9b14-4680-a60a-37d2c9dda390&limit=20070" // Weekly infectious disease records

// // Weekly data
// async function loadData() {
//     const response = await axios.get(weeklyPath);
//     return response.data.result.records
// }

// console.log(loadData())

// async function transformData() {

//     // Store promise results in variable
//     let data = await loadData();
//     console.log(Array.isArray(data)); //check if it is array
//     console.log(data)

//     // Filter only Dengue cases
//     let filteredData = data.filter(function (dataPoint) {
//         return dataPoint.disease == "Dengue Fever";

//     }); console.log(filteredData);

//     // Map the data
//     let mappedData = filteredData.map(function(dataPoint){
//         return {
//             "E-Week": dataPoint.epi_week,
//             "Number_of_Cases": dataPoint
//         }
//     }); console.log(mappedData);

// }

// transformData()




async function loadData() {
    const response = await axios.get("D:\Documents\Learning\DWA 2023\Project_1\Project-1\Project 1\Data\weekly-infectious-disease-bulletin-cases\result.json");
    console.log(response.data);
    return response.data
}

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
            "E-Week": dataPoint.epi_week,
            "Number_of_Cases": dataPoint.no._of_cases
        }
    }); console.log(mappedData);

}

transformData()

