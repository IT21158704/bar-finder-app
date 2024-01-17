import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormControl, FormLabel, FormControlLabel, Grid } from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { toast } from 'react-toastify';
import axios from 'axios';
import { apiUrl } from '../../utils/Constants';

const Signup = () => {


    const navigate = useNavigate();
    const defaultTheme = createTheme();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const payload = {
            email: data.get('email'),
            password: data.get('password'),
            dob: data.get('dob'),
            contactNo: data.get('contactNo'),
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            role: data.get('role'),
        };
        console.log(payload);
        try {
            const isLoggedin = await axios.post(`${apiUrl}/create`, payload);
            if (isLoggedin) {

                toast.success('Account Created')
                navigate('/login');
            }
        } catch (error) {
            if (error.message) {
                toast.error(error.message);
            }
            toast.error(error.response.data.message);
        }
    };

    return (

        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs"
                        sx={{
                            borderWidth: '2px',
                            marginTop: 8,
                            marginBottom: 4,
                            borderRadius: 5}}>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="contactNo"
                                    required
                                    fullWidth
                                    id="contactNo"
                                    label="Phone"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="dob"
                                    type='date'
                                    label="Date of Birth"
                                    name="dob"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label">I'm a</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="role"
                                    >
                                        <FormControlLabel value="store" control={<Radio />} label="Store owner" />
                                        <FormControlLabel value="customer" control={<Radio />} label="Customer" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end"
                            sx={{ mb: 2 }}>
                            <Grid item>
                                <Link
                                    component="button"
                                    variant="body2"
                                    onClick={() => {
                                        navigate('/login');
                                    }}>
                                    {"Already have an account? Sign in"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default Signup;

{/* <Card>
  <Box sx={{ p: 2, display: 'flex' }}>
    <Avatar variant="rounded" src="avatar.jpg" />
    <Stack spacing={0.5}>
      <Typography fontWeight="bold">Lucas Smith</Typography>
      <Typography variant="body2" color="text.secondary">
      <LocationOn sx={{color: grey[500]}} /> Scranton, PA, United States
      </Typography>
    </Stack>
    <IconButton size="small">
      <Edit fontSize="small" />
    </IconButton>
  </Box>
  <Divider />
  <Stack
    direction="row"
    alignItems="center"
    justifyContent="space-between"
    sx={{ px: 2, py: 1, bgcolor: 'background.default' }}
  >
    <Chip
      label={active ? 'Active account' : 'Inactive account'}
      color={active ? 'success' : 'default'}
      size="small"
    />
    <Switch />
  </Stack>
</Card> */}