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
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{detailProducts.name} {detailProducts.id}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Container>
                        <Row>
                            <Col xs={12} md={12}>
                                <img src={detailProducts.image} style={{ width: "100%" }} alt="" />
                            </Col>
                            <Col xs={6} md={4}>
                                .col-xs-6 .col-md-4
                            </Col>
                            <Col xs={6} md={4}>
                                .col-xs-6 .col-md-4
                            </Col>

                        </Row>
                        <Modal.Body>
                            <p>{detailProducts.categoryName}</p>
                        </Modal.Body>





                    </Container>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ProductDetail;