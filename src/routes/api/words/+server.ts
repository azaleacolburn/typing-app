import { json } from '@sveltejs/kit'
import type { RequestEvent, RequestHandler } from './$types'
import { generateSlug } from "random-word-slugs"

export const POST: RequestHandler = async (event: RequestEvent) => {
    const json_event = await event.request.json() as any
    const options = json_event.options
    const word_count = json_event.word_count

    const words: string = generateSlug(word_count, options).toLowerCase()

    return json({
        success: true,
        words: words
    })
}