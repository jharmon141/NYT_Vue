<template>
    <div>
        <div id="search" class="Box">

            <div class="tabs is-right">
                <ul>
                    <router-link v-if="searched" to="/results" tag="li" active-class="active" exact><a>Results</a></router-link>
                    <li class="is-active"><a>Search</a></li>
                    <router-link to="/saved" tag="li" active-class="active" exact><a>Saved Articles</a></router-link>
                    <li><a>Log Out</a></li>
                </ul>
            </div>

            <h3 class="title is-3">Search</h3>
            <div class="panel-body text-center">

                <h4 class="title is-4">
                    Topic
                </h4>

                <input v-model="topic">
                <h4 class="title is-4">
                    Start Year (YYYY)
                </h4>
                <input v-model="start">

                <h4 class="title is-4">
                    End Year (YYYY)
                </h4>
                <input v-model="end">

                <br />

                <button class="button is-primary is-outlined" @click="handleSearch">Submit</button>

            </div>

        </div>

    </div>

</template>

<script>

export default {

    data: () => ({
        topic: '',
        start: '',
        end: ''
    }),

    props: {
        searched: Boolean,
    },

    methods: {

        handleSearch() {

            let queryParams = {}

            queryParams.topic = this.topic 
            queryParams.start = this.start
            queryParams.end = this.end

            this.$parent.runQuery(queryParams)
        }

    }

}


    </script>

    <style>
    .Box {
        text-align: center;
        margin-bottom: 90px;
    }

    input {
        margin-bottom: 25px;
        height: 30px;
        width: 33%;
        font-size: 18px;
        text-align: center;
    }

    </style>
