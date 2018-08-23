<template lang="pug">
	v-layout(wrap row class='image-manager' :class="{'is-extended' : isExtended}")
		v-btn(fab small class="button-extend" @click="isExtended = !isExtended")
			v-icon(dark) fas {{'fa-caret-' + (isExtended ? 'down' : 'up')}}


		v-flex(xs1 class="self-center")
			v-btn(fab :disabled="isRotable" v-show="!isExtended" @click="move('left')")
				v-icon(class="fas fa-caret-left")

		v-flex(xs10)
			file-drop(@input="addNewFiles")
				v-layout(wrap row v-if="!isEmpty")
					v-flex(xs3 class="pa-4" v-for='img in imgs' :key='img.id')
						pano-img(
							:file="img"
							class="pano-img"
							@click="onSelect($event, img)"
						)
			
		v-flex(xs1 class="self-center ")
			v-btn(fab :disabled="isRotable" v-show="!isExtended" @click="move('right')")
				v-icon(class="fa fa-caret-right")

		v-btn(absolute dark fab	top right color="pink" @click="$refs.input.click()")
			v-icon add
			input(multiple ref="input" type="file" @change="addNewFiles")

</template>

<script>
import PanoImg from '@/components/PanoImg'
import FileDrop from '@/components/FileDrop'
import EventBus, {events} from '@/EventBus'
import PanoFile from '@/PanoFile';


export default {
	name: 'ImageComponent',
	components: {
		PanoImg,
		FileDrop
	},
	
	data () {
		return {
			isExtended: false,
			imgs: [],
		}
	},

	computed: {
		isEmpty() {
			return !this.imgs.length;
		},

		isRotable() {
			return this.imgs.length === 0;
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
			
			files = files.map(this.createPanoImg).filter(file => !!file);

			this.imgs.push(...files);
		},

		createPanoImg(file) {
			let panoImg;

			try {
				panoImg = new PanoFile(file);
			} catch(e) {
				panoImg = null;
				this.$logger.error(e.message);
			}

			return panoImg;
		},

		onSelect(e, imgToFind) {
			const imgIndex = this.imgs.findIndex(img => imgToFind.id === img.id);
			if (!imgIndex === -1) return;

			const img = this.imgs[imgIndex];
			const isCTRLDown = e.metaKey;
			const isSelected = img.isSelected;
			const isMutipleSelection = isCTRLDown || isSelected;

			if (!isCTRLDown) {
				this.deselectAll();
			} 
			
			img.selected = !isSelected;
		
			this.imgs = this.imgs.slice();

			if (!isMutipleSelection) {
				EventBus.$emit(events.SELECT_IMG, img);
			}
		},

		deselectAll() {
			this.imgs.forEach(img => img.selected = false);	
		},

		move(direction) {
			const arr = this.imgs.slice();

			if(direction === 'right') {
				arr.unshift(arr.pop())
			}
			else if(direction === "left") {
				arr.push(arr.shift())
			}

			this.imgs = arr;
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
