import { defineStore } from 'pinia'
import axios from 'axios'
import Swal from 'sweetalert2'


export const useCounterStore = defineStore('counter', {
  state: () => ({
    baseUrl: "http://localhost:4002",
    admins:[],
    reports:[],
    posts:[],
    counselors:[]
  }),

  actions: {
    succesNotification(response) {
      Swal.fire({
        icon: "success",
        title: "Success!",
        // text: response.message,
      });
    },


    errorNotification(error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        // text: error.response.data.message,
      });
    },


    async googleLoginHandler(input) {
      
      try {
        console.log("Test handle login by Google");
        // const signinWithGoogle = await axios({
        //   url: this.baseUrl + `login`,
        //   method: "POST",
        //   headers: {
        //     "google-auth-token": input.credential,
        //   },
        // });

        // const access_token = signinWithGoogle.data.access_token;
        // console.log(access_token, '<- Ini access_token');

        await localStorage.setItem("access_token", 'ABCDE');

        await this.router.push('/')

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Successfully log in",
          showConfirmButton: false,
          timer: 1500,
        });

      } catch (error) {
        console.log(error);
        this.errorNotification(error);
      }
    },


    async fetchReports() {
      console.log('Fetch data - from report page')
      try {
        const { data } = await axios({
          url: this.baseUrl + '/reports',
          method: 'GET',
          headers: {
            access_token: localStorage.access_token
          }
        })
        console.log(data, '<- Ini data Reports')
        this.reports = data
      } catch (error) {
        console.log(error)
      }
    },

    
    async fetchPosts() {
      console.log('Fetch data - from post page')
      try {
        const { data } = await axios({
          url: this.baseUrl + '/posts',
          method: 'GET',
          headers: {
            access_token: localStorage.access_token
          }
        })
        console.log(data, '<- Ini data Posts')
        this.posts = data
      } catch (error) {
        console.log(error)
      }
    },


    async fetchCounselors() {
      console.log('Fetch data - from counselor page')
      try {
        const { data } = await axios({
          url: this.baseUrl + '/counselors',
          method: 'GET',
          headers: {
            access_token: localStorage.access_token
          }
        })
        console.log(data, '<- Ini data Posts')
        this.counselors = data
      } catch (error) {
        console.log(error)
      }
    }
  },
})
