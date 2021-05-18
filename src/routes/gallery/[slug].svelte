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
      query GalleryPageQuery($slug: String!) {
        gallery(where: { slug: $slug }) {
          id
          title
          description
          introduction
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
  <title>{gallery.title}</title>
</svelte:head>

<h1 class="text-4xl title-font font-semibold text-gray-900 mb-2">
  {gallery.title}
</h1>
<a href="/" class="inline-flex items-center mb-6">
  <img
    alt="blog"
    src="https://dummyimage.com/104x104"
    class="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
  />
  <span class="flex-grow flex flex-col pl-4">
    <span class="title-font font-medium text-gray-900"
      >{gallery.author.name}</span
    >
    <span class="text-gray-400 text-xs tracking-widest mt-0.5"
      >{gallery.author.title}</span
    >
  </span>
</a>
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
  <p class="text-gray-400 text-xs tracking-widest mt-0.5">
    {new Date(gallery.date).toDateString()}
  </p>
</div>
<main class="markdown">
  {@html gallery.introduction.html}
</main>
