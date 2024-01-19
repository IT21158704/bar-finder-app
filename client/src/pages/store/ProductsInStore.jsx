import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import authAxios from '../../utils/authAxios';
import { apiUrl } from '../../utils/Constants';
import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import Loader from '../../components/Loader/Loader';
import { Visibility } from '@material-ui/icons';
import Tooltip from '@mui/material/Tooltip';
import { IconButton, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import { Box, Divider } from '@mui/material';
import { categories, sizes } from '../../components/DataSets'
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';

export default function ProductsInStore() {
    const { storeId } = useParams();
    const [store, setStore] = useState({});
    const [products, setProducts] = useState([]);
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    const [isLoading, setIsLoading] = useState(true);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [newItem, setNewItem] = useState({
        storeId: storeId,
        productName: '',
        category: '',
        size: '',
        price: '',
        img: '',
        availability: 'stock'
    });
    const [updateFormData, setUpdateFormData] = useState({
        _id: '',
        productName: '',
        category: '',
        size: '',
        price: '',
        img: '',
    });

    const setNewItemEmpty = () => {
        setNewItem(
            {
                productName: '',
                category: '',
                size: '',
                price: '',
                img: '',
            }
        );
    };

    const handleCreateNotice = (field, value) => {
        setNewItem((prevData) => ({ ...prevData, [field]: value }));
    };

    const handleUpdateItem = (row) => {
        setOpenEdit(true);
        setUpdateFormData({
            _id: row._id,
            productName: row.productName,
            category: row.category,
            size: row.size,
            price: row.price,
            img: row.img,
        });
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const addItem = async () => {
        try {
            const response = await authAxios.post(`${apiUrl}/product/create-product`, newItem)
            if (response) {
              getProductsDetails();
              handleClose()
              setNewItemEmpty()
              toast.warning('Item Added Successfully');
            }
            console.log(newItem);
        } catch (error) {
            console.error('Error adding item :', error);
            toast.error('An error occurred while adding item.');
        }
    };

    const getStoreDetails = async () => {
        setIsLoading(true);
        try {
            const response = await authAxios.get(`${apiUrl}/store/get-store/${storeId}`);
            setStore(response.data.storeData);
        } catch (error) {
            console.error(error);
            if (error.response && error.response.status === 404) {
                toast.error('Store not found');
            } else {
                // toast.error(error.response?.data?.message || 'An error occurred');
            }
        }
    };
    const deleteItem = async (id) => {
        try {
          const result = await authAxios.delete(`${apiUrl}/product/delete-product/${id}`);
    
          if (result) {
            getProductsDetails();
            handleCloseEdit();
            toast.warning('Item Deleted Successfully');
          }
        } catch (error) {
          toast.error(error.response.data.message);
        } finally {
          refreshPage();
        }
      };

    const getProductsDetails = async () => {
        try {
            const products = await authAxios.get(`${apiUrl}/product/products-in-store/${storeId}`);
            setProducts(products.data.productsData);
            setIsLoading(false)
        } catch (error) {
            console.error(error);
            if (error.response && error.response.status === 404) {
                toast.error('Products not found');
            } else {
                toast.error(error.response?.data?.message || 'An error occurred');
            }
        }
    };

    const handleUpdate = async () => {
        try {
            const result = await authAxios.put(`${apiUrl}/product/update-product/${updateFormData._id}`, updateFormData);

            if (result) {
                getProductsDetails();
                handleCloseEdit();
                toast.success('Item Updated Successfully');
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const handleSwitchToggle = async (productId, newAvailability) => {
        try {
            // Update the product availability in the database
            await authAxios.put(`${apiUrl}/product/update-product/${productId}`, {
                availability: newAvailability,
            });

            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product.productId === productId
                        ? { ...product, availability: newAvailability }
                        : product
                )
            );
            toast.success('Availability updated successfully.');
            getProductsDetails();
        } catch (error) {
            console.error(error);
            // Show an error toast
            toast.error('Failed to update availability.');
        }
    };

    useEffect(() => {
        getStoreDetails();
        getProductsDetails();
    }, []);

    return (
        <div>
            {
                !isLoading ? <>
                    <Button variant="outlined" sx={{ marginBottom: 2 }}
                        onClick={() => {
                            setOpen(true);
                        }}>List Item</Button>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="right">Image</TableCell>
                                    <TableCell align="right">Category</TableCell>
                                    <TableCell align="right">Size</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                    <TableCell align="right">Availability</TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {products.map((row) => (
                                    <TableRow
                                        key={row.productName}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.productName}
                                        </TableCell>
                                        <TableCell align="right">
                                            <img src={row.img} alt={row.productName} style={{ width: '50px', height: '50px' }} />
                                        </TableCell>
                                        <TableCell align="right">{row.category}</TableCell>
                                        <TableCell align="right">{row.size}</TableCell>
                                        <TableCell align="right">{row.price}</TableCell>
                                        <TableCell align="right">
                                            <Tooltip title={row.availability === 'stock' ? 'In Stock' : 'Out of Stock'}>
                                                <Switch
                                                    {...label}
                                                    checked={row.availability === 'stock'}
                                                    onChange={() =>
                                                        handleSwitchToggle(
                                                            row._id,
                                                            row.availability === 'stock' ? 'outofstock' : 'stock'
                                                        )
                                                    }
                                                />
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell>
                                        </TableCell>
                                        <TableCell>
                                            <Tooltip title="View Item">
                                                <IconButton
                                                    onClick={() => {
                                                        handleUpdateItem(row);
                                                    }}>
                                                    <Visibility />
                                                </IconButton>
                                            </Tooltip>

                                            <Dialog onClose={handleCloseEdit} open={openEdit}>
                                                <DialogTitle sx={{ textAlign: 'center' }}>
                                                    Edit '{row.productName}'
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
                                                        <div style={{ textAlign: 'center' }}>
                                                            <img src={updateFormData.img} alt={updateFormData.productName} style={{ width: '100px', height: '100px', margin: '0 auto', display: 'block' }} />
                                                        </div>

                                                        <div style={{ marginTop: 3 }}>
                                                            <Divider textAlign="left">Details</Divider>
                                                            <TextField
                                                                fullWidth
                                                                id="img"
                                                                label="Image Link"
                                                                sx={{ maxWidth: '80%' }}
                                                                onChange={(e) => setUpdateFormData({ ...updateFormData, img: e.target.value })}
                                                                value={updateFormData.img}
                                                            />
                                                            <TextField
                                                                fullWidth
                                                                id="productName"
                                                                label="Store Name"
                                                                sx={{ maxWidth: '80%' }}
                                                                onChange={(e) => setUpdateFormData({ ...updateFormData, productName: e.target.value })}
                                                                value={updateFormData.productName}
                                                            />
                                                        </div>
                                                        <div>
                                                            <TextField
                                                                id="category"
                                                                label="category"
                                                                select
                                                                onChange={(e) => setUpdateFormData({ ...updateFormData, category: e.target.value })}
                                                                value={updateFormData.category}
                                                            >
                                                                {categories.map((option) => (
                                                                    <MenuItem key={option.value} value={option.value}>
                                                                        {option.label}
                                                                    </MenuItem>
                                                                ))}
                                                            </TextField>
                                                            <TextField
                                                                id="size"
                                                                label="size"
                                                                select
                                                                onChange={(e) => setUpdateFormData({ ...updateFormData, size: e.target.value })}
                                                                value={updateFormData.size}
                                                            >
                                                                {sizes.map((option) => (
                                                                    <MenuItem key={option.value} value={option.value}>
                                                                        {option.label}
                                                                    </MenuItem>
                                                                ))}
                                                            </TextField>
                                                            <TextField
                                                                fullWidth
                                                                id="price"
                                                                label="Price"
                                                                InputProps={{
                                                                    startAdornment: <InputAdornment position="start">Rs. </InputAdornment>
                                                                }}
                                                                sx={{ maxWidth: '80%' }}
                                                                onChange={(e) => setUpdateFormData({ ...updateFormData, price: e.target.value })}
                                                                value={updateFormData.price}
                                                            />
                                                        </div>
                                                    </Box>
                                                </DialogContent>
                                                <DialogActions sx={{ justifyContent: 'center' }}>
                                                    <Button autoFocus color="success" onClick={handleUpdate}>
                                                        Save
                                                    </Button>
                                                    <Button autoFocus color="error"  onClick={() => deleteItem(updateFormData._id)}  >
                                                        Delete
                                                    </Button>
                                                    <Button color="error" onClick={handleCloseEdit}>
                                                        Cancel
                                                    </Button>
                                                </DialogActions>
                                            </Dialog>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </> : <Loader />
            }




            <Dialog onClose={handleClose} open={open}>
                <DialogTitle sx={{ textAlign: 'center' }}>
                    Edit
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
                        <div style={{ textAlign: 'center' }}>
                            <img src={newItem.img} alt={newItem.productName} style={{ width: '100px', height: '100px', margin: '0 auto', display: 'block' }} />
                        </div>

                        <div style={{ marginTop: 3 }}>
                            <Divider textAlign="left">Details</Divider>
                            <TextField
                                fullWidth
                                id="img"
                                label="Image Link"
                                sx={{ maxWidth: '80%' }}
                                onChange={(e) => handleCreateNotice('img', e.target.value)}
                                value={newItem.img}
                            />
                            <TextField
                                fullWidth
                                id="productName"
                                label="Product Name"
                                sx={{ maxWidth: '80%' }}
                                onChange={(e) => handleCreateNotice('productName', e.target.value)}
                                value={newItem.productName}
                            />
                        </div>
                        <div>
                            <TextField
                                id="category"
                                label="Category"
                                select
                                onChange={(e) => handleCreateNotice('category', e.target.value)}
                                value={newItem.category}
                            >
                                {categories.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                id="size"
                                label="Size"
                                select
                                onChange={(e) => handleCreateNotice('size', e.target.value)}
                                value={newItem.size}
                            >
                                {sizes.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                fullWidth
                                id="price"
                                label="Price"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">Rs. </InputAdornment>
                                }}
                                sx={{ maxWidth: '80%' }}
                                onChange={(e) => handleCreateNotice('price', e.target.value)}
                                value={newItem.price}
                            />
                        </div>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center' }}>
                    <Button autoFocus color="success" onClick={addItem}>
                        Add Item
                    </Button>
                    <Button color="error" onClick={handleClose}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
