import React, {useEffect} from 'react'
import { Link } from 'react-router-dom';
import {List, ListItem, ListItemText, Drawer, Divider} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export default ({id, list, showInUpperCase, sort, path, level, drawerClasses, drawerPaperClasses, search, history}) => {

    const toPath = !level ? '/' : '/' + path[1] + '/';
    let toSelect;
    const noFound = 'No countries were found', 
        selectLetterOrStartTyping = 'Select letter or start typing the name of the country in the search field',
        prompt = (mes) => <h2>{mes}</h2>

    if(!list || !(list.length)) {
        const message = path.length > 1 ? noFound : selectLetterOrStartTyping
        return prompt(message);
    }

    const filtredList = level && search && list && list.length && 
        (list = list.filter((item) => (item.toLowerCase().startsWith(search.toLowerCase())))) 
        || list;

    if(filtredList && filtredList.length === 1){
        toSelect = toPath + filtredList[0];
    } else if(filtredList && filtredList.length > 1) {
        sort && (filtredList.sort((a, b) => a.localeCompare(b)));
    }

    useEffect(()=>{
        if(history && toSelect && toSelect !== path && path.substring(3) !== filtredList[0]){
            history.push(toSelect);
        } else if(history && (!filtredList || filtredList.length === 0) && path.length > 2) {
            history.push(path.substring(0,2))
        }
    }, [filtredList])

    const useStyles = makeStyles(theme => ({
        toolbar: theme.mixins.toolbar,
        link: {
            textDecoration: 'none'
        },
    }));

    const classes = useStyles();

    if(!filtredList || filtredList.length === 0){
        return prompt(noFound);
    }

    return <Drawer
            className={drawerClasses}
            variant="permanent"
            classes={{
                paper: drawerPaperClasses,
            }}
            anchor="left"
        >
            <div className={classes.toolbar} />
            <Divider />

            <List>
                {filtredList && filtredList.map((text) => (
                    <Link key={text} to={toPath+encodeURIComponent(text)} className={classes.link}>
                        <ListItem button selected={text==id} >
                            <ListItemText
                                primary={showInUpperCase && text.toUpperCase() || text} />
                        </ListItem>
                    </Link>
                ))}
            </List>
        </Drawer>;
}