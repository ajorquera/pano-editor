<template lang="pug">
	div(class="file-drop" ref="drop")
		slot
			v-layout(align-center justify-center fill-height class="default-content")
				v-icon fas fa-image
				| Drop some panos
</template>

<script>
export default {
	data () {
		return {
			dragEvents: ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop']
		}
	},

	mounted(){
		this.determineDragAndDropCapable();

		if(this.dragAndDropCapable) {
			this.addListeners();
		}
	},

	methods: {
		determineDragAndDropCapable(){
			var div = document.createElement('div');

			this.dragAndDropCapable =  ( ( 'draggable' in div )
				|| ( 'ondragstart' in div && 'ondrop' in div ) )
				&& 'FormData' in window
				&& 'FileReader' in window;
		},

		addListeners() {
			this.dragEvents.forEach(event => {
				this.$refs.drop.addEventListener(event, this.stopPropagation, false);
			});

			this.$refs.drop.addEventListener('drop', this.onDrop.bind(this));
		},

		stopPropagation(e) {
			e.preventDefault();
			e.stopPropagation();
		},

		onDrop(e) {
			const files = [];

			for( let i = 0; i < e.dataTransfer.files.length; i++ ){
				files.push( e.dataTransfer.files[i]);
			}

			this.$emit('input', files);
		},
	}
}
</script>

<style lang="scss" scoped>
	.file-drop {
		height: 100%;

		.default-content {
			border: 3px dashed rgba(0,0,0,0.2);
			height: 100%;
		}
	}
</style>