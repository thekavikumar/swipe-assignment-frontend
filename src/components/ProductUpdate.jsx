import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct, selectProductList } from "../redux/productsSlice";
import { selectInvoiceList, updateInvoice } from "../redux/invoicesSlice";
import { Link, useParams, useNavigate } from "react-router-dom";

function ProductUpdate() {
  const dispatch = useDispatch();
  const products = useSelector(selectProductList);
  const { id } = useParams();
  const invoices = useSelector(selectInvoiceList);
  const intId = parseInt(id);
  const history = useNavigate();

  const productToUpdate = products.find((product) => product.id === intId);

  const [formData, setFormData] = useState({
    id: intId,
    name: productToUpdate?.name,
    description: productToUpdate?.description,
    price: productToUpdate?.price,
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      dispatch(updateProduct({ id: intId, updatedProduct: formData }));

      // Update invoices containing the updated product
      invoices.forEach((invoice) => {
        const updatedItems = invoice.items.map((item) => {
          if (item.itemId === intId) {
            return {
              ...item,
              itemName: formData.name,
              itemDescription: formData.description,
              itemPrice: formData.price,
            };
          }
          return item;
        });

        const total = updatedItems
          .reduce(
            (acc, item) =>
              acc + parseFloat(item.itemPrice) * parseInt(item.itemQuantity),
            0
          )
          .toFixed(2);

        dispatch(
          updateInvoice({
            id: invoice.id,
            updatedInvoice: { ...invoice, items: updatedItems, total: total },
          })
        );
      });

      alert("Product updated successfully 🎉");
      history("/products");
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
      <h1>Edit Product</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="productId">
          <Form.Label>Product ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product ID"
            name="id"
            value={formData.id}
            disabled
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
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="productDescription">
          <Form.Label>Product Description</Form.Label>
          <Form.Control
            type="text"
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

        <Form.Group controlId="productPrice">
          <Form.Label>Price</Form.Label>
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
