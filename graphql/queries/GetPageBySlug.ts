import { gql } from "@apollo/client";

export const GET_PAGE_BY_SLUG = gql`
  query GetPageBySlug($slug: ID!) {
    page(id: $slug, idType: URI) {
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
            textAlign
          }
        }
        ... on CoreImage {
          attributes {
            url
            alt
            className
            width
            height
          }
        }
        ... on CoreList {
          attributes {
            ordered
            className
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
