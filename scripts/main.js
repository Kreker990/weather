const input = document.querySelector('#input')
const btn = document.querySelector('#btn')
const output = document.querySelector('#output')
const output_2 = document.querySelector('#city')
const API='http://api.openweathermap.org/data/2.5/weather?q=';
const key ='&appid=b067377a72c98ae6963cdae2e35408d9'
const url = API+input.value+key 
let city = ''
let city1 = ''
const getWeather = async(e)=>{
    e.preventDefault()
    const value = input.value
    city1 = value;
    const url = API + value + key 
    const req=await fetch(url)
    const res = await req.json()
    // return res.weather[0].main
    // console.log(Date());
    console.log(res);
    renderWeather(res)
}
// localStorage.clear()
const renderWeather = (info) => {
    console.log(info);
    let div_temp = document.createElement('div')
    let div_dav = document.createElement('div')
    let div_vid = document.createElement('div')
    let div_vlaj = document.createElement('div')
    let div_foot = document.createElement('div')
    div_dav.classList.add('box')
    div_vid.classList.add('box')
    div_vlaj.classList.add('box')
    div_temp.classList.add('box')
    div_temp.innerHTML = `Feels like <br>` + (Math.round(info.main.feels_like-273) + '°');
    div_vlaj.innerHTML = `Humidity <br>` + ((info.main.humidity) + '%');
    div_vid.innerHTML = `Visibility <br>` + ((info.visibility/1000) + 'km');
    div_dav.innerHTML = `Wind <br>deg: ${info.wind.deg} <br>speed: ${info.wind.speed} km/h`;

    div_foot.append(div_temp,div_vlaj,div_vid,div_dav)
    div_foot.style.cssText =
    `
    display:flex;
    flex-wrap: wrap;
    justify-content: space-around;
    width: 80%;
    
    // height: 200px;
    // background-color: yellow;
    `
    let h2 = document.createElement('h2')
    h2.innerHTML = info.name
    h2.style.fontSize = '45px'
    h2.style.paddingBottom = '0'
    h2.style.marginBottom = '0'
    let conteiner = document.createElement('div')
    conteiner.style.cssText =
    `
    display:flex;
    flex-direction: column;
    align-items: center;
    // background-color: yellow;
    width:80%;
    text-align; center;
    `
    let p_temp = document.createElement('p')
    let discription = document.createElement('h4')
    discription.style.cssText =
    `
    padding:0;
    margin: 0;
    `
    discription.innerHTML = info.weather[0].description
    let p_temp_max = document.createElement('p')
    let p_temp_min = document.createElement('p')
    let p_temp_vlaj = document.createElement('p')
    p_temp.innerHTML = `<img src="https://openweathermap.org/img/wn/${info.weather[0].icon}.png" alt="">`+ (Math.round(info.main.temp-273) + '°')
    p_temp.style.cssText =
    `
    // background-color: yellow;
    padding:0;
    margin: 0;
    font-size:40px;
    `
    let div_mx_mn = document.createElement('div')
    div_mx_mn.style.cssText = 
    `
    padding:0;
    margin: 0;
    // margin-left:165px;
    font-size: 14px;
    // background-color:red;
    width:40%;
    justify-content: space-around;
    display: flex;
    `
    let btn = document.createElement('button')
    btn.innerHTML = `add`
    btn.classList.add('button1')
    btn.addEventListener('click',()=>{
        localStorage.setItem(city1,city1);
        output_2.innerHTML=''
        forEachKey()
    })
    p_temp_max.innerHTML = 'max: ' + Math.round(info.main.temp_max-273) + '°'
    p_temp_min.innerHTML = 'min: ' + Math.round(info.main.temp_min-273) + '°'
    div_mx_mn.append(p_temp_max,p_temp_min)
    p_temp_vlaj.innerHTML = 'Humidity: ' + info.main.humidity
    conteiner.append(h2,p_temp,discription,div_mx_mn)
    output.append(conteiner,div_foot,btn)
}



btn.addEventListener('click',(e)=> {
    output.innerHTML = ''
    getWeather(e)

    input.value = ''
})
// let remove_city = []
let per = ''
const getWeather1 = async(per)=>{
    // e.preventDefault()
    // const value = input.value
    // city = value;
    console.log(per);
    const url = API + per + key 
    const req=await fetch(url)
    const res = await req.json()
    // return res.weather[0].main
    // console.log(Date());
    // console.log(res);
    renderWeather1(res)
}
// localStorage.clear()
const renderWeather1 = (info) => {
    console.log(info);
    let div_cards = document.createElement('div')
    div_cards.style.cssText =
    `
    display: flex;
    color: blue;
    background-color: #70f4fb;
    // background-color: #456277;
    justify-content: space-around;
    border-radius: 10px;
    margin-bottom: 20px;
    `
    let div_btn_cards = document.createElement('div')
    let add_btn_cards = document.createElement('button')
    let remove_btn_cards = document.createElement('button')
    div_btn_cards.style.cssText =
    `
    display: flex;

    `
    add_btn_cards.classList.add('button')
    remove_btn_cards.classList.add('button')
    add_btn_cards.innerHTML = `show`
    remove_btn_cards.innerHTML = `remove`
    div_btn_cards.append(add_btn_cards,remove_btn_cards)
    let h2_cards = document.createElement('h2')
    let p_cards = document.createElement('p')
    h2_cards.innerHTML = info.name
    p_cards.innerHTML = `<img src="https://openweathermap.org/img/wn/${info.weather[0].icon}.png" alt="">`+ (Math.round(info.main.temp-273) + '°')
    p_cards.style.cssText =
    `
    // background-color: yellow;
    padding:0;
    margin: 0;
    font-size:40px;
    `
    
    add_btn_cards.addEventListener('click',(e)=>{
        city = (info.name).toLowerCase()
        input.value = city
        output.innerHTML=''
        getWeather(e);
        city = ''
        input.value = ''
    })
    remove_btn_cards.addEventListener('click',()=>{
        city = (info.name).toLowerCase()
        localStorage.removeItem(city);
        output_2.innerHTML=''
        forEachKey()
        city = ''
    })

    div_cards.append(h2_cards,p_cards)
    output_2.append(div_cards,div_btn_cards)
}

function forEachKey() {
    for (var i = 0; i < localStorage.length; i++) {
        getWeather1(localStorage.key(i));
    }
}
forEachKey()
//   console.log(callback);
// clear sky
// overcast clouds
// scattered clouds
// broken clouds
// few clouds
// moderate rain
// light rain

// Clear
// Clouds
// Rain

