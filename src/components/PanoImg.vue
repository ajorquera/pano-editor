<template lang="pug">
	v-layout(column class="pano-img" :class="{'is-selected': selected}")
		v-icon(v-show="selected" class="checkmark" color="primary") fa fa-check-circle
		v-flex(class="img-container" @click="click")
			v-avatar(class="avatar" :size="size")
				img(:src="preview")

		v-flex(class="text-input")
			v-text-field(:value="name")

</template>

<script>

export default {
	props: {
		file: {
			type: File,
			required: true
		},

		selected: {
			type: Boolean,
			default: false
		}
	},
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

		size() {
			return this.selected ? 96 : 128;
		}

	},

	methods: {
		onLoad() {
			this.preview = this.reader.result;
		},

		click(e) {
			this.$emit('click', e);
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
