import { themr } from 'react-css-themr';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { avatarFactory } from 'react-toolbox/lib/avatar/Avatar';
import theme from 'react-toolbox/lib/avatar/theme.css';
import { AVATAR } from 'react-toolbox/lib/identifiers';

import { FontIcon } from './FontIcon';

const Avatar = avatarFactory(FontIcon);
const ThemedAvatar = withStyles(theme)(themr(AVATAR, theme)(Avatar));

export { Avatar as RawAvatar } from 'react-toolbox/lib/avatar/Avatar';

export { ThemedAvatar as Avatar };

export default ThemedAvatar;