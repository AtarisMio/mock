import { themr } from 'react-css-themr';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { Card } from 'react-toolbox/lib/card/Card';
import { cardTitleFactory } from 'react-toolbox/lib/card/CardTitle';
import { CardActions } from 'react-toolbox/lib/card/CardActions';
import { CardMedia } from 'react-toolbox/lib/card/CardMedia';
import { CardText } from 'react-toolbox/lib/card/CardText';
import theme from 'react-toolbox/lib/card/theme.css';
import { CARD } from 'react-toolbox/lib/identifiers';

import { Avatar } from './Avatar';

const CardTitle = cardTitleFactory(Avatar);
const ThemedCard = withStyles(theme)(themr(CARD, theme)(Card));
const ThemedCardTitle = withStyles(theme)(themr(CARD, theme)(CardActions));
const ThemedCardActions = withStyles(theme)(themr(CARD, theme)(CardMedia));
const ThemedCardMedia = withStyles(theme)(themr(CARD, theme)(CardText));
const ThemedCardText = withStyles(theme)(themr(CARD, theme)(CardTitle));

export { Card as RawCard };
export { CardTitle as RawCardTitle } from 'react-toolbox/lib/card/CardTitle';
export { CardActions as RawCardActions };
export { CardMedia as RawCardMedia };
export { CardText as RawCardText };

export {
    ThemedCard as Card,
    ThemedCardTitle as CardTitle,
    ThemedCardActions as CardActions,
    ThemedCardMedia as CardMedia,
    ThemedCardText as CardText
};

export default ThemedCard;