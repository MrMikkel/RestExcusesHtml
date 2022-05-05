// URL defineres
const fakebaseUrl="https://excuser.herokuapp.com/v1/excuse/100" // tredjeparts-API
const baseUrl="https://restexcuses.azurewebsites.net/api/Excuse" // egen REST-API
// app oprettes
const app = Vue.createApp({
    data(){ // appens værdier defineres
        return{
            excuses:[] // tomt array med plads til alverdens undskyldninger
        }
    },
    methods: {
        getAllSelfGeneratedExcuses(){ // GET-metode til at hente alle selvoprettede undskyldninger
            this.getAllSelfGeneratedExcusesHelper(baseUrl)
        },
        async getAllSelfGeneratedExcusesHelper(url){ // helper-metode til at hente alle selvoprettede undskyldninger
            try { // fejlhåndtering
                const result = await axios.get(url) // axios laver http-request til REST-service
                this.excuses = result.data // array bliver fyldt med data
                console.log(this.excuses) // udskrift til konsollen
            }catch(ex){ // exception
                alert(ex.message) // fejlmeddelelse i tilfælde af at noget gik galt
            }
        }
    }
}).mount("#app") // appen bliver mounted