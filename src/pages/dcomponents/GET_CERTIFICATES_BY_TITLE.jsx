import React from "react";
import { gql, useQuery } from "@apollo/client";
import client from "../../apolloClient";
import Cards from "./Cards";
import "../../css/spinner.scss";

function GetCertificatesByTitle({ title }) {
  const GET_CERTIFICATES_BY_TITLE = gql`
    query certificateByTitle($title: String!) {
      certificateByTitle(Title: $title) {
        Title
        Organisation
        Links
        PreviewID
        Category
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_CERTIFICATES_BY_TITLE, {
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
  if (error) return <p>Not Found</p>;

  const certificate = data.certificateByTitle;
  return (
    <>
      <section>
        <Cards certificate={certificate} />
      </section>
    </>
  );
}

export default GetCertificatesByTitle;
