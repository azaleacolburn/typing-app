<script lang="ts">
    import WPM from "$lib/components/WPM.svelte"
    import { has_started, entires_typed, error_count, time } from "../../stores"
    import Clock from "$lib/components/Clock.svelte"
    let i: number = 0
    let words: string = ""
    let typed_words_correct: boolean[] = []
    let typed: string = ""
    
    function handle_typing (event: any) {
        if (!$has_started)  has_started.set(true)
        let key = event.key as string
        if (words[i] == " " && key == " ") entires_typed.update(n => n + 1)
        console.log(key)
        if (key == "Backspace") {
            typed = typed.substring(0, typed.length - 1)
            if (!typed_words_correct[typed_words_correct.length - 1] && $error_count > 0) error_count.update(n => n - 1)
            typed_words_correct.pop()
            if (i > 0) i--
            return
        }
        if (key == "Escape") get_words()
        if (key == "Shift" ) return
        let correct: boolean = key == words.charAt(i)
        if (!correct) error_count.update(n => n + 1)
        typed_words_correct[i] = correct
        typed += words.charAt(i)
        if (typed.length == words.length) {
            get_words()
        }
        i++
    }

    function get_words() {
        time.set(0)
        error_count.set(0)
        entires_typed.set(0)
        has_started.set(false)
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

<div class="grid grid-cols-1 grid-rows-2 place-items-center gap-5">
    <button class="outline w-40 h-20 select-none" on:click={get_words}>Grab Words</button>
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