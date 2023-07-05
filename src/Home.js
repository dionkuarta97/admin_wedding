import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { CopyToClipboard } from "react-copy-to-clipboard";
import server from "./server";

const Home = () => {
  const navigate = useNavigate();
  const [nama, setNama] = useState();
  const [type, setType] = useState();
  const [copied, setCopied] = useState(false);
  const [namaUndangan, setNamaUndangan] = useState();
  const [to, setTo] = useState();
  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      navigate("/login");
    }
  }, []);
  return (
    <>
      <div
        style={{
          padding: "2rem",
        }}
      >
        <Button
          onClick={() => {
            localStorage.removeItem("access_token");
            navigate("/login");
          }}
        >
          Logout
        </Button>
      </div>
      <div align="center">
        <Form style={{ textAlign: "left", padding: "3rem" }}>
          <Form.Label>Nama</Form.Label>
          <Form.Control
            value={nama}
            onChange={(e) => {
              setCopied(false);
              setNama(e.target.value);
            }}
          />
          <Form.Label style={{ marginTop: "1rem" }}>Nama diundangan</Form.Label>
          <Form.Control
            value={namaUndangan}
            onChange={(e) => {
              setNamaUndangan(e.target.value);
            }}
          />
          <Form.Label style={{ marginTop: "1rem" }}>Tipe</Form.Label>
          <Form.Select
            value={type}
            onChange={(e) => {
              setType(e.target.value);
            }}
          >
            <option value={""} selected disabled>
              -Pilih-
            </option>
            <option value={"Individual"}>Individual</option>
            <option value={"Grup"}>Grup</option>
          </Form.Select>
        </Form>
        <Button
          onClick={() => {
            server({
              url: "create",
              method: "POST",
              headers: {
                access_token: localStorage.getItem("access_token"),
              },
              data: {
                nama: nama,
                type: type,
                nama_undangan: namaUndangan,
              },
            })
              .then(({ data }) => {
                setTo(data.to);
              })
              .catch((err) => {
                console.log(err.response.data);
              });
            console.log(to);
          }}
        >
          Save
        </Button>

        {to && (
          <>
            <Form
              style={{
                padding: "3rem",
              }}
            >
              <Form.Control
                value={"https://dionkasih.online/undangan?to=" + to}
              />
            </Form>

            <CopyToClipboard
              text={"https://dionkasih.online/undangan?to=" + to}
              onCopy={() => {
                setNama("");
                setType("");
                setNamaUndangan("");
                setCopied(true);
                setTo("");
              }}
            >
              <Button>Copy</Button>
            </CopyToClipboard>
          </>
        )}
        <br />
        <br />
        <br />
        {copied && (
          <span
            style={{
              color: "green",
            }}
          >
            berhasil di copy
          </span>
        )}
      </div>
    </>
  );
};

export default Home;
