import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { Slider } from 'react-toolbox/lib/slider';
import theme from 'react-toolbox/lib/slider/theme.css';

const ThemedSlider = withStyles(theme)(Slider);

export { Slider as RawSlider } from 'react-toolbox/lib/slider/Slider';

export { ThemedSlider };

export default ThemedSlider;