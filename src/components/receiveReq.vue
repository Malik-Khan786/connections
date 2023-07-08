<template>
    <div>
        <div class="my-2 shadow  text-white bg-dark p-1" id="">
        <div>
            <table class="ms-1">
                <tr v-for="userCon in visibleUsers" :key="userCon.id" class="d-flex justify-content-between align-items-center mb-3">
      <td class="align-middle">{{ userCon.user.name}} - {{ userCon.user.email }}</td>
      
      <td  class="d-flex align-middle justify-content-end">
        
        <button id="accept_request_btn_" class="btn btn-primary me-1"
          @click="acceptingUser(userCon.user.id)">Accept</button>
    
      </td>
    </tr>
            </table>
            <button v-if="showLoadMoreButton" @click="loadMore" class="btn btn-danger">Load More</button>
            </div>
    </div>
    </div>
</template>

<script >
import axios from 'axios';
import { emitter } from "@/eventbus";
export default {
    name: 'receiveReq',
    data() {
        return {
            receivedCon:[],
            batchSize: 10,
      currentIndex: 0,
      visibleUsers: [], // Initialize as an empty array
      showLoadMoreButton: false,
        }
    },
    mounted() {
        this.receivedConnection();
    },
    methods: {
        receivedConnection(){
            let token = localStorage.getItem('user');
            axios.get('http://127.0.0.1:8000/api/receivedConnection',{
        headers: {
            Authorization: 'Bearer ' + token,}})
            .then((response) =>{
                console.log(response)
                this.receivedCon = response.data.requestingUser; 
                emitter.emit('getCounts');
                this.loadMore();
            })
        },
        loadMore() {
      const endIndex = this.currentIndex + this.batchSize;
      this.visibleUsers = [...this.visibleUsers, ...this.receivedCon.slice(this.currentIndex, endIndex)];
      this.currentIndex = endIndex;
      this.showLoadMoreButton = this.currentIndex < this.receivedCon.length;
    },
        acceptingUser(id){
            let payload = {
                id:id
            };
            let token = localStorage.getItem('user');
            axios.post('http://127.0.0.1:8000/api/acceptUser',payload,{
        headers: {
            Authorization: 'Bearer ' + token,}})
            .then((response) =>{
                console.log(response)
                this.currentIndex = 0;
                this.batchSize = 10;
                const index = this.visibleUsers.findIndex(user => user.connected_user_id === id);
                if (index !== -1) {
                    this.visibleUsers.splice(index, 1);
                }
                emitter.emit('getCounts');
                // this.receivedConnection();
            })
        }
    },
}
</script>

<style scoped>
table {
  width: 100%;
}

td {
  white-space: nowrap;
}

tr td:last-child {
  flex-shrink: 0;
}
</style>