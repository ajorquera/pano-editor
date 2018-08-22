<template lang="pug">
	div
		h2 Information
		v-layout
			v-flex(v-for="(prop, i) in properties" :key="i")
</template>

<script>
import ExifReader from 'exifreader';

export default {
	name: 'Information',
	props: {
		file: {
			type: File,
			require: true
		}
	},

	data() {
		return {
			metadata: null,
			resolution: null,
			properties: null
		}
	},

	mounted() {
		Promise.all([this.getImgMetadata(), this.getImgResolution()]).then(this.onFileRead);
	},

	methods: {
		getImgResolution() {
			const that = this;
			return new Promise(resolve => {
				const reader = new FileReader();
				reader.onload = (e) => {
					const img = new Image();

					img.onload = () => {
						that.resolution = {
							width: img.width,
							height: img.height
						};

						resolve(that.resolution);
					};

					img.src = e.target.result;
				}

				reader.readAsDataURL(this.file);
			});
		},

		getImgMetadata() {
			const that = this;

			return new Promise(resolve => {
				const reader = new FileReader();
				reader.onload = (e) => {
					let metadata = ExifReader.load(e.target.result);
					metadata = that.processMetadata(metadata);
					that.metadata = metadata;
					resolve(metadata);
				}
				reader.readAsArrayBuffer(this.file.slice(0, 128 * 1024));
			});
		},

		processMetadata(data) {
			return {
				...data
			};
		},

		onFileRead() {
			this.$logger.debug(this.metadata);
			this.$logger.debug(this.resolution);

			this.properties = {
				...this.resolution,
			}
		}
	},
	


}
</script>

<style scoped>

</style>

