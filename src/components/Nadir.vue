<template lang="pug">
	div
		h2 Nadir

</template>

<script>
import PanoFile from '@/PanoFile';

export default {
	name: 'Nadir',
	props: {
		file: {
			type: PanoFile,
			require: true
		}
	}
}
</script>

<style scoped>

</style>

