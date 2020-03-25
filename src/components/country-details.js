import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

export default ({country}) => {
    const useStyles = makeStyles({
        table: {
            // minWidth: 650,
        },
    });
    const classes = useStyles();
    if(!country) return null
    return <Table className={classes.table} aria-label="simple table">
      <TableBody>
        {Object.keys(country).map(prop => {
            let propName = prop.charAt(0).toUpperCase() + prop.slice(1);
            let value = prop == 'flag'? <img src={country.flag} width="300" /> : country[prop]; 
          return <TableRow key={prop}>
            <TableCell component="th" scope="row">{propName}</TableCell>
            <TableCell align="center">{value}</TableCell>
          </TableRow>
        })}
      </TableBody>
    </Table>;
}