<template>
  <div class="home container">
    <div class="row">
      <div class="col-3">
        <h1>Title</h1>
      </div>
      <div class="col-3">
        <h1>creator</h1>
      </div>
      <div class="col-3">
        <h1>status</h1>
      </div>
      <div class="col-3">
        <h1>modified</h1>
      </div>
    </div>
    <div v-for="bug in bugs" :key="bug.id" :bug="bug">
      <router-link :to="{name: 'bug', params: {bugId: bug.id}}">
        <div class="row border">
          <div class="col-3">
            <h4>{{bug.title}}</h4>
          </div>
          <div class="col-3">{{bug.creatorEmail}}</div>
          <div class="col-3" v-bind:class="isActiveCheck(bug)">{{bug.status}}</div>
          <div class="col-3">{{bug.updatedAt}}</div>
        </div>
      </router-link>
    </div>
  </div>
</template>


<script>
export default {
  name: "home",
  mounted() {
    this.$store.dispatch("getBugs");
  },
  data() {
    return {};
  },
  computed: {
    bugs() {
      return this.$store.state.bugs;
    }
  },
  methods: {
    isActiveCheck(bug) {
      return bug.status == "Closed" ? "red" : "green";
    }
  },
  components: {}
};
</script>


<style scoped>
.red {
  color: red;
}
.gree {
  color: green;
}
</style>