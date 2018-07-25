<style>

	.fdd{
		display: block;
		position: relative;
		width: 100%;
		border-radius: 4px;
		text-align: center;
		align-items: center;
		justify-content: center;
		display: flex;
		color: black;
		min-height: 28vh;
	}
	.extend_drop {
		color: white;
		min-height: 100vh;
		background: rgba(0,0,0,0.6) !important;
	}
	.extend_drop .fdd__border{
		height: 80vh;
	}
	.fdd__title{
	}
	.fdd__file_preview{
		background-color: white;
		border-radius: 2px;
		max-width: 200px;
		height: 50px;
		color: black;
		justify-content: space-between;
		display: flex;
		align-items: center;
		border: 1px solid #E3E9ED;
	}
	.fdd__border_nonextend{
		border: 3px dashed rgba(0,0,0,0.2);
		width: 100%;
		height: 25vh;
		align-items: center;
		justify-content: center;
		display: flex;
	}
	.fdd__border_extend{
		border: 3px dashed white;
		max-height: 90vh;
		min-height: 80vh;
		align-items: center;
		justify-content: center;
		display: flex;
	}
	.fdd__submit-button {
		position: absolute;
		bottom: 1vh;
		left: 46vw;
	}
	.headline{
		color: rgba(0,0,0,0.3);
	}

</style>

<template>
	<div>
		<v-layout v-if='extend' v-bind:class='{extend_drop: extend}' class='fdd d-flex' row wrap id="file-drag-drop" ref="fileform">
			<div class="fdd__border_extend" v-bind:class='{"ma-5" : extend}'>
				<v-flex v-if='!files || files.length == 0' xs12 class="fdd__title title">
					<h3 class='display-1 mb-2'>Drop Panos</h3>
					<v-icon large class=''>add_circle</v-icon>
				</v-flex>
				<v-flex xs12 v-if='files && files.length' class='d-flex pa-4 justify-content-center flex-wrap'>
					<div v-for="(file, key) in files" class="fdd__file_preview ma-2" :key='key'>
						<v-icon large class='image_icon'>image</v-icon>
						{{ file.name }}
						<v-btn icon @click='removeFile(key)'><v-icon>remove_circle_outline</v-icon></v-btn>
					</div>
				</v-flex>
				<v-flex v-if='files && files.length > 0' xs12 class='fdd__submit-button'>
					<v-btn @click='submitFiles' class='primary' >Add Files</v-btn>
				</v-flex>
			</div>
		</v-layout>
		<v-layout v-else class='' row wrap id="file-drag-drop" ref="fileform">
			<div class="fdd__border_nonextend" v-bind:class='{"ma-5" : extend}'>
				<v-flex v-if='!files || files.length == 0' xs12 class="d-flex text-sm-center">
					<h4 class='headline mb-2 text-grey'><i class="far fa-image mr-2"></i> Drop some panos</h4>
				</v-flex>
				<v-flex xs12 v-if='files && files.length' class='d-flex pa-4 justify-content-center flex-wrap'>
					<div v-for="(file, key) in files" class="fdd__file_preview ma-2" :key='key'>
						<v-icon large class='image_icon'>image</v-icon>
						{{ file.name }}
						<v-btn icon @click='removeFile(key)'><v-icon>remove_circle_outline</v-icon></v-btn>
					</div>
				</v-flex>
				<v-flex v-if='files && files.length > 0' xs12 class='fdd__submit-button'>
					<v-btn @click='submitFiles' class='primary' >Add Files</v-btn>
				</v-flex>
			</div>
		</v-layout>
	</div>
</template>

<script>
export default {
	props: ['extend'],
	data () {
		return {
			dragAndDropCapable: false,
			files: [],
			uploadPercentage: 0
		}
	},

	mounted(){
		this.dragAndDropCapable = this.determineDragAndDropCapable();
		if( this.dragAndDropCapable ){
			['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach( function( evt ) {

				this.$refs.fileform.addEventListener(evt, function(e){
					e.preventDefault();
					e.stopPropagation();
				}.bind(this), false);
			}.bind(this));

			this.$refs.fileform.addEventListener('drop', function(e){
				for( let i = 0; i < e.dataTransfer.files.length; i++ ){
					this.files.push( e.dataTransfer.files[i] );
				}
			}.bind(this));
		}
	},

	methods: {
		determineDragAndDropCapable(){
			var div = document.createElement('div');
			return ( ( 'draggable' in div )
				|| ( 'ondragstart' in div && 'ondrop' in div ) )
				&& 'FormData' in window
				&& 'FileReader' in window;
		},

		submitFiles(){
			this.$emit('uploadedFiles', this.files)
		},

		removeFile( key ){
			this.files.splice( key, 1 );
		}
	}
}
</script>