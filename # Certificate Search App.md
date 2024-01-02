 # Certificate Search App

This is a Next.js application that allows users to search for certificates based on various criteria. The app uses Apollo Client to fetch data from a GraphQL API.

## Getting Started

To run the app, you will need to have Node.js and npm installed. Once you have these installed, you can clone the repository and run the following commands:

```
npm install
npm run dev
```

This will start the development server and open the app in your browser.

## Code Overview

The app consists of several components:

* `Home.js`: This is the main component of the app. It contains the UI for selecting the search criteria and displaying the results.
* `SelectionQueryDropdown.jsx`: This component displays a dropdown menu of query options.
* `SelectionMutationDropdown.jsx`: This component displays a dropdown menu of mutation options.
* `GetCertificates.jsx`: This component fetches all certificates from the API and displays them in a list.
* `GetCertificatesByOrganisation.jsx`: This component fetches certificates based on the specified organization and displays them in a list.
* `GetCertificatesByCategory.jsx`: This component fetches certificates based on the specified category and displays them in a list.
* `GetCertificatesByTitle.jsx`: This component fetches certificates based on the specified title and displays them in a list.
* `CreateCertificate.jsx`: This component allows users to create a new certificate.
* `DeleteCertificate.jsx`: This component allows users to delete a certificate.
* `UpdateCertificate.jsx`: This component allows users to update a certificate.

## How to Use the App

To use the app, simply select the desired search criteria from the dropdown menus and click the "Submit" button. The app will then fetch the data from the API and display the results.

## Code Explanation

### `Home.js`

The `Home.js` component is the main component of the app. It contains the UI for selecting the search criteria and displaying the results.

The component state consists of the following properties:

* `selection`: The selected search criteria.
* `submit`: A flag indicating whether the user has submitted the search criteria.
* `organisation`: The organization to search for.
* `category`: The category to search for.
* `title`: The title to search for.
* `links`: The links to the certificates.
* `previewid`: The id
