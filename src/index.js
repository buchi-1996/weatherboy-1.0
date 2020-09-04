// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
import './images/Ripple-1s-200px.gif';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)


import myWeather from './Weather';
import ui from './ui';
import myStore from './Storage';
import myCity from './cities';



class App{
    constructor(){
        this.list = document.querySelectorAll('.cities');
        this.loader = document.querySelector('#img__loader');
    }

    getCurrentWeather(){
        this.loader.style.display = 'block';
        myWeather.getWeather()
        .then(data => {
            if(data.message){
                myStore.setData('new york');
                ui.showAlert('.wrong__city', data.message);
            }else{
                ui.updateWeather(data);
            }
        })
        .catch(err => console.log(err));
    }

    getCityText(item){
        myStore.setData(item);
        myWeather.changeCity(item);
        this.getCurrentWeather();
    }

    
}

document.addEventListener('DOMContentLoaded', e => {
    const app = new App();
    ui.showDate();
    ui.populateTable();
    app.getCurrentWeather();
});

document.querySelector('.app__left').addEventListener('submit', (e) => {
    e.preventDefault();
    const app = new App();
    let myCity = document.querySelector('#search').value;
    if(myCity !== ''){
        myWeather.changeCity(myCity);
        myStore.setData(myCity);
        app.getCurrentWeather();
        document.querySelector('#search').value = '';
    }else{
        ui.showAlert('.empty__field', 'insert city name before hitting enter');
    }
});

document.querySelector('.cities').addEventListener('click', (e)=>{
    const app = new App();
    app.getCityText(e.target.textContent);
})
