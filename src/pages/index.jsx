// pages/index.js
//original one
import { React, useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import client from "../apolloClient";
import "../css/index.css";
import SelectionQueryDropdown from "./dcomponents/querydropdown.jsx";
import SelectionMutationDropdown from "./dcomponents/mutationdropdown.jsx";
import { input, Button, Checkbox } from "@nextui-org/react";
import GetCertificates from "./dcomponents/GET_CERTIFICATES";
import GetCertificatesByOrganisation from "./dcomponents/GET_CERTIFICATES_BY_ORGANISATION.jsx";
import GetCertificatesByCategory from "./dcomponents/GET_CERTIFICATES_BY_CATEGORY.jsx";
import GetCertificatesByTitle from "./dcomponents/GET_CERTIFICATES_BY_TITLE.jsx";

import CreateCertificate from "./dcomponents/CREATE_CERTIFICATE.jsx";
import DeleteCertificate from "./dcomponents/DELETE_CERTIFICATE.jsx";
// import UpdateCertificate from "./dcomponents/UPDATE_CERTIFICATE.jsx";
import GetIdByTitle from "./dcomponents/UPDATE_CERTIFICATE.jsx";

function Home() {
  const options = ["All", "By Organisation", "By Category", "By Title"];
  const mutationOptions = ["Create", "Delete", "Update"];
  const [selection, setSelection] = useState(null);
  const [submit, setSubmit] = useState(false);
  const [organisation, setOrganisation] = useState(null);
  const [category, setCategory] = useState(null);
  const [title, setTitle] = useState(null);
  const [links, setLinks] = useState(null);
  const [previewid, setPreviewid] = useState(null);
  const[update, setUpdate] = useState(false);

  const handleSelection = (selectedOption) => {
    setSelection(selectedOption);
    setSubmit(false);
  };
  const handleSubmit = () => {
    if (selection === "By Organisation") {
      setSubmit(true);
    }
    if (selection === "By Category") {
      setSubmit(true);
    }
    if (selection === "By Title") {
      setSubmit(true);
    }
    if (selection === "Update") {
      setSubmit(true); setUpdate(true);
    }
  };
  return (
    <div>
      <SelectionQueryDropdown options={options} onChange={handleSelection} />
      <SelectionMutationDropdown
        mutationOptions={mutationOptions}
        onChange={handleSelection}
      />
      <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items- justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        {selection === "All" && <GetCertificates />}
      </section>
      {selection === "By Organisation" && (
        <div>
          <input
            required
            type="text"
            value={organisation}
            onChange={(e) => {
              setOrganisation(e.target.value);
              setSubmit(false);
            }}
            className="border-solid border-2 border-black rounded-md"
            placeholder="Enter Organisation"
          />
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      )}
      <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items- justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        {submit && selection === "By Organisation" && (
          <GetCertificatesByOrganisation organisation={organisation} />
        )}
      </section>

      {selection === "By Category" && (
        <div>
          <input
            required
            type="text"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setSubmit(false);
            }}
            className="border-solid border-2 border-black rounded-md"
            placeholder="Enter Category"
          />
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      )}
      <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items- justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        {submit && selection === "By Category" && (
          <GetCertificatesByCategory category={category} />
        )}
      </section>

      {selection === "By Title" && (
        <div>
          <input
            required
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setSubmit(false);
            }}
            className="border-solid border-2 border-black rounded-md"
            placeholder="Enter Title"
          />
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      )}
      <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items- justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        {submit && selection === "By Title" && (
          <GetCertificatesByTitle title={title} />
        )}
      </section>

      {selection === "Create" && <CreateCertificate />}
      {selection === "Delete" && <DeleteCertificate />}
      {selection === "Update" && (
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => {setTitle(e.target.value);setSubmit(false);setUpdate(false);}}
            className="border-solid border-2 border-black rounded-md"
            placeholder="Enter title of the certificate"
          />
          <Button onClick= {handleSubmit}>Submit</Button>
          </div>
        ) }
        {submit  && update && (
          <GetIdByTitle title={title} />
        )}
    </div>
  );
}

export default Home;
//can not use useQuery inside a callback function instead useLazyQuery can be used

// const { loading, error, data } = useQuery(GET_CERTIFICATES_BY_TITLE, {
//   variables: { Title: "Graph Developer Associate" },
//   client,
// });
// if (loading) return <p>Loading...</p>;
// if (error) return <p>{error.message}</p>;

{
  //response data format in arrays
  /* <ul>
        {data.certificateByTitle.map((certificate) => (
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
      </ul> */
}
{
  //single element response
  /* <h1>
        {data.certificateByTitle.Title}
      </h1> */
}

// useEffect(() => {
//   const fetchData = async () => {

//     if (selection === "All" ) {
//       try {
//         const { loading, error, data } = await client.query({
//           query: GET_CERTIFICATES,
//         });

//         if (loading) return <p>Loading...</p>;
//         if (error) {
//           console.error("Error fetching certificates:", error.message);
//         }
//          else {

//            setData(data);
//          }
//       } catch (error) {
//         console.error("Error fetching certificates:", error.message);
//       }
//     }

//     if (selection === "By Organisation" ) {
//       try {
//         const { loading, error, data } = await client.query({
//           query: GET_CERTIFICATES_BY_ORGANISATION,
//           variables: { Organisation: organisation },
//         });

//         if (loading) return <p>Loading...</p>;
//         if (error) {
//           console.error("Error fetching certificates:", error.message);
//         }

//         setData(data);
//       } catch (error) {
//         console.error("Error fetching certificates:", error.message);
//       }
//     }

//     if (selection === "By Category" ) {
//       try {
//         const { loading, error, data } = await client.query({
//           query: GET_CERTIFICATES_BY_CATEGORY,
//           variables: { Category: category },
//         });

//         if (loading) return <p>Loading...</p>;
//         if (error) {
//           console.error("Error fetching certificates:", error.message);
//         }

//         setData(data);
//       } catch (error) {
//         console.error("Error fetching certificates:", error.message);
//       }
//     }
//   };

//   fetchData();
// }, [selection]);
