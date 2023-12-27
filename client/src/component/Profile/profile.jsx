import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  styled
} from '@mui/material';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import "./profile.css"
import TopHeader from "../Top Header/TopHeader.jsx";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import axios from 'axios';

const Profile = ({user}) => {
 
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [previousPassword, setPreviousPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [photo, setPhoto] = useState(null);
  const [cancel,setcancel]=useState(false)
  const id =(user===null)?0:user.id
  
const handleUpdateProfile = async () => {
  const profileToUpdate = {
    user_name:fullName,
    user_phOrEmail:email,
    user_password:newPassword,
    user_img:photo
    }
    try {
      const update = await axios.put(`http://localhost:3000/api/BuyMeAll/users/43`, profileToUpdate);
      console.log("Profile updated successfully", update.data);
      alert("Profile updated successfully");
    } catch (error) {
      console.log('Error updating profile:', error);
      alert("Update operation failed");
    }
  };

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});


  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickCancel = () => {
    setFullName('');
    setEmail('');
    setPreviousPassword('');
    setNewPassword('');
    setPhoto(null);
  };

  const handleImageChange = async (e) => {
    const file = e
    const form = new FormData();
    form.append('file', file);
    form.append('upload_preset', 'patient');

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dodim9flq/image/upload',
        form,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const imageUrl = response.data.secure_url;
      console.log(imageUrl);
      setPhoto(imageUrl);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="profileEdit">
      <TopHeader />
      <Header value={3} />
      <div className="profileHeader" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '30px' }}>
        <Typography variant="h4" fontSize="40px" sx={{ fontFamily: 'Georgia, serif', fontWeight: 'bold', textTransform: 'capitalize' }}>
          Edit Profile
        </Typography>
      </div>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center',gap:'90px' }}>
        <div className="profilephotoEdit" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '250px'  }}>
          <input
            accept="image/*"
            type="file"
            style={{ display: 'none' }}

          />
          
            <img
              src={photo}
              alt="Profile Photo"
              style={{ width: '250px', borderRadius: '50%', objectFit: 'cover' }}
            />
          
          <div className="input-div">
              <label className="file-label">
                <input
                  className="input"
                  name="picture"
                  type="file"
                  onChange={(e)=>{handleImageChange(e.target.files[0])}}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="icon"
                >
                  <polyline points="16 16 12 12 8 16"></polyline>
                  <line y2="21" x2="12" y1="12" x1="12"></line>
                  <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
                  <polyline points="16 16 12 12 8 16"></polyline>
                </svg>
              </label>
            </div>
        </div>
        <div className="profileEditInfo" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '20px' ,width:'30%' }}>
          <Grid item xs={5} sm={5}>
            <form >
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    label="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    type="email"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Previous Password"
                    type={showPassword ? 'text' : 'password'}
                    value={previousPassword}
                    onChange={(e) => setPreviousPassword(e.target.value)}
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton edge="end" onClick={handleClickShowPassword}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="New Password"
                    type={showPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton edge="end" onClick={handleClickShowPassword}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '80px' }}>
                  <Button item xs={12} type="submit" variant="contained" color="success" onClick={()=>{handleUpdateProfile()}}>
                    Save
                  </Button>
                  <Button item xs={12} onClick={handleClickCancel} variant="outlined" color="error" >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </div>
      </Box>
      <Footer />
    </div>
  );
};

export default Profile;
