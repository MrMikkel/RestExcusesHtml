// URL defineres
const fakebaseUrl = "https://excuser.herokuapp.com/v1/excuse/100"
const baseUrl = "https://restexcuses.azurewebsites.net/api/Excuse"
const baseMovementUrl = "https://restexcuses.azurewebsites.net/api/Movement" // egen movement REST-API
const familyUrl = "https://excuser.herokuapp.com/v1/excuse/family/" //Familie API
const partyUrl = "https://excuser.herokuapp.com/v1/excuse/party/" //party API
const collegeUrl = "https://excuser.herokuapp.com/v1/excuse/college" //College API
const workUrl = "https://excuser.herokuapp.com/v1/excuse/office" //work API

//const localUrl = "https://localhost:44326/api/Movement"

// app oprettes
const app = Vue.createApp({
    data() { // appens værdier defineres
        return {
            excuses: [], // tomt array med plads til alverdens undskyldninger
            currentMovement: "test", //
            currentCategory: "", //
            check: null
        }
    },
    created() {
        this.senseMovement()
    },
    methods: {
        getAllSelfGeneratedExcuses() { // GET-metode til at hente alle selvoprettede undskyldninger
            this.getAllSelfGeneratedExcusesHelper(baseUrl)
        },
        async getAllSelfGeneratedExcusesHelper(url) { // helper-metode til at hente alle selvoprettede undskyldninger
            try { // fejlhåndtering
                const result = await axios.get(url) // axios laver http-request til REST-service
                this.excuses = result.data // array bliver fyldt med data
                console.log(this.excuses) // udskrift til konsollen
            } catch (ex) { // exception
                alert(ex.message) // fejlmeddelelse i tilfælde af at noget gik galt
            }
        },
        async senseMovement() {
            oldTimestamp = ""
            while (true) {
                try { //fejlhåndtering
                    const result = await axios.get(baseMovementUrl)
                    if (!(result.data.timeStamp === oldTimestamp)) {
                        this.currentMovement = result.data
                        console.log(this.currentMovement)
                        this.getRandomExcuseHelper()
                        oldTimestamp = this.currentMovement.timeStamp
                        await this.sleep(1000)
                    }
                    
                }
                catch (ex) {
                    alert(ex.message)
                }
            }
        },
        getRandomExcuseHelper() {
            //oversætter bevæg. til kategori
            if (this.currentMovement.movement == "right") {
                this.getAllSelfGeneratedExcusesHelper(familyUrl)
            }
            if (this.currentMovement.movement == "left") {
                this.getAllSelfGeneratedExcusesHelper(workUrl)
            }
            if (this.currentMovement.movement == "front") {
                this.getAllSelfGeneratedExcusesHelper(collegeUrl)
            }
            if (this.currentMovement.movement == "back") {
                this.getAllSelfGeneratedExcusesHelper(partyUrl)
            }
            if (this.currentMovement.movement == "shake") {
                this.getAllSelfGeneratedExcusesHelper(baseUrl)
            }
        },
        // snuppet fra https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
        sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
    }
}).mount("#app") // appen bliver mounted