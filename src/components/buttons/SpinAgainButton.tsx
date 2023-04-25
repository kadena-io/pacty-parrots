import { Button } from '@mui/material'
import styles from '../../styles/home/homeStyle'

interface Props {
    onClick?: () => void
}

export default function SpinAgainButton({ onClick }: Props) {
    const { playRoundButton } = styles

    return (
        <Button
            variant="contained"
            color="primary"
            style={{ ...playRoundButton, marginRight: 10 }}
            onClick={onClick}
        >
            SPIN AGAIN
        </Button>
    )
}
