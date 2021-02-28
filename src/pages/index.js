import React from "react"
import { graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Search from "../components/search"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes
  const localSearchPages = data.localSearchPages
  const socialData = data.site.siteMetadata?.social

  return (
    <Layout location={location} social={socialData} title={siteTitle}>
      <SEO title="Homepage" />
      <Bio />
      <Search localSearchPages={localSearchPages} allPosts={posts} />
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title,
        social {
          twitter,
          instagram,
          medium,
          email
        }
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
    localSearchPages {
      index
      store
    }
  }
`
