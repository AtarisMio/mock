import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { TimePicker } from 'react-toolbox/lib/time_picker';
import theme from 'react-toolbox/lib/time_picker/theme.css';

const ThemedTimePicker = withStyles(theme)(TimePicker);

export { TimePicker as RawTimePicker } from 'react-toolbox/lib/time_picker/TimePicker';

export { ThemedTimePicker as TimePicker };

export default ThemedTimePicker;