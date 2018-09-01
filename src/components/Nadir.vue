<template lang="pug">
	div
		div
			h2 Nadir
		div
			v-switch(color="primary" label="Rectilinear" v-model="isRectilinear")
			div
				v-img(v-for="(image, index) in images" :src="image.src" :key="index")
			v-btn(icon color="primary" :disabled="!isRectilinear")
				v-icon add

</template>

<script>
import PanoFile from '@/PanoFile';
import EventBus, {events} from '@/EventBus';

export default {
	name: 'Nadir',
	props: {
		file: {
			type: PanoFile,
			require: true
		}
	},

	data() {
		return {
			isRectilinear: false,
			images: [
				{title: '', src: ''}
			]
		}
	},

	watch: {
		isRectilinear(val) {
			EventBus.$emit(events.SET_GNOMONIC_PROJECTION, val);
		}	
	}
}
</script>

<style scoped>

</style>

