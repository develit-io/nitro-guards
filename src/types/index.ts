import type { H3Event } from 'h3'

export type NitroGuard = (event: H3Event) => Promise<void> | void

export type OnComplete<TComplete> = (event: H3Event) => Promise<TComplete> | TComplete
