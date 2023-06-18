<script lang="ts">
	import { page } from '$app/stores';
	import { avatarLetters } from '$utilities/helpers';
	import type { ChatCompletionRequestMessageRoleEnum } from 'openai';
	export let type: ChatCompletionRequestMessageRoleEnum;
	export let message: string;

	const avatarInitials = avatarLetters(String($page.data.session?.user?.name));
</script>

<div class="chat {type === 'user' ? 'chat-end' : 'chat-start'} justify-end">
	<div class="chat-image avatar online">
		{#if type === 'user'}
			<div class="avatar online placeholder">
				<div class="bg-neutral-focus text-neutral-content rounded-full w-10">
					{#if $page.data.session?.user?.image}
						<img src={$page.data.session?.user?.image} alt="User avatar." />
					{:else}
						<span class="text-xl">{avatarInitials}</span>
					{/if}
				</div>
			</div>
		{:else}
			<div class="user_avatar_wrapper bg-neutral-focus text-secondary rounded-full w-10">
				<span class="text-xl">C</span>
			</div>
		{/if}
	</div>
	<div class="chat-header">
		{type === 'user' ? 'Me' : 'FoodieBlog Assistant'}
	</div>
	<div
		class="max-w-sm chat-bubble {type === 'user' ? 'chat-bubble-primary' : 'chat-bubble-secondary'}"
	>
		{message}
		<slot />
	</div>
</div>

<style>
	.user_avatar_wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
