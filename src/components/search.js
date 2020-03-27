import React, {useEffect} from 'react'
import {Provider, connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import InputBase from '@material-ui/core/InputBase'
import { fade, makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import {fillSearch} from '../actions'

const useStyles = makeStyles(theme => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const Search = withRouter((props) => {
    
    const {pathname} = props.location
    const pathnameLetter = pathname.substring(1,2)
    const {history, dispatch, search} = props
    const classes = useStyles();
    // const [searchValue, setSearch] = useState('')
    const onChangeSearch = ({target:{value}}) => {

        if(value){
            const letter = value.substring(0,1)
            
            if(letter !== pathnameLetter){
              history.push('/'+letter)
            }

        } else {
            if(pathname.length > 1){
                history.push('/')
            }
        }
        dispatch(fillSearch(value))
    }

    useEffect(()=>{
        if(search && pathnameLetter && pathnameLetter !== search.substring(0,1)){
            dispatch(fillSearch(pathnameLetter))
        }
    }, [pathname])

    return <div className={classes.search}>
        <div className={classes.searchIcon}>
            <SearchIcon />
        </div>
        <InputBase
            placeholder="Search…"
            classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
            autoFocus
            value={search}
            onChange={onChangeSearch} // ({target:{value}})=>{setSearch(value)}
        />
    </div>;
})

export default connect((state) => {
    return state;
})(Search);
