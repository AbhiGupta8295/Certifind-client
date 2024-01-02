import React from "react";
import { gql, useQuery } from "@apollo/client";
import client from "../../apolloClient";
import Cards from "./Cards";
import "../../css/spinner.scss";

function GetCertificatesByCategory({ category }) {
  const GET_CERTIFICATES_BY_CATEGORY = gql`
    query certificateByCategory($category: String!) {
      certificateByCategory(Category: $category) {
        Category
        Links
        Organisation
        PreviewID
        Title
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_CERTIFICATES_BY_CATEGORY, {
    variables: { category },
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

  return (
    <>
      {data.certificateByCategory.map((certificate) => (
        <section>
          <Cards certificate={certificate} />
        </section>
      ))}
    </>
  );
}

export default GetCertificatesByCategory;
