import { themr } from 'react-css-themr';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { tableFactory } from 'react-toolbox/lib/table/Table';
import { tableHeadFactory } from 'react-toolbox/lib/table/TableHead';
import { tableRowFactory } from 'react-toolbox/lib/table/TableRow';
import { tableCellFactory } from 'react-toolbox/lib/table/TableCell';
import theme from 'react-toolbox/lib/table/theme.css';
import { TABLE } from 'react-toolbox/lib/identifiers';

import { Checkbox } from './Checkbox';
import { FontIcon } from './FontIcon';

const TableCell = tableCellFactory(FontIcon);
const ThemedTableCell = withStyles(theme)(themr(TABLE, theme)(TableCell));
const TableHead = tableHeadFactory(Checkbox, ThemedTableCell);
const ThemedTableHead = withStyles(theme)(themr(TABLE, theme)(TableHead));
const TableRow = tableRowFactory(Checkbox, ThemedTableCell);
const ThemedTableRow = withStyles(theme)(themr(TABLE, theme)(TableRow));
const Table = tableFactory(ThemedTableHead, ThemedTableRow);
const ThemedTable = withStyles(theme)(themr(TABLE, theme)(Table));

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