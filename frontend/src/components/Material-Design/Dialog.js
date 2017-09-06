import { themr } from 'react-css-themr';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { dialogFactory } from 'react-toolbox/lib/dialog/Dialog';
import theme from 'react-toolbox/lib/dialog/theme.css';
import { DIALOG } from 'react-toolbox/lib/identifiers';

import { Overlay } from './Overlay';
import { Button } from './Button';

const Dialog = dialogFactory(Overlay, Button);
const ThemedDialog = withStyles(theme)(themr(DIALOG, theme)(Dialog));

export { Dialog as RawDialog } from 'react-toolbox/lib/dialog/Dialog';

export { ThemedDialog as Dialog };

export default ThemedDialog;