import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../store/actions/actionCreator';
import AddProductPage from './AddProductPage';
import TableRowProduct from '../components/TableRowProduct';
import Button from 'react-bootstrap/Button';

const ProductList = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  const products = useSelector((state) => state.productReducer.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts()).then(() => {
      setLoading(false);
    });
  }, [dispatch]);

  const productsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const displayProducts = products
    .filter((el) => el.name.toLowerCase().includes(query.toLowerCase()))
    .slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

  return (
    <ProductListContainer>
      <SearchContainer>
        <input type="text" placeholder="Search" onChange={(e) => setQuery(e.target.value)} />
        <div className="btn-search">
          <i className="fa fa-search"></i>
        </div>
      </SearchContainer>
      <ProductListHeader>
        <ProductListTitle>Product List</ProductListTitle>
        <CustomButton onClick={() => setShow(true)}>
          + Create Product
        </CustomButton>
      </ProductListHeader>
      <ProductListTable>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col" width="200px">
              IMAGE
            </th>
            <th scope="col" width="200px">
              NAME
            </th>
            <th scope="col" width="180px">
              CATEGORY
            </th>
            <th scope="col" width="200px">
              PRICE
            </th>
            <th scope="col" width="200px">
              CREATED BY
            </th>
            <th scope="col" width="200px">
              DETAILS
            </th>
            <th scope="col" width="50px">
              ACTION
            </th>
          </tr>
        </thead>
        <tbody id="table-product">
          {loading ? (
            <tr>
              <td colSpan={8}>loading...</td>
            </tr>
          ) : (
            displayProducts.map((el) => <TableRowProduct key={el.id} product={el} />)
          )}
        </tbody>
      </ProductListTable>
      <PaginationContainer>
        <Button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          style={{ backgroundColor: '#333366', color: 'white' }}
        >
          Previous
        </Button>
        <div className="page-number">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={page === currentPage ? 'primary' : 'secondary'}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </Button>
          ))}
        </div>
        <Button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          style={{ backgroundColor: '#333366', color: 'white' }}
        >
          Next
        </Button>
      </PaginationContainer>
      <AddProductPage show={show} handleClose={() => setShow(false)} />
    </ProductListContainer>
  );
};

export default ProductList;

const ProductListContainer = styled.div`
  padding: 20px;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 20px;

  input {
    padding: 8px;
    border: none;
    border-bottom: 2px solid #1c1c1e;
    margin-right: 10px;
    outline: none;
  }

  .btn-search {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    background-color: #333366;
    color: white;
    border: none;
    cursor: pointer;
    outline: none;
  }
`;

const CustomButton = styled(Button)`
    background-color: #333366;
    color: white;
    border: none;
    &:hover {
        background-color: #dfdf36;
        color: #000;
    }
`;

const ProductListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
`;

const ProductListTitle = styled.h1`
  font-size: 1.5rem;
`;

const ProductListTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 10px;
    border: 1px solid #333366;
    text-align: center;
  }

  th {
    background-color: #333366;
    color: white;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;

  .page-number {
    margin: 0 5px;
  }
`;
