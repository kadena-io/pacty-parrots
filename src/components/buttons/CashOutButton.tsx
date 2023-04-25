import { Button } from '@mui/material'
import styles from '../../styles/home/homeStyle'
import { usePactState } from '../../states/PactState'
import { useEffect, useState } from 'react'

interface Props {
    showRoundPoints: () => number
    onClick?: () => void
}

export default function CashOutButton({ showRoundPoints, onClick }: Props) {
    const { playRoundButton } = styles
    const playerTable = usePactState((state) => state.playerTable)
    const [roundPoints, setRoundPoints] = useState(5)
    useEffect(() => {
        setRoundPoints(showRoundPoints() - 5)
    }, [playerTable, showRoundPoints])
    return (
        <Button variant="contained" color="primary" style={playRoundButton} onClick={onClick}>
            CASH OUT {roundPoints} coins
        </Button>
    )
}
