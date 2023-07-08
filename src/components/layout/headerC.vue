<template>
    <div class="row justify-content-center mt-5">
  <div class="col-12">
    <div class="card shadow  text-white bg-dark">
      <div class="card-header">Coding Challenge - Network connections   <button type="submit" @click="logout()" class="btn btn-primary">Logout</button></div>
      <div class="card-body">
        <div class="btn-group w-100 mb-3" role="group" aria-label="Basic radio toggle button group">
            <!-- :class="[tab === 'suggestion' ? 'btnbluebg' : 'btntabbg']"  -->
          <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" @click="tabComponent('suggestionC')" checked>
          <label class="btn btn-outline-primary" for="btnradio1" id="get_suggestions_btn">Suggestions ({{count.suggestionUser}})</label>
          

          <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off"  @click="tabComponent('sentReq')">
          <label class="btn btn-outline-primary" for="btnradio2" id="get_sent_requests_btn">Sent Requests ({{count.sendingUser}})</label>

          <input type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off" @click="tabComponent('receiveReq')">
          <label class="btn btn-outline-primary" for="btnradio3" id="get_received_requests_btn">Received
            Requests({{count.requestingUser}})</label>

          <input type="radio" class="btn-check" name="btnradio" id="btnradio4" autocomplete="off" @click="tabComponent('connectionC')">
          <label class="btn btn-outline-primary" for="btnradio4" id="get_connections_btn">Connections ({{count.approvedUser}})</label>
        </div>
        <hr>
        <div id="content" class="d-none">
        </div>

        <span class="fw-bold">Sent Request Blade</span>
        <component v-if="nextTab"  :is="tab" />

        <!-- <span class="fw-bold">Received Request Blade</span>
        <x-request :mode="'received'" />

        <span class="fw-bold">Suggestion Blade</span>
        <x-suggestion />

        <span class="fw-bold">Connection Blade (Click on "Connections in common" to see the connections in common
          component)</span> -->
        <!-- <x-connection /> -->
<!-- 
        <div id="skeleton" class="d-none">
         ok
        </div> -->

        <!-- <span class="fw-bold">"Load more"-Button</span>
        <div class="d-flex justify-content-center mt-2 py-3 {{-- d-none --}}" id="load_more_btn_parent">
          <button class="btn btn-primary" onclick="" id="load_more_btn">Load more</button>
        </div> -->
      </div>
    </div>
  </div>
</div>

<div id="connections_in_common_skeleton" class="{{-- d-none --}}">
  <br>
  <span class="fw-bold text-white">Loading Skeletons</span>
  <div class="px-2">
   ok
  </div>
</div>

</template>

<script>
import axios from 'axios';
import {emitter} from '@/eventbus';
import suggestionC from '@/components/suggestionC.vue';
import sentReq from '@/components/sentReq.vue';
import receiveReq from '@/components/receiveReq.vue';
import connectionC from '@/components/connectionC.vue';
export default{
    name: 'headerC',
    components: {
        suggestionC,
        sentReq,
        receiveReq,
        connectionC
  },
    data() {
        return {
            tab:'suggestionC',
            count:[],
            nextTab:false
        }
    },
    mounted(){
      emitter.on('getCounts',  () =>  {
        this.getCounts()
      });
    },
    created() {
      if(!localStorage.getItem('user')){
        this.$router.push('/login')
      }
      else{
        this.getCounts();
      }
      
    },
    methods: {
      tabComponent(comp){
        this.tab = comp;
      },
      getCounts(){
            let token = localStorage.getItem('user');
            axios.get('http://127.0.0.1:8000/api/getCounts',{
        headers: {
            Authorization: 'Bearer ' + token,}})
            .then((response) =>{
                // this.users = response.data.user;
                this.nextTab=true;
                this.count = response.data;
                console.log(response)
            })
      },
      logout(){
        if(localStorage.getItem('user')){
          localStorage.removeItem('user')
            this.$router.push('/login')
        }
      }
    },
    
}
</script>