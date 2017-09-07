import history from '../../history';
import { linkPrefix } from '../../globalVariables';

export const to = (href) => {
    href.replace(new RegExp(`^${linkPrefix}`, ''));
    if (/^(http:\/\/|https:\/\/|\/\/)/i.test(href)) {
        window.location.href = href;
        return;
    }
    history.push(linkPrefix + href);
};

export default to;