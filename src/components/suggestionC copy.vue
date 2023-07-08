<template>
    <div>
        <div class="my-2 shadow text-white bg-dark p-1" id="">
  <div>
    <table class="ms-1">
      <tr v-for="(user,index) in users" :key="index" class="d-flex justify-content-between align-items-center mb-3">
        <td class="align-middle">{{ user.name }} - {{ user.email }}</td>
        
        
        <td class="d-flex align-middle justify-content-end">
            <button @click="connectingUser(user.id)" class="btn btn-primary me-1">Connect</button>
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
export default {
    name: 'suggestionC',
    data() {
        return {
            users:[],
            loadedRecords: 10,
            visibleUsers: [],
      loadMoreVisible: false,
        }
    },
    
    mounted() {
        this.getuser();
    },
    methods: {
        
        getuser(){
            let token = localStorage.getItem('user');
            axios.get('http://127.0.0.1:8000/api/allUser',{
        headers: {
            Authorization: 'Bearer ' + token,}})
            .then((response) =>{
                this.users = response.data.user;
                this.visibleUsers = this.users.slice(0, 10);
          
          this.visibleUsers = this.users.slice(0, this.loadedRecords);
  this.showLoadMoreButton = this.users.length > this.loadedRecords;
                console.log(response)
            })
        },
        loadMore() {
  const remainingRecords = this.users.length - this.visibleUsers.length;
  const nextBatch = remainingRecords >= 20 ? 20 : remainingRecords;
  const startIndex = this.visibleUsers.length;
  const endIndex = startIndex + nextBatch;
  this.visibleUsers = [...this.visibleUsers, ...this.users.slice(startIndex, endIndex)];
  this.showLoadMoreButton = remainingRecords > nextBatch;
},
       
        
        connectingUser(id){
            let payload = {
                id:id
            };
            let token = localStorage.getItem('user');
            axios.post('http://127.0.0.1:8000/api/connectedUser',payload,{
        headers: {
            Authorization: 'Bearer ' + token,}})
            .then((response) =>{
                console.log(response)
                this.getuser();
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
