import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, selectProductList } from "../redux/productsSlice";
import generateRandomId from "../utils/generateRandomId";
import { Link } from "react-router-dom";

function ProductForm() {
  const dispatch = useDispatch();
  const products = useSelector(selectProductList);
  const generateUniqueProductId = (products) => {
    let newId = generateRandomId();
    while (products.find((product) => product.id === newId)) {
      newId = generateRandomId();
    }
    return newId;
  };

  const [formData, setFormData] = useState({
    id: generateUniqueProductId(products),
    name: "",
    description: "",
    price: "",
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      dispatch(addProduct(formData));
      alert("Product added successfully 🥳");
      setFormData({
        id: generateUniqueProductId(products),
        name: "",
        description: "",
        price: "",
      });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let valid = true;
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
      valid = false;
    }

    if (!formData.description.trim()) {
      errors.description = "Description is required";
      valid = false;
    }

    if (!formData.price.trim()) {
      errors.price = "Price is required";
      valid = false;
    } else if (isNaN(formData.price)) {
      errors.price = "Price must be a number";
      valid = false;
    } else if (parseFloat(formData.price) <= 0) {
      errors.price = "Price must be greater than zero";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  return (
    <Container>
      <h1>Create Product</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="productId">
          <Form.Label>Product ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product ID"
            name="id"
            value={formData.id}
            readOnly
          />
        </Form.Group>

        <Form.Group controlId="productName" className="mt-3">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="productDescription" className="mt-3">
          <Form.Label>Product Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter product description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            isInvalid={!!errors.description}
          />
          <Form.Control.Feedback type="invalid">
            {errors.description}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="productPrice" className="mt-3">
          <Form.Label>Price($)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter product price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            isInvalid={!!errors.price}
          />
          <Form.Control.Feedback type="invalid">
            {errors.price}
          </Form.Control.Feedback>
        </Form.Group>
        <div className="d-flex align-items-center gap-2 mt-3">
          <Button variant="primary" type="submit">
            Submit
          </Button>

          <Link to="/products">
            <Button variant="secondary" className="ms-2">
              Go to Products
            </Button>
          </Link>

          <Link to="/">
            <Button variant="secondary" className="ms-2">
              Go to Home
            </Button>
          </Link>
        </div>
      </Form>
    </Container>
  );
}

export default ProductForm;
