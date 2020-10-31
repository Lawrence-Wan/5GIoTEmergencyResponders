import gql from "graphql-tag";
const getUsers = gql`
  query Users {
    users {
      _id
      email
      userName
      firstName
      lastName
      contactNumber
      address
      role
      password
    }
  }
`;

export { getUsers };
