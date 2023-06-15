<script>
	import Header from '../lib/components/Header.svelte';
	import './styles.css';
	import "../app.css"
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>

	<footer>
		<a href="https://github.com/Ewie21/typing-app" class="grid grid-cols-2 grid-rows-1 place-items-center">
			<img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" class="w-7 h-7" alt="github_icon"/>
			<div>
				Github
			</div>
		</a>
	</footer>
</div>

<style lang="postcss">
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
