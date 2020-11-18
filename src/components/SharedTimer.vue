<template>
  <div>
      Timer {{connectionState}}
  </div>
</template>

<script>
export default {
    props: ['peer'],
    data(){
        return {
            connectionState: null
        }
    },
    methods:{
        init(){
            // create data channel????
            console.log('INIT')
        },
        disconnect(){
            console.log('disconnect')
        }
    },
    mounted(){
        /*
        STOPPED HERE
        We're missing .onStateChange() in the proxy that's forwarded from Home.vue
         */
        if (this.peer){
            console.log(this.peer);
            this.peer.onStateChange(evt=>{
                this.connectionState = evt?.target?.connectionState
                switch(evt?.target?.connectionState){
                case 'connected':
                    this.init()
                    break
                default:
                    this.disconnect()
                }
            })
            if (this.peer.connectionState === 'connected'){
                this.init()
            }
        }
    }


}
</script>

<style>

</style>