<script>
import Navbar from '../components/Navbar.vue'

export default {
  components: {
    Navbar
  }
}
</script>

<template>
  <section class="col-md-9 ms-sm-auto col-lg-10 px-md-4" id="company-section" style="margin: auto">
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h1 class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Counselors Page</h1>
    </div>
    <div class="row">
      <div class="col-12">
        <table class="table align-middle">
          <!-- Untuk Table Jobs -->
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Status</th>
              <th scope="col">Submission</th>
              <th scope="col">Counselors Name</th>
              <th scope="col">Action</th>
              <th scope="col" width="50px"></th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>1</td>
              <td>Pending</td>
              <td>Counselor Submission</td>
              <td>Sulkhan</td>
              <td>
                <button type="button" class="btn btn-danger m-2">Delete</button>
                <button
                  type="button"
                  class="btn btn-success"
                  @click.prevent="$router.push(`/counselor-edit`)"
                >
                  Edit
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>
