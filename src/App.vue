<template>
  <div>
    <navigate />
    <router-view></router-view>
  </div>
</template>

<script>
import navigate from "@/components/navigate.vue";
export default {
  name: "App",
  components: {
    navigate,
  },
  mounted: function () {
    this.$router.push("adminlogin");
  },
};
</script>