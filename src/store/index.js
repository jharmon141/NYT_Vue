import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        results: []
    },

    mutations: {
        setResults: (state, newResults) => {
            state.results = newResults
        }
    },

    actions: {
        runQuery: ({state, commit}, searchParams) => {

            let queryURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=60ef363d30eb4fc79c853a9acb3cc5b6&q=${searchParams.topic}&begin_date=${searchParams.start}0101&end_date=${searchParams.end}0101`

            return axios.get(queryURL).then((response) => {
                let dataResponse = []

                for (let i = 0; i < 5; i++) {
                    dataResponse.push(response.data.response.docs[i])
                }

                console.log(dataResponse)

                commit('setResults', dataResponse)

            })
        }
    }

})

export default store
