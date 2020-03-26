import React from 'react'
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';

export default ({id, list, showInUpperCase, sort, path, level, drawerClasses, drawerPaperClasses, toolbarClasses}) => {

    const toPath = !level ? '/' : '/' + path[1] + '/';

    if(!list || !(list.length)) return null;

    sort && (list.sort((a, b) => a.localeCompare(b)));
    
    return <Drawer
            className={drawerClasses}
            variant="permanent"
            classes={{
                paper: drawerPaperClasses,
            }}
            anchor="left"
        >
            <div className={toolbarClasses} />
            <Divider />

            <List>
                {list && list.map((text) => (
                    <Link key={text} to={toPath+encodeURIComponent(text)}>
                        <ListItem button selected={text==id} >
                            <ListItemText primary={showInUpperCase && text.toUpperCase() || text} />
                        </ListItem>
                    </Link>
                ))}
            </List>
        </Drawer>;
}