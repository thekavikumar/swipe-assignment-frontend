import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct, selectProductList } from "../redux/productsSlice";
import { Link, useParams, useNavigate } from "react-router-dom";

function ProductUpdate() {
  const dispatch = useDispatch();
  const products = useSelector(selectProductList);
  const { id } = useParams();
  const intId = parseInt(id);
  const history = useNavigate();

  const productToUpdate = products.find((product) => product.id === intId);

  const [formData, setFormData] = useState({
    id: intId,
    name: productToUpdate?.name,
    price: productToUpdate?.price,
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(updateProduct({ id: intId, updatedProduct: formData }));
    alert("Product updated successfully 🎉");
    console.log("Updated product: ", formData);
    console.log("All products: ", products);
    history("/products");
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
      <h1>Edit Product</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="productId">
          <Form.Label>Product ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product ID"
            name="id"
            value={formData.id}
            disabled // Disable editing of product ID
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
          Update
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

export default ProductUpdate;
