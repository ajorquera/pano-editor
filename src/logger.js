import logger, { TRACE } from 'universal-logger';
import { styleable } from 'universal-logger-browser';

const log = logger().use(styleable()).on('log', () => {
	// Custom log processing

});

log.disableStackTrace();
log.setLevel(TRACE);

export default log;