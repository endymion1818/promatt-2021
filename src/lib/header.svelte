<script>
  import Logo from './logo.svelte'
</script>

<header class="text-gray-600 body-font mb-10">
  <div
    class="container mx-auto flex flex-wrap py-5 flex-col md:flex-row items-center"
  >
    <a
      href="/"
      class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
    >
      <Logo />
    </a>
    <nav
      class="lg:mr-0 sm:ml-auto sm:mr-auto flex flex-wrap items-end text-base justify-center"
    >
      <a href="/about" class="mr-3 p-2 hover:text-gray-900">About</a>
      <a href="/services" class="mr-3 p-2 hover:text-gray-900">Services</a>
      <a href="/gallery" class="mr-3 p-2 hover:text-gray-900">Gallery</a>
      <a href="/contact" class="mr-3 p-2 hover:text-gray-900">Contact</a>
    </nav>
  </div>
</header>
