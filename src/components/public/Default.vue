<template>
    
</template>
<script>
    export default{
        mounted(){
            if(this.loadStorge('token') !== undefined) {
                this.$router.push('/parkinfo');
            } else {
                this.$router.push('/login');
            }
        }
    }
</script>