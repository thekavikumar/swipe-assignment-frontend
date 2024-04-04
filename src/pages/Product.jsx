import React from "react";
import { Container, Table, Button } from "react-bootstrap";
import { BsPencil, BsTrash, BsPlus } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"; // Import useSelector and useDispatch from react-redux
import { selectProductList } from "../redux/productsSlice"; // Import your selector to fetch product list
import { deleteProduct } from "../redux/productsSlice"; // Import your action to delete product

function Product() {
  const dispatch = useDispatch();
  const products = useSelector(selectProductList); // Fetch product list from Redux store using the selector
  console.log("product page: ", products);
  // Function to handle delete button click
  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId)); // Dispatch the deleteProduct action with the product ID
  };

  return (
    <Container>
      <h1>Products</h1>
      <div className="d-flex gap-5">
        <Link to="/create-product">
          <Button variant="success" className="mb-3">
            <BsPlus /> Create Product
          </Button>
        </Link>
        <Link to="/">
          <Button variant="success" className="mb-3">
            Go Home
          </Button>
        </Link>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr key={product?.id}>
              <td>{product?.id}</td>
              <td>{product?.name}</td>
              <td>{product?.description}</td>
              <td>{product?.price}</td>
              <td>
                <Link to={`/edit-product/${product?.id}`}>
                  {" "}
                  {/* Link to the edit product page */}
                  <Button variant="primary">
                    <BsPencil /> Edit
                  </Button>
                </Link>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(product?.id)}
                >
                  <BsTrash /> Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Product;
