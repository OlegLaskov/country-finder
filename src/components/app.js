import React, {useEffect} from 'react'
import {fetchCountries} from '../actions'
import {Route, BrowserRouter as Router} from 'react-router-dom'
import SideBar from './side-bar'
import BackButton from './back-button'
import CountryDetails from './country-details'
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export default (props) => {
    const {data, loading, error, dispatch} = props

    useEffect(()=>{
        if(!data){
            dispatch(fetchCountries())
        }
    }, [])

    const drawerWidth = 80, drawerWidthS = 240;
    const useStyles = makeStyles(theme => ({
        root: {
            display: 'flex',
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerS: {
            width: drawerWidthS,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        drawerPaperS: {
            width: drawerWidthS,
            position: "absolute",
            left: drawerWidth
        },
        toolbar: theme.mixins.toolbar,
        content: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.default,
            padding: theme.spacing(3),
            
        },
        title: {
            flexGrow: 1,
        },
    }));

    const classes = useStyles();
    console.log('data', data)

    if(loading) return <p>Loading...</p>;
    if(error) return <p>Error, try again</p>;

    return (<Router>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            Country finder
                        </Typography>
                        <BackButton />
                    </Toolbar>
                </AppBar>
                    
                <Route path={"/:letter?/:country?"} render={({match: {params:{
                    letter, country}, url}}) => {

                    return <React.Fragment>

                    <Drawer
                        className={classes.drawer}
                        variant="permanent"
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        anchor="left"
                    >
                        <div className={classes.toolbar} />
                        <Divider />

                        <SideBar id={letter} list={Object.keys(data)} sort={true} showInUpperCase={true} path={url} level={0} />
                    </Drawer>
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        <div className={classes.root}>
                            <Drawer className={classes.drawerS}
                                variant="permanent"
                                classes={{
                                    paper: classes.drawerPaperS,
                                }}
                                anchor="left" >
                                <div className={classes.toolbar} />
                                <Divider />
                                <SideBar id={country} list={letter && data[letter] && Object.keys(data[letter])} path={url} level={1} />
                            </Drawer>
                            <CountryDetails country={country && data[letter][country]} />
                        </div>
                    </main>
                </React.Fragment>}
                } />
            </div>
        </Router>);
}