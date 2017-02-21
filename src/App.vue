<template>
    <div id='app'>
        <router-view></router-view>
    </div>
</template>
<script>
   import { mapState,mapGetters } from 'vuex'
   export default {
        computed: mapGetters([
                'userLogin'
        ])
   }
</script>
