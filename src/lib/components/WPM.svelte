<script lang="ts">
    import { has_started, entires_typed, time, error_count } from "../../stores";
    
    let wpm: number = (($entires_typed / 5) - $error_count) / $time
</script>

{#if $has_started}
    WPM: {wpm}
{/if}

entires_typed: {$entires_typed}

error_count: {$error_count}