import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { Avatar } from 'react-toolbox/lib/avatar';
import theme from 'react-toolbox/lib/avatar/theme.css';

const ThemedAvatar = withStyles(theme)(Avatar);

export { Avatar as RawAvatar } from 'react-toolbox/lib/avatar/Avatar';

export { ThemedAvatar };

export default ThemedAvatar;