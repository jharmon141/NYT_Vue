<template>
    <div class="Box">
        <div class="tabs is-right">
            <ul>
                <li class="is-active"><a>Results</a></li>
                <router-link to="/search" tag="li" active-class="active" exact><a>Search</a></router-link>
                <router-link to="/saved" tag="li" active-class="active" exact><a>Saved Articles</a></router-link>
                <li><a>Log Out</a></li>
            </ul>
        </div>

        <h3 class="title is-3">Results</h3>

        <div v-for="result in results"  class="columns">
            <div class="column is-three-quarters">
                <span class="title is-4">{{result.headline.main}}</span >
                <p>Date Published: {{result.pub_date}}</p>
            </div>
            <div class="column auto">
                    <button v-on:click="save(result)" class="button is-primary">Save</button>
                    <a v-bind:href="result.web_url" target="_blank"><button class="button">View Article</button></a>
            </div>

        </div>
    </div>

</template>

<script>
import gql from 'graphql-tag'
import { mapState } from 'vuex'

export default {

    props: {
        results: {},
        loading: 0,
    },


    methods: {
        save(item) {
            this.$parent.save(item)
        }
    }
}


    </script>

    <style>

    .is-three-quarters {
        text-align: start;
    }

    .title.is-3 {
        margin-bottom: 50px;
    }

    p {
        text-align: start;
    }

    </style>
