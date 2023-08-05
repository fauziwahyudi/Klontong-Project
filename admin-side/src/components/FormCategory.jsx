import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import { addCategory, editCategory } from '../store/actions/actionCreator';
import { useDispatch } from 'react-redux'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom"


function FormCategory({ category, isEdit, show, handleClose }) {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const initialState = {
    name: "",
  }

  const [formCategory, setFormCategory] = useState(isEdit ? category : initialState)
  console.log(formCategory);

  const handdleForm = (e) => {
    const newForm = {
      ...formCategory,
      [e.target.name]: e.target.value,
    }
    setFormCategory(newForm)
  }

  const MySwal = withReactContent(Swal)
  const handleSubmitCategory = async (e) => {
    e.preventDefault()
    try {
      if (isEdit) {
        await dispatch(editCategory(formCategory, category.id, handleClose))
        MySwal.fire({
          icon: 'success',
          title: 'Category Success Edited',
          showConfirmButton: false,
          timer: 1500
        })
        navigate('/categories')
      } else {
        await dispatch(addCategory(formCategory, handleClose))
        // dispatch(successAddProduct())
        MySwal.fire({
          icon: 'success',
          title: 'Successful Category Created',
          showConfirmButton: false,
          timer: 1500
        })
        navigate('/categories')
      }
    } catch (error) {
      MySwal.fire({
        icon: 'error',
        title: error,
        showConfirmButton: false,
        timer: 1500
      })
    }

  }

  return (
    <>
      <Form onSubmit={handleSubmitCategory}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name='name'
              onChange={handdleForm} value={formCategory.name}
              type="text"
              // placeholder="name@example.com"
              autoFocus
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" type='submit' >
            Submit
          </Button>
        </Modal.Footer>
      </Form>
    </>
  );
}

export default FormCategory;