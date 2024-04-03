import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, selectProductList } from "../redux/productsSlice";
import generateRandomId from "../utils/generateRandomId";
import { Link, useNavigate } from "react-router-dom"; // Import useHistory

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
    price: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(addProduct(formData));
    alert("Product added successfully 🥳");
    setFormData({
      id: generateUniqueProductId(products),
      name: "",
      price: "",
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
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
