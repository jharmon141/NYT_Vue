<template>
    <div id="app">
        <section class="hero is-primary is-bold">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title is-1">
                        New York Times Article Scrubber
                    </h1>
                    <h2 class="subtitle">
                        Search and save articles of interest
                    </h2>
                </div>
            </div>
        </section>
        <section class="container">

            <transition name="fade" mode="out-in">
            <router-view :searched="searched" :results="results" :allArticles="allArticles"></router-view>
            </transition>

        </section>

    </div>
</template>

<script>
import Search from './components/Search.vue'
import Saved from './components/Saved.vue'
import Results from './components/Results.vue'
import gql from 'graphql-tag'
import axios from 'axios'

// GraphQL query
const FeedQuery = gql`
query allArticles {
    allArticles(orderBy: createdAt_DESC) {
        id
        title
        url
        datePub
    }
}
`

const deleteArticle = gql`
mutation deleteArticle($id: ID!) {
    deleteArticle(id: $id){
        id
    }
}
`

const createArticle = gql`
mutation ($title: String!, $url: String!, $datePub: String!) {
    createArticle(title: $title, url: $url, datePub: $datePub) {
        id
        title
        url
        datePub
    }
}
`

export default {
    name: 'app',
    components: {
        'search': Search,
        'saved': Saved
    },

    // Local state
    data: () => ({
        allArticles: {},
        loading: 0,
        searched: false,
        results: []
    }),

    notifications: {
      saveSuccess: {
        title: 'Success!',
        message: 'Article added to Saved Articles',
        type: 'success' //Default: 'info', also you can use VueNotifications.type.error instead of 'error'
      },
      articleDeleted: {
          title:'Deleted',
          message: 'Article remove',
          type: 'error'
      }
    },

    methods:{

       setResults(data) {

           this.results = data
           this.searched = true
           this.$router.push({ name: 'results' });

        },

        runQuery(searchParams)  {


            let queryURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=60ef363d30eb4fc79c853a9acb3cc5b6&q=${searchParams.topic}&begin_date=${searchParams.start}0101&end_date=${searchParams.end}0101`


            axios.get(queryURL).then((response) => {
                let dataResponse = []

                for (let i = 0; i < 5; i++) {
                    dataResponse.push(response.data.response.docs[i])
                }

                console.log(dataResponse)

            this.setResults(dataResponse)

            })
        },

        delArticle(item) {
            let id = item.id
            // Mutation
            this.$apollo.mutate({
                mutation: deleteArticle,
                variables: {
                    id
                },
                updateQueries: {
                    allArticles: (prev, { mutationResult }) => {
                        return {
                            allArticles: prev.allArticles.filter(( obj )=> {
                                return obj.id !== mutationResult.data.deleteArticle.id;
                            })
                        }
                    }
                }
            }).then((data) => {
                // Result
                console.log(data)
                this.articleDeleted()
            }).catch((error) => {
                // Error
                console.error(error)
            })
        },

        save(item) {
            let title = item.headline.main
            let url = item.web_url
            let datePub = item.pub_date

            // Mutation
            this.$apollo.mutate({
                mutation: createArticle,
                variables: {
                    title,
                    url,
                    datePub,
                },
                updateQueries: {
                    allArticles: (prev, { mutationResult }) => {
                        return {
                            // append at head of list because we sort the posts reverse chronological
                            allArticles: [mutationResult.data.createArticle, ...prev.allArticles],
                        }
                    },
                },
            }).then((data) => {
                // Result
                console.log(data)
                this.saveSuccess()
            }).catch((error) => {
                // Error
                console.error(error)
            })
        },

    },
    // Apollo GraphQL
    apollo: {
        allArticles: {
            query: FeedQuery,
            loadingKey: 'loading',
        },
    }

}
    </script>

    <style>

    p.level-item {
        text-align: start;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }

    .hero {
        margin-bottom: 75px;
    }

    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }

    .fade-enter-active, .fade-leave-active {
        transition: all .2s ease;
    }
    .fade-enter, .fade-leave-active {
        opacity: 0;
    }

</style>
    <style src="bulma/css/bulma.css"></style>
