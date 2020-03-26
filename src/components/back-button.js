import React from 'react'
import {Route, BrowserRouter as Router, Link, withRouter} from 'react-router-dom'
import Button from '@material-ui/core/Button';


export default withRouter(({location: {pathname}}) => {
    console.log('Button: props=', pathname)
    
    return <Button 
            component={Link} 
            to={pathname.length > 3 ? pathname.substring(0,2) : '/'} 
            color="inherit"
            disabled={pathname.length < 2} 
            >
                Back
            </Button>
    })

