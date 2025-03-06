import type { H3Event } from 'h3'
import { eventHandler } from 'h3'
import type { NitroGuard, OnComplete } from '../types'

export function defineGuardEventHandler<T>(config: { guards: NitroGuard[] }, onComplete: OnComplete<T>) {
  return eventHandler(async (event: H3Event) => {
    for (const guard of config.guards) {
      await guard(event)
    }
    return onComplete(event)
  })
}
