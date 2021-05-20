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
          body {
            html
          }
          showcaseVideo {
            id
            url
            height
            width
          }
          thumbImg: galleryItems {
            id
            url(
              transformation: {
                image: { resize: { width: 1000, fit: clip } }
              }
            )
            height
            width
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
  <main id="main">
    {@html gallery.body.html}
    {#if gallery.showcaseVideo}
    <div class="p-12 mb-8 w-full border rounded-xl shadow-xl bg-white">
      <!-- svelte-ignore a11y-media-has-caption -->
      <video controls class="mx-auto" src={gallery.showcaseVideo.url} alt={`gallery ${gallery.title} featured content`} width={gallery.showcaseVideo.width} height={gallery.showcaseVideo.height} />
    </div>
    {/if}
    <div class="grid md:grid-cols-2 gap-2">
      {#if gallery.thumbImg}
        {#each gallery.thumbImg as galleryItem}
          <div class="p-12 flex flex-col w-full justify-center border rounded-xl shadow-xl bg-white">
            <a href={galleryItem.url}><img src={galleryItem.url} height={galleryItem.height} width={galleryItem.width} alt='gallery item'/></a>
          </div>  
        {/each}
      {/if}
    </div>
  </main>
</div>
