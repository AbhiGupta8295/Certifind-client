import React, { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Button } from "@nextui-org/react";
import client from "../../apolloClient";
import CopyToClipboard from "react-copy-to-clipboard";
import { Copy } from "lucide-react";
import "../../css/spinner.scss";

const UPDATE_CERTIFICATE = gql`
  mutation updateCertificate(
    $id: String!
    $title: String
    $organisation: String
    $links: String
    $previewId: String
    $category: String
  ) {
    updateCertificate(
      _id: $id
      Title: $title
      Organisation: $organisation
      Links: $links
      PreviewID: $previewId
      Category: $category
    ) {
      Title
      Organisation
      Links
      PreviewID
      Category
    }
  }
`;

const GET_CERTIFICATE_ID_BY_TITLE = gql`
  query getCertificateIdByTitle($title: String!) {
    getCertificateIdByTitle(Title: $title)
  }
`;

function GetIdByTitle({ title }) {
  const [isCopied, setIsCopied] = useState(false);
  const { loading, error, data } = useQuery(GET_CERTIFICATE_ID_BY_TITLE, {
    variables: { title },
    client,
  });

  if (loading)
    return (
      <div class="spinner">
        <div class="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div>Loading...</div>
      </div>
    );
  if (error) return <p>{error.message}</p>;

  const id = data.getCertificateIdByTitle;

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  return (
    <>
      <div className="flex">
        <h1>
          Id of the certificate with title:{title} is {id}
        </h1>
        <CopyToClipboard text={id} onCopy={handleCopy}>
          <Copy {...(isCopied ? "Copied!" : "Copy to Clipboard")} />
        </CopyToClipboard>
      </div>
      {id && <UpdateCertificate />}
    </>
  );
}
export default GetIdByTitle;

function UpdateCertificate() {
  const [title, setTitle] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [links, setLinks] = useState("");
  const [previewid, setPreviewid] = useState("");
  const [category, setCategory] = useState("");
  const [id, setId] = useState("");

  const [updateCertificate, { data, loading, error }] = useMutation(
    UPDATE_CERTIFICATE,
    { client }
  );

  if (loading)
    return (
      <div class="spinner">
        <div class="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div>Updating...</div>
      </div>
    );
  if (error) return <p>{error.message}</p>;
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateCertificate({
        variables: {
          id: id,
          ...(title !== "" && { title: title }),
          ...(organisation !== "" && { organisation: organisation }),
          ...(organisation !== "" && { links: links }),
          ...(organisation !== "" && { previewId: previewid }),
          ...(organisation !== "" && { category: category }),
        },
      });

      if (!loading) {
        window.alert("Successfully updated");
        window.location.reload();
      }
      setTitle("");
      setOrganisation("");
      setLinks("");
      setPreviewid("");
      setCategory("");
      setId("");
    } catch (error) {
      console.error("Updation error:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="border-solid border-2 border-black rounded-md"
          placeholder="Enter id of the certificate"
        />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border-solid border-2 border-black rounded-md"
          placeholder="Enter Title"
        />
        <input
          type="text"
          value={organisation}
          onChange={(e) => setOrganisation(e.target.value)}
          className="border-solid border-2 border-black rounded-md"
          placeholder="Enter Organisation"
        />
        <input
          type="text"
          value={links}
          onChange={(e) => setLinks(e.target.value)}
          className="border-solid border-2 border-black rounded-md"
          placeholder="Enter Links"
        />
        <input
          type="text"
          value={previewid}
          onChange={(e) => setPreviewid(e.target.value)}
          className="border-solid border-2 border-black rounded-md"
          placeholder="Enter PreviewID"
        />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border-solid border-2 border-black rounded-md"
          placeholder="Enter Category"
        />
        <Button type="submit">Update</Button>
      </div>
    </form>
  );
}

// export default UpdateCertificate;
