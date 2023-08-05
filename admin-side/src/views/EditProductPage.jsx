import React, { useState } from 'react';
import FormProduct from "../components/FormProduct";
import Modal from 'react-bootstrap/Modal';

function EditProductPage({ product, show, handleClose }) {
    const [editedImage, setEditedImage] = useState(product.mainImg || '');

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Product</Modal.Title>
                </Modal.Header>

                <FormProduct
                    handleClose={handleClose}
                    product={product}
                    isEdit={true}
                    editedImage={editedImage}
                    setEditedImage={setEditedImage}
                />

            </Modal>
        </>
    );
}

export default EditProductPage;