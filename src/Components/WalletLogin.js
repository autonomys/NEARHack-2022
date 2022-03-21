import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { login, logout } from "../utils";
import { SubspaceClient, Identity } from "@subspace/subspace";

const NODE_WS_PROVIDER = "wss://farm.1devndogs.com";
const FARMER_WS_PROVIDER = "wss://farm.1devndogs.com/farmer";

const WalletLogin = ({ setSubspaceClient, setSelectedAccount }) => {
  const [address, setAddress] = useState(null);

  const polkadotLogin = async () => {
    const identity = await Identity.fromWeb3();
    if (identity) {
      const subspaceClient = await SubspaceClient.connect(
        identity,
        NODE_WS_PROVIDER,
        FARMER_WS_PROVIDER
      );
      setSubspaceClient(subspaceClient);
      setSelectedAccount(identity.getKeyringPair().address);
      setAddress(identity.getKeyringPair().address);
    } else {
      alert("Please install Polkadot Extension");
    }
  };

  useEffect(() => {
    polkadotLogin();
  }, []);

  return (
    <>
      <h5>1.- Wallet Login</h5>
      <Card style={{ padding: "3vh" }}>
        <Row className="d-flex justify-content-center">
          <Col md="5">
            <Button
              style={{ width: "100%" }}
              onClick={window.walletConnection.isSignedIn() ? logout : login}
            >
              {window.walletConnection.isSignedIn()
                ? window.accountId + " - Near Connected" + " - Logout"
                : "Near Wallet Login"}
            </Button>
          </Col>
          <Col md="5">
            <Button
              style={{ width: "100%" }}
              onClick={() => {
                polkadotLogin();
              }}
              disabled={address ? true : false}
            >
              {address ? address + " - Connected" : "Polkadot Wallet Login"}
            </Button>
          </Col>
        </Row>
      </Card>
    </>
  );
};

WalletLogin.propTypes = {};

export default WalletLogin;
