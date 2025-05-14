import React, { useEffect, useState } from 'react';
import WarehouseLayout from '../Layout';
import { api } from '../../../../utils/api';
import { 
  Box, 
  Typography, 
  Alert, 
  Paper, 
  Table, 
  TableHead, 
  TableBody, 
  TableRow, 
  TableCell, 
  TableContainer,
  Chip,
  LinearProgress,
  Skeleton
} from '@mui/material';
import { 
  Inventory as InventoryIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';

interface Product {
  id: number;
  name: string;
  stockQuantity: number;
}

const InventoryPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.get('/products')
      .then(products => {
        setProducts(products);
        setError(null);
      })
      .catch((err: any) => setError(err.message || 'Failed to load inventory'))
      .finally(() => setLoading(false));
  }, []);

  const getStockStatus = (quantity: number) => {
    if (quantity === 0) {
      return { 
        label: 'Out of Stock', 
        color: 'error' as const, 
        icon: <ErrorIcon fontSize="small" /> 
      };
    } else if (quantity < 5) {
      return { 
        label: 'Low Stock', 
        color: 'warning' as const, 
        icon: <WarningIcon fontSize="small" /> 
      };
    }
    return { 
      label: 'In Stock', 
      color: 'success' as const, 
      icon: <CheckCircleIcon fontSize="small" /> 
    };
  };

  return (
    <WarehouseLayout>
      <Box sx={{ p: 4, maxWidth: 'lg', mx: 'auto' }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" sx={{ 
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            color: 'primary.main'
          }}>
            <InventoryIcon fontSize="large" />
            Inventory Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Monitor and manage your warehouse inventory levels in real-time
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Box>
            <LinearProgress sx={{ mb: 2 }} />
            {[...Array(5)].map((_, index) => (
              <Skeleton 
                key={index} 
                variant="rectangular" 
                height={56} 
                sx={{ mb: 1, borderRadius: 1 }} 
              />
            ))}
          </Box>
        ) : (
          <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
            <TableContainer>
              <Table>
                <TableHead sx={{ bgcolor: 'primary.light' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold', color: 'primary.contrastText' }}>
                      Product Name
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: 'primary.contrastText' }}>
                      Stock Quantity
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: 'primary.contrastText' }}>
                      Status
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((product) => {
                    const status = getStockStatus(product.stockQuantity);
                    return (
                      <TableRow 
                        key={product.id}
                        hover
                        sx={{ 
                          '&:last-child td': { borderBottom: 0 },
                          '&:hover': { backgroundColor: 'action.hover' }
                        }}
                      >
                        <TableCell sx={{ fontWeight: 'medium' }}>
                          {product.name}
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ width: '100%', mr: 1 }}>
                              <LinearProgress 
                                variant="determinate" 
                                value={Math.min((product.stockQuantity / 20) * 100, 100)}
                                color={status.color}
                                sx={{ height: 8, borderRadius: 4 }}
                              />
                            </Box>
                            {product.stockQuantity}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={status.label}
                            color={status.color}
                            icon={status.icon}
                            size="small"
                            sx={{ fontWeight: 'bold' }}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}

        {!loading && products.length === 0 && !error && (
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            p: 4,
            textAlign: 'center'
          }}>
            <InventoryIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              No inventory items found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Add products to begin managing your inventory
            </Typography>
          </Box>
        )}
      </Box>
    </WarehouseLayout>
  );
};

export default InventoryPage;