import { FaPen, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ProductDetail from '../views/ProductDetail';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import EditProductPage from '../views/EditProductPage';
import { useDispatch } from 'react-redux';
import { destroyProduct } from '../store/actions/actionCreator';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import styled from 'styled-components';

const TableRowProduct = ({ product }) => {
  const formatCurrency = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    })
      .format(number)
      .replace('Rp', '')
      .trim();
  };

  const [showProduct, setShowProduct] = useState(false);
  const handleCloseProduct = () => setShowProduct(false);
  const handleShowProduct = () => setShowProduct(true);

  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  const dispatch = useDispatch();

  const MySwal = withReactContent(Swal);
  const handleShowDelete = () => {
    MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(destroyProduct(product.id));
        MySwal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  };

  return (
    <TableRow>
      <td scope="row">{product.id}</td>
      <td>
        <ProductImage src={product.image} className="img-fluid" />
      </td>
      <ProductName>{product.name}</ProductName>
      <td>{product.Category.name}</td>
      <Price>IDR {formatCurrency(product.price)},-</Price>
      <td>{product.User.username}</td>
      <td>
        <CustomButton
          onClick={handleShowProduct}
        >
          show details
        </CustomButton>
        <ProductDetail
          productId={product.id}
          name={product.name}
          image={product.image}
          show={showProduct}
          handleClose={handleCloseProduct}
        />
      </td>
      <td>
        <ActionButtons>
          <Link onClick={handleShowEdit}>
            <FaPen />
            <span className="description"></span>
          </Link>
          <EditProductPage
            product={product}
            show={showEdit}
            handleClose={handleCloseEdit}
          />
          <Link onClick={handleShowDelete} style={{ marginLeft: '20px' }}>
            <FaTrash />
            <span className="description"></span>
          </Link>
        </ActionButtons>
      </td>
    </TableRow>
  );
};

export default TableRowProduct;

const TableRow = styled.tr`
  td {
    padding: 10px;
    text-align: left;
  }
`;

const ProductImage = styled.img`
  width: 100px;
`;

const ProductName = styled.td`
  font-weight: bold;
`;

const Price = styled.td`
  font-weight: bold;
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const CustomButton = styled(Button)`
    background-color: #333366;
    color: white;
    alignItems: 'center'
    border: none;
    &:hover {
        background-color: #dfdf36;
        color: #000;
    }
`;
