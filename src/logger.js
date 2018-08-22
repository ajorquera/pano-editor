import logger, { TRACE } from 'universal-logger';
import { minimal, styleable } from 'universal-logger-browser';

const log = logger().use(minimal({
	showSource: true,
	useNativeConsoleMethods: true
})).use(styleable({
	showSource: true,
	showTimestamp: true,
	style: {
		level: {
			silly: { // Custom log level
				backgroundColor: '#FFF',
				border: '1px solid #222',
				color: '#222',
				lineHeight: 2,
				padding: '2px 5px'
			}
		}
	}
})).on('log', () => {
	// Custom log processing
});

//log.enableStackTrace();
log.setLevel(TRACE);

export default log;