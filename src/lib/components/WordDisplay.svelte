<script lang="ts">
    import { createEventDispatcher } from "svelte"
    import { entires_typed, error_count } from "../../stores"
    import { generateSlug } from "random-word-slugs"

    let i: number = 0
    let words: string = ""
    let typed_words_correct: boolean[] = []
    let typed: string = ""
    const dispatch = createEventDispatcher<{code: number}>()

    function handle_typing (event: any): void {
        if (typed == "") dispatch('code', 1)
        document.getElementById("toFocus")?.focus()
        document.getElementById("toFocus")?.blur()
        let key = event.key as string
        console.log(key)
        if (key == "Shift") return
        if (words[i] == " " && key == " ") {
            entires_typed.update(n => n + 1)
        }
        if (key == "Backspace") {
            typed = typed.substring(0, typed.length - 1)
            if (!typed_words_correct[typed_words_correct.length - 1] && $error_count > 0) error_count.update(n => n - 1)
            typed_words_correct.pop()
            if (i > 0) i--
            return
        }
        if (key == "Escape") { 
            get_words()
            return
        }
        let correct: boolean = key == words.charAt(i)
        if (!correct) error_count.update(n => n + 1)
        typed_words_correct[i] = correct
        typed += words.charAt(i)
        i++
        if (typed.length == words.length) get_words()
    }

    function get_words(): void {
        dispatch('code', 0)
        error_count.set(0)
        entires_typed.set(0)
        i = 0
        typed_words_correct = []
        typed = ""
        let options = { format: "sentence" }
        let word_count = 10
        words = generateSlug(word_count, options as any).toLowerCase()
    }
</script>
<svelte:window on:keydown={handle_typing}/>

<div class="grid grid-cols-1 grid-rows-2 place-items-center gap-5">
    <button id="toFocus" tabindex="-1" class="outline w-40 h-20 select-none" on:click={get_words}>Grab Words</button>
    <div class="grid grid-flow-col gap-0 w-full h-20 outline">
        {#each words as letter, letter_i}
            {#if typed_words_correct[letter_i]}
                <letter class="text-green-500">
                    {typed.charAt(letter_i)}
                </letter>
            {:else if letter_i >= typed.length}
                <letter class="text-gray-500">
                    {letter}
                </letter>
            {:else}
                <letter class="text-red-500">
                    {typed.charAt(letter_i)}
                </letter>
            {/if}
            
        {/each}
    </div>
</div>

<style>
    letter {
        margin-left: 0;
        margin-right: 0;
    }
</style>