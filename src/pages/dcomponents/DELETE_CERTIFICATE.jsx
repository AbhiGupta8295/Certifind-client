import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Button } from "@nextui-org/react";
import client from "../../apolloClient";

import "../../css/spinner.scss";

const DELETE_CERTIFICATE = gql`
  mutation deleteCertificate(
    $title: String!
    $organisation: String!
    $category: String!
  ) {
    deleteCertificate(
      Title: $title
      Organisation: $organisation
      Category: $category
    )
  }
`;

function DeleteCertificate() {
  const [title, setTitle] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [category, setCategory] = useState("");

  const [deleteCertificate, { data, loading, error }] = useMutation(
    DELETE_CERTIFICATE,
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
        <div>Deleting...</div>
      </div>
    );
  if (error) return <p>{error.message}</p>;
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await deleteCertificate({
        variables: {
          title: title,
          organisation: organisation,
          category: category,
        },
      });

      if (!loading) {
        window.alert("Successfully deleted");
        window.location.reload();
      }
      setTitle("");
      setOrganisation("");
      setCategory("");
    } catch (error) {
      console.error("Deletion error:", error.message);
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

export default DeleteCertificate;
