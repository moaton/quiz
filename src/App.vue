<template>
  
  <router-view/>
</template>
<script>
import "./assets/css/all.css"
import "./assets/css/null.css"
import "./assets/css/style.css"
export default {
  
}
</script>
<style lang="scss">
.modal__back {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    backdrop-filter: blur(2px);
  }

  .change__lang--modal {
    position: absolute;
    z-index: 15;
    min-width: 250px;
    padding: 13px 30px 40px;
    border-radius: 15px;
    background: #003049;

    p {
      font-size: 12px;
      font-weight: 500;
      color: #e9c46a;
    }

    ul {
      margin-top: 20px;
      padding: 0;
      display: flex;
      justify-content: space-between;
      list-style: none;

      li {
        text-transform: uppercase;
        color: #e9c46a;
      }
    }
  }
</style>
