import FormCategory from '../components/FormCategory';
import Modal from 'react-bootstrap/Modal';

function EditCategoryPage({ category, show, handleClose }) {

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Category</Modal.Title>
                </Modal.Header>

                <FormCategory handleClose={handleClose} category={category} isEdit={true} />

            </Modal>
        </>
    );
}

export default EditCategoryPage;