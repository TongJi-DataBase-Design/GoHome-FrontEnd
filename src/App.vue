<template>
  <div id="app">
    <navigate />
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/StayInfo">StayInfo</router-link>
    </div>
    <router-view/>
    <router-view
    style="padding-top: 60px;"
    />
  </div>
</template>
      <router-link to="/about">About</router-link> 
    </div>
    <router-link to="/become-a-host/type">type</router-link> 
     <router-view/>
  </div></template>

<script>
import navigate from '@/components/navigate.vue';

export default {
  name: 'App',
  components: {
    navigate
  }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
