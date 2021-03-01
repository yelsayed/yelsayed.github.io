import React, {useState} from 'react'
import {useFlexSearch} from 'react-use-flexsearch'
import {Link} from "gatsby"


const Search = ({localSearchPages, allPosts}) => {

  const index = localSearchPages.index
  const store = localSearchPages.store
  const [query, setQuery] = useState(null)
  const results = useFlexSearch(query, index, store)

  const posts = query ? results : allPosts;

  const emptyMessage = (
    <small className="no-posts-found">
      <span role="img" aria-label="Man Shrugging">🤷🏻‍♂️</span>
      No blog posts found
    </small>
  )

  const postList = (
    <ol
      style={{
        listStyle: "none",
        display: "grid",
        gridAutoFlow: "dense",
        gridColumnGap: "20px",
        gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))",
        gridRowGap: "20px",
        marginTop: "30px",
        maxWidth: "inherit"
      }}
    >
      {posts.map(post => {
        const slug = post.fields ? post.fields.slug : post.slug
        const title = (post.frontmatter ? post.frontmatter.title : post.title) || slug
        const description = post.frontmatter ? post.frontmatter.description : post.description
        const date = post.frontmatter ? post.frontmatter.date : post.date

        return (
          <li
            className="post-list-wrapper"
            key={slug}
          >
            <article
              className="post-list-item"
              itemScope
              itemType="http://schema.org/Article"
            >
              <header>
                <h2>
                  <Link to={slug} itemProp="url">
                    <span itemProp="headline">{title}</span>
                  </Link>
                </h2>
                <small className="date-header">{date}</small>
              </header>
              <section>
                <p
                  dangerouslySetInnerHTML={{
                    __html: description || post.excerpt,
                  }}
                  itemProp="description"
                />
              </section>
            </article>
          </li>
        )
      })}
    </ol>
  )

  return (
    <div>
      <input
        id="search"
        type="search"
        placeholder="Search all posts"
        value={query}
        style={{
          width: "100%",
          border: "1px solid #e7e7ef",
          padding: "10px 20px",
          borderRadius: "5px",
        }}
        onChange={e => setQuery(e.target.value)}
      />
      {posts.length === 0 ? emptyMessage : postList}
    </div>
  )
}

export default Search;