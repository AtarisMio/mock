import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { Chip } from 'react-toolbox/lib/chip';
import theme from 'react-toolbox/lib/chip/theme.css';

const ThemedChip = withStyles(theme)(Chip);

export { Chip as RawChip } from 'react-toolbox/lib/chip/Chip';

export { ThemedChip as Chip };

export default ThemedChip;