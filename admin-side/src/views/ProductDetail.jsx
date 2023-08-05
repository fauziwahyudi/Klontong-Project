import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { detailProduct } from '../store/actions/actionCreator';

function ProductDetail({ productId, name, image, show, handleClose }) {

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

    const [loading, setLoading] = useState(true)

    const detailProducts = useSelector((state) => state.productDetailReducer.detail)
    const dispatch = useDispatch()
    // console.log(detailProducts, "INI REDUCER");


    useEffect(() => {
        dispatch(detailProduct(productId))
            .then(() => {
                setLoading(false)
            })
    }, [productId, show])

    return (
        <>
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{detailProducts.name} {detailProducts.id}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="grid-example" >
                    <Container>
                        <Row>
                            <Col xs={6} md={7}>
                                <img src={detailProducts.image} style={{ width: "100%" }} alt="" />
                            </Col>
                            <Col xs={6} md={5}>
                                <p>Category: {detailProducts.categoryName}</p>
                                <p>SKU : {detailProducts.sku}</p>
                                <p>Name : {detailProducts.name}</p>
                                <p>Description : {detailProducts.description}</p>
                                <p>Weight : {detailProducts.weight} gram</p>
                                <p>Width : {detailProducts.width} cm</p>
                                <p>Length : {detailProducts.length} cm</p>
                                <p>Height : {detailProducts.height} cm</p>
                                <p style={{fontSize: '30px'}}>Price: IDR {formatCurrency(detailProducts.price)},-</p> 
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ProductDetail;