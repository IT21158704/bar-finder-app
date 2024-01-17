import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link } from 'react-router-dom';
import { LocalBar, Store } from '@material-ui/icons';
import { Liquor } from '@mui/icons-material';

export const sellerListItems = (
  <React.Fragment>
    <Link to={'/seller/home'}>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>
    </Link>
    <Link to={'/seller/stores'}>
      <ListItemButton>
        <ListItemIcon>
          <Store />
        </ListItemIcon>
        <ListItemText primary="Stores" />
      </ListItemButton>
    </Link>
    <Link to={'/seller/products'}>
      <ListItemButton>
        <ListItemIcon>
          <LocalBar />
        </ListItemIcon>
        <ListItemText primary="Products" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);

export const customerListItems = (
  <React.Fragment>
  <Link to={'/customer'}>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItemButton>
  </Link>
  <Link to={'/dashboard'}>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
  </Link>
  <Link to={'/dashboard'}>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
  </Link>
  <Link to={'/dashboard'}>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
  </Link>
  </React.Fragment>
);

export const guestListItems = (
  <React.Fragment>
  <Link to={'guest'}>
    <ListItemButton>
      <ListItemIcon>
        <Liquor />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItemButton>
  </Link>
  </React.Fragment>
);