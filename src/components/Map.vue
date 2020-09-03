<template>
	<div class="q-pa-sm">
		<div ref="map"></div>
	</div>
</template>

<script>
const H = window.H

export default {
	name: 'HereMap',
	data() {
		return {
			map: {},
			platform: {},
			api_key: 'FLLfWKJYAbGkGU5pg92hNJWUyl90Ixo-D4NEu8eDR1Y',
			lng: 0,
			lat: 0
		}
	},
	methods: {
		initMap() {
			//
		}
	},
	mounted() {
		this.map = new H.Map(this.$refs.map, this.platform.createDefaultLayers().normal.map, {
        zoom: 10,
        center: { lng: this.lng, lat: this.lat }
      }
    )
	},
	created() {
		this.platform = new H.service.Platform({
      apiKey: this.api_key
    })
	}
}
</script>

<style>
	#map {
		height: calc(100vh - 60px);
		width: 100wh;
	}
</style>
