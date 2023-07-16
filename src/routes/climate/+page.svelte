<script lang="ts">
    // import { GeocoderAutocomplete } from "@geoapify/geocoder-autocomplete"
    import { onMount } from "svelte";
    import type { Coords } from "../../types";

    let address: string;

    async function handle_api_request(c: Coords) {
        let res = await fetch('/api/score', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(c),
        })
    }

    function address_to_coords(address: string): Coords {

        let long: number
        let lat: number
        // Conversion
        return {long, lat}
    }


    async function handle_request() {
        let c: Coords = address_to_coords(address);
        handle_api_request(c);
    }
</script>

<div class="grid grid-cols-3 grid-rows-1">
    <button>AutoFill current location</button>
    <input type="text" bind:value={address}>
    <button on:click={handle_request}>See Climate Score</button>
</div>