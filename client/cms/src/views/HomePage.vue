<script>
import Navbar from '../components/Navbar.vue'
import { mapActions, mapState } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  components: {
    Navbar
  },
  computed: {
    ...mapState(useCounterStore, ['admins', 'posts','counselors','dataCommentReports','dataPostReports'])
  },
  methods: {
    ...mapActions(useCounterStore, ['fetchAdmin','fetchReport', 'fetchPosts','fetchCounselors'])
  },
  created() {
    this.fetchAdmin()
    this.fetchPosts()
    this.fetchCounselors()
    this.fetchReport()
  }
}
</script>

<template>
  <div>
    <Navbar />
    <div>
      <div class="container">
    
    <div class="row ">
      <div class="  col-md-6">
        <div class="counter-box">
          <i class="fa fa-comments-o"></i>          <span class="counter">{{dataCommentReports.length}}</span>
          <p>Comment Reported</p>
        </div>
      </div>
      <div class="  col-md-6">
        <div class="counter-box">
          <i class="fa fa-comment-o"></i>
          <span class="counter">{{dataPostReports.length}}</span>
          <p>Post Reported</p>
        </div>
      </div>
    </div>
    <div class="row row-gap-3">

	<div class="four col-md-4">
		<div class="counter-box">
			<i class="fa fa-group"></i>
			<span class="counter">{{ counselors.length }}</span>
			<p>Total Counselor Submissions</p>
		</div>
	</div>
	<div class="four col-md-4">
		<div class="counter-box">
			<i class="fa  fa-picture-o"></i>
			<span class="counter">{{posts.length}}</span>
			<p>Total Posts</p>
		</div>
	</div>
	<div class="four col-md-4">
		<div class="counter-box">
			<i class="fa  fa-user"></i>
			<span class="counter">{{admins.length}}</span>
			<p>Total Admin</p>
		</div>
	</div>
  </div>	
</div>
    </div>
  </div>
</template>

<style scoped>
.container{
    margin-top:100px;
    
}

.counter-box {
	display: block;
	background: #f6f6f6;
	padding: 40px 20px 37px ;
	text-align: center
}

.counter-box p {
	margin: 5px 5px 5px 5px;
	padding: 0;
	color: #909090;
	font-size: 18px;
	font-weight: 500
}

.counter-box i {
	font-size: 60px;
	margin: 0 0 15px;
	color: #d2d2d2
}

.counter { 
	display: block;
	font-size: 32px;
	font-weight: 700;
	color: #666;
	line-height: 28px
}

.counter-box.colored {
      background: #3acf87;
}

.counter-box.colored p,
.counter-box.colored i,
.counter-box.colored .counter {
	color: #fff
}
</style>