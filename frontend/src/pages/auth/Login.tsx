import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Link, 
  InputAdornment,
  IconButton,
  Divider,
  Snackbar,
  Alert
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff,
  AccountCircle,
  Lock,
  Business,
  LocalShipping,
  Warehouse
} from '@mui/icons-material';
import { api } from '../../utils/api';

const roleMapping: Record<string, string> = {
  Admin: '/dashboard/admin',
  Vendor: '/dashboard/vendor',
  WarehouseManager: '/dashboard/warehouse',
  Transporter: '/dashboard/transporter',
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      console.debug('Submitting login form with data:', formData);
      const data = await api.post('/auth/login', formData);
      console.debug('Received response from API:', data);

      const userRole = data.user?.roles?.[0]; // Extract the first role from the user object
      console.debug('Extracted user role:', userRole);

      if (!userRole || !roleMapping[userRole]) {
        throw new Error(`Unknown role: ${userRole}`);
      }

      localStorage.setItem('jwt', data.accessToken);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('role', userRole);

      setSnackbarOpen(true); // Show success message

      navigate(roleMapping[userRole]);
    } catch (error) {
      console.error('Login error:', error);
      setError(error instanceof Error ? error.message : 'Login failed');
      localStorage.removeItem('jwt');
      localStorage.removeItem('user');
      localStorage.removeItem('role');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {error && (
        <Box sx={{ mb: 2, p: 2, bgcolor: 'error.main', color: 'error.contrastText', borderRadius: 1 }}>
          {error}
        </Box>
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Successfully logged in!
        </Alert>
      </Snackbar>
      <Box
        sx={{
          display: 'flex',
          minHeight: '100vh',
          backgroundImage: 'linear-gradient(135deg, #f5f7fa 0%, #e4f0f9 100%)',
          p: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            maxWidth: 1200,
            margin: 'auto',
            boxShadow: 3,
            borderRadius: 2,
            overflow: 'hidden',
            bgcolor: 'background.paper',
          }}
        >
          {/* Left Side - Branding and Role Icons */}
          <Box
            sx={{
              flex: 1,
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <Business sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h4" component="h1" gutterBottom>
              Supply Chain Logistics
            </Typography>
            <Typography variant="subtitle1" sx={{ mb: 4 }}>
              Streamline your logistics operations with our comprehensive management system
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 3, mt: 4 }}>
              <Box sx={{ textAlign: 'center' }}>
                <AccountCircle sx={{ fontSize: 40 }} />
                <Typography variant="body2">Admin</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Business sx={{ fontSize: 40 }} />
                <Typography variant="body2">Vendor</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Warehouse sx={{ fontSize: 40 }} />
                <Typography variant="body2">Warehouse</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <LocalShipping sx={{ fontSize: 40 }} />
                <Typography variant="body2">Transporter</Typography>
              </Box>
            </Box>
          </Box>

          {/* Right Side - Login Form */}
          <Box
            sx={{
              flex: 1,
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
              Welcome Back
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
              Sign in to access your logistics dashboard
            </Typography>

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
                      <AccountCircle color="action" />
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
                      <Lock color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={togglePasswordVisibility}
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

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                <Link href="#" variant="body2" color="primary">
                  Forgot password?
                </Link>
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 3, mb: 2, py: 1.5 }}
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Sign In'}
              </Button>

              <Divider sx={{ my: 3 }}>OR</Divider>

              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Typography variant="body2" sx={{ display: 'inline' }}>
                  New to the platform?{' '}
                </Typography>
                <Link 
                  href="#" 
                  variant="body2" 
                  color="primary"
                  onClick={() => navigate('/register')}
                  sx={{ fontWeight: 'bold', cursor: 'pointer' }}
                >
                  Create an account
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Login;