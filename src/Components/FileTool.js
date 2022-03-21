import React from "react";
import { Card, Container, Button, Row, Col } from "react-bootstrap";
import { useState } from "react";

const FileTool = ({ returnObjectId, subspaceClient, selectedAccount }) => {
  const [objectId, setObjectId] = useState(null);
  const [object, setObject] = useState(null);
  const [message, setMessage] = useState(null);
  const [fileData, setFileData] = useState(null);

  const loadFile = (file) => {
    let reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        const value = new Uint8Array(reader.result);
        setFileData(value);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const getObject = async () => {
    try {
      const object = await subspaceClient.getObject(objectId);
      setObject(object);
    } catch (e) {
      setMessage(e);
    }
  };

  const putObject = async () => {
    try {
      const objectId = await subspaceClient.putObject(fileData);
      setObjectId(objectId);
      returnObjectId(objectId);
    } catch (e) {
      setMessage(e);
    }
  };

  return (
    <>
      <h5>2.- Subspace Storage API</h5>
      <Card style={{ padding: "2vh" }}>
        <Container>
          <p>{message && " " + message}</p>
          <Row className="d-flex justify-content-center">
            <Col md="5">
              <input
                type="file"
                id="file"
                accept="image/*"
                disabled={
                  !selectedAccount || !window.walletConnection.isSignedIn()
                }
                onChange={async (e) => {
                  if (e.target.files[0].type.includes("image/")) {
                    if (e.target.files && e.target.files.length > 0) {
                      loadFile(e.target.files[0]);
                    }
                  } else {
                    setMessage("Please use an image file for this demo.");
                  }
                  console.log(window.account);
                }}
              ></input>
            </Col>
            <Col md="5">
              {fileData && (
                <img
                  width={100}
                  src={`data:image/*;base64,${Buffer.from(fileData).toString(
                    "base64"
                  )}`}
                ></img>
              )}
            </Col>
          </Row>
          <hr></hr>
          <Row className="d-flex justify-content-center">
            <Col md="5">
              <Button
                disabled={!fileData}
                onClick={() => putObject()}
                style={{ width: "100%" }}
              >
                Upload a file to the network
              </Button>
            </Col>
            <Col md="5">
              <Button
                disabled={!objectId}
                onClick={() => getObject()}
                style={{ width: "100%" }}
              >
                Get the file from the network
              </Button>
              <h3> {objectId && objectId}</h3>
              {object && (
                <img
                  width={100}
                  src={`data:image/*;base64,${Buffer.from(object).toString(
                    "base64"
                  )}`}
                ></img>
              )}
              <p>{message && " " + message}</p>
            </Col>
          </Row>
        </Container>
      </Card>
    </>
  );
};

FileTool.propTypes = {};

const getLabel = ({ address, meta }) => {
  return meta.name.toUpperCase() + " | " + address;
};

export default FileTool;
