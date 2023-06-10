<script lang="ts">
    import { has_started, entires_typed, time, error_count } from "../../stores";

    async function start() {
        while (has_started) {
            time.update(n => n + 1)
            await new Promise(f => setTimeout(f, 1000));
        }
    }
    //while(true) if (has_started) start()
</script>

{#if $has_started}
    {start()}
    Time {$time}
{/if}