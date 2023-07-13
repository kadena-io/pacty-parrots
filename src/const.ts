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

export const createAPIHost = (network?: string, chainId?: string) =>
    `https://api.testnet.chainweb.com/chainweb/0.0/testnet04/chain/${chainId || 1}/pact`
export const devNetUrl = (network: string, chainId: string) =>
    `https://${network}.tn1.chainweb.com/chainweb/0.0/development/chain/${chainId}/pact`
export const devNetHosts = ['us1', 'us2', 'us3']

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

export async function FetchPactLocal(cmd: TodoType) {
    const { result } = await Pact.fetch.local(
        {
            ...cmd,
            meta: {
                sender: dumKeyPair.publicKey,
                gasLimit: 50000,
                chainId: '0',
                gasPrice: '1e-8',
                ttl: 300,
                creationTime: Date.now(),
            },
        },
        createAPIHost('api', '0')
    )
    if (result.status === 'failure') {
        const { error } = result
        throw new Error(`${error.type}: ${error.message}`)
    }
    return result
}
