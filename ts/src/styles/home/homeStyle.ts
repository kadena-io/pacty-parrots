import { AppStyleType } from '../../types'
import { greenPrimaryColor, greenSecondaryColor } from '../themeGreen'

const styles: AppStyleType = {
    gridDisplay: {
        display: 'flex',
        justifyContent: 'space-around',
    },
    typographyStyle: {
        backgroundColor: greenSecondaryColor,
        color: 'white',
        padding: '10px 15px',
        borderRadius: 4,
        display: 'flex',
        alignItems: 'center',
    },
    scoreStyle: {
        textAlign: 'center',
        minWidth: 100,
        color: 'white',
        fontWeight: 'bold',
    },
    enterId: {
        fontWeight: 'bold',
        color: greenPrimaryColor,
        textAlign: 'center',
    },
    playRoundButton: {
        fontWeight: 'bold',
        color: 'white',
        padding: '10px 20px',
    },
    enterAccountIdBox: {
        display: 'flex',
        flexDirection: 'column',
        padding: '20px 150px 30px 150px',
    },
    leaderboardTypography: {
        color: greenPrimaryColor,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '20px',
    },
    leaderboardBox: {
        marginBottom: 20,
        paddingLeft: '20px',
        paddingRight: '20px',
    },
}

export default styles
