import { Button } from "@mui/material"
import styles from '../../styles/home/homeStyle'
import { usePactState } from "../../states/PactState"

interface Props {
    display: boolean
    roundPoints: number
    onClick?: () => void
}

/* original code under onClick

onClick={async () => {
            setContinueDis(true);
            setStartDis(true);
            setEndDis(true);
            setSpinText("please sign tx in the wallet")
            await pactContext.endRound(pactContext.getCurrentRound())
            handlePlayRound("end")
            // handleEndRound()
          }}
          */
export default function CashOutButton({display, roundPoints, onClick}: Props) {
    const {playRoundButton} = styles;

    

    return (
        display? <div></div> : (
            <Button
            variant="contained"
            color="primary"
            className={playRoundButton}
            onClick={onClick}
            >CASH OUT {roundPoints - 5} coins</Button>
        )
    )
}
