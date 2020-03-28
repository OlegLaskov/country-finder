import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {Table, TableBody, TableCell, TableRow, Typography} from '@material-ui/core';

export default ({country}) => {
    const useStyles = makeStyles({
        head: {
            paddingLeft: 16,
            paddingRight: 16,
        },
        table: {
            minWidth: 650,
        },
    });
    const classes = useStyles();
    if(!country) return null
    return <div>
        <Typography className={classes.head} variant="h3" component="h3">{country.name}</Typography>
        <Table className={classes.table} aria-label="simple table">
            <TableBody>
                {Object.keys(country).map(prop => {
                    if(prop === 'name') return null
                    let propName = prop.charAt(0).toUpperCase() + prop.slice(1);
                    let value = prop === 'flag'? <img src={country.flag} width="300" /> : country[prop];
                    if (prop === 'population') value = value.toLocaleString();
                    return <TableRow key={prop}>
                            <TableCell component="th" scope="row">{propName}</TableCell>
                            <TableCell align="center">{value}</TableCell>
                        </TableRow>
                })}
            </TableBody>
        </Table>
    </div>;
}