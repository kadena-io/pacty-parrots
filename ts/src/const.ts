import './buffer-polyfill'
import Pact from 'pact-lang-api'
import { TodoType } from './types'

export const ROUND_TIMEOUT = 300000
export const REFRESH_TIME = 600
export const hosts = ['eu2', 'us2', 'eu1', 'eu2', 'ap1', 'ap2']
export const chainIds = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
]

export const createAPIHost = (network: string = 'api', chainId: string = '0') =>
    `https://${network}.testnet.chainweb.com/chainweb/0.0/testnet04/chain/${chainId}/pact`
/*
export const createAPIHost = (network?: string, chainId?: string) => 'http://localhost:7010'*/
export const devNetUrl = (network: string, chainId: string) =>
    `https://${network}.tn1.chainweb.com/chainweb/0.0/development/chain/${chainId}/pact`
export const devNetHosts = ['us1', 'us2', 'us3']

//enum LettersToParrots {
export const LettersToParrots: Record<string, string> = {
    B: 'blue',
    G: 'green',
    P: 'purple',
    R: 'red',
    T: 'teal',
    Y: 'yellow',
    I: 'pirate',
    C: 'cop',
    M: 'mustache',
    H: 'sherlock',
    D: 'dealwithit',
    S: 'spyparrot',
    K: 'keanu',
    A: 'cage',
    F: 'fieri',
}
export function getParrotImage(size: 'large' | 'small', letter: string) {
    return require(`./assets/result/${size}/${LettersToParrots[letter]}.png`)
}
/*
export const imgMap = {
    B: require('./assets/result/large/blue.png'),
    G: require('./assets/result/large/green.png'),
    P: require('./assets/result/large/purple.png'),
    R: require('./assets/result/large/red.png'),
    T: require('./assets/result/large/teal.png'),
    Y: require('./assets/result/large/yellow.png'),
    I: require('./assets/result/large/pirate.png'),
    C: require('./assets/result/large/cop.png'),
    M: require('./assets/result/large/mustache.png'),
    H: require('./assets/result/large/sherlock.png'),
    D: require('./assets/result/large/dealwithit.gif'),
    S: require('./assets/result/large/spyparrot.png'),
    K: require('./assets/result/large/keanu.png'),
    A: require('./assets/result/large/cage.png'),
    F: require('./assets/result/large/fieri.png'),
}
export const imgMapSmall = {
    B: require('./assets/result/small/blue.png'),
    G: require('./assets/result/small/green.png'),
    P: require('./assets/result/small/purple.png'),
    R: require('./assets/result/small/red.png'),
    T: require('./assets/result/small/teal.png'),
    Y: require('./assets/result/small/yellow.png'),
    I: require('./assets/result/small/pirate.png'),
    C: require('./assets/result/small/cop.png'),
    M: require('./assets/result/small/mustache.png'),
    H: require('./assets/result/small/sherlock.png'),
    D: require('./assets/result/small/dealwithit.gif'),
    S: require('./assets/result/small/spyparrot.png'),
    K: require('./assets/result/small/keanu.png'),
    A: require('./assets/result/small/cage.png'),
    F: require('./assets/result/small/fieri.png'),
}

*/
export const loadingParrots = [
    require('./assets/loading/60fpsparrot.gif'),
    require('./assets/loading/angryparrot.gif'),
    require('./assets/loading/backwardsparrot.gif'),
    require('./assets/loading/beerparrot.gif'),
    require('./assets/loading/beretparrot.gif'),
    require('./assets/loading/bikerparrot.gif'),
    require('./assets/loading/birthdaypartyparrot.gif'),
    require('./assets/loading/bluntparrot.gif'),
    require('./assets/loading/bobaparrot.gif'),
    require('./assets/loading/bootlegparrot.gif'),
    require('./assets/loading/boredparrot.gif'),
    require('./assets/loading/brazilianfanparrot.gif'),
    require('./assets/loading/brazilianplayerparrot.gif'),
    require('./assets/loading/bunnyparrot.gif'),
    require('./assets/loading/calvinist_parrot.gif'),
    require('./assets/loading/chicoparrot.gif'),
    require('./assets/loading/christmasparrot.gif'),
    require('./assets/loading/confusedparrot.gif'),
    require('./assets/loading/congaparrot.gif'),
    require('./assets/loading/congapartyparrot.gif'),
    require('./assets/loading/copparrot.gif'),
    require('./assets/loading/dealwithitnowparrot.gif'),
    require('./assets/loading/dealwithitparrot.gif'),
    require('./assets/loading/discoparrot.gif'),
    require('./assets/loading/donutparrot.gif'),
    require('./assets/loading/evilparrot.gif'),
    require('./assets/loading/fastparrot.gif'),
    require('./assets/loading/flowerparrot.gif'),
    require('./assets/loading/flyingmoneyparrot.gif'),
    require('./assets/loading/footballparrot.gif'),
    require('./assets/loading/frenchparrot.gif'),
    require('./assets/loading/gentlemanparrot.gif'),
    require('./assets/loading/gothparrot.gif'),
    require('./assets/loading/grouchoparrot.gif'),
    require('./assets/loading/hardhatparrot.gif'),
    require('./assets/loading/harpoparrot.gif'),
    require('./assets/loading/headsetparrot.gif'),
    require('./assets/loading/horizontalparrot.gif'),
    require('./assets/loading/jediparrot.gif'),
    require('./assets/loading/laptop_parrot.gif'),
    require('./assets/loading/mardigrasparrot.gif'),
    require('./assets/loading/marshmallowparrot.gif'),
    require('./assets/loading/middleparrot.gif'),
    require('./assets/loading/moonwalkingparrot.gif'),
    require('./assets/loading/mustacheparrot.gif'),
    require('./assets/loading/opensourceparrot.gif'),
    require('./assets/loading/partyparrot.gif'),
    require('./assets/loading/pingpongparrot.gif'),
    require('./assets/loading/pirateparrot.gif'),
    require('./assets/loading/popcornparrot.gif'),
    require('./assets/loading/pumpkinparrot.gif'),
    require('./assets/loading/redenvelopeparrot.gif'),
    require('./assets/loading/redhatparrot.gif'),
    require('./assets/loading/reversecongaparrot.gif'),
    require('./assets/loading/reverseparrot.gif'),
    require('./assets/loading/reverseportalorangeparrot.gif'),
    require('./assets/loading/sassyparrot.gif'),
    require('./assets/loading/scienceparrot.gif'),
    require('./assets/loading/sherlockholmesparrot.gif'),
]

export const modalStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99999,
}

export const dumKeyPair = Pact.crypto.genKeyPair()

export async function FetchPactLocal(cmd: TodoType, chainId?: string) {
    const { result } = await Pact.fetch.local(
        {
            ...cmd,
            meta: {
                sender: dumKeyPair.publicKey,
                gasLimit: 50000,
                chainId: chainId || '0',
                gasPrice: '1e-8',
                ttl: 300,
                creationTime: Date.now(),
                //networkId: 0
            },
        },
        createAPIHost('api', chainId)
    )
    if (result.status === 'failure') {
        const { error } = result
        throw new Error(`${error.type}: ${error.message}`)
    }
    return result
}
