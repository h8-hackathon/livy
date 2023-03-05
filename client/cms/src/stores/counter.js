import { defineStore } from 'pinia'
import axios from 'axios'
import Swal from 'sweetalert2'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    // baseUrl: 'http://localhost:4002/',
    baseUrl: 'https://api.livy.chat/',
    admins: [],
    adminByID: {},
    reports: [],
    posts: [],
    postByID: {},
    counselors: [],
    dataPostReports: [],
    dataCommentReports: [],
  }),

  actions: {
    succesNotification(response) {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: response.message,
      })
    },

    errorNotification(error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response.data.message,
      })
    },

    async googleLoginHandler(input) {
      console.log(input, '<- ini inputnya')
      try {
        console.log('Test handle login by Google')
        const signinWithGoogle = await axios({
          url: this.baseUrl + `login`,
          method: 'POST',
          data: {
            token: input.access_token,
            role: 'admin'
          }
        })

        console.log(signinWithGoogle.data)
        const access_token = signinWithGoogle.data.access_token
        console.log(access_token, '<- Ini access_token')

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
          url: this.baseUrl + 'cms/posts',
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

    async fetchPostsByID(id) {
      console.log('Fetch data - from post page')
      try {
        const { data } = await axios({
          url: this.baseUrl + `cms/posts/${id}`,
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
      inputData['UserId'] = 1 // Ini masih manual, tunggu sampai bisa autentikasi
      console.log('From button submit - add post')
      console.log(inputData)
      try {
        const { data } = await axios({
          url: this.baseUrl + 'cms/posts',
          method: 'POST',
          headers: {
            access_token: localStorage.access_token
          },
          data: inputData
        })
        this.router.push('/content')

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Successfully add new content",
          showConfirmButton: false,
          timer: 1500,
        });

      } catch (error) {
        console.log(error)

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.responseJSON?.data?.message || "Something went wrong",
        });
      }
    },

    async editPosts(inputData, id) {
      console.log('From button submit - edit post')
      console.log(inputData)
      try {
        const { data } = await axios({
          url: this.baseUrl + `cms/posts/${id}`,
          method: 'PUT',
          headers: {
            access_token: localStorage.access_token
          },
          data: inputData
        })
        this.router.push('/content')

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Successfully edit new content",
          showConfirmButton: false,
          timer: 1500,
        });

      } catch (error) {
        console.log(error)

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.responseJSON?.data?.message || "Something went wrong",
        });
      }
    },

    async deletePosts(id) {
      console.log('From button submit - delete post')
      try {
        const { data } = await axios({
          url: this.baseUrl + `cms/posts/${id}`,
          method: 'DELETE',
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.fetchPosts()

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Successfully delete content",
          showConfirmButton: false,
          timer: 1500,
        });

      } catch (error) {
        console.log(error)

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.responseJSON?.data?.message || "Something went wrong",
        });
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
        console.log(data, '<- Ini data Counselors')
        this.counselors = data
      } catch (error) {
        console.log(error)
      }
    },

    async updateStatusCounselor(status, id) {
      try {
        const { data } = await axios({
          method: 'PATCH',
          url: this.baseUrl + `cms/counselor/${id}`,
          headers: {
            access_token: localStorage.access_token
          },
          body: { status }
        })
        this.fetchCounselors()

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Successfully update status counselor submission",
          showConfirmButton: false,
          timer: 1500,
        });

      } catch (error) {
        console.log(error)

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.responseJSON?.data?.message || "Something went wrong",
        });
      }
    },

    async deleteCounselor(id) {
      console.log('From button submit - delete counselor')
      try {
        const { data } = await axios({
          url: this.baseUrl + `cms/counselor/${id}`,
          method: 'DELETE',
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.fetchCounselors()

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Successfully delete counselor submission",
          showConfirmButton: false,
          timer: 1500,
        });

      } catch (error) {
        console.log(error)

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.responseJSON?.data?.message || "Something went wrong",
        });
      }
    },

    async fetchAdmin() {
      console.log('Fetch data - from admin page')
      try {
        const { data } = await axios({
          url: this.baseUrl + 'cms/admin',
          method: 'GET',
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.admins = data
      } catch (error) {
        console.log(error)
      }
    },

    async fetchAdminByID(id) {
      console.log('Fetch data - from admin page')
      try {
        const { data } = await axios({
          url: this.baseUrl + `cms/admin/${id}`,
          method: 'GET',
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.adminByID = data
      } catch (error) {
        console.log(error)
      }
    },

    async addAdmin(inputData) {
      console.log('From button submit - add admin')
      console.log(inputData)
      try {
        const { data } = await axios({
          url: this.baseUrl + 'cms/admin',
          method: 'POST',
          headers: {
            access_token: localStorage.access_token
          },
          data: inputData
        })
        this.router.push('/admin-list')

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Successfully add new admin",
          showConfirmButton: false,
          timer: 1500,
        });

      } catch (error) {
        console.log(error)

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.responseJSON?.data?.message || "Something went wrong",
        });
      }
    },

    async editAdmin(inputData, id) {
      console.log('From button submit - edit admin')
      console.log(inputData)
      try {
        const { data } = await axios({
          url: this.baseUrl + `cms/admin/${id}`,
          method: 'PUT',
          headers: {
            access_token: localStorage.access_token
          },
          data: inputData
        })
        this.router.push('/admin-list')

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Successfully edit admin's data",
          showConfirmButton: false,
          timer: 1500,
        });

      } catch (error) {
        console.log(error)

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.responseJSON?.data?.message || "Something went wrong",
        });
      }
    },

    async deleteAdmin(id) {
      console.log('From button submit - delete admin')
      try {
        const { data } = await axios({
          url: this.baseUrl + `cms/admin/${id}`,
          method: 'DELETE',
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.fetchAdmin()

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Successfully delete admin",
          showConfirmButton: false,
          timer: 1500,
        });

      } catch (error) {
        console.log(error)

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.responseJSON?.data?.message || "Something went wrong",
        });
      }
    },

    async fetchReport() {
      console.log('Fetch data - report page')
      try {
        const { data } = await axios({
          url: this.baseUrl + 'cms/forumreport', 
          method: 'GET',
          headers: {
            access_token: localStorage.access_token
          }
        })
        console.log(data, '<- Ini data Report')
        this.dataPostReports = data.postReports
        this.dataCommentReports = data.commentReports
      } catch (error) {
        console.log(error)
      }
    },
  }
})
