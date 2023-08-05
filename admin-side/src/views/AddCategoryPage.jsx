import FormCategory from "../components/FormCategory";
import Modal from 'react-bootstrap/Modal';

function AddCategoryPage({ show, handleClose }) {

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Product</Modal.Title>
                </Modal.Header>

                <FormCategory handleClose={handleClose} />

            </Modal>
        </>
    );
}

export default AddCategoryPage;