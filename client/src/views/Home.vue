<template>
  <div class="home-hero">
    <div class="overlay">
      <div class="content">
        <h1>Welcome to the <span class="highlight">Online Library</span></h1>
        <p>Dive into books, explore worlds, and expand your knowledge — all in one place.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500&family=Open+Sans&display=swap');

.home-hero {
  height: 100vh;
  background: url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')
    no-repeat center center/cover;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Open Sans', sans-serif;
}

.overlay {
  background-color: rgba(0, 0, 0, 0.6); /* dark overlay */
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  text-align: center;
  color: #fff;
  max-width: 800px;
  padding: 0 20px;
}

.content h1 {
  font-size: 3.2rem;
  font-family: 'Playfair Display', serif;
  margin-bottom: 20px;
}

.highlight {
  color: #ffcc00;
}

.content p {
  font-size: 1.4rem;
  line-height: 1.6;
}
</style>
