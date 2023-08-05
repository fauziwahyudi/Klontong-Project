import TableRowProduct from '../components/TableRowProduct'
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux'
import { fetchProducts } from '../store/actions/actionCreator';
import AddProductPage from './AddProductPage';

export default function ProductList() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [loading, setLoading] = useState(true)

    const products = useSelector((state) => state.productReducer.products)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(fetchProducts())
            .then(() => {
                setLoading(false)
            })
    }, [])

    const [query, setQuery] = useState("")

    const productsPerPage = 10;

    const [currentPage, setCurrentPage] = useState(1);
    const totalProducts = products.length;
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const displayProducts = products
        .filter((el) => el.name.toLowerCase().includes(query))
        .slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);


    return (
        <>
            <section className="col-md-12 ms-sm-auto col-lg-12 px-md-4 mt-3" id="product-section">
                <div className="container-search position-absolute align-items-center" >
                    <input type="text" placeholder="Search" onChange={(e) => setQuery(e.target.value)} />
                    <div className="btn-search ">
                        <i className="fa fa-search"></i>
                    </div>
                </div>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 border-bottom" style={{ marginTop: "70px" }}>
                    <h1 className="display-2" style={{ fontSize: "30px" }}>Product List</h1>
                    <Button variant="secondary" onClick={handleShow}>
                        + Create Product
                    </Button>

                    <AddProductPage show={show} handleClose={handleClose} />

                </div>
                <div className="row" >
                    <div className="col-12 table-responsive">
                        <table className="table align-middle">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col" width="200px">IMAGE</th>
                                    <th scope="col" width="200px">NAME</th>
                                    <th scope="col" width="180px">CATEGORY</th>
                                    <th scope="col" width="200px">PRICE</th>
                                    <th scope="col" width="200px" >CREATED BY</th>
                                    <th scope="col" width="200px">DETAILS</th>
                                    <th scope="col" width="50px">ACTION</th>
                                </tr>
                            </thead>

                            <tbody id="table-product">
                                {loading ? (
                                    <tr>
                                        <td colSpan={8}>loading...</td>
                                    </tr>
                                ) : (
                                    displayProducts.map((el) => (
                                        <TableRowProduct key={el.id} product={el} />
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <div className="pagination mt-3 d-flex justify-content-center">
                <Button
                    variant="secondary"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    style={{marginBottom: "30px"}}
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
                    variant="secondary"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    style={{marginBottom: "30px"}}
                >
                    Next
                </Button>
            </div>
        </>
    )
}