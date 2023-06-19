<script lang="ts">
	import { page } from '$app/stores';
	import { sendToast } from '$lib/stores/toast';
	import ChatMessage from '$lib/components/ChatMessage.svelte';
	import type { ChatCompletionRequestMessage } from 'openai';
	import { SSE } from 'sse.js';
	import EmptyState from '$elements/EmptyState.svelte';
	let query: string = '';
	let answer: string = '';
	let isLoading: boolean = false;
	let chatMessages: ChatCompletionRequestMessage[] = [];
	let scrollToDiv: HTMLDivElement;
	function scrollToBottom() {
		setTimeout(function () {
			scrollToDiv.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
		}, 100);
	}
	const handleSubmit = async () => {
		isLoading = true;
		chatMessages = [...chatMessages, { role: 'user', content: query }];
		const eventSource = new SSE('/api/chat', {
			headers: {
				'Content-Type': 'application/json'
			},
			payload: JSON.stringify({ messages: chatMessages })
		});
		query = '';
		eventSource.addEventListener('error', handleError);
		eventSource.addEventListener('message', (e) => {
			scrollToBottom();
			try {
				isLoading = false;
				if (e.data === '[DONE]') {
					chatMessages = [...chatMessages, { role: 'assistant', content: answer }];
					answer = '';
					return;
				}
				const completionResponse = JSON.parse(e.data);
				const [{ delta }] = completionResponse.choices;
				if (delta.content) {
					answer = (answer ?? '') + delta.content;
				}
			} catch (err) {
				handleError(err);
			}
		});
		eventSource.stream();
		scrollToBottom();
	};
	function handleError<T>(err: T) {
		isLoading = false;
		query = '';
		answer = '';
		console.error(err);
		sendToast(`Error processing your request!`, 'error');
	}
</script>

<div class="bg-neutral-focus card max-w-3xl shadow-xl mx-1">
	<div class="flex flex-col py-4 w-full px-2 items-start gap-2">
		<div>
			<h1 class="text-2xl font-bold w-full text-center text-primary">Virtual Assistant</h1>
			<p class="text-sm">
				Powered by <a
					target="_blank"
					rel="noreferrer"
					href="https://openai.com/blog/introducing-chatgpt-and-whisper-apis"
					class="text-secondary">OpenAI</a
				>
			</p>
		</div>
		<div class="h-[500px] w-full bg-neutral rounded-md p-4 overflow-y-auto flex flex-col gap-4">
			<div class="flex flex-col gap-2">
				{#if $page?.data?.session?.user?.name}
					<ChatMessage
						type="assistant"
						message="Hi {$page?.data?.session?.user
							?.name}! I am your Virtual Assistant for FoodieBlog. Ask me anything!"
					/>
				{:else}
					<ChatMessage
						type="assistant"
						message="Hello! I am a Virtual Assistant for FoodieBlog. Ask me anything!"
					/>
				{/if}
				{#each chatMessages as message}
					<ChatMessage type={message.role} message={message.content} />
				{/each}
				{#if answer}
					<ChatMessage type="assistant" message={answer} />
				{/if}
				{#if isLoading}
					<ChatMessage type="assistant" message="">
						<EmptyState {isLoading} loadingMessage="Typing . . ." />
					</ChatMessage>
				{/if}
			</div>
			<div class="" bind:this={scrollToDiv} />
		</div>
		<form
			class="flex w-full rounded-md gap-4 bg-neutral-focus p-4"
			on:submit|preventDefault={() => handleSubmit()}
		>
			<input type="text" class="input input-bordered w-full" bind:value={query} />
			<button type="submit" class="btn btn-primary"> Send </button>
		</form>
	</div>
</div>
