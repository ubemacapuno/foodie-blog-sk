<script lang="ts">
	import Viewer from 'viewerjs'
	import { onMount } from 'svelte'
	import { defaultToolbarOptions } from './constants'

	/**
	 * @see viewerjs docs https://github.com/fengyuanchen/viewerjs/blob/main/README.md
	 *
	 * This component opens an image in the viewerjs Viewer instance.
	 * Currently, the component initializes Viewer with a single image.
	 * To instead show an array of images (like a gallery),
	 * bind Viewer to a container with multiple image elements (like a parent <ul> with <li><img /></li> children).
	 *
	 * TODO: Add the ability to display a gallery of images in the Viewer when passing a prop.
	 */

	export let src: string | undefined = undefined
	export let filename: string | undefined = undefined // Image title in Viewer instance
	export let onClose = () => {}
	export let toolbarOptions = {} // Prop for customizing the toolbar options

	let viewer: Viewer | null = null
	let imageElement: HTMLImageElement

	onMount(() => {
		if (src) {
			imageElement = document.createElement('img')
			imageElement.src = src

			viewer = new Viewer(imageElement, {
				ready() {
					viewer?.show()
					console.log('Viewer Showing')
				},
				hidden() {
					console.log('Bro we hidden')
					onClose()
					viewer?.destroy()
					viewer = null
				},
				title: () => filename,
				toolbar: { ...defaultToolbarOptions, ...toolbarOptions }
			})

			viewer.show()
		}
	})
</script>
