import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import { BiPaperPlane, BiCloudDownload } from "react-icons/bi";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const GenerateInvoice = () => {
  html2canvas(document.querySelector("#invoiceCapture")).then((canvas) => {
    const imgData = canvas.toDataURL("image/png", 1.0);
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: [612, 792],
    });
    pdf.internal.scaleFactor = 1;
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("invoice-001.pdf");
  });
};

const InvoiceModal = (props) => {
  const itemsByCategory = {};
  props.items.forEach((item) => {
    if (!itemsByCategory[item.itemCategory]) {
      itemsByCategory[item.itemCategory] = [];
    }
    itemsByCategory[item.itemCategory].push(item);
  });

  const categorySubtotals = {};
  Object.keys(itemsByCategory).forEach((category) => {
    const subtotal = itemsByCategory[category].reduce((acc, item) => {
      return acc + item.itemPrice * item.itemQuantity;
    }, 0);
    categorySubtotals[category] = subtotal;
  });

  console.log("itemsByCategory: ", itemsByCategory);

  return (
    <div>
      <Modal
        show={props.showModal}
        onHide={props.closeModal}
        size="lg"
        centered
      >
        <div id="invoiceCapture">
          <div className="d-flex flex-row justify-content-between align-items-start bg-light w-100 p-4">
            <div className="w-100">
              <h6 className="fw-bold text-secondary mb-1">
                Invoice ID: {props.info.id || ""}
              </h6>
              <h4 className="fw-bold my-2">
                {props.info.billFrom || "John Uberbacher"}
              </h4>
              <h7 className="fw-bold text-secondary mb-1">
                Invoice No.: {props.info.invoiceNumber || ""}
              </h7>
            </div>
            <div className="text-end ms-4">
              <h6 className="fw-bold mt-1 mb-2">Amount&nbsp;Due:</h6>
              <h5 className="fw-bold text-secondary">
                {" "}
                {props.currency} {props.total}
              </h5>
            </div>
          </div>
          <div className="p-4">
            <Row className="mb-4">
              <Col md={4}>
                <div className="fw-bold">Billed to:</div>
                <div>{props.info.billTo || ""}</div>
                <div>{props.info.billToAddress || ""}</div>
                <div>{props.info.billToEmail || ""}</div>
              </Col>
              <Col md={4}>
                <div className="fw-bold">Billed From:</div>
                <div>{props.info.billFrom || ""}</div>
                <div>{props.info.billFromAddress || ""}</div>
                <div>{props.info.billFromEmail || ""}</div>
              </Col>
              <Col md={4}>
                <div className="fw-bold mt-2">Date Of Issue:</div>
                <div>{props.info.dateOfIssue || ""}</div>
              </Col>
            </Row>
            <Table className="mb-0">
              {Object.keys(itemsByCategory).map((category, index) => (
                <div key={index} className="mt-4">
                  <h5 className="fw-bold mb-3">{category}</h5>
                  <Table>
                    <thead>
                      <tr>
                        <th>Quantity</th>
                        <th>Description</th>
                        <th className="text-end">Price</th>
                        <th className="text-end">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Map items within the category */}
                      {itemsByCategory[category].map((item, i) => (
                        <tr key={i}>
                          <td style={{ width: "70px" }}>{item.itemQuantity}</td>
                          <td>
                            {item.itemName} - {item.itemDescription}
                          </td>
                          <td className="text-end" style={{ width: "100px" }}>
                            {props.currency} {item.itemPrice}
                          </td>
                          <td className="text-end" style={{ width: "100px" }}>
                            {props.currency}{" "}
                            {item.itemPrice * item.itemQuantity}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    {/* Display subtotal for the category */}
                    <tfoot>
                      <tr>
                        <td colSpan="3" className="text-end fw-bold">
                          Subtotal:
                        </td>
                        <td className="text-end">
                          {props.currency} {categorySubtotals[category]}
                        </td>
                      </tr>
                    </tfoot>
                  </Table>
                </div>
              ))}
            </Table>
            <Table>
              <tbody>
                <tr>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
                <tr className="text-end">
                  <td></td>
                  <td className="fw-bold" style={{ width: "100px" }}>
                    TAX
                  </td>
                  <td className="text-end" style={{ width: "100px" }}>
                    {props.currency} {props.taxAmmount ? props.taxAmmount : 0.0}
                  </td>
                </tr>
                {props.discountAmmount !== 0.0 && (
                  <tr className="text-end">
                    <td></td>
                    <td className="fw-bold" style={{ width: "100px" }}>
                      DISCOUNT
                    </td>
                    <td className="text-end" style={{ width: "100px" }}>
                      {props.currency}{" "}
                      {props.discountAmmount ? props.discountAmmount : 0.0}
                    </td>
                  </tr>
                )}
                <tr className="text-end">
                  <td></td>
                  <td className="fw-bold" style={{ width: "100px" }}>
                    TOTAL
                  </td>
                  <td className="text-end" style={{ width: "100px" }}>
                    {props.currency} {props.total}
                  </td>
                </tr>
              </tbody>
            </Table>
            {props.info.notes && (
              <div className="bg-light py-3 px-4 rounded">
                {props.info.notes}
              </div>
            )}
          </div>
        </div>
        <div className="pb-4 px-4">
          <Row>
            <Col md={6}>
              <Button
                variant="primary"
                className="d-block w-100"
                onClick={GenerateInvoice}
              >
                <BiPaperPlane
                  style={{ width: "15px", height: "15px", marginTop: "-3px" }}
                  className="me-2"
                />
                Send Invoice
              </Button>
            </Col>
            <Col md={6}>
              <Button
                variant="outline-primary"
                className="d-block w-100 mt-3 mt-md-0"
                onClick={GenerateInvoice}
              >
                <BiCloudDownload
                  style={{ width: "16px", height: "16px", marginTop: "-3px" }}
                  className="me-2"
                />
                Download Copy
              </Button>
            </Col>
          </Row>
        </div>
      </Modal>
      <hr className="mt-4 mb-3" />
    </div>
  );
};

export default InvoiceModal;
