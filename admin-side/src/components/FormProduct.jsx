import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addProduct, editProduct } from '../store/actions/actionCreator';
import { fetchCategories } from '../store/actions/actionCreator';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

function FormProduct({ product, isEdit, show, handleClose }) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const categories = useSelector((state) => state.categoryReducer.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories()).then(() => {
      setLoading(false);
    });
  }, [dispatch]);

  const initialState = {
    sku: '',
    name: '',
    description: '',
    categoryId: '',
    price: '',
    weight: '',
    width: '',
    length: '',
    height: '',
    image: null,
  };

  const [formProduct, setFormProduct] = useState(isEdit ? product : initialState);
  const [imageError, setImageError] = useState({});
  const [imagePreview, setImagePreview] = useState('');
  const [imageFileName, setImageFileName] = useState('');
  const [selectedFileName, setSelectedFileName] = useState('');
  const [generateSKU, setGenerateSKU] = useState(true);

  const generatedSKU = () => {
    const length = 6;
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return result;
  };

  useEffect(() => {
    if (isEdit && product.sku) {
      setGenerateSKU(false);
    } else {
      setFormProduct((prevState) => ({
        ...prevState,
        sku: generatedSKU(),
      }));
    }
  }, [isEdit, product]);

  const handleGenerateSKUChange = (e) => {
    setGenerateSKU(e.target.checked);

    if (e.target.checked) {
      setFormProduct((prevState) => ({
        ...prevState,
        sku: generatedSKU(),
      }));
    } else {
      setFormProduct((prevState) => ({
        ...prevState,
        sku: '',
      }));
    }
  };

  const handleForm = (e) => {
    const { name, value, type, files } = e.target;

    const newValue = type === 'file' ? files[0] : value;

    setFormProduct((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));

    if (type === 'file' && files.length > 0) {
      const file = files[0];
      const fileSize = file.size;
      const fileType = file.type;

      if (!['image/jpeg', 'image/png'].includes(fileType)) {
        setImageError((prevErrors) => ({
          ...prevErrors,
          image: 'Invalid image format. Please upload a JPG or PNG image.',
        }));
      } else {
        setImageError((prevErrors) => ({
          ...prevErrors,
          image: '',
        }));
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setImageFileName(file.name);
      setSelectedFileName(file.name);
    }

    if (['price', 'weight', 'width', 'length', 'height'].includes(name)) {
      if (!/^\d+$/.test(value)) {
        setImageError((prevErrors) => ({
          ...prevErrors,
          [name]: 'Invalid input',
        }));
      } else {
        setImageError((prevErrors) => ({
          ...prevErrors,
          [name]: '',
        }));
      }
    }
  };

  const formatSizeForDisplay = (sizeInBytes) => {
    const sizeInKB = sizeInBytes / 1024;
    return `${sizeInKB.toFixed(2)} KB`;
  };

  const MySwal = withReactContent(Swal);
  const handleSubmitProduct = async (e) => {
    e.preventDefault();

    if (!formProduct.image) {
      setImageError((prevErrors) => ({
        ...prevErrors,
        image: 'Image is required.',
      }));
      return;
    }

    if (!formProduct.sku || generateSKU) {
      setFormProduct((prevState) => ({
        ...prevState,
        sku: generatedSKU(),
      }));
    }

    try {
      if (Object.values(imageError).some((error) => error !== '')) {
        return;
      }

      setImageError({});

      if (isEdit) {
        await dispatch(editProduct(formProduct, product.id, handleClose));
        MySwal.fire({
          icon: 'success',
          title: 'Product Success Edited',
          showConfirmButton: false,
          timer: 1500,
        });
        navigate('/');
      } else {
        await dispatch(addProduct(formProduct, handleClose));
        MySwal.fire({
          icon: 'success',
          title: 'Successful Product Created',
          showConfirmButton: false,
          timer: 1500,
        });
        navigate('/');
      }
    } catch (error) {
      MySwal.fire({
        icon: 'error',
        title: error.message || 'An error occurred',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmitProduct}>
        <Modal.Body>
          <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
            <Form.Label>SKU</Form.Label>
            <Form.Control
              name="sku"
              onChange={handleForm}
              value={formProduct.sku}
              type="text"
              autoFocus
              disabled={generateSKU} // Nonaktifkan field jika generateSKU dicentang
              className={imageError.sku ? 'is-invalid' : formProduct.sku ? 'is-valid' : ''}
              style={{ height: '38px' }}
            />
            {imageError.sku && <div className="invalid-feedback">{imageError.sku}</div>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="generateSKU">
            <Form.Check
              type="checkbox"
              label="Generate SKU automatically"
              checked={generateSKU}
              onChange={handleGenerateSKUChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              onChange={handleForm}
              value={formProduct.name}
              type="text"
              className={imageError.name ? 'is-invalid' : formProduct.name ? 'is-valid' : ''}
              style={{ height: '38px' }}
            />
            {imageError.name && <div className="invalid-feedback">{imageError.name}</div>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control
              name="description"
              onChange={handleForm}
              value={formProduct.description}
              as="textarea"
              rows={3}
              className={imageError.description ? 'is-invalid' : formProduct.description ? 'is-valid' : ''}
            />
            {imageError.description && <div className="invalid-feedback">{imageError.description}</div>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
            <Form.Label>Category</Form.Label>
            <Form.Select
              name="categoryId"
              onChange={handleForm}
              value={formProduct.categoryId}
              className={imageError.categoryId ? 'is-invalid' : formProduct.categoryId ? 'is-valid' : ''}
              style={{ height: '38px' }}
            >
              <option disabled>Choose a category</option>
              {
                categories.map((el, i) => {
                  return (
                    <option value={el.id} key={i}>{el.name}</option>
                  )
                })
              }
            </Form.Select>
            {imageError.categoryId && <div className="invalid-feedback">{imageError.categoryId}</div>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Price</Form.Label>
            <Form.Control
              name="price"
              onChange={handleForm}
              value={formProduct.price}
              type="text"
              className={imageError.price ? 'is-invalid' : formProduct.price ? 'is-valid' : ''}
              style={{ height: '38px' }}
            />
            {imageError.price && <div className="invalid-feedback">{imageError.price}</div>}
          </Form.Group>

          <div className="dimensions-container">
            <Form.Group className="mb-3">
              <Form.Label>Weight (grams)</Form.Label>
              <Form.Control
                name="weight"
                onChange={handleForm}
                value={formProduct.weight}
                type="text"
                className={imageError.weight ? 'is-invalid' : formProduct.weight ? 'is-valid' : ''}
                style={{ height: '38px' }}
              />
              {imageError.weight && <div className="invalid-feedback">{imageError.weight}</div>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Width (cm)</Form.Label>
              <Form.Control
                name="width"
                onChange={handleForm}
                value={formProduct.width}
                type="text"
                className={imageError.width ? 'is-invalid' : formProduct.width ? 'is-valid' : ''}
                style={{ height: '38px' }}
              />
              {imageError.width && <div className="invalid-feedback">{imageError.width}</div>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Length (cm)</Form.Label>
              <Form.Control
                name="length"
                onChange={handleForm}
                value={formProduct.length}
                type="text"
                className={imageError.length ? 'is-invalid' : formProduct.length ? 'is-valid' : ''}
                style={{ height: '38px' }}
              />
              {imageError.length && <div className="invalid-feedback">{imageError.length}</div>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Height (cm)</Form.Label>
              <Form.Control
                name="height"
                onChange={handleForm}
                value={formProduct.height}
                type="text"
                className={imageError.height ? 'is-invalid' : formProduct.height ? 'is-valid' : ''}
                style={{ height: '38px' }}
              />
              {imageError.height && <div className="invalid-feedback">{imageError.height}</div>}
            </Form.Group>
          </div>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Image</Form.Label>
            <Form.Control
              name="image"
              onChange={handleForm}
              type="file"
              className={imageError.image ? 'is-invalid' : formProduct.image ? 'is-valid' : ''}
              style={{ height: '38px' }}
            />
            {imageError.image && <div className="invalid-feedback">{imageError.image}</div>}
            {!formProduct.image && selectedFileName && (
              <div>{selectedFileName}</div>
            )}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Modal.Footer>
      </Form>
    </>
  );
}

export default FormProduct;
