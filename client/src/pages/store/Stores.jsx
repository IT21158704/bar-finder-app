import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import AddIcon from '@mui/icons-material/Add';
import { Delete, Edit, Save, Store } from '@material-ui/icons';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
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
import TextField from '@mui/material/TextField';
import { Box, Divider } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import { provinces, districts } from '../../components/DataSets'
import Loader from '../../components/Loader/Loader';

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
  const [openEdit, setOpenEdit] = React.useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [updateFormData, setUpdateFormData] = useState({
    _id: '',
    storeName: '',
    contactNo: '',
    openingTime: '',
    closingTime: '',
    location: {
      line1: '',
      line2: '',
      district: '',
      province: ''
    },
  });


  const handleUpdateStore = (row) => {
    setOpenEdit(true);
    setUpdateFormData({
      _id: row._id,
      storeName: row.storeName,
      contactNo: row.contactNo,
      openingTime: row.openingTime,
      closingTime: row.closingTime,
      location: {
        line1: row.location.line1,
        line2: row.location.line2,
        district: row.location.district,
        province: row.location.province
      },
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const getStoreDetails = async () => {
    try {
      const response = await authAxios.get(`${apiUrl}/store/get-my-stores`);
      setStores(response.data.storesData);
      setIsLoading(false)
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

  const handleUpdate = async () => {
    try {
      const result = await authAxios.put(`${apiUrl}/store/update-store/${updateFormData._id}`, updateFormData);

      if (result) {
        getStoreDetails();
        handleCloseEdit();
        toast.success('Notice Updated Successfully');
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <Container>
      {
        !isLoading ? <>
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
                    <Button onClick={() => navigate(`../storeProducts/${store._id}`)} >View Products</Button>
                    <div style={{ marginLeft: 'auto' }}>
                      <Tooltip title="edit">
                        <IconButton aria-label="edit"
                          onClick={() => {
                            handleUpdateStore(store);
                          }}>
                          <Edit />
                        </IconButton>
                      </Tooltip>

                      <Dialog onClose={handleCloseEdit} open={openEdit}>
                        <DialogTitle sx={{ textAlign: 'center' }}>
                          Edit store '{store.storeName}'
                        </DialogTitle>
                        <IconButton
                          aria-label="close"
                          onClick={handleCloseEdit}
                          sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                          }}
                        >
                          <CloseIcon />
                        </IconButton>
                        <DialogContent>
                          <Box
                            sx={{
                              '& .MuiTextField-root': {
                                m: 1,
                                width: 500,
                                maxWidth: '100%',
                              },
                            }}
                            noValidate
                            autoComplete="off"
                          >
                            <div>
                              <Divider textAlign="left">Details</Divider>
                              <TextField
                                fullWidth
                                id="storeNamet"
                                label="Store Name"
                                sx={{ maxWidth: '80%' }}
                                onChange={(e) => setUpdateFormData({ ...updateFormData, storeName: e.target.value })}
                                value={updateFormData.storeName}
                              />
                              <TextField
                                fullWidth
                                id="contactNo"
                                label="Contact Number"
                                sx={{ maxWidth: '80%' }}
                                InputProps={{
                                  startAdornment: <InputAdornment position="start">+94</InputAdornment>,
                                }}
                                onChange={(e) => setUpdateFormData({ ...updateFormData, contactNo: e.target.value })}
                                value={updateFormData.contactNo}
                              />
                            </div>
                            <div>
                              <Divider textAlign="left" sx={{ marginTop: 2 }}>Address</Divider>
                              <TextField
                                id="line1"
                                label="Line 1"
                                onChange={(e) => setUpdateFormData({ ...updateFormData, location: { ...updateFormData.location, line1: e.target.value } })}
                                value={updateFormData.location.line1}
                              />
                              <TextField
                                id="line2"
                                label="Line 2"
                                onChange={(e) => setUpdateFormData({ ...updateFormData, location: { ...updateFormData.location, line2: e.target.value } })}
                                value={updateFormData.location.line2}
                              />
                              <TextField
                                id="district"
                                label="District"
                                select
                                onChange={(e) => setUpdateFormData({ ...updateFormData, location: { ...updateFormData.location, district: e.target.value } })}
                                value={updateFormData.location.district}
                              >
                                {districts.map((option) => (
                                  <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                  </MenuItem>
                                ))}
                              </TextField>
                              <TextField
                                id="province"
                                label="Province"
                                select
                                onChange={(e) => setUpdateFormData({ ...updateFormData, location: { ...updateFormData.location, province: e.target.value } })}
                                value={updateFormData.location.province}
                              >
                                {provinces.map((option) => (
                                  <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </div>
                            <div>
                              <Divider textAlign="left" sx={{ marginTop: 2 }}>Time</Divider>
                              <TextField
                                id="openingTime"
                                label="Opening Time"
                                onChange={(e) => setUpdateFormData({ ...updateFormData, openingTime: e.target.value })}
                                value={updateFormData.openingTime}
                              />
                              <TextField
                                id="closingTime"
                                label="Closing Time"
                                onChange={(e) => setUpdateFormData({ ...updateFormData, closingTime: e.target.value })}
                                value={updateFormData.closingTime}
                              />
                            </div>
                          </Box>
                        </DialogContent>
                        <DialogActions sx={{ justifyContent: 'center' }}>

                          <Button autoFocus color="success" onClick={handleUpdate}>
                            Save
                          </Button>

                          <Button color="error" onClick={handleCloseEdit}>
                            Cancel
                          </Button>
                        </DialogActions>
                      </Dialog>

                      <Tooltip title="delete">
                        <IconButton aria-label="delete" onClick={handleClickOpen}>
                          <Delete />
                        </IconButton>
                      </Tooltip>
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
                          }}>
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
              <Tooltip title="create store">
                <Link component="button" onClick={() => navigate(`../CreateStore`)}>
                  <AddIcon style={{ width: 150, height: 150, color: '#444', borderWidth: '2px', borderRadius: 100, borderStyle: 'dashed' }} />
                </Link>
              </Tooltip>
            </Grid>
          </Grid>
        </> : <Loader />
      }
    </Container>
  );
}
