import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { Autocomplete } from 'react-toolbox/lib/autocomplete';
import theme from 'react-toolbox/lib/autocomplete/theme.css';

const ThemedAutocomplete = withStyles(theme)(Autocomplete);

export { Autocomplete as RawAutocomplete } from 'react-toolbox/lib/autocomplete/Autocomplete';

export { ThemedAutocomplete };

export default ThemedAutocomplete;