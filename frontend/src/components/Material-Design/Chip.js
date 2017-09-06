import { themr } from 'react-css-themr';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { chipFactory } from 'react-toolbox/lib/chip/Chip';
import theme from 'react-toolbox/lib/chip/theme.css';
import { CHIP } from 'react-toolbox/lib/identifiers';

import { Avatar } from './Avatar';

const Chip = chipFactory(Avatar);
const ThemedChip = withStyles(theme)(themr(CHIP, theme)(Chip));

export { Chip as RawChip } from 'react-toolbox/lib/chip/Chip';

export { ThemedChip as Chip };

export default ThemedChip;