import { themr } from 'react-css-themr';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { datePickerFactory } from 'react-toolbox/lib/date_picker/DatePicker';
import datePickerDialogFactory from 'react-toolbox/lib/date_picker/DatePickerDialog';
import calendarFactory from 'react-toolbox/lib/date_picker/Calendar';
import theme from 'react-toolbox/lib/date_picker/theme.css';
import { DATE_PICKER } from 'react-toolbox/lib/identifiers';

import { IconButton } from './Button';
import { Input } from './Input';
import { Dialog } from './Dialog';

const Calendar = calendarFactory(IconButton);
const DatePickerDialog = datePickerDialogFactory(Dialog, Calendar);
const DatePicker = datePickerFactory(Input, DatePickerDialog);
const ThemedDatePicker = withStyles(theme)(themr(DATE_PICKER, theme)(DatePicker));
const ThemedDatePickerDialog = withStyles(theme)(themr(DATE_PICKER, theme)(DatePickerDialog));

export { DatePicker as RawDatePicker } from 'react-toolbox/lib/date_picker/DatePicker';
export { DatePickerDialog as RawDatePickerDialog } from 'react-toolbox/lib/date_picker/DatePickerDialog';

export { ThemedDatePicker as DatePicker, ThemedDatePickerDialog as DatePickerDialog };

export default ThemedDatePicker;