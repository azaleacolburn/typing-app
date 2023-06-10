<script lang="ts">
    import { has_started, entires_typed, time, error_count } from "../../stores";
    
    let start_time: number = 0

    function start(): string {
        start_time = Date.now()
        return ""
    }

    function elapsedTimeMS(): number {
        if (start_time != 0) { 
            time.set(Date.now() - start_time)
            return Date.now() - start_time
        }
        else return 0
    }
</script>

{#if $has_started}
    {start()}
    Time {elapsedTimeMS()}
{/if}