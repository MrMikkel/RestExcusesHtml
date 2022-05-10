// URL defineres
const fakebaseUrl = "https://excuser.herokuapp.com/v1/excuse/100"
const baseUrl = "https://restexcuses.azurewebsites.net/api/Excuse"
const baseMovementUrl = "https://restexcuses.azurewebsites.net/api/Movement" // egen movement REST-API
const familyUrl = "https://excuser.herokuapp.com/v1/excuse/family/" //Familie API
const partyUrl = "https://excuser.herokuapp.com/v1/excuse/party/" //party API
const collegeUrl = "https://excuser.herokuapp.com/v1/excuse/college" //College API
const workUrl = "https://excuser.herokuapp.com/v1/excuse/office" //work API

const localUrl = "https://localhost:44326/api/Excuse"

// app oprettes
const app = Vue.createApp({
    data() { // appens værdier defineres
        return {
            excuses: [], // tomt array med plads til alverdens undskyldninger
            randomExcuse:"",
            currentMovement: "test", // string 
            currentCategory: "", // string fra den 5 forskellige kategorier
            check: null, // tjekker for hvis den er tom
            newExcuse: {id:0, excuse:""}, // variabel opret ny unskyldning 
            postMessage: "",
            pageSwitch: true, //bestemmer hvilken side vises
            excuseToUpdate: {id:null, excuse:""}, // den undskyldning der skal opdateres, gemmes her             
            putMessage: "",
        }
    },
    created() { // Livcyklus-metoder, der står inde i created(), 
        //bliver kaldt ved appens "fødsel", aka start, når programmet starter køre metoden
        this.senseMovement()
    },
    methods: {
        getAllSelfGeneratedExcuses() { // GET-metode til at hente alle selvoprettede undskyldninger
            this.getAllSelfGeneratedExcusesHelper(baseUrl)
        },
        async getAllSelfGeneratedExcusesHelper(url) { // helper-metode til at hente alle selvoprettede undskyldninger
            try { // fejlhåndtering
                const result = await axios.get(url) // axios laver http-request(get) til REST-service
                this.excuses = result.data // array bliver fyldt med data
                console.log(this.excuses) // udskrift til konsollen
            } catch (ex) { // exception 
                alert(ex.message) // fejlmeddelelse i tilfælde af at noget gik galt
            }
        },
        async getRandomNewExcusesHelper(url) { // helper-metode til at hente alle selvoprettede undskyldninger
            try { // fejlhåndtering
                const result = await axios.get(url) // axios laver http-request(get) til REST-service
                if(result == null){
                    this.randomExcuse = ""
                }
                this.randomExcuse = result.data // array bliver fyldt med data
                console.log(this.randomExcuse) // udskrift til konsollen
            } catch (ex) { // exception 
                alert(ex.message) // fejlmeddelelse i tilfælde af at noget gik galt
            }
        },
        async postSelfGeneratedExcuses(){//opret metoden
            try{
                const result = await axios.post(baseUrl, this.newExcuse) // axios laver http-request(post) til REST-service
                this.postMessage= "Response: " + result.status + " " + result.statusText //post message updateres
                this.getAllSelfGeneratedExcuses() // henter listen igen
            } catch(ex){ // exception 
                alert(ex.message) // fejlmeddelelse i tilfælde af at noget gik galt
            }
        },
        async senseMovement() { //hvis der rykkes på pien så senseMovment modtager bevægelser
            oldTimestamp = "" // den sidste bevægelse i pien og det sidste data i databasen
            while (true) { //Loop der fortsætter hvis den er true ellers stopper den  
                            // while løkken går i gennem en kodeblok, så længe en specificeret betingelse er sandt  
                try { //fejlhåndtering
                    const result = await axios.get(baseMovementUrl) // axios laver http-request til REST-service
                    if (!(result.data.timeStamp === oldTimestamp)) { //den ikke tage den samme timestamp 2 gang
                        this.currentMovement = result.data // string bliver fyldt med data
                        console.log(this.currentMovement) //udskrift til konsollen
                        this.getRandomExcuseHelper() // kalder på metoden getRandomExcuseHelper()
                        oldTimestamp = this.currentMovement.timeStamp // den sidste timestamp = den nuværende timestamp
                        await this.sleep(1000) // sleep i 1000 ms
                    }
                }
                catch (ex) { // Catch-sætningen definerer en kodeblok til at håndtere enhver fejl.
                    alert(ex.message) // meddeler fejlmelding 
                }
            }
        },
        
        getRandomExcuseHelper() { //get-metode til at hente alle randome undskyldninger fra kategorier 
            //oversætter bevæg. til kategori
            if (this.currentMovement.movement == "right") { //hvis pien går til højre får den en undskyldning fra familie kategorien 
                this.getRandomNewExcusesHelper(familyUrl)
            }
            else if (this.currentMovement.movement == "left") { //hvis pien går til venstre får den en undskyldning fra arbejde kategorien
                this.getRandomNewExcusesHelper(workUrl)
            }
            else if (this.currentMovement.movement == "front") { //hvis pien går til frem får den en undskyldning fra skole kategorien
                this.getRandomNewExcusesHelper(collegeUrl)
            }
            else if (this.currentMovement.movement == "back") { //hvis pien går til tilbage får den en undskyldning fra fest kategorien
                this.getRandomNewExcusesHelper(partyUrl)
            }
            else if (this.currentMovement.movement == "shake") { //hvis pien rystes får man en selv lavet undskyldning
                this.getRandomNewExcusesHelper(baseUrl+"/random")
            }
            else{
                this.randomExcuse=""
            }
        },
        // snuppet fra https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
        sleep(ms) { // hjemmelavet metode sleep har en dvalefunktion, der vil forsinke et programs udførelse i et givet antal sekunder
            return new Promise(resolve => setTimeout(resolve, ms)); // et løfte som er ikke f
        },
        switchToList(){
            this.pageSwitch = false
            this.getAllSelfGeneratedExcuses()
        },
        switchTo8ball(){
            this.pageSwitch = true
        },
        async updateExcuse(){
            try{
                const result = await axios.put(baseUrl, this.excuseToUpdate) // axios laver http-request(put) til REST-service
                this.putMessage= "Response: " + result.status + " " + result.statusText //post message updateres
                this.getAllSelfGeneratedExcuses() // henter listen igen
            } catch(ex){ // exception 
                alert(ex.message) // fejlmeddelelse i tilfælde af at noget gik galt
            }
        },
        async deleteExcuse(id){
            try{
                const result = await axios.delete(baseUrl+"/"+id) // axios laver http-request(Delete) til REST-service
                this.putMessage= "Response: " + result.status + " " + result.statusText //post message updateres
                this.getAllSelfGeneratedExcuses() // henter listen igen
            } catch(ex){ // exception 
                alert(ex.message) // fejlmeddelelse i tilfælde af at noget gik galt
            }
        },
        
    }
}).mount("#app") // appen bliver mounted