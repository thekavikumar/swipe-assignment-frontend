import React from "react";
import { Container, Table, Button } from "react-bootstrap";
import { BsPencil, BsTrash, BsPlus } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectProductList } from "../redux/productsSlice";
import { deleteProduct } from "../redux/productsSlice";

function Product() {
  const dispatch = useDispatch();
  const products = useSelector(selectProductList);
  console.log("product page: ", products);

  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId));
  };

  return (
    <Container>
      <h1 className="mt-4 mb-3">Products</h1>
      <div className="mb-3 d-flex flex-wrap justify-content-between">
        <Link to="/create-product">
          <Button variant="success" className="mb-3 mb-md-0">
            <BsPlus /> Create Product
          </Button>
        </Link>
        <Link to="/">
          <Button variant="success">Go Home</Button>
        </Link>
      </div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th className="p-2">ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">Description</th>
            <th className="p-2">Price</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr key={product?.id}>
              <td className="p-2">{product?.id}</td>
              <td className="p-2">{product?.name}</td>
              <td className="p-2">{product?.description}</td>
              <td className="p-2">{product?.price}</td>
              <td className="p-2">
                <Link to={`/edit-product/${product?.id}`}>
                  <Button variant="primary" className="me-2 mb-2 mb-md-0">
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
