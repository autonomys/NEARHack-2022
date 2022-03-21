import React, { useState, useEffect } from "react";
import { Button, Card, Container, Row, Alert, Col } from "react-bootstrap";
const BN = require("bn.js");

const MintingTool = (props) => {
  const [notInitContract, setNotInitContract] = useState(false);
  const [userHasNFT, setuserHasNFT] = useState(false);

  useEffect(() => {
    const receivedNFT = async () => {
      try {
        if (window.accountId !== "") {
          setNotInitContract(false);
          setuserHasNFT(
            await window.contract.check_token({
              id: `${window.accountId}-near-nft-subspace-storage`,
            })
          );
        }
      } catch (error) {
        if (error.message.includes("The contract is not initialized")) {
          setNotInitContract(true);
          setuserHasNFT(false);
        } else {
          console.log(error);
        }
      }
    };
    receivedNFT();
  }, []);

  const initNFT = async () => {
    await window.contract.new_default_meta({
      owner_id: window.accountId,
    });
  };
  
  const mintNFT = async () => {
    await window.contract.nft_mint(
      {
        token_id: `${window.accountId}-near-nft-subspace-storage`,
        metadata: {
          title: "Subspace Storage API + NEAR NFT Token",
          description:
            "A demo NFT token to integrate the Subspace Storage API to NEAR NFT",
          extra: JSON.stringify({ objectId: props.objectId }),
        },
        receiver_id: window.accountId,
      },
      300000000000000, // attached GAS (optional)
      new BN("1000000000000000000000000")
    );
  };

  return (
    <>
      <h5>3.- NEAR NFT - mint </h5>
      <Card style={{ padding: "2vh" }}>
        <Container>
          <Row className="d-flex justify-content-center">
            <Col md="5">
              <Button
                disabled={!notInitContract}
                onClick={initNFT}
                style={{ width: "100%" }}
              >
                {notInitContract
                  ? "Initialize NFT contract"
                  : "NFT contract Already initialized"}
              </Button>
            </Col>
            <Col md="5">
              <Button
                disabled={
                  !props.objectId
                    ? true
                    : props.userNFTStatus || window.accountId === ""
                }
                onClick={mintNFT}
                style={{ width: "100%" }}
              >
                Mint NFT
              </Button>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center">
            {props.userNFTStatus ? (
              <Alert variant="info" style={{ marginTop: "2vh" }}>
                <p style={{ textAlign: "center" }}>
                  You have an NFT already. You can see it{" "}
                  <a href={"https://wallet.testnet.near.org/?tab=collectibles"}>
                    here!
                  </a>
                  :)
                </p>
              </Alert>
            ) : null}
          </Row>
        </Container>
      </Card>
    </>
  );
};

MintingTool.propTypes = {};

export default MintingTool;
