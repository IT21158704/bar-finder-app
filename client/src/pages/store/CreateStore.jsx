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

export default function CreateStore() {

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      storeName: data.get('storeName'),
      contactNo: data.get('contactNo'),
      location: {
        line1: data.get('line1'),
        line2: data.get('line2'),
        district: data.get('district'),
        province: data.get('province'),
      },
      openingTime: data.get('openingTime'),
      closingTime: data.get('closingTime'),
    };
    try {
      const store = await authAxios.post(`${apiUrl}/store/create-store`, payload);

      if (store) {
        toast.success('Store Created')
        navigate('../stores');
      }
    } catch (error) {
      if (error.message) {
        toast.error(error.message);
      }
      toast.error(error.response.data.message);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom align='center' marginBottom={2}>
        Create a Store
      </Typography>
      <Card sx={{ padding: 5 }}>
        <Box
          component="form" onSubmit={handleSubmit}
          sx={{
            '& .MuiTextField-root': {
              m: 1,
              width: 300,
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
              id="storeName"
              name="storeName"
              label="Store Name"
              sx={{ maxWidth: '80%' }}
            />
            <TextField
              fullWidth
              id="contactNo"
              name="contactNo"
              label="Contact Number"
              sx={{ maxWidth: '80%' }}
              InputProps={{
                startAdornment: <InputAdornment position="start">+94</InputAdornment>,
              }}
            />
          </div>
          <div>
            <Divider textAlign="left" sx={{ marginTop: 2 }}>Address</Divider>
            <TextField
              id="line1"
              name="line1"
              label="Line 1"
            />
            <TextField
              id="line2"
              name="line2"
              label="Line 2"
            />
            <TextField
              id="district"
              name="district"
              label="District"
              select
            >
              {districts.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="province"
              name="province"
              label="Province"
              select
            >
              {provinces.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div>
            <Divider textAlign="left" sx={{ marginTop: 2, marginBottom: 4 }}>Time 24hrs</Divider>
            <TextField
              id="openingTime"
              label="Opening Time"
              name="openingTime"
            />
            <TextField
              id="closingTime"
              name="closingTime"
              label="Closing Time"
            />
          </div>

          <div style={{ textAlign: 'right', marginTop: 'auto' }}>
            <Button autoFocus color="success" variant="outlined" sx={{ marginRight: 1 }}
              type="submit">
              Create
            </Button>
            <Button color="error" variant="outlined"
              type="reset">
              Reset
            </Button>
          </div>
        </Box>
      </Card>
    </Container>
  )
}
