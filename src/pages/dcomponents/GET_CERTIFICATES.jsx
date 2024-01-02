import React from "react";
import { gql, useQuery } from "@apollo/client";
import client from "../../apolloClient";
import Cards from "./Cards";
import "../../css/spinner.scss";

const GET_CERTIFICATES = gql`
  query {
    allCertificates {
      Title
      Organisation
      Links
      PreviewID
      Category
    }
  }
`;

function GetCertificates() {
  const { loading, error, data } = useQuery(GET_CERTIFICATES, {
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
      {data.allCertificates.map((certificate) => (
        <section>
          <Cards certificate={certificate} />
        </section>
      ))}
    </>
  );
}

export default GetCertificates;

{
  /* <ol>
      {data.allCertificates.map((certificate) => (
        <li key={certificate.Title}>
          <strong>{certificate.Title}</strong> - {certificate.Organisation}
          <br />
          Category: {certificate.Category}
          <br />
          <a href={certificate.Links} target="_blank" rel="noopener noreferrer">
            View Certificate
          </a>
        </li>
      ))}
    </ol> */
}
