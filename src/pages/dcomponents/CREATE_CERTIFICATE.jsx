import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Button } from "@nextui-org/react";
import client from "../../apolloClient";
import "../../css/spinner.scss";

const CREATE_CERTIFICATE = gql`
  mutation createCertificate(
    $title: String!
    $organisation: String!
    $links: String!
    $previewId: String!
    $category: String!
  ) {
    createCertificate(
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

function CreateCertificate() {
  const [title, setTitle] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [links, setLinks] = useState("");
  const [previewid, setPreviewid] = useState("");
  const [category, setCategory] = useState("");

  const [createCertificate, { data, loading, error }] = useMutation(
    CREATE_CERTIFICATE,
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
        <div>Creating...</div>
      </div>
    );
  if (error) return <p>{error.message}</p>;
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createCertificate({
        variables: {
          title: title,
          organisation: organisation,
          links: links,
          previewId: previewid,
          category: category,
        },
      });

      if (!loading) {
        window.alert("Successfully created");
        window.location.reload();
      }
      setTitle("");
      setOrganisation("");
      setLinks("");
      setPreviewid("");
      setCategory("");
    } catch (error) {
      console.error("Submission error:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          required
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border-solid border-2 border-black rounded-md"
          placeholder="Enter Title"
        />
        <input
          required
          type="text"
          value={organisation}
          onChange={(e) => setOrganisation(e.target.value)}
          className="border-solid border-2 border-black rounded-md"
          placeholder="Enter Organisation"
        />
        <input
          required
          type="text"
          value={links}
          onChange={(e) => setLinks(e.target.value)}
          className="border-solid border-2 border-black rounded-md"
          placeholder="Enter Links"
        />
        <input
          required
          type="text"
          value={previewid}
          onChange={(e) => setPreviewid(e.target.value)}
          className="border-solid border-2 border-black rounded-md"
          placeholder="Enter PreviewID"
        />
        <input
          required
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border-solid border-2 border-black rounded-md"
          placeholder="Enter Category"
        />
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}

export default CreateCertificate;
