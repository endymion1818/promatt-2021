<script context="module">
  import { gql, GraphQLClient } from 'graphql-request'

  export async function load(context) {
    const graphcms = new GraphQLClient(
      import.meta.env.VITE_GRAPHCMS_URL,
      {
        headers: {},
      }
    )

    const query = gql`
      query PageQuery($slug: String!) {
        page(where: { slug: $slug }) {
          id
          title
          slug
          description
          content {
            html
          }
          featuredImage {
            id
          }
        }
      }
    `

    const variables = {
      slug: context.page.params.slug,
    }

    const { page } = await graphcms.request(query, variables)

    return {
      props: {
        page,
      },
    }
  }
</script>

<script>
  export let page
</script>

<svelte:head>
  <title>{page.title}</title>
</svelte:head>

<h1 class="text-4xl title-font font-semibold text-gray-900 mb-2">
  {page.title}
</h1>
<main class="markdown">
  {@html page.content.html}
</main>
