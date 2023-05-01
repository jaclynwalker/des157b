let globalData;

async function getData(){
    const myWater = await fetch('data/water.json'); //gets the file
    const data = await myWater.json(); //gets the json data from the file
    globalData = data;
    document.querySelector('#picker').innerHTML = createSelectList(data);
}

function createSelectList(data){
    let html = '<option>---</option>';
    //converts the main object keys into an array
    const dataPoints = Object.keys(data);
    console.log(dataPoints);
    dataPoints.forEach(function(eachPoint){
        html += `<option value="${eachPoint}">${data[eachPoint].time}</option>`
    });
    return html;
}
document.querySelector('#picker').addEventListener('change', function(){
    const newValue = this.value; //this keyword refers to the changed value
    console.log(newValue);
    updateInterface(newValue, globalData);
});

// function updateInterface(value, jsonData){
//     let html = '<p>';
//     html += `At ${jsonData[value].time} I drank ${jsonData[value].water} cups of water`
//     document.querySelector('#result').innerHTML = html;
// }
function updateInterface(value, jsonData){
    let html = '<p>';
    let waterImgs;
    if (jsonData[value].water == 1){
        html += `At ${jsonData[value].time} I drank ${jsonData[value].water} cup of water.`
    }
    else {
        html += `At ${jsonData[value].time} I drank ${jsonData[value].water} cups of water.`
    }
    if (jsonData[value].water == 0){
        waterImgs = '<img src="images/waterglass-empty.png" alt="water" width="200">';
    }
    else if (jsonData[value].water == 1){
        waterImgs = '<img src="images/waterglass.png" alt="water" width="200">';
    }
    else if (jsonData[value].water == 2){
        waterImgs = '<img src="images/waterglass.png" alt="water" width="200"><img src="images/waterglass.png" alt="water" width="200">';
    }
    else if (jsonData[value].water == 3){
        waterImgs = '<img src="images/waterglass.png" alt="water" width="200"><img src="images/waterglass.png" alt="water" width="200"><img src="images/waterglass.png" alt="water" width="200">';
    }
    document.querySelector('#result').innerHTML = html;
    document.querySelector('#images').innerHTML = waterImgs
}
getData();