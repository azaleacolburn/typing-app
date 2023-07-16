<script lang="ts">
    import { entires_typed, error_count } from "../../../stores"
    import { Clock } from "$lib/components/typing/clock"
    import WordDisplay from "./WordDisplay.svelte";
    import Finished from "./Finished.svelte";
    
    let has_started: boolean = false
    let clock = new Clock()
    // This isn't dynamically updating
    // Probably because clock is never changing
    $: time = clock.current_time()
    // 1 means started typing
    // 0 means new words
    function handleEvent(event: CustomEvent<number>): void {
        console.log("time " + time)
        if (event.detail == 0) {
            has_started = false
            clock.reset_time()
        } else if (event.detail == 1) {
            has_started = true
            clock.start()
            console.log("resetted")
        } 
    }

    let wpm: number = (($entires_typed / 5) - $error_count) / time    
</script>

{#if !has_started}
    <Finished bind:wpm={wpm} bind:errors={$error_count} bind:entries={$entires_typed}/>
{:else}
    <div></div>
{/if}

entires_typed: {$entires_typed}

error_count: {$error_count}

<WordDisplay on:code={handleEvent} />
