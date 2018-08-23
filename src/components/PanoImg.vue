<template lang="pug">
	v-layout(column class="pano-img" :class="{'is-selected': file.selected}")
		v-icon(v-show="file.selected" class="checkmark" color="primary") fa fa-check-circle
		v-flex(class="img-container" @click="click")
			v-avatar(class="avatar" :size="size")
				img(:src="file.preview")

		v-flex(class="text-input")
			v-text-field(:value="file.name")

</template>

<script>
import PanoFile from "@/PanoFile";

export default {
	name: 'PanoImg',

	props: {
		file: {
			type: PanoFile,
			required: true
		}
	},

	computed: {
		size() {
			return this.file.selected ? 96 : 128;
		}
	},

	methods: {
		click(e) {
			this.$emit('click', e);
		}
	},
}
</script>

<style lang="scss" scoped>
	.pano-img {
		position: relative;
		&.is-selected {
			padding: 10px;
			background-color: #eee;
		}

		.img-container {
			cursor: pointer;
			align-self: center;
		}

		.checkmark {
			position: absolute;
			top: 10px;
			right: 10px;
		}

	}
</style>
