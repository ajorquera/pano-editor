<template lang="pug">
	v-layout(column class="pano-img")
		v-flex(class="img-container")
			v-avatar(size="150")
				img(:src="preview")

		v-flex(class="text-input")
			v-text-field(:value="name")

</template>

<script>

export default {
	props: ['file'],
	name: 'PanoImg',

	data() {
		return {
			preview: null,
			reader: null,
		};
	},

	computed: {
		name() {
			const filename = this.file.name;
			return filename.substring(0, filename.lastIndexOf("."))
		},
	},

	methods: {
		onLoad() {
			this.preview = this.reader.result;
		}
	},

	mounted() {
		this.reader = new FileReader();
		this.reader.onload = this.onLoad.bind(this);
		this.reader.readAsDataURL(this.file);
	},

	destroyed() {
		this.reader = null;
		this.preview = null;
	}

	
}
</script>

<style lang="scss" scoped>
	.pano-img {
		.img-container {
			align-self: center;
		}
	}
</style>
