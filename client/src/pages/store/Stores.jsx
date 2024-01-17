import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import AddIcon from '@mui/icons-material/Add';
import { Delete, Edit, Store } from '@material-ui/icons';
import Tooltip from '@mui/material/Tooltip';
import authAxios from '../../utils/authAxios';
import { apiUrl } from '../../utils/Constants';
import { toast } from 'react-toastify';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function Stores() {
  const [stores, setStores] = useState([]);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getStoreDetails = async () => {
    try {
      const response = await authAxios.get(`${apiUrl}/store/get-my-stores`);
      setStores(response.data.storesData);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 404) {
        toast.error('Stores not found.');
      } else {
        // toast.error(error.response?.data?.message || 'An error occurred');
      }
    }
  };

  useEffect(() => {
    getStoreDetails();
  }, []);


  const DeleteStore = async (id) => {
    try {
      const result = await authAxios.delete(`${apiUrl}/store/delete-store/${id}`);
      if (result) {
        getStoreDetails();
        handleClose();
        toast.warning('Store Deleted Successfully');
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Container>
      <Grid container spacing={3}>
        {stores.map((store, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ maxWidth: 330 }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    <Store />
                  </Avatar>
                }
                title={
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {store.storeName}
                  </Typography>
                }
                subheader={store.createdAt}
              />
              <CardContent>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                  <span style={{ fontWeight: 'bold', color: '#444' }}>Opening Time:</span> {store.openingTime}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                  <span style={{ fontWeight: 'bold', color: '#444' }}>Closing Time:</span> {store.closingTime}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                  <span style={{ fontWeight: 'bold', color: '#444' }}>Address: </span>
                  {store.location.line1}, {store.location.line2}, {store.location.district}, {store.location.province}
                </Typography>
              </CardContent>
              <CardActions disableSpacing sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Button>View Products</Button>
                <div style={{ marginLeft: 'auto' }}>
                  <Tooltip title="edit">
                    <IconButton aria-label="edit">
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="delete">
                    <IconButton aria-label="delete" onClick={handleClickOpen}>
                      <Delete />
                    </IconButton></Tooltip>
                  <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                  >
                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                      Are you sure you want to delete this store? '{store.storeName}'
                    </DialogTitle>
                    <IconButton
                      aria-label="close"
                      onClick={handleClose}
                      sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                    <DialogContent dividers>
                      <Typography gutterBottom>
                        Deleting this store will permanently remove all associated products. This action cannot be undone.
                      </Typography>
                      <Typography gutterBottom>
                        Please confirm your decision to proceed with the deletion.
                      </Typography>
                    </DialogContent>
                    <DialogActions>
                      <Button autoFocus onClick={() => DeleteStore(store._id)} color="error">
                        Delete
                      </Button>
                    </DialogActions>
                  </BootstrapDialog>
                </div>
              </CardActions>
            </Card>
          </Grid>
        ))}
        <Grid item xs={12} sm={6} md={4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Tooltip title="add store">
            <Link component="button"
              onClick={() => {
                navigate('/signup');
              }}>
              <AddIcon style={{ width: 150, height: 150, color: '#444' }} />
            </Link>
          </Tooltip>
        </Grid>



      </Grid>
    </Container>
  );
}
