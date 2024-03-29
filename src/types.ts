import { CSSProperties } from 'react'

export type TodoType = any

export type AppStyleType = Record<string, CSSProperties | Record<string, CSSProperties>>

export type PlayerTableType = {
    rounds: TodoType
    'rounds-played': TodoType
    'coins-out': number
    'coins-in': number
}

export type PactNumber = TodoType

export type PlayData = {
    'coins-in': number
    'coins-out': number
    rounds: TodoType[]
    'rounds-played': PactNumber
    'total-rolls': PactNumber
}
