async function empty_series() {

    let data = await transformData_1();
    let empty_series = []

    // console.log(data)

    for (let i = 0; i < data.length; i++) {
        empty_series.push(
            {
                'x': data[i]['x'],
                'y': 0
            })
    // console.log(empty_series)
    } 
    
    return empty_series

}

empty_series()
