import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { BiTrash } from "react-icons/bi";
import EditableField from "./EditableField";

const InvoiceItem = (props) => {
  const {
    onItemizedItemEdit,
    currency,
    onRowDel,
    items,
    onRowAdd,
    productList,
  } = props;

  const itemTable = items.map((item) => (
    <ItemRow
      key={item.id}
      item={item}
      onDelEvent={onRowDel}
      onItemizedItemEdit={onItemizedItemEdit}
      currency={currency}
      productList={productList}
    />
  ));

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>ITEM</th>
            <th>QTY</th>
            <th>PRICE/RATE</th>
            <th className="text-center">ACTION</th>
          </tr>
        </thead>
        <tbody>{itemTable}</tbody>
      </Table>
      <Button className="fw-bold" onClick={onRowAdd}>
        Add Item
      </Button>
    </div>
  );
};

const ItemRow = (props) => {
  const onDelEvent = () => {
    props.onDelEvent(props.item);
  };

  const handleProductChange = (event) => {
    const selectedProductId = event.target.value;
    const selectedProduct = props.productList.find((product) => {
      return product.id == selectedProductId;
    });
    console.log(selectedProduct); // Log the product object

    props.onItemizedItemEdit(
      "itemDescription",
      selectedProduct.description,
      props.item.itemId
    );
    props.onItemizedItemEdit(
      "itemPrice",
      selectedProduct.price,
      props.item.itemId
    );
    props.onItemizedItemEdit(
      "itemName",
      selectedProduct.name,
      props.item.itemId
    );
  };

  return (
    <tr>
      <td style={{ width: "100%" }}>
        <select onChange={handleProductChange}>
          <option value="">Select Product</option>
          {props.productList.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
      </td>
      <td style={{ minWidth: "70px" }}>
        <EditableField
          onItemizedItemEdit={(evt) =>
            props.onItemizedItemEdit(evt, props.item.itemId)
          }
          cellData={{
            type: "number",
            name: "itemQuantity",
            min: 1,
            step: "1",
            value: props.item.itemQuantity,
            id: props.item.itemId,
          }}
        />
      </td>
      <td style={{ minWidth: "130px" }}>
        {props.currency}
        {props.item.itemPrice}
      </td>
      <td className="text-center" style={{ minWidth: "50px" }}>
        <BiTrash
          onClick={onDelEvent}
          style={{ height: "33px", width: "33px", padding: "7.5px" }}
          className="text-white mt-1 btn btn-danger"
        />
      </td>
    </tr>
  );
};

export default InvoiceItem;
