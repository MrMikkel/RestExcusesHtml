const baseUrl="https://"

const app = Vue.createApp({
    data(){
        return{
            excuses:[] //tomt array

        }
    },
    methods: {
        getAllSelfGeneratedExcuses(){
            this.getAllSelfGeneratedExcusesHelper(baseUrl)
        },
        async getAllSelfGeneratedExcusesHelper(url){
            try { //fejlhåndtering
                const result = await axios.get(url)
                this.excuses = result.data
                console.log(this.excuses)
            }catch(ex){ //exception
                alert(ex.message)
            }
        }
    }
}).mount("#app")