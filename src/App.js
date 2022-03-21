import React, { useState } from "react";
import { Navbar, Container, Row, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import MintingTool from "./Components/MintingTool";
import FileTool from "./Components/FileTool";
import WalletLogin from "./Components/WalletLogin";
import Logo from "./assets/logo-white.svg";
import LogoSubspace from "./assets/subspace.png";
import DisplayMetadata from "./Components/DisplayMetadata";

export default function App() {
  const [objectId, returnObjectId] = useState(null);
  const [subspaceClient, setSubspaceClient] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState(null);

  return (
    <React.Fragment>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src={Logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            NEAR NFT
            <span> + </span> Subspace Storage API
            <img
              alt=""
              src={LogoSubspace}
              width="30"
              height="30"
              className="d-inline-block align-top"
              style={{ marginLeft: "8px" }}
            />
            {" | Demo Integration"}
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Container style={{ marginTop: "3vh" }}>
        <Row>
          <Alert>
            Uploading a file, we will receive an <b>objectId</b> from the{" "}
            <b>Subspace Storage API</b> wich represent the file in the network.
            <br />
            <b>Subspace ObjectIds</b> are Similar to <b>IPFS hashes</b>, both
            can be used to retrieve a file from the storage network and also be
            included as a reference in any contract, in the current demo, an NFT
            token using the <b>NEAR protocol</b> .
          </Alert>
        </Row>
        <Row>
          <WalletLogin
            setSubspaceClient={setSubspaceClient}
            setSelectedAccount={setSelectedAccount}
          />
        </Row>
        <Row style={{ marginTop: "3vh" }}>
          <FileTool
            subspaceClient={subspaceClient}
            returnObjectId={returnObjectId}
            selectedAccount={selectedAccount}
          ></FileTool>
        </Row>
        <Row style={{ marginTop: "3vh" }}>
          <MintingTool objectId={objectId}></MintingTool>
        </Row>
        <Row style={{ marginTop: "3vh" }}>
          <DisplayMetadata
            objectId={objectId}
            subspaceClient={subspaceClient}
          ></DisplayMetadata>
        </Row>
      </Container>
    </React.Fragment>
  );
}
