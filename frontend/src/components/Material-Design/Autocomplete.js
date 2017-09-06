import { themr } from 'react-css-themr';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { autocompleteFactory } from 'react-toolbox/lib/autocomplete/Autocomplete';
import theme from 'react-toolbox/lib/autocomplete/theme.css';
import { AUTOCOMPLETE } from 'react-toolbox/lib/identifiers';

import { Chip } from './Chip';
import { Input } from './Input';

const Autocomplete = autocompleteFactory(Chip, Input);
const ThemedAutocomplete = withStyles(theme)(themr(AUTOCOMPLETE, theme)(Autocomplete));

export { Autocomplete as RawAutocomplete } from 'react-toolbox/lib/autocomplete/Autocomplete';

export { ThemedAutocomplete as Autocomplete };

export default ThemedAutocomplete;