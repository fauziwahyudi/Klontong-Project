import FormProduct from "../components/FormProduct";
import Modal from 'react-bootstrap/Modal';

function AddProductPage({ show, handleClose }) {

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Product</Modal.Title>
                </Modal.Header>

                <FormProduct handleClose={handleClose} />

            </Modal>
        </>
    );
}

export default AddProductPage;