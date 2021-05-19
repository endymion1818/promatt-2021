<script context="module">
  import { gql, GraphQLClient } from 'graphql-request'
  import OgImg from '../../lib/og-image.jpg'
  import Icon from '../../lib/icon.png'

  export async function load(context) {
    const graphcms = new GraphQLClient(
      import.meta.env.VITE_GRAPHCMS_URL,
      {
        headers: {},
      }
    )

    const query = gql`
      query GalleryPageQuery($slug: String!) {
        gallery(where: { slug: $slug }) {
          id
          title
          slug
          description
          introduction {
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

    const { gallery } = await graphcms.request(query, variables)

    return {
      props: {
        gallery,
      },
    }
  }
</script>

<script>
  export let gallery
</script>

<svelte:head>
  <title>{gallery.title} - Promatt camper van conversions and bespoke carpentry</title>
  <meta name="description" content={gallery.description}>
  <meta property="og:title" content={gallery.title}>
  <meta property="og:type" content="website">
  <meta property="og:url" content={gallery.slug}>
  <meta property="og:image" content={OgImg}>
  <link rel="manifest" href="site.webmanifest">
  <link rel="apple-touch-icon" href={Icon}>
  <meta name="theme-color" content="#fafafa">
</svelte:head>

<h1 class="text-4xl title-font font-semibold text-gray-900 mb-2">
  {gallery.title}
</h1>

<div class="mb-6 flex justify-between">
  <div>
    {#if gallery.tags}
      {#each gallery.tags as tag}
        <span
          class="py-1 px-2 mr-2 rounded bg-indigo-50 text-indigo-500 text-xs font-medium tracking-widest"
          >{tag}</span
        >
      {/each}
    {/if}
  </div>
</div>
<main class="markdown">
  {@html gallery.introduction.html}
</main>
