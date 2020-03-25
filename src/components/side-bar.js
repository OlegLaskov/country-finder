import React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';

export default ({id, list, showInUpperCase, sort, path, level}) => {
    
    const toPath = !level ? '/' : '/' + path[1] + '/';

    if(!list || !(list.length)) return null;

    sort && (list.sort((a, b) => a.localeCompare(b)));

    return <List>
                {list && list.map((text) => (
                    <Link key={text} to={toPath+encodeURIComponent(text)}>
                        <ListItem button selected={text==id} >
                            <ListItemText primary={showInUpperCase && text.toUpperCase() || text} />
                        </ListItem>
                    </Link>
                ))}
            </List>;
}