import { themr } from 'react-css-themr';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { sliderFactory } from 'react-toolbox/lib/slider/Slider';
import theme from 'react-toolbox/lib/slider/theme.css';
import { SLIDER } from 'react-toolbox/lib/identifiers';

import { ProgressBar } from './ProgressBar';
import { Input } from './Input';

const Slider = sliderFactory(ProgressBar, Input)
const ThemedSlider = withStyles(theme)(themr(SLIDER, theme)(Slider));

export { Slider as RawSlider } from 'react-toolbox/lib/slider/Slider';

export { ThemedSlider as Slider };

export default ThemedSlider;