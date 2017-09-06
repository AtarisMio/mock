import { themr } from 'react-css-themr';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { timePickerFactory } from 'react-toolbox/lib/time_picker/TimePicker';
import timePickerDialogFactory from 'react-toolbox/lib/time_picker/TimePickerDialog';

import theme from 'react-toolbox/lib/time_picker/theme.css';
import { TIME_PICKER } from 'react-toolbox/lib/identifiers';

import { Dialog } from './Dialog';
import { Input } from './Input';

const TimePickerDialog = timePickerDialogFactory(Dialog);
const TimePicker = timePickerFactory(TimePickerDialog, Input)
const ThemedTimePicker = withStyles(theme)(themr(TIME_PICKER, theme)(TimePicker));

export { TimePicker as RawTimePicker } from 'react-toolbox/lib/time_picker/TimePicker';

export { ThemedTimePicker as TimePicker };

export default ThemedTimePicker;