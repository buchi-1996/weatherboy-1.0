class Cities {
    constructor() {
        this.api = 'https://restcountries.eu/rest/v2/all'
    }

    async getCities() {
        const response = await fetch(this.api);
        const resData = await response.json();
        const data = resData.map(x => {
            return {
                city: x.capital,
                flag: x.flag
            }
        })
        console.log(data);
        return data;
    }

    
}

const myCity = new Cities();
export default myCity;