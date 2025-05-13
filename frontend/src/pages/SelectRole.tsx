import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Button, 
  Link, 
  Paper, 
  Divider,
  Avatar,
  Container,
  Stack
} from '@mui/material';
import { 
  Store as VendorIcon,
  Warehouse as WarehouseIcon,
  LocalShipping as TransporterIcon,
  Login as LoginIcon
} from '@mui/icons-material';

const roles = [
  { name: 'Vendor', icon: <VendorIcon fontSize="large" />, color: 'primary' },
  { name: 'WarehouseManager', icon: <WarehouseIcon fontSize="large" />, color: 'secondary' },
  { name: 'Transporter', icon: <TransporterIcon fontSize="large" />, color: 'success' }
];

const SelectRole: React.FC = () => {
  const navigate = useNavigate();

  const handleRoleClick = (role: string) => {
    navigate('/register/details', { state: { role } });
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ 
        p: 4,
        borderRadius: 2,
        backgroundColor: 'background.paper'
      }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Join Our Supply Chain Network
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Select your role to get started with registration
          </Typography>
        </Box>

        <Stack spacing={3} sx={{ mb: 3 }}>
          {roles.map((role) => (
            <Button
              key={role.name}
              fullWidth
              variant="outlined"
              size="large"
              startIcon={
                <Avatar sx={{ bgcolor: `${role.color}.main` }}>
                  {role.icon}
                </Avatar>
              }
              onClick={() => handleRoleClick(role.name)}
              sx={{
                py: 3,
                borderRadius: 2,
                borderWidth: 2,
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 'bold',
                '&:hover': {
                  borderWidth: 2,
                  bgcolor: `${role.color}.light`,
                  color: `${role.color}.dark`
                }
              }}
            >
              {role.name}
            </Button>
          ))}
        </Stack>

        <Divider sx={{ my: 3 }}>
          <Typography variant="body2" color="text.secondary">OR</Typography>
        </Divider>

        <Box sx={{ 
          textAlign: 'center', 
          mt: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Typography variant="body2" sx={{ mr: 1 }}>
            Already have an account?
          </Typography>
          <Link 
            component="button"
            variant="body2"
            onClick={() => navigate('/login')}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              fontWeight: 'bold',
              color: 'primary.main'
            }}
          >
            <LoginIcon fontSize="small" sx={{ mr: 0.5 }} />
            Sign In
          </Link>
        </Box>
      </Paper>
    </Container>
  );
};

export default SelectRole;