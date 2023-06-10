<script lang="ts">
    let i: number = 0;
    let words: string = ""
    let typed_words_correct: boolean[] = []
    let typed: string = ""

    function handle_typing (event: any) {
        let key = event.key as string
        console.log(key)
        if (key == "Backspace") {
            typed = typed.substring(0, typed.length - 1)
            typed_words_correct.pop()
            i--
            return;
        }
        if (key == "Escape") get_words()
        if (key == "Shift") return;
        typed_words_correct[i] = (key == words.charAt(i))
        typed += words.charAt(i)
        i++
    }

    function get_words() {
        i = 0
        words = ""
        typed_words_correct = []
        typed = ""
        let options = { format: "sentence" }
        let word_count = 10
        fetch("/api/words", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({word_count, options})
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data.words)
                words = data.words
                if (!data.success) alert("REQUEST NOT SUCCESSFUL")
            })
            .catch((e) => alert("CAUGHT ERROR: \n" + e))
    }
</script>
<svelte:window on:keydown={handle_typing}/>

<div class="grid grid-cols-1 grid-rows-2 place-items-center">
    <button class="outline w-40 h-20 select-none" on:click={get_words}>Grab Words</button>
    <div class="words outline">
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

    .word {
        border-bottom: 2px solid transparent;
        color: var(--sub-color);
        font-size: 1em;
        font-variant: no-common-ligatures;
        line-height: 1em;
        margin: 0.25em;
    }
</style>