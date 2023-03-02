<script>
export default {
  methods: {
    toContentSection() {}
  }
}
</script>

<template>
  

  <nav class="navbar navbar-expand-lg navbar-red navbar-dark">
        <div class="wrapper">
          
        </div>
  <div class="container-fluid all-show">
    <a class="navbar-brand" href="#">LIVY ADMIN CMS <i class="fa fa-codepen"></i></a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="container-fluid d-flex justify-content-between">
    <div>
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
      </div>
      <div class="d-flex align-items-center ">
      <div class="px-4">
        <h5>Hi, <span>Admin!</span></h5>
      </div>
      <div id="logout">
        <button type="button" class="btn btn-danger" @click="logoutHandler">Log Out</button>
      </div>
      </div>
    </div>
  </div>
</nav>
</template>



<style scoped>

body{

  background-color: #eee;
}

.navbar-nav>li>a{

  text-transform: uppercase;
  font-size: 18px;
  margin-right:20px;
  color: #fff;
}


.navbar-toggler {
    padding: .20rem .50rem;
    font-size: 1.25rem;
    line-height: 1;
    background-color: transparent;
    border: 1px solid white;

    }

    .nav-link{

      color: #fff !important;
    }


.wrapper{
      width: 100%;
    position: absolute;
    height: 100%;
    background-color: #000;
    clip-path: polygon(81% 0, 100% 0, 100% 50%, 100% 100%, 71% 100%);
    transition: 1s all;
}

.navbar-brand{

  color:#fff;
  font-family: 'Allerta Stencil', sans-serif;
  margin-bottom: 4px;
  font-size: 27px;
}

.navbar-red:hover .wrapper{

  clip-path: polygon(81% 0, 100% 0, 100% 50%, 100% 100%, 65% 100%);

}

.navbar-brand:hover{

  color:#fff;
  
}

.navbar-red{

  background-color: #3d569c;
  color: #fff;

}

.all-show{

  z-index: 10;
}
</style>