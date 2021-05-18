<script>
  import LogoIcon from './logo-icon.svelte'
</script>

<footer class="text-yellow-100 pb-10">
  <div
    class="container mx-auto max-w-3xl flex flex-wrap py-5 flex-row items-center"
  >
    <div class="flex flex-row items-center">
        <a
            href="/"
            class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
            <LogoIcon />
        </a>
        <a class="pl-4" href="tel:07725137442">
            <h3>Call Promatt today:</h3>
            <span>07725 137 442</span>
        </a>
    </div>
    <nav
      class="lg:mr-0 sm:ml-auto sm:mr-auto flex flex-wrap flex-col items-start text-base justify-center"
    >
      <a href="/" class="mr-3 p-2 hover:text-white">Home</a>  
      <a href="/about" class="mr-5 p-2 hover:text-white">About</a>
      <a href="/services" class="mr-5 p-2 hover:text-white">Services</a>
      <a href="/gallery" class="mr-5 p-2 hover:text-white">Gallery</a>
      <a href="/contact" class="mr-5 p-2 hover:text-white">Contact</a>
    </nav>
  </div>
</footer>