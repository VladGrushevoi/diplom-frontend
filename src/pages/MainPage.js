import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import CachedIcon from '@material-ui/icons/Cached';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import ListAltIcon from '@material-ui/icons/ListAlt';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { UserRoutes } from './UserRoutes';
import CustomLink from '../Component/Link/Link';
import './MainPage.css'
import { useDispatch, useSelector } from 'react-redux';
import { typeOfOsers } from '../store/partials/Auth/typeUsers';
import { SignOut } from '../store/partials/Auth/actions';
import { useHistory } from 'react-router';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const authState = useSelector(state => state.auth)
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>{<AttachMoneyIcon />}</ListItemIcon>
          <CustomLink to={`/user-cabinet/calculator`}><ListItemText primary="Калькулятор ціни" /></CustomLink>
        </ListItem>
        {authState.status === typeOfOsers.RIELTOR || authState.status === typeOfOsers.ADMIN ?
          <ListItem button>
            <ListItemIcon>{<EmojiEmotionsIcon />}</ListItemIcon>
            <CustomLink to={`/user-cabinet/portitable-orders`}><ListItemText primary="Вигідні пропозиції" /></CustomLink>
          </ListItem>
        :
        <></>
      }
      {authState.status !== typeOfOsers.GUEST ?
          <ListItem button>
            <ListItemIcon>{<ListAltIcon />}</ListItemIcon>
            <CustomLink to={`/user-cabinet/catalog`}><ListItemText primary="Каталог" /></CustomLink>
          </ListItem>
          :
          <></>
      }
      </List>
      {authState.status === typeOfOsers.ADMIN ?
        <>
          <Divider />
          <List>
            <ListItem button>
              <ListItemIcon>{<CachedIcon />}</ListItemIcon>
              <CustomLink to={`/user-cabinet/root-setting`}><ListItemText primary="Оновлення квартир" /></CustomLink>
            </ListItem>
            <ListItem button>
              <ListItemIcon>{<CachedIcon />}</ListItemIcon>
              <CustomLink to={`/user-cabinet/place-manager`}><ListItemText primary="Керування місцями" /></CustomLink>
            </ListItem>
          </List>
        </>
        :
        <></>
      }
      {console.log(authState)}
      {
        authState.status === typeOfOsers.GUEST ?
        <>
            <Divider />
            <List>
              <ListItem button>
                <ListItemIcon>{<AccountBoxIcon />}</ListItemIcon>
                <CustomLink to={`/user-cabinet/sign-in`}><ListItemText primary="Авторизація" /></CustomLink>
              </ListItem>
              <ListItem button>
                <ListItemIcon>{<HowToRegIcon />}</ListItemIcon>
                <CustomLink to={`/user-cabinet/sign-up`}><ListItemText primary="Реєстрація" /></CustomLink>
              </ListItem>
            </List>
        </>
        :
        <>
          <Divider />
          <List>
              <ListItem button onClick={() => {dispatch(SignOut()); history.push("user-cabinet")}}>
                <ListItemIcon>{<HowToRegIcon />}</ListItemIcon>
                <ListItemText primary="Вихід з системи" />
              </ListItem>
            </List>
        </>
      }

    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap style={{ marginLeft: 200 }}>
            {authState.status + " " + authState.email}
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <UserRoutes />
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
