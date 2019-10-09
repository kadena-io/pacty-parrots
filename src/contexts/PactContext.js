import React from 'react';
import Pact from 'pact-lang-api';

const Context = React.createContext();

const hosts = ["eu2","us2","eu1","eu2","ap1","ap2"]
const chainIds = ["0","1",'2',"3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19"]
const createAPIHost = (network, chainId) => `https://${network}.testnet.chainweb.com/chainweb/0.0/testnet02/chain/${chainId}/pact`
const dumKeyPair = Pact.crypto.genKeyPair();

const id = localStorage.getItem('id')

export class PactStore extends React.Component {

  state = {
    playerId: id,
    playerTable: null,
    round: 1,
    players: [],
    playersData: [],
    chainId: 0,
    hosts: 0,
    currentReqKey: "",
    payoutMatrix: {},
    workingHosts: []
  }

  getWorkingHosts = async () => {
    const hosts = await Pact.network.host();
    console.log(hosts)
    this.setState({ workingHosts: hosts });
    if (hosts.length === 0) {
      alert("All nodes currently unavailable")
      window.location.reload();
    }
  }

  // isFirstTimeUser = async () => {
  //
  // }

  checkSuccess = async (reqKey) => {
    console.log('in check success')
    console.log(reqKey);
    Pact.fetch.poll({requestKeys: [reqKey]}, createAPIHost(this.state.workingHosts[0],"0"))
    .then(res => {
      if (!res[0]) {
        console.log('pending')
      }
      else if (res[0].result.status==="success") {
        this.setReqKey("")
        console.log("success")
        window.location.reload()
      }
      else if (res[0].result.status==="failure") {
        console.log("failed")
        this.setReqKey("")
        alert("TX failed -> please check username and/or wallet signature")
        window.location.reload()
      }
    })
  }

  getCurrentReqKey = () => {
    return this.state.currentReqKey;
  }

  setReqKey = async (reqKey) => {
    await localStorage.setItem('reqKey', reqKey);
  }

  getReqKey = async () => {
    const reqKey = await localStorage.getItem('reqKey');
    return reqKey;
  }

  getPT = () => {
    return this.state.playerTable;
  }

  getCurrentRound = () => {
    if (this.state.playerTable) {
      return this.state.playerTable["rounds"].length - 1
    } else {
      return 0
    }

  }

  getPayoutMatrix = async () => {
    const cmd = await Pact.fetch.local({
      pactCode: `(pacty-parrots.get-payout-matrix)`,
      keyPairs: dumKeyPair,
    }, createAPIHost(this.state.workingHosts[0],"0"))
    const data = await cmd.data;
    await this.setState({ payoutMatrix: data });
    return data;
  }

  startRound = async (round) => {
    if (this.state.playerId !== "" && this.state.playerId) {
      try {
        const cmd = await Pact.wallet.sign(
          //code
          `(pacty-parrots.start-round ${JSON.stringify(this.state.playerId)})`,
          //envData
          {[this.state.playerId]: []},
          this.state.playerId,
          "0",
          100000
        )
        console.log(cmd)
        const reqKey = await Pact.wallet.sendSigned(cmd, createAPIHost(this.state.workingHosts[0],"0"))
        console.log(reqKey.requestKeys[0]);
        await this.setState({ currentReqKey: reqKey.requestKeys[0] })
        this.setReqKey(reqKey.requestKeys[0])
      } catch(err){
        alert("you cancelled the TX or you did not have the wallet app open")
        window.location.reload();
      }

    }
    else {
      alert("Please Log-in!")
      window.location.reload()
    }
  }

  continueRound = async (round) => {
    if (this.state.playerId !== "" && this.state.playerId) {
      try {
        const cmd = await Pact.wallet.sign(
          //code
          `(pacty-parrots.continue-round ${JSON.stringify(this.state.playerId)})`,
          //envData
          {[this.state.playerId]: []},
          this.state.playerId,
          "0",
          100000
        )
        console.log(cmd)
        const reqKey = await Pact.wallet.sendSigned(cmd, createAPIHost(this.state.workingHosts[0],"0"))
        console.log(reqKey.requestKeys[0]);
        await this.setState({ currentReqKey: reqKey.requestKeys[0] })
        await this.setReqKey(reqKey.requestKeys[0])
      } catch(err){
        alert("you cancelled the TX or you did not have the wallet app open")
        window.location.reload();
    }
    }
    else {
      alert("Please Log-in!")
      window.location.reload()
    }
  }

  endRound = async (round) => {
    if (this.state.playerId !== "" && this.state.playerId) {
      try {
        const cmd = await Pact.wallet.sign(
          //code
          `(pacty-parrots.end-round ${JSON.stringify(this.state.playerId)})`,
          //envData
          {[this.state.playerId]: []},
          this.state.playerId,
          "0",
          100000
        )
        console.log(cmd)
        const reqKey = await Pact.wallet.sendSigned(cmd, createAPIHost(this.state.workingHosts[0],"0"))
        console.log(reqKey.requestKeys[0]);
        await this.setState({ currentReqKey: reqKey.requestKeys[0] })
        this.setReqKey(reqKey.requestKeys[0])
      } catch(err){
        alert("you cancelled the TX or you did not have the wallet app open")
        window.location.reload();
      }
    }
    else {
      alert("Please Log-in!")
      window.location.reload()
    }
  }

  getAllPlayers = async () => {
    const cmd = await Pact.fetch.local({
      pactCode: `(pacty-parrots.get-users)`,
      keyPairs: dumKeyPair,
    }, createAPIHost(this.state.workingHosts[0],"0"))
    const data = await cmd.data;
    await this.setState({ players: data });
    return data;
  }

  getPlayerTable = async () => {
    const cmd = await Pact.fetch.local({
      pactCode: `(pacty-parrots.get-table ${JSON.stringify(this.state.playerId)})`,
      keyPairs: dumKeyPair,
    }, createAPIHost(this.state.workingHosts[0],"0"))
    // .then(res => {
    //   this.setState({ playerTable: res.data })
    // })
    const data = await cmd.data;
    console.log(data);
    await this.setState({ playerTable: data });
  }


  getAllPlayerTables = async () => {
    const l = await this.getAllPlayers();
    const cmd = await Pact.fetch.local({
      pactCode: `(map (pacty-parrots.get-table) ${JSON.stringify(l)})`,
      keyPairs: dumKeyPair,
    }, createAPIHost(this.state.workingHosts[0], "0"))
    const data = await cmd.data;
    await this.setState({ playersData: data });


  }

  setPlayerId = async (id) => {
    localStorage.setItem('id', id);
    await this.setState({ playerId: id })
    console.log(this.state.playerId)
  }

  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          startRound: this.startRound,
          continueRound: this.continueRound,
          endRound: this.endRound,
          setPlayerId: this.setPlayerId,
          getAllPlayerTables: this.getAllPlayerTables,
          getPlayerTable: this.getPlayerTable,
          getCurrentRound: this.getCurrentRound,
          checkSuccess: this.checkSuccess,
          getCurrentReqKey: this.getCurrentReqKey,
          getPT: this.getPT,
          getReqKey: this.getReqKey,
          setReqKey: this.setReqKey,
          getPayoutMatrix: this.getPayoutMatrix,
          getWorkingHosts: this.getWorkingHosts
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }

}

export default Context;