import React, { useEffect } from "react";
import { Card, Container, Button, Row, Col } from "react-bootstrap";
import { useState } from "react";

const DisplayMetadata = ({ objectId, subspaceClient }) => {
  const [tokenData, setTokenData] = useState(null);
  const [object, setObject] = useState(null);
  const [message, setMessage] = useState(null);
  const [fileId, setFileId] = useState(null);

  const getObject = async () => {
    try {
      const object = await subspaceClient.getObject(fileId);
      setObject(object);
    } catch (e) {
      setMessage(e);
    }
  };

  useEffect(() => {
    const receivedNFT = async () => {
      try {
        const tokenData = await window.contract.nft_token({
          token_id: `${window.accountId}-near-nft-subspace-storage`,
        });
        setTokenData(tokenData);
        setFileId(JSON.parse(tokenData.metadata.extra).objectId);
      } catch (error) {
        console.error(error);
      }
    };
    receivedNFT();
  }, []);

  return (
    <>
      <h5>4.- Display NFT</h5>
      <Card style={{ padding: "2vh" }}>
        <Container>
          <Row className="d-flex justify-content-center">
            <Col md="10">
              <Button
                disabled={!fileId}
                onClick={() => getObject()}
                style={{ width: "100%" }}
              >
                Get the file from the network
              </Button>
              <p>Found NFT: {tokenData && JSON.stringify(tokenData.metadata)}</p>
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

DisplayMetadata.propTypes = {};

export default DisplayMetadata;
