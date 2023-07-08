<template>
  <div>
    <div class="my-2 shadow text-white bg-dark p-1">
      <div>
        <table class="ms-1">
          <tr v-for="appUser in visibleUsers" :key="appUser.id"
            class="d-flex justify-content-between align-items-center mb-3">
            <td class="align-middle">{{ appUser.user.name }} - {{ appUser.user.email }}
  <div v-if="mutualUser.length > 0 && appUser.user.id === selectedUser.id">
    <ul>
      <li v-for="connection in mutualUser" :key="connection.id">
        {{ connection.name }} - {{ connection.email }}
      </li>
    </ul>
  </div>
</td>
            
            <td class="d-flex align-middle justify-content-end">
              <button style="width: 240px" class="btn btn-primary" type="button"
                :disabled="getMutualConnectionsCount(appUser.user.id) === 0" @click="mutual(appUser.user)">
                Connections in common ({{ getMutualConnectionsCount(appUser.user.id) }})
              </button>

              <button class="btn btn-danger me-1" @click="destroy(appUser.connected_user_id)">
                Remove Connection
              </button>
            </td>
          </tr>
        </table>
        <!-- <div v-if="mutualUser.length > 0">
        
        <ul>
          <li v-for="connection in mutualUser" :key="connection.id">
            {{ connection.name }} - {{ connection.email }}
          </li>
        </ul>
      </div> -->
        <button v-if="showLoadMoreButton" @click="loadMore" class="btn btn-danger">Load More</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { emitter } from "@/eventbus";

export default {
  name: 'connectionC',
  data() {
    return {
      userapproved: [],
      mutualUser: [],
      mutualConnectionsCount: {},
      visibleUsers: [],
      batchSize: 10,
      currentIndex: 0,
      showLoadMoreButton: false,
      selectedUser: null, 
    }
  },
  mounted() {
    this.approvedConnection();
  },
  methods: {
    approvedConnection() {
      let token = localStorage.getItem('user');
      axios.get('http://127.0.0.1:8000/api/approvedConnection', {
        headers: {
          Authorization: 'Bearer ' + token,
        }
      })
        .then((response) => {
          emitter.emit('getCounts');
          console.log(response.data.mutualConnectionsCount)
          this.userapproved = response.data.approvedgUser;
          this.mutualConnectionsCount = response.data.mutualConnectionsCount;
          this.loadMore();
        })
    },
    loadMore() {
      const endIndex = this.currentIndex + this.batchSize;
      this.visibleUsers = this.userapproved.slice(0, endIndex);
      this.currentIndex = endIndex;
      this.showLoadMoreButton = this.currentIndex < this.userapproved.length;
    },
    destroy(id) {
      let payload = {
        id: id
      };
      let token = localStorage.getItem('user');
      axios.post('http://127.0.0.1:8000/api/endFriend', payload, {
        headers: {
          Authorization: 'Bearer ' + token,
        }
      })
        .then((response) => {
          console.log(response)
          this.approvedConnection();
        })
    },
    mutual(user) {
    this.selectedUser = user; // Set the selectedUser to the clicked user
    let payload = {
      id: user.id
    };
    let token = localStorage.getItem('user');
    axios.post('http://127.0.0.1:8000/api/mutualConnec', payload, {
      headers: {
        Authorization: 'Bearer ' + token,
      }
    })
      .then((response) => {
        console.log('hAJAJAJJAJA')
        this.mutualUser = response.data.mutualUser || [];
        console.log('ok', response)
      })
  },
    getMutualConnectionsCount(userId) {
      if (this.mutualConnectionsCount && this.mutualConnectionsCount[userId]) {
        return this.mutualConnectionsCount[userId];
      } else {
        return 0;
      }
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

button {
  margin-right: 10px;
  /* Add margin on the right side */
}
</style>
