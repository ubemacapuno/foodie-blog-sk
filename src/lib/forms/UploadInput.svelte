<script lang="ts">
	import { presignAndUploadFile } from '$lib/components/files/helpers'
	import { toTitleCase } from '$utilities/transform'

	export let multiple = false
	export let hidden = false
	export let label = multiple ? 'Upload files' : 'Upload a file'
	export let linkage: { assetType: string; assetId: string } | undefined = undefined

	let files: File[] = []
	let isUploading = false

	const onClear = () => {
		files = []
	}

	const onFileUpload = async (file: File | null) => {
		isUploading = true

		if (file) {
			const newFile = await presignAndUploadFile(file, linkage)
			files = [...files, newFile]
		}
		isUploading = false
	}

	function onFilesChange(event: Event) {
		const input = event.target as HTMLInputElement
		const currentFiles = Array.from(input?.files ?? [])
		currentFiles.forEach((file) => {
			onFileUpload(file)
		})
	}

	const formattedLabel = (string = '') => {
		// if the label is a path separated string then we take the very last part
		const newPath = string.split('.').pop() ?? string

		return toTitleCase(newPath)
	}
</script>

{#if hidden}
	<input on:change={onFilesChange} {multiple} type="file" accept="image/png, image/jpeg" hidden />
	<slot {onFilesChange} {onClear} {files} />
{:else}
	<span class="input_title small_font"
		>{formattedLabel(label)}
		<input on:change={onFilesChange} {multiple} type="file" accept="image/png, image/jpeg" />
	</span>
{/if}
