import { defineStore } from 'pinia'
import axios from 'axios'
import Swal from 'sweetalert2'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    baseUrl: 'http://localhost:4002/',
    // baseUrl: 'https://api.livy.chat/',
    admins: [],
    reports: [],
    posts: [],
    counselors: []
  }),

  actions: {
    succesNotification(response) {
      Swal.fire({
        icon: 'success',
        title: 'Success!'
        // text: response.message,
      })
    },

    errorNotification(error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...'
        // text: error.response.data.message,
      })
    },

    async googleLoginHandler(input) {
      console.log(input, '<- ini inputnya');
      try {
        console.log('Test handle login by Google')
        const signinWithGoogle = await axios({
          url: this.baseUrl + `login`,
          method: "POST",
          data: {
            token: input.access_token,
            role: 'admin'
          },
        });

        console.log(signinWithGoogle.data);
        const access_token = signinWithGoogle.data.access_token;
        console.log(access_token, '<- Ini access_token');

        await localStorage.setItem('access_token', access_token)

        await this.router.push('/')

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Successfully log in',
          showConfirmButton: false,
          timer: 1500
        })
      } catch (error) {
        console.log(error)
        this.errorNotification(error)
      }
    },

    async fetchReports() {
      console.log('Fetch data - from report page')
      try {
        const { data } = await axios({
          url: this.baseUrl + 'cms/forumreport',
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
          url: this.baseUrl + 'posts',
          method: 'GET',
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.posts = data
      } catch (error) {
        console.log(error)
      }
    },

    async addPosts(inputData) {
      inputData["UserId"]=1
      console.log('From button submit - add post');
      console.log(inputData);
      try {
        const { data } = await axios({
          url: this.baseUrl + '/cms/posts',
          method: 'POST',
          headers: {
            access_token: localStorage.access_token
          },
          data: inputData
        })
        this.router.push('/content')
      } catch (error) {
        console.log(error);
      }
    },

    async editPosts(inputData, id) {
      console.log('From button submit - edit post');
      console.log(inputData);
      try {
        const { data } = await axios({
          url: this.baseUrl + `posts/${id}`,
          method: 'PUT',
          headers: {
            access_token: localStorage.access_token
          },
          data: inputData
        })
        this.router.push('/content')
      } catch (error) {
        console.log(error);
      }
    },

    async fetchCounselors() {
      console.log('Fetch data - from counselor page')
      try {
        const { data } = await axios({
          url: this.baseUrl + 'cms/counselor',
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
    },

    async updateStatusCounselor(value) {
      console.log(value, 'data updated')
      try {
        const { data } = await axios.patch(
          baseUrl + `/counselors/${value}`,
          {},
          {
            headers: {
              access_token: localStorage.access_token
            }
          }
        )
        this.fetchCounselors()
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
  }
})
