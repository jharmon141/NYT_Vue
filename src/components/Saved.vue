<template>

    <div class="Box">
        <div class="tabs is-right">
            <ul>
                <router-link v-if="searched" to="/results" tag="li" active-class="active" exact><a>Results</a></router-link>
                <router-link to="/search" tag="li" active-class="active" exact><a>Search</a></router-link>
                <li class="is-active"><a>Saved Articles</a></li>
                <li><a>Log Out</a></li>
            </ul>
        </div>

        <h3 class="title is-3">Saved Articles</h3>

        <div v-for="article in allArticles" :key="article.id" class="columns">
            <div class="column is-three-quarters">
                    <span class="title is-4">{{article.title}}</span >
                    <p>Date Published: {{article.datePub}}</p>
            </div>
    
            <div class="column auto" >
                    <button v-on:click="remove(article)" class="button is-danger" >Delete</button>
                    <a v-bind:href="article.url" target="_blank"><button class="button">View Article</button></a>
            </div>

        </div>
    </div>

</template>

<script>

// Component def
export default {
    // Local state
    props: {
        allArticles: {},
        loading: 0,
        searched: Boolean,
    },

    methods:{

        remove(article) {
            this.$parent.delArticle(article)
        }
        
    },
}
    </script>

