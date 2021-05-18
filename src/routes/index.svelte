<script context="module">
  import { gql, GraphQLClient } from 'graphql-request'

  export async function load() {
    const graphcms = new GraphQLClient(
      import.meta.env.VITE_GRAPHCMS_URL,
      {
        headers: {},
      }
    )

    const query = gql`
      query Galleries {
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
</script>

<svelte:head>
  <title>SvelteKit starter blog</title>
</svelte:head>

<section class="text-gray-600 body-font overflow-hidden">
  <div class="container mx-auto">
    <div class="grid grid-flow-col gap-2">
      {#each galleries as gallery}
        <div
          class="p-12 flex flex-col items-start w-full border rounded-xl shadow-xl bg-white"
        >
          <h2
            class="sm:text-3xl text-2xl title-font font-medium text-gray-900 mt-4 mb-4"
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
  </div>
</section>
