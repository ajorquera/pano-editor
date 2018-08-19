<template lang="pug">
	v-layout(wrap row class='image-manager' :class="{'is-extended' : isExtended}")
		v-btn(fab small class="button-extend" @click="isExtended = !isExtended")
			v-icon(dark) fas {{'fa-caret-' + (isExtended ? 'down' : 'up')}}


		v-flex(xs1 class="self-center")
			v-btn(fab :disabled="isEmpty" v-show="!isExtended" @click="move('left')")
				v-icon(class="fas fa-caret-left")

		v-flex(xs10)
			file-drop(@input="addNewFiles")
				v-layout(wrap row v-if="!isEmpty")
					v-flex(xs3 class="ma-5" v-for='file in files' :key='file.id')
						pano-img(
							:file="file"
							class="pano-img"
						)
			
		v-flex(xs1 class="self-center ")
			v-btn(fab :disabled="isEmpty" v-show="!isExtended" @click="move('right')")
				v-icon(class="fa fa-caret-right")

		v-btn(absolute dark fab	top right color="pink" @click="$refs.input.click()")
			v-icon add
			input(multiple ref="input" type="file" @change="addNewFiles")

</template>

<script>
import PanoImg from '@/components/PanoImg'
import FileDrop from '@/components/FileDrop'

export default {
	name: 'ImageComponent',
	components: {
		PanoImg,
		FileDrop
	},
	data () {
		return {
			isExtended: false,
			files: [],
		}
	},
	computed: {
		isEmpty() {
			return !this.files.length
		}
	},

	methods: {
		addNewFiles(filesToAdd) {
			let files;

			if(filesToAdd instanceof Event) {
				const event = filesToAdd;

				// this is a FileList not an array
				files = [...event.target.files];
				
			}  if(Array.isArray(filesToAdd)) {
				files = filesToAdd;
			}

			//we need an id to for tracking items
			files.forEach(this.addId);

			this.files.push(...files);
		},

		addId(file) {
			file.id = this.generateId();
			return file;
		},

		generateId() {
			return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
				var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
				return v.toString(16);
			});
		},

		move(direction) {
			const arr = this.files.slice();

			if(direction === 'right') {
				arr.unshift(arr.pop())
			}
			else if(direction === "left") {
				arr.push(arr.shift())
			}

			this.files = arr;
		},
		
	}
}
</script>

<style lang="scss" scoped>

	.image-manager {
		position: fixed;
		bottom: 0;

		padding: 40px 0;

		width: 100%;
		height: 40%;

		background-color: white;

		// TODO need to use vuejs transition 
		transition-property: all;
		transition-duration: 1s;
		transition-timing-function: cubic-bezier(0, 1, 0.5, 1);

		&.is-extended{
			height: 80%;
		}

		.button-extend {
			position:absolute;
			left:0;
			right:0;
			margin-left:auto;
			margin-right:auto;
			top: -20px;
		}
		
		// TODO move it somewhere else
		.self-center {
			align-self: center;
		}

	}

</style>
