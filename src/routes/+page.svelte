<script>
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
	import astro101 from '$lib/images/astro-101.gif';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Astro Team Builder" />
</svelte:head>

<section>
	<h1>Astro Team Builder</h1>
	<picture>
		<img class="astro" src={astro101} alt="Astro101" />
	</picture>
	<h5>
		<i>Building teams with Astrology since 2023!</i>
	</h5>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	.astro {
		max-width: 100%;
		height: auto;
		box-shadow: 0 6px 10px rgb(0 0 0 / 0.5);
	}
</style>
