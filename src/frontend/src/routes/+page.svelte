<script lang="ts">
	import Auth from '$lib/components/Auth.svelte';
	import { authStore } from '$lib/stores/auth.store';

	import { onMount } from 'svelte';

	let input = '';
	let disabled = false;
	let greeting = '';

	let whoami = '';

	let uploadedfile: any;

	async function storeFileOnAssetCanister() {
		if (typeof uploadedfile !== 'undefined') {
			const key = await $authStore.assetManager.store(uploadedfile[0]);
		}
	}

	async function getFileList() {
		const files = await $authStore.assetManager.list();
		console.log(files);

		// console.log(files[10]);
	}

	let imageUrl2: string;

	let pdfUrl: string;
	let pdfBlob: Blob;

	let sachinUrl: string;

	onMount(async () => {
		const asset = await $authStore.assetManager.get('/DSC05442.jpeg');
		imageUrl2 = URL.createObjectURL(await asset.toBlob());

		const pdfAset = await $authStore.assetManager.get('/Doxa ckUSDC collateral.pdf');
		const blob = new Blob([await pdfAset.toUint8Array()], { type: 'application/pdf' });
		pdfUrl = URL.createObjectURL(blob);

		// const pdfBlob22 = new Blob(await pdfAset.toUint8Array(), { type: 'application/pdf' });

		const sachinAsset = await $authStore.assetManager.get('/1685039357890.jpg');
		sachinUrl = URL.createObjectURL(await sachinAsset.toBlob());
	});
</script>

<img src={imageUrl2} alt="dfdfd" height="200" />
<img src={sachinUrl} alt="sachin" />

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<iframe title="pdf" src={pdfUrl} style="width: 100%; height: calc(100vw / 1.4);"></iframe>

<!-- {#if pdfUrl}
	<object title="pdf" data={pdfUrl} type="application/pdf" width="100%" height="600px">
		No PDF support in this browser
	</object>
{:else}
	<p>Loading PDF...</p>
{/if} -->
<input
	bind:files={uploadedfile}
	on:change={() => {
		console.log(uploadedfile);
	}}
	type="file"
	name="upload file"
	id="file"
/>

<button on:click={async () => await storeFileOnAssetCanister()}>Upload</button>
<button on:click={async () => await getFileList()}> Get Files</button>

<main>
	<br />
	<br />

	<form
		on:submit={async () => {
			greeting = await $authStore.actor.greet(input);
		}}
	>
		<label for="name">Enter your name: &nbsp;</label>
		<input id="name" alt="Name" type="text" bind:value={input} {disabled} />
		<button type="submit">Click Me!</button>
	</form>

	<section id="greeting">
		{greeting}
	</section>

	<br />
	<br />

	<section style="text-align: center;">
		<Auth />
		<button
			on:click={async () => {
				whoami = await $authStore.actor.whoami();
			}}>Who ami</button
		>
		<p class="whoami-style">{whoami}</p>
	</section>
</main>

<style>
	.whoami-style {
		margin: 10px auto;
		padding: 10px 60px;
		border: 1px solid #e01717;
	}

	form {
		display: flex;
		justify-content: center;
		gap: 0.5em;
		flex-flow: row wrap;
		max-width: 40vw;
		margin: auto;
		align-items: baseline;
		font-family: sans-serif;
		font-size: 1.5rem;
	}

	button[type='submit'] {
		padding: 5px 20px;
		margin: 10px auto;
		float: right;
	}

	#greeting {
		margin: 10px auto;
		padding: 10px 60px;
		border: 1px solid #222;
	}

	#greeting:empty {
		display: none;
	}
</style>
