import { gql } from "@apollo/client";

export const GET_PROJECT_BY_SLUG = gql`
  query GetProjectBySlug($slug: ID!) {
    project(id: $slug, idType: SLUG) {
      id
      title
      slug
      date
      content
      editorBlocks {
        __typename
        name
        ... on CoreParagraph {
          attributes {
            content
            className
          }
        }
        ... on CoreHeading {
          attributes {
            content
            level
            className
          }
        }
        ... on CoreImage {
          attributes {
            url
            alt
            width
            height
          }
        }
        ... on CoreList {
          attributes {
            ordered
          }
          innerBlocks {
            ... on CoreListItem {
              attributes {
                content
              }
            }
          }
        }
      }
    }
  }
`;
