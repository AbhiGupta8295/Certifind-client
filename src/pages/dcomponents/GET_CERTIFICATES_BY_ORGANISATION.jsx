import React from "react";
import { gql, useQuery } from "@apollo/client";
import client from "../../apolloClient";
import Cards from "./Cards";
import "../../css/spinner.scss";

function GetCertificatesByOrganisation({ organisation }) {
  const GET_CERTIFICATES_BY_ORGANISATION = gql`
    query certificateByOrganisation($organisation: String!) {
      certificateByOrganisation(Organisation: $organisation) {
        Title
        Organisation
        Links
        PreviewID
        Category
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_CERTIFICATES_BY_ORGANISATION, {
    variables: { organisation },
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
      {!data && <h1>Not Found</h1>}
      {data.certificateByOrganisation.map((certificate) => (
        <section>
          <Cards certificate={certificate} />
        </section>
      ))}
    </>
  );
}

export default GetCertificatesByOrganisation;
