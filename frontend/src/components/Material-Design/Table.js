import withStyles from 'isomorphic-style-loader/lib/withStyles';

import {
    Table,
    TableHead,
    TableRow,
    TableCell
} from 'react-toolbox/lib/table';
import theme from 'react-toolbox/lib/table/theme.css';

const ThemedTable = withStyles(theme)(Table);
const ThemedTableHead = withStyles(theme)(TableHead);
const ThemedTableRow = withStyles(theme)(TableRow);
const ThemedTableCell = withStyles(theme)(TableCell);

export { Table as RawTable } from 'react-toolbox/lib/table/Table';
export { TableHead as RawTableHead } from 'react-toolbox/lib/table/TableHead';
export { TableRow as RawTableRow } from 'react-toolbox/lib/table/TableRow';
export { TableCell as RawTableCell } from 'react-toolbox/lib/table/TableCell';

export {
    ThemedTable as Table,
    ThemedTableHead as TableHead,
    ThemedTableRow as TableRow,
    ThemedTableCell as TableCell
};

export default ThemedTable;