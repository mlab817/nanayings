// import something here
import * as VueGoogleMaps from 'vue2-google-maps'

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
export default ({ Vue }) => {
  Vue.use(VueGoogleMaps, {
  	load: {
	    key: 'AIzaSyBTvypmcrA5l_ZoiW5qyAUFxGjdvEHYAxk',
	    libraries: 'places'
	  }
  })
}
