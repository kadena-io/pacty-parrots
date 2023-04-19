import { Button } from "@mui/material"
import styles from '../../styles/home/homeStyle'

interface Props {
    display: boolean
    onClick?: () => void
}

/* original code under onClick

            setSpinText("please sign tx in the wallet")
              setContinueDis(true);
              setStartDis(true);
              setEndDis(true);
              let bool = false;
              if (pactContext.getCurrentRound() === 0) {
                if (pactContext.getPT()){
                 bool = false;
               } else {
                 bool = true;
               }
               }
              await pactContext.startRound(bool ?
                  pactContext.getCurrentRound() : pactContext.getCurrentRound() + 1)
              handlePlayRound("start")
              */

export default function StartButton({display, onClick}: Props) {
    const {playRoundButton} = styles;
    return (
        display ? <div></div> : (
            <div>
                <Button
                variant="contained"
                color="primary"
                className={playRoundButton}
                disabled={display}
                style={{marginRight: 10}}
                onClick={onClick}
                >START NEW ROUND</Button>
            </div>
        )
    )
}

