import gql from "graphql-tag";
const addAsset = gql`
  mutation addAsset(
    $name: String!
    $manufacturer: String!
    $imei: String!
    $status: String!
  ) {
    addAsset(
      name: $name
      manufacturer: $manufacturer
      imei: $imei
      status: $status
    ) {
      code
      isError
      message
    }
  }
`;

const updateAsset = gql`
  mutation updateAsset(
    $_id: String
    $name: String!
    $manufacturer: String!
    $imei: String!
    $status: String!
  ) {
    updateAsset(
      _id: $_id
      name: $name
      manufacturer: $manufacturer
      imei: $imei
      status: $status
    ) {
      code
      isError
      message
    }
  }
`;

const getAssets = gql`
  query Assets {
    assets {
      _id
      name
      manufacturer
      imei
      status
    }
  }
`;

const removeAsset = gql`
  mutation DeleteAsset($_id: String!) {
    deleteAsset(_id: $_id) {
      code
      isError
      message
    }
  }
`;

/*const getAssetByID = gql`
  query AssetById($_id: String!) {
    assetById(_id: $_id) {
      _id
      name
      manufacturer
      imei
      status
    }
  }
`;*/
export { addAsset, updateAsset, removeAsset, getAssets };
