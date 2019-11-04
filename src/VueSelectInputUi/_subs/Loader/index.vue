<template>
  <div class="table-loader flex align-center justify-content-center">
    <div class="table-loader-anim">
      <div /><div /><div /><div /><div /><div /><div /><div />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TableLoader'
  }
</script>

<style lang="scss" scoped>
  .table-loader {
    height: 100px;

    .table-loader-anim {
      display: inline-block;
      position: relative;
      width: 64px;
      height: 64px;
    }

    .table-loader-anim div {
      animation: table-loader-anim 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      transform-origin: 32px 32px;
    }

    .table-loader-anim div::after {
      content: ' ';
      display: block;
      position: absolute;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: dodgerblue;
      margin: -3px 0 0 -3px;
    }

    .table-loader-anim div:nth-child(1) {
      animation-delay: -0.036s;
    }

    .table-loader-anim div:nth-child(1)::after {
      top: 50px;
      left: 50px;
    }

    .table-loader-anim div:nth-child(2) {
      animation-delay: -0.072s;
    }

    .table-loader-anim div:nth-child(2)::after {
      top: 54px;
      left: 45px;
    }

    .table-loader-anim div:nth-child(3) {
      animation-delay: -0.108s;
    }

    .table-loader-anim div:nth-child(3)::after {
      top: 57px;
      left: 39px;
    }

    .table-loader-anim div:nth-child(4) {
      animation-delay: -0.144s;
    }

    .table-loader-anim div:nth-child(4)::after {
      top: 58px;
      left: 32px;
    }

    .table-loader-anim div:nth-child(5) {
      animation-delay: -0.18s;
    }

    .table-loader-anim div:nth-child(5)::after {
      top: 57px;
      left: 25px;
    }

    .table-loader-anim div:nth-child(6) {
      animation-delay: -0.216s;
    }

    .table-loader-anim div:nth-child(6)::after {
      top: 54px;
      left: 19px;
    }

    .table-loader-anim div:nth-child(7) {
      animation-delay: -0.252s;
    }

    .table-loader-anim div:nth-child(7)::after {
      top: 50px;
      left: 14px;
    }

    .table-loader-anim div:nth-child(8) {
      animation-delay: -0.288s;
    }

    .table-loader-anim div:nth-child(8)::after {
      top: 45px;
      left: 10px;
    }

    @keyframes table-loader-anim {
      0% {
        transform: rotate(0deg);
      }

      100% {
        transform: rotate(360deg);
      }
    }
  }
</style>
