<script context="module">
  import { gql, GraphQLClient } from 'graphql-request'
  import OgImg from '../lib/og-image.jpg'
  import Icon from '../lib/icon.png'

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
        galleries {
          id
          title
          description
          featuredImage {
            id
            width
            height
            url
          }
          galleryItems {
            id
          }
        }
      }
    `

    const variables = {
      slug: context.page.params.slug,
    }

    const { page, galleries } = await graphcms.request(query, variables)

    return {
      props: {
        page,
        galleries,
        currentUrl: page.path
      },
    }
  }
</script>

<script>
  export let page
  export let galleries
</script>

<svelte:head>
  <title>{page.title} - Promatt camper van conversions and bespoke carpentry</title>
  <meta name="description" content={page.description}>
  <meta property="og:title" content={page.title}>
  <meta property="og:type" content="website">
  <meta property="og:url" content={page.slug}>
  <meta property="og:image" content={OgImg}>
  <link rel="manifest" href="site.webmanifest">
  <link rel="apple-touch-icon" href={Icon}>
  <meta name="theme-color" content="#fafafa">
</svelte:head>

<h1 class="text-4xl title-font font-semibold mb-2">
  {page.title}
</h1>
<main id="main">
  {@html page.content.html}
  {#if (page.slug === 'gallery')}
    <section class="container mx-auto mb-8">
          <div class="grid md:grid-cols-2 gap-2">
            {#each galleries as gallery}
              <div
                class="p-12 flex flex-col items-start w-full border rounded-xl shadow-xl bg-white"
              >
                <h2
                  class="sm:text-3xl text-2xl title-font font-medium mt-4 mb-4"
                >
                  {gallery.title}
                </h2>
                <p class="leading-relaxed mb-8">
                  {gallery.description}
                </p>
                <a href={`/gallery/${gallery.slug}`} class="inline-flex items-center">
                  <img
                    alt={`Preview image for gallery ${gallery.title}`}
                    src={gallery.featuredImage.url}
                    width={gallery.featuredImage.width}
                    height={gallery.featuredImage.height}
                    class="h-120 flex-shrink-0 object-cover object-center"
                  />
                </a>
                <div
                  class="flex items-center flex-wrap mb-4 mt-auto w-full"
                >
                  <a
                    href={`/gallery/${gallery.slug}`}
                    class="text-indigo-500 inline-flex items-center mt-2"
                    >Learn More
                    <svg
                      class="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
          {/each}
        </div>
      </section>
      {/if}
</main>
