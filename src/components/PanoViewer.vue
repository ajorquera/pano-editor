<template>
	<v-flex id='panorama'>
	</v-flex>
</template>

<script>
// import * as pannellum from 'pannellum'
export default {
	name: 'PanoViewer',
	mounted () {
		pannellum.viewer('panorama', {
			"type": "equirectangular",
			"panorama": "https://pannellum.org/images/alma.jpg"
		});
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#panorama {
	height: Calc(60vh - 48px);
}
</style>
