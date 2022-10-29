import React from "react";
import { Link, Redirect } from "react-router-dom";
import { Modal, ModalHeader, CardSubtitle, ModalBody, ModalFooter, Button } from "reactstrap";

export default function Modals({ isOpen, toggle, address, keys, handleClearState }) {
  return (
    <div>
      <Modal isOpen={isOpen} toggle={() => toggle()}>
        {/* /<ModalHeader toggle={() => toggle()}>Modal title</ModalHeader> */}
        <ModalBody>
          <CardSubtitle>
            Address: <h5 style={{ fontSize: "14px", overflowWrap: "anywhere" }}>{address} </h5>
          </CardSubtitle>
          <br />
          <CardSubtitle>
            key: <h5 style={{ fontSize: "14px", overflowWrap: "anywhere" }}>{keys} </h5>
          </CardSubtitle>
        </ModalBody>
        <ModalFooter>
          <Link style={{ fontSize: "14px", color: "white" }} to="/login">
            <Button color="primary">Login</Button>
          </Link>
        </ModalFooter>
      </Modal>
    </div>
  );
}