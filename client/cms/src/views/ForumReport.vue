<script>
import Navbar from '../components/Navbar.vue'

export default {
  components: {
    Navbar
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
        <h1 class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">List of Forum Report</h1>
        <div>
          <!-- <button type="button" class="btn btn-success" @click.prevent="$router.push(`/content-add`)">
          + Add New Content
        </button> -->
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <table class="table align-middle">
            <!-- Untuk Table Jobs -->
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Title</th>
                <th scope="col">Type</th>
                <th scope="col">Gender</th>
                <th scope="col">Date of Birth</th>
                <th scope="col" width="50px"></th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>1</td>
                <td>Admin 1</td>
                <td>Admin1@mail.com</td>
                <td>M</td>
                <td>01/01/2000</td>
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