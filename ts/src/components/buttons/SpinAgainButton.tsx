import { Button } from '@mui/material'
import styles from '../../styles/home/homeStyle'

interface Props {
    display: boolean
    onClick?: () => void
}

/* original onClick 

 onClick={async () => {
            setSpinText("please sign tx in the wallet")
            setContinueDis(true);
            setStartDis(true);
            setEndDis(true);
            await pactContext.continueRound(pactContext.getCurrentRound())
            handlePlayRound("cont")
          }}

          */
export default function SpinAgainButton({ display, onClick }: Props) {
    const { playRoundButton } = styles

    return display ? (
        <div></div>
    ) : (
        <div>
            <Button
                variant="contained"
                color="primary"
                style={{ ...playRoundButton, marginRight: 10 }}
                onClick={onClick}
            >
                SPIN AGAIN
            </Button>
        </div>
    )
}
