import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { RadioButton, RadioGroup } from 'react-toolbox/lib/radio';
import theme from 'react-toolbox/lib/radio/theme.css';

const ThemedRadioButton = withStyles(theme)(RadioButton);
const ThemedRadioGroup = withStyles(theme)(RadioGroup);

export { RadioButton as RawRadioButton } from 'react-toolbox/lib/radio/RadioButton';
export { RadioGroup as RawRadioGroup } from 'react-toolbox/lib/radio/RadioGroup';

export {
    ThemedRadioButton as RadioButton,
    ThemedRadioGroup as RadioGroup
};

export default ThemedRadioButton;