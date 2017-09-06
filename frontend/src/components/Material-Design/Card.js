import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { Card, CardTitle, CardActions, CardMedia, CardText } from 'react-toolbox/lib/card';
import theme from 'react-toolbox/lib/card/theme.css';

const ThemedCard = withStyles(theme)(Card);
const ThemedCardTitle = withStyles(theme)(CardTitle);
const ThemedCardActions = withStyles(theme)(CardActions);
const ThemedCardMedia = withStyles(theme)(CardMedia);
const ThemedCardText = withStyles(theme)(CardText);

export { Card as RawCard } from 'react-toolbox/lib/card/Card';
export { CardTitle as RawCardTitle } from 'react-toolbox/lib/card/CardTitle';
export { CardActions as RawCardActions } from 'react-toolbox/lib/card/CardActions';
export { CardMedia as RawCardMedia } from 'react-toolbox/lib/card/CardMedia';
export { CardText as RawCardText } from 'react-toolbox/lib/card/CardText';

export {
    ThemedCard as Card,
    ThemedCardTitle as CardTitle,
    ThemedCardActions as CardActions,
    ThemedCardMedia as CardMedia,
    ThemedCardText as CardText
};

export default ThemedCard;