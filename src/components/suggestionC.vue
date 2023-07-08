<template>
    <div>
        <div class="my-2 shadow text-white bg-dark p-1" id="">
            <div>
                <table class="ms-1">
                    <tr v-for="(user, index) in visibleUsers" :key="index"
                        class="d-flex justify-content-between align-items-center mb-3">
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
  
<script>
import axios from 'axios';
import { emitter } from "@/eventbus";

export default {
    name: 'suggestionC',
    data() {
        return {
            users: [],
            visibleUsers: [],
            batchSize: 10,
            currentIndex: 0,
            showLoadMoreButton: false,
        };
    },

    mounted() {
        this.getUsers();
    },

    methods: {
        getUsers() {
            let token = localStorage.getItem('user');
            axios
                .get('http://127.0.0.1:8000/api/allUser', {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                })
                .then((response) => {
                    this.users = response.data.user;
                    this.loadMore();
                    emitter.emit('getCounts');
                    console.log(response);
                })
                .catch((error) => {
                    console.error(error);
                });
        },

        loadMore() {
            const endIndex = this.currentIndex + this.batchSize;
            this.visibleUsers = [...this.visibleUsers, ...this.users.slice(this.currentIndex, endIndex)];
            this.currentIndex = endIndex;
            this.showLoadMoreButton = this.currentIndex < this.users.length;
        },

        connectingUser(id) {
            console.log('id1',id)
            let payload = {
                id: id,
            };
            let token = localStorage.getItem('user');
            axios
                .post('http://127.0.0.1:8000/api/connectedUser', payload, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                })
                .then((response) => {
                    this.currentIndex = 0;
                    this.batchSize = 10;
                    const index = this.visibleUsers.findIndex(user => user.id === id);
                    console.log('id2',index)
                if (index !== -1) {
                    this.visibleUsers.splice(index, 1);
                }
                    this.getUsers();
                    emitter.emit('getCounts');
                    console.log(response);
                })
                .catch((error) => {
                    console.error(error);
                });
        },
    },
};
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
  