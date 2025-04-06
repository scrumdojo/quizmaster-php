import type { SyntheticEvent } from 'react'

type Handler<E extends SyntheticEvent> = (e: E) => void

export const preventDefault =
    <E extends SyntheticEvent>(handle: Handler<E>): Handler<E> =>
    (e: E): void => {
        e.preventDefault()
        handle(e)
    }
