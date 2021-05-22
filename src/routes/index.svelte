<script context="module">
  import { gql, GraphQLClient } from 'graphql-request'
  import Hammer from '../lib/promatt-homecircle-hammer.png'
  import House from '../lib/promatt-homecircle-house.png'
  import Spyglass from '../lib/promatt-homecircle-spyglass.png'
  import OgImg from '../lib/og-image.jpg'
  import Icon from '../lib/icon.png'
  
  export async function load() {
    const graphcms = new GraphQLClient(
      import.meta.env.VITE_GRAPHCMS_URL,
      {
        headers: {},
      }
    )

    const query = gql`
      query Galleries {
        galleries(first:4) {
          id
          title
          description
          featuredImage {
            id
            width
            height
            url(
              transformation: {
                image: { resize: { width: 650, height: 650, fit: clip } }
              }
            )
          }
          galleryItems {
            id
          }
        }
      }
    `

    const { galleries } = await graphcms.request(query)

    return {
      props: {
        galleries,
      },
    }
  }
</script>

<script>
  export let galleries
  let title = "Promatt camper van conversions and bespoke carpentry"
  let description = "Furniture hand crafted in my mobile workshop, using traditional and modern jointing and construction techniques."
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description}>
  <meta property="og:title" content={title}>
  <meta property="og:type" content="website">
  <meta property="og:url" content="/">
  <meta property="og:image" content={OgImg}>
  <link rel="manifest" href="site.webmanifest">
  <link rel="apple-touch-icon" href={Icon}>
  <meta name="theme-color" content="#fafafa">
</svelte:head>

<div class="body-font overflow-hidden">
  <section class="container mx-auto py-20 text-center">
    <hr/>
    <h1 class="text-5xl">Making wood work for you</h1>
    <hr/>
  </section>
  <section class="container mx-auto">
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
          {#if gallery.featuredImage}
            <a href={`/gallery/${gallery.slug}`} class="inline-flex items-center">
              <img
                alt={`Preview image for gallery ${gallery.title}`}
                src={gallery.featuredImage.url}
                width={gallery.featuredImage.width}
                height={gallery.featuredImage.height}
                class="h-120 flex-shrink-0 object-cover object-center"
              />
            </a>
          {/if}
          <div
            class="flex items-center flex-wrap mb-4 mt-auto w-full"
          >
            <a
              href="{gallery.slug}"
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
  <section class="container mx-auto py-20 text-center">
    <h2 class="text-5xl">Furniture hand crafted in my mobile workshop</h2>
    <hr/>
    <p class="text-3xl">using traditional and modern jointing and construction techniques.</p>
  </section>
  <section class="container mx-auto pb-20 text-center">
      <img src={Spyglass} alt="a spyglass" width="192" height="192" class="mx-auto mb-4">
      <div class="mb-8 max-w-xs mx-auto">
        <h3 class="text-2xl mb-1">Sourcing</h3>
        <p>Finding and purchasing the raw materials at the best possible prices.</p>
      </div>
      <img src={Hammer} alt="a hammer" width="192" height="192" class="mx-auto mb-4">
      <div class="mb-8 max-w-xs mx-auto">
        <h3 class="text-2xl mb-1">Crafting</h3>
        <p>Many of my clients have simply produced a picture from a magazine or off the internet and I work to that, producing my own plans and working out the structural design. Once the plan is complete I can start construction and crafting.</p>
      </div>
      <img src={House} alt="a house" width="192" height="192" class="mx-auto mb-4">
      <div class="mb-8 max-w-xs mx-auto">
        <h3 class="text-2xl mb-1">Installation</h3>
        <p>I prefer to make things on site as I can refer to the space the item will be taking and also closer communication with the client.</p>
      </div>
  </section>
</div>
