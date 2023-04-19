import { AppStyleType } from '../../types';

const styles: AppStyleType = {
    appBar: {
        padding: '15px 60px',
    },
    textTitle:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: '50px',
        textAlign: 'center',
    },
    iconSize:{
        height: '20px',
        width: '20px',
        marginRight: '10px',
    },
    chip:{
        flexFlow: 'row-reverse',
        backgroundColor: 'white !important',
        ':hover': {
            backgroundColor: 'white !important',
        },
        marginRight: '20px',
    },
    kadena:{
        width: '60px',
        marginTop: '10px',
    },
    arrow:{
        marginLeft: '10px',
        marginRight: '-10px',
    },

    fab:{
        paddingLeft: '30px !important',
        paddingRight: '30px !important',
        backgroundColor: 'white',
        width: '100px',
        height: '30px',
    },
    loginButton:{
        paddingRight: '40px',
    },
    loginIconButton:{
    }
}


export default styles
