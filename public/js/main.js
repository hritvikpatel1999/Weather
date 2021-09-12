
const cityName = document.getElementById('cityName');
const submitBtn = document.getElementById('submitBtn');
const city_name = document.getElementById('city_name');
const temp_real_val = document.getElementById('temp_real_val');
const temp_status = document.getElementById('temp_status');

const datahide = document.querySelector('.middle_layer');

const getInfo = async(event) =>{
    event.preventDefault();
    // alert('hii');
    // let url = `api.openweathermap.org/data/2.5/weather?q=pune&units=metric&appid=b999ec72ad33f81c1c40c18fa152ac81`;
    let cityVal = cityName.value;
    
    if(cityVal === ""){
        city_name.innerText = `Please enter a city`;
        datahide.classList.add('data_hide');
    }
    else{
        // alert(cityVal);
        try {
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=b999ec72ad33f81c1c40c18fa152ac81`;
            const response = await fetch(url);
            const data = await response.json();
            // console.log(data);
            const arrData = [data];
            temp_real_val.innerText = arrData[0].main.temp;
            // temp_status.innerText = arrData[0].weather[0].main;
            // console.log(typeof(arrData[0].weather));
            // const arr = await response.json();
            // console.log(arr);
            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;

            const tempMood = arrData[0].weather[0].main;

            if(tempMood == "Clear") {
                temp_status.innerHTML = "<i class='fas fa-sun' style='color: #eccc68;'></i>";
            } else if (tempMood == "Clouds") {
                temp_status.innerHTML = "<i class='fas fa-cloud' style='color: #f1f2f6;'></i>";
            } else if (tempMood == "Rain") {
                temp_status.innerHTML = "<i class='fas fa-cloud-rain' style='color: #a4b0be;'></i>";
            } else {
                temp_status.innerHTML = "<i class='fas fa-smog' style='color: grey;'></i>";
            }

            datahide.classList.remove('data_hide');
        }catch{
            city_name.innerText = `Please enter correct city`;
            datahide.classList.add('data_hide');
        }
        
    }

} 

submitBtn.addEventListener('click', getInfo);