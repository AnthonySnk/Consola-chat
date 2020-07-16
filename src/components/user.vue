<template>
  <div>
    <h1>User Page</h1>

    <h3>User ID: {{ $route.params.id }}</h3>

    <hr />

    <router-link :to="{ name: 'profile' }">Profile</router-link>|
    <router-link :to="{ name: 'posts' }">Posts</router-link>

    <router-view></router-view>

    <hr />

    <p>
      <router-link to="/">Index</router-link>|
      <router-link to="/about">About</router-link>|
      <router-link :to="{ name: 'contact' }">Contact</router-link>|
      <router-link
        :to="{ name: 'authorBook', params: { authorId: 1, bookId: 4 } }"
      >Author ID 1 & Book ID 4</router-link>
    </p>
  </div>
</template>

<script>
export default {};
</script>