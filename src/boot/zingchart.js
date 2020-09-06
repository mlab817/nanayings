// import something here
import 'zingchart/es6'
import zingchartVue from 'zingchart-vue'

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
export default ({ Vue }) => {
  Vue.component('zingchart', zingchartVue)
}
