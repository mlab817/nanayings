<template>
	<div class="q-pa-sm">
		<div ref="map" id="map"></div>
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
			lng: 120.984222,
			lat: 14.599512
		}
	},
	methods: {
		initMap() {
			//
		}
	},
	mounted() {
		const mapTypes = this.platform.createDefaultLayers()

		this.map = new H.Map(this.$refs.map, mapTypes.vector.normal.map, {
        zoom: 15,
        center: { lng: this.lng, lat: this.lat }
      }
    )

    H.ui.UI.createDefault(this.map, mapTypes)
	},
	created() {
		this.platform = new H.service.Platform({
      apikey: this.api_key
    })
    console.log(this.platform)
	}
}
</script>

<style>
	#map {
		height: calc(100vh - 60px);
		width: 100wh;
	}
</style>
