import ExifReader from 'exifreader';

export default class PanoFile {
	constructor(file) {
		PanoFile.validateParams(file);

		this.id         = PanoFile.generateID();
		this.name       = file.name;
		this.file       = file;
		this.isSelected = false;

		this.properties = null;
		this.metadata   = null;
		this.resolution = null;
		this.dataUrl    = null;

		Promise.all([
			this.getImgResolution(), 
			this.getImgMetadata()
		])
			.then(this.onProcessed.bind(this))
			.catch(this.handleExifReaderError.bind(this));
	}

	get selected() {
		return this.isSelected;
	}

	set selected(val) {
		this.isSelected = val;
	}

	get isFileProcessed() {
		return !!this.properties;
	}

	get preview() {
		return this.dataUrl;
	}

	onProcessed() {
		return this.properties = {
			make: this.metadata.Make,
			model: this.metadata.Model,
			date: this.metadata.DateTime,
			software: this.metadata.Software,
			location: {
				lat: this.metadata.GPSLatitude,
				long: this.metadata.GPSLongitud
			},
			resolution: this.resolution,
			POV: this.metadata.PoseHeadingDegrees
		}
	}

	getImgResolution() {
		const that = this;
		return new Promise(resolve => {
			const reader = new FileReader();
			reader.onload = (e) => {
				const img = new Image();
				this.dataUrl = e.target.result;
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
	}

	handleExifReaderError(e) {
		const error = {message: '', id: ''};

		if(e.message === 'Invalid image format') {
			error.message = 'Maybe is the screenshot type';
			error.id = "invalidFormat"
		} else {
			error.id = 'unknown';
			error.message = `Unknow: ${e.message}`;
		}
		
		throw error;
	}

	getImgMetadata() {
		const that = this;

		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = (e) => {
				let metadata;

				try {
					metadata = ExifReader.load(e.target.result);
					metadata = PanoFile.processMetadata(metadata);
					that.metadata = metadata;
					resolve(metadata);
				} catch(e) {
					reject(e);
				}
			}
			reader.readAsArrayBuffer(this.file.slice(0, 128 * 1024));
		});
	}
}

PanoFile.validateParams = (file) => {
	if(!(file instanceof File)) {
		throw new Error('file parameter needs to be an instance of File');
	}
}

PanoFile.generateID = () => {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}

PanoFile.processMetadata = (metadata) => {
	const data = {};

	Object.entries(metadata).forEach(([key, value]) => {
		if(value.description) {
			data[key] = value.description;

		} else if(Array.isArray(value.value) && value.value.length === 1) {
			data[key] = value.value[0];

		} else {
			data[key] = value.value;
		}
	});

	return data;
}