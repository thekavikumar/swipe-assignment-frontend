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
    props.onItemizedItemEdit("itemId", selectedProductId, props.item.itemId);
    props.onItemizedItemEdit(
      "itemDescription",
      selectedProduct.description,
      selectedProductId
    );
    props.onItemizedItemEdit(
      "itemPrice",
      selectedProduct.price,
      selectedProductId
    );
    props.onItemizedItemEdit(
      "itemName",
      selectedProduct.name,
      selectedProductId
    );
  };

  return (
    <tr>
      <td style={{ width: "100%" }}>
        <select
          onChange={handleProductChange}
          className="form-select form-select-md mb-3"
          aria-label=".form-select-md example"
        >
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
          onItemizedItemEdit={(event) => {
            props.onItemizedItemEdit(
              "itemQuantity",
              event.target.value,
              props.item.itemId
            );
          }}
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
      <td style={{ minWidth: "130px", fontSize: "15px" }}>
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
