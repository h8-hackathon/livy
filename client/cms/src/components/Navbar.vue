<script>
export default {}
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
              @click.prevent="toDashboardSection"
              >Content</a
            >
          </li>

          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="" @click.prevent="toJobSection"
              >Counselor</a
            >
          </li>

          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="" @click.prevent="toCompanySection"
              >Forum</a
            >
          </li>

          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="" @click.prevent="toHistorySection"
              >Add Admin</a
            >
          </li>
        </ul>
      </div>
      <div class="px-4">
        <h5>Hi, <span>User!</span></h5>
      </div>
      <div id="logout">
        <button type="button" class="btn btn-danger" @click="logoutHandler">Log Out</button>
      </div>
    </div>
  </nav>
</template>