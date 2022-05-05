// URL defineres
const fakebaseUrl="https://excuser.herokuapp.com/v1/excuse/100" // tredjeparts-API
const baseUrl="https://restexcuses.azurewebsites.net/api/Excuse" // egen REST-API
const baseMovementUrl="https://restexcuses.azurewebsites.net/api/Movement" // egen movement REST-API
const familyUrl="https://excuser.herokuapp.com/v1/excuse/family/" //Familie API
const partyUrl="https://excuser.herokuapp.com/v1/excuse/party/" //party API
const colleageUrl="https://excuser.herokuapp.com/v1/excuse/college" //Collage API
const workUrl="https://excuser.herokuapp.com/v1/excuse/office" //work API


// app oprettes
const app = Vue.createApp({
    data(){ // appens værdier defineres
        return{
            excuses:[], // tomt array med plads til alverdens undskyldninger
            currentMovement:"",
            currentCategory:"",
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
        },
        async senseMovement(){
            try{
                const result = await axios.get(baseMovementUrl)
                this.currentMovement = result.data
                console.log(this.currentMovement)
            }
            catch(ex){
                alert(ex.message) 
            }
        },

        getRandomExcuse(category){
            this.getRandomExcuseHelper(currentMovement)

        },
        getRandomExcuseHelper(){
            //oversætter bevæg. til kategori
            this.senseMovement()
            if (this.currentMovement == "right")
            {
                this.getAllSelfGeneratedExcusesHelper(familyUrl)
            }

        },
        detectMovement(){

        },
        getAllSelfGeneratedExcuses(){

        },
    }
}).mount("#app") // appen bliver mounted