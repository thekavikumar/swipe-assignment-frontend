// ProductForm.js

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

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(addProduct(formData));
    alert("Product added successfully 🥳");
    setFormData({
      id: generateUniqueProductId(products),
      name: "",
      description: "",
      price: "",
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const parsedValue = name === "price" ? parseFloat(value) : value;
    setFormData({
      ...formData,
      [name]: parsedValue,
    });
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
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="productName">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="productDescription">
          <Form.Label>Product Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter product description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="productPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter product price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </Form.Group>

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
      </Form>
    </Container>
  );
}

export default ProductForm;
