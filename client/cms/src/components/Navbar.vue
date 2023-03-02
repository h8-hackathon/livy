<script>
import Swal from 'sweetalert2'

export default {
  methods: {
    logoutHandler() {
      console.log('Test handle log out')

      localStorage.removeItem('access_token')

      router.push('/')

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Successfully log out',
        showConfirmButton: false,
        timer: 1800
      })
    }
  }
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top bg-white shadow">
    <div class="container-fluid">
      <!-- <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6">
        <img src="../image/Link-Link.png" width="75" class="d-inline-block me-2" alt="Link-Link"
      /></a> -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a
              class="nav-link active"
              aria-current="page"
              href=""
              @click.prevent="$router.push(`/content`)"
              >Content</a
            >
          </li>

          <li class="nav-item">
            <a
              class="nav-link active"
              aria-current="page"
              href=""
              @click.prevent="$router.push(`/counselor`)"
              >Counselor</a
            >
          </li>

          <li class="nav-item">
            <a
              class="nav-link active"
              aria-current="page"
              href=""
              @click.prevent="$router.push(`/forum`)"
              >Forum</a
            >
          </li>

          <li class="nav-item">
            <a
              class="nav-link active"
              aria-current="page"
              href=""
              @click.prevent="$router.push(`/admin-list`)"
              >Admin List</a
            >
          </li>
        </ul>
      </div>
      <div class="px-4">
        <h5>Hi, <span>Admin!</span></h5>
      </div>
      <div id="logout">
        <button type="button" class="btn btn-danger" @click="logoutHandler">Log Out</button>
      </div>
    </div>
  </nav>
</template>
