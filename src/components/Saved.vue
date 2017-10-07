<template>

    <div class="Box">
        <div class="tabs is-right">
            <ul>
                <router-link 
                    to="/search" 
                    tag="li" 
                    active-class="active" 
                    exact>
                    <a>Search</a>
                </router-link>
                <router-link 
                    v-if="searched" 
                    to="/results" 
                    tag="li" 
                    active-class="active" 
                    exact>
                    <a>Results</a>
                </router-link>
                <li class="is-active">
                    <a>Saved Articles</a>
                </li>
            </ul>
        </div>

        <h3 class="title is-3">Saved Articles</h3>
        <transition-group name="slide-fade">
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
        </transition-group>
    </div>

</template>

<script>

// Component def
export default {
    // Local state
    props: {
        allArticles: Array,
        loading: Number,
        searched: Boolean,
        delArticle: Function
    },

    methods:{

        remove(article) {
            this.delArticle(article)
        }
        
    },
}
</script>

<style scoped>

/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
    transition: all .1s ease;
}

.slide-fade-leave-active {
    transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
transform: translateX(10px);
opacity: 0;
}
</style>

