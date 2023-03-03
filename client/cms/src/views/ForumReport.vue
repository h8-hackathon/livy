<script>
import Navbar from '../components/Navbar.vue'

export default {
  components: {
    Navbar
  },
  computed: {
    baseUrl: 'http://localhost:8080/',
    report: []
  },
  methods: {
    async fetchReport() {
      console.log('Fetch data - report page')
      try {
        const { data } = await axios({
          url: this.baseUrl + '/reports', //! Masih belum dimasukin URL-nya
          method: 'GET',
          headers: {
            access_token: localStorage.access_token
          }
        })
        console.log(data, '<- Ini data Report')
        this.admin = data
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<template>
  <div>
    <Navbar />
    <section
      class="col-md-9 ms-sm-auto col-lg-10 px-md-4"
      id="company-section"
      style="margin: auto"
    >
      <div
        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
      >
        <h1 class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Forum Report Page</h1>
        <div>
          <button
            type="button"
            class="btn btn-success"
            @click.prevent="$router.push(`/report-add`)"
          >
            + Add New Report
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <table class="table align-middle">
            <!-- Untuk Table Jobs -->
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Note</th>
                <th scope="col">Action</th>
                <th scope="col" width="50px"></th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>1</td>
                <td>Penggunaan kata yang dilarang</td>
                <td>
                  <button type="button" class="btn btn-danger">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </div>
</template>
