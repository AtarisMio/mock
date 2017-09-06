import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { DatePicker } from 'react-toolbox/lib/date_picker';
import theme from 'react-toolbox/lib/date_picker/theme.css';

const ThemedDatePicker = withStyles(theme)(DatePicker);

export { DatePicker as RawDatePicker } from 'react-toolbox/lib/date_picker/DatePicker';

export { ThemedDatePicker as DatePicker };

export default ThemedDatePicker;