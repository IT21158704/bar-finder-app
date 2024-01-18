import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import authAxios from '../../utils/authAxios';
import { apiUrl } from '../../utils/Constants';
import { toast } from 'react-toastify';
import { stringAvatar } from './Dashboard'
import Loader from '../../components/Loader/Loader';
// Use Tailwind CSS classes
const CenteredContainer = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '65vh',
}));

const ProfilePaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.primary,
}));

// React functional component
const UserProfile = () => {

  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getUserDetails = async () => {
    try {
      const response = await authAxios.get(`${apiUrl}/get-user`);
      setUser(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 404) {
        toast.error('user profile not found.');
      } else {
        // toast.error(error.response?.data?.message || 'An error occurred');
      }
    }
  };

  useEffect(() => {
    getUserDetails()
    console.log(user);
  }, []);

  return (
    <CenteredContainer container>
      {
        !isLoading ? <>
          <Grid item xs={12} sm={8} md={6} lg={4}>
            <ProfilePaper elevation={3}>
              {/* Avatar */}
              <Avatar {...stringAvatar(`${user.firstName} ${user.lastName}`)}
                sx={{ width: 100, height: 100, margin: '0 auto' }}
              />

              <Typography variant="h5" sx={{ marginTop: 1 }}>
                {user.firstName} {user.lastName}
              </Typography>

              <Typography variant="caption" display="block" sx={{ marginBottom: 1 }}>
                {user.role}
              </Typography>

              <Divider sx={{ marginBottom: 2 }} />

              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                <span style={{ fontWeight: 'bold', color: '#444' }}>Email:</span> {user.email}
              </Typography>

              {/* Phone Number */}
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                <span style={{ fontWeight: 'bold', color: '#444' }}>Phone:</span> {user.contactNo}
              </Typography>

              {/* Phone Number */}
              <Typography variant="body1" sx={{ marginBottom: 3 }}>
                <span style={{ fontWeight: 'bold', color: '#444' }}>Create Date:</span> {user.createdAt}
              </Typography>
              <div>
                <Button>Edit</Button>
                <Button>Delete</Button>
              </div>
            </ProfilePaper>
          </Grid>
        </> : <Loader />
      }
    </CenteredContainer>
  );
};

export default UserProfile;
