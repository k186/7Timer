<template>
  <div>
    <div class="k-map-box">
      <div class="k-map-line-box">
      </div>
      <div id="k-Map"></div>
    </div>
    <div class="k-map-control">
      <div>
        <slot></slot>
        <slot name="address"></slot>
      </div>
      <div class="k-map-ac">海拔校准</div>
      <div class="k-map-acList">
        <div class="k-ac" :class="options.ac ===0?'active':'' " @click.stop.navive.self="setAcEvt(0)">0Km</div>
        <div class="k-ac" :class="options.ac ===2?'active':'' " @click.stop.navive.self="setAcEvt(2)">2Km</div>
        <div class="k-ac" :class="options.ac ===7?'active':'' " @click.stop.navive.self="setAcEvt(7)">7Km</div>
      </div>
      <div class="k-map-btn" @click.stop.self="searchEvt">搜索</div>
      <slot name="getLocation"></slot>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    props: {
      searchEvt: {
        type: Function,
        required: true
      }
    },
    computed: {
      ...mapGetters({Timer7: 'Timer7'}),
      options () {
        return this.Timer7.options
      }
    },
    methods: {
      setAcEvt (ac) {
        this.$store.dispatch('timer7Update', {
          options: {
            ac: ac
          }
        })
      }
    }
  }
</script>
