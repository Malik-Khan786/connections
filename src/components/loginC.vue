<template>
    <div class="container py-4">
      <div class="row justify-content-center">
          <div class="col-md-5">
              <div class="card">
                  <div class="card-header">
                      User Login Form
                  </div>
                  <div class="card-body">
                    <!-- @submit.prevent="login" -->
                      <form @submit.prevent="login">
                          <div class="mb-3">
                              <label for="email" class="form-label">Email</label>
                              <input type="email" class="form-control"  v-model="credential.email">
                          </div>
                          <div class="mb-3">
                              <label for="password" class="form-label">Password</label>
                              <input type="password" class="form-control"  v-model="credential.password">
                          </div>
                          <div class="text-end">
                          <button type="submit" class="btn btn-primary">Login</button>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    name: "LoginC",
      data(){
          return {
              credential:{
                  email:null,
                  password:null
              }
          }
      },
      mounted(){
        if(localStorage.getItem('user')){
            this.$router.push('/')
        }
      },
      methods:{
          login(){
            console.log('cd',this.credential)
            axios.post('http://127.0.0.1:8000/api/login',this.credential)
            .then((response) =>{
                console.log(response.data)
                if(response.data.access_token){
                localStorage.setItem('user',response.data.access_token)
                this.$router.push('/')
                }
            })
            .catch((error) =>{
                console.log(error)
            })
          }
    }
  };
  </script>
  