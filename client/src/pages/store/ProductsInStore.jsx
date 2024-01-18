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
import {IconButton, Button} from '@mui/material';


export default function ProductsInStore() {
    const { storeId } = useParams();
    const [store, setStore] = useState({});
    const [products, setProducts] = useState([]);
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    const [isLoading, setIsLoading] = useState(true);

    const getStoreDetails = async () => {
        try {
            const response = await authAxios.get(`${apiUrl}/store/get-store/${storeId}`);
            setStore(response.data.storeData);
        } catch (error) {
            console.error(error);
            if (error.response && error.response.status === 404) {
                toast.error('Store not found.');
            } else {
                // toast.error(error.response?.data?.message || 'An error occurred');
            }
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
                toast.error('Store not found.');
            } else {
                // toast.error(error.response?.data?.message || 'An error occurred');
            }
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
                <Button variant="outlined" sx={{marginBottom: 2}}>List Item</Button>
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
                                        </TableCell>
                                        <TableCell></TableCell>
                                        <TableCell>
                                            <Tooltip title="View Item">
                                                <IconButton
                                                    onClick={() => {
                                                        handleUpdateNotice(store);
                                                    }}>
                                                    <Visibility />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </> : <Loader />
            }
        </div>
    )
}
