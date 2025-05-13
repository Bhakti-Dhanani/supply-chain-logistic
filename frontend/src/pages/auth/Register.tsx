import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { api } from '../../utils/api';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Container,
  InputAdornment,
  IconButton,
  Avatar,
  CircularProgress
} from '@mui/material';
import { 
  Email as EmailIcon,
  Person as PersonIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff
} from '@mui/icons-material';
import { 
  Store as VendorIcon,
  Warehouse as WarehouseIcon,
  LocalShipping as TransporterIcon
} from '@mui/icons-material';

const roleMapping: Record<string, string> = {
  Admin: 'Admin',
  Vendor: 'Vendor',
  'Warehouse Manager': 'WarehouseManager',
  Transporter: 'Transporter',
};

const Register: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedRole = location.state?.role || '';
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const mappedRole = roleMapping[selectedRole] || selectedRole;
    const dataToSubmit = { ...formData, role: mappedRole };

    try {
      await api.post('/auth/register', dataToSubmit);
      navigate('/login', { state: { registrationSuccess: true } });
    } catch (error) {
      console.error('Error during registration:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleIcon = () => {
    switch (selectedRole) {
      case 'VENDOR':
        return <VendorIcon fontSize="large" />;
      case 'WAREHOUSE MANAGER':
        return <WarehouseIcon fontSize="large" />;
      case 'TRANSPORTER':
        return <TransporterIcon fontSize="large" />;
      default:
        return <PersonIcon fontSize="large" />;
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ 
        p: 4,
        borderRadius: 2,
        backgroundColor: 'background.paper'
      }}>
        <Box sx={{ 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 4
        }}>
          <Avatar sx={{ 
            bgcolor: 'primary.main', 
            width: 64, 
            height: 64,
            mb: 2
          }}>
            {getRoleIcon()}
          </Avatar>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Register as {selectedRole}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Complete your account setup
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            margin="normal"
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="action" />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            required
          />
          
          <TextField
            fullWidth
            margin="normal"
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon color="action" />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            required
          />

          <TextField
            fullWidth
            margin="normal"
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            variant="outlined"
            required
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={isLoading}
            sx={{ 
              mt: 3, 
              mb: 2, 
              py: 1.5,
              '&.Mui-disabled': {
                backgroundColor: 'primary.light',
                color: 'primary.contrastText'
              }
            }}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Create Account'
            )}
          </Button>

          <Box sx={{ 
            textAlign: 'center', 
            mt: 2,
            display: 'flex',
            justifyContent: 'center'
          }}>
            <Typography variant="body2" sx={{ mr: 1 }}>
              Already have an account?
            </Typography>
            <Button
              component={Link}
              to="/login"
              variant="text"
              sx={{
                fontWeight: 'bold',
                color: 'primary.main',
              }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;