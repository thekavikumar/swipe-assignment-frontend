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

  // Function to generate a unique product ID
  const generateUniqueProductId = (products) => {
    let newId = generateRandomId();
    // Check if the generated ID already exists in the products list
    while (products.find((product) => product.id === newId)) {
      newId = generateRandomId();
    }
    return newId;
  };

  // State to manage form data
  const [formData, setFormData] = useState({
    id: generateUniqueProductId(products),
    name: "",
    description: "",
    price: "",
  });

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Dispatch action to add product
    dispatch(addProduct(formData));
    // Show success alert
    alert("Product added successfully 🥳");
    // Clear form data after submission
    setFormData({
      id: generateUniqueProductId(products),
      name: "",
      description: "",
      price: "",
    });
  };

  // Function to handle form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    // Parse the value of price field to float
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
        {/* Product ID Input */}
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

        {/* Product Name Input */}
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

        {/* Product Description Input */}
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

        {/* Product Price Input */}
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

        {/* Submit Button */}
        <Button variant="primary" type="submit">
          Submit
        </Button>

        {/* Links to other pages */}
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
