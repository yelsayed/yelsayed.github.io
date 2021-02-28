import React, {useEffect} from "react"
import { Link, graphql } from "gatsby"

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faForward, faBackward} from "@fortawesome/free-solid-svg-icons";

import Layout from "../components/layout"
import SEO from "../components/seo"


const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const socialData = data.site.siteMetadata?.social
  const { previous, next } = data

  useEffect(() => {
    const _ = document.getElementsByClassName('gatsby-resp-image-wrapper')[0]?.classList.add('header-image');
  });

  return (
    <Layout location={location} social={socialData} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <p>{post.frontmatter.date}</p>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        <hr />
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li className="more-articles">
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                <FontAwesomeIcon icon={faBackward}/> {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li className="more-articles">
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} <FontAwesomeIcon icon={faForward}/>
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
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
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
