import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
// import getWeb3 from "./getWeb3";
import WillContract from "./contracts/Will.json";
import Actions from "./components/actions";
import Assets from "./components/assets";
import AddBeneficiary from "./components/add_beneficiary";

const huygenTest="http://18.182.45.18";
// const huygenMain="http://13.212.177.203";

const networkOptions = {
  host: huygenTest,
  dev: true,
}

class App extends Component {
  state = {
    owner: "",
    address_array: [],
    beneficiaries: [],
    executor: "",
    balance: 0,
    total_payout: 0,
    web3: null,
    provider: null,
    cur_address: null,
    accounts: null,
    contract: null };

  componentDidMount = async () => {
    try {
      // check if Ale wallet is available
      if (typeof window["aleereum"] == "undefined"){
        console.log("Ale wallet not found");
      }

      // get network provider
      const provider = window["aleereum"];
      console.log("provider details ", provider);
      const connectStatus = await provider.connect();
      console.log("connection status ", connectStatus);

      //Connect to mcp
      let Mcp = require("mcp.js");
      let mcp = new Mcp(networkOptions);

      mcp.request.status().then(function (res) {
        console.log(`status`,res);
      }).catch(function(error){
          console.log("accountList catch",error);
      })
      console.log("mcp details ", mcp);

      // grab the contract
      mcp.Contract.setProvider(huygenTest);
      const core = "0x7c64828772A658D164E76D328DF24a41E7A8647d";
      // const core = "0x23a6584d44a1b7F91de62dB03726D781Dae8c8e4";
      const contract = new mcp.Contract(WillContract.abi, core);
      console.log("contract details ", contract);

      await provider.connect()

      //Set initial variables
      const owner = await contract.methods.owner().call();
      const address_array = await contract.methods.getAddresses().call();
      const executor = await contract.methods.executor().call();
      const account = await provider.account;

      let balance = await provider.getBalance(account);
      balance = balance.balance;

      //const balance = await web3.eth.getBalance(owner);

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({owner: owner, address_array: address_array, executor: executor, balance: balance,
                    provider: provider, cur_address: account, contract: contract });
      console.log(this.state)
      await this.getBeneficiaries();
    } catch (error) {
      // Catch any errors for any of the above operations.
      //alert(
      //  `Failed to load provider, accounts, or contract. Check console for details.`,
      //);
      console.error(error);
    }
    // end of try-catch
  };

  getBeneficiaries = async () => {
    this.setState({ beneficiaries: [],
                    total_payout: 0,
    })

    for (let i = 0; i < this.state.address_array.length; i++) {
      const beneficiary = await this.state.contract.methods.beneficiaries(this.state.address_array[i]).call();
      console.log(beneficiary)
      const payout = beneficiary.payout._bn.words[0]
      beneficiary["payout"] = payout
      beneficiary[1] = payout
      this.setState(previousState => ({
        beneficiaries: [...previousState.beneficiaries, beneficiary],
        total_payout: parseInt(this.state.total_payout) + parseInt(beneficiary.payout)
      }));
    }
  };

  createNewBen = async (address) => {
    const beneficiary = await this.state.contract.methods.beneficiaries(address).call();

    this.setState(previousState => ({
      address_array: [...previousState.address_array, address],
      beneficiaries: [...previousState.beneficiaries, beneficiary],
    }));

    console.log(this.state)
  }

  // executeWill = async () => {
  //   // execute the will if it hasn't been executed yet
  //   for (var i = 0; i < this.state.address_array.length; i++) {
  //     const ben_address = this.state.address_array[i];

  //       console.log(ben_address)
  //     await this.state.contract.methods.executeWill(ben_address).send({
  //       from: this.state.owner,
  //       value: this.state.beneficiaries[i].payout
  //     });
  //   }
  //   window.location.reload(false);
  // }

  render() {
    return (
      <div className="App">
        <AddBeneficiary
          owner = {this.state.owner}
          contract = {this.state.contract}
          addresses = {this.state.address_array}
          beneficiaries = {this.state.beneficiaries}
          web3 = {this.state.web3}
          provider = {this.state.provider}
          cur_address = {this.state.cur_address}
          createNewBen = {this.createNewBen}
          // execWill = {this.executeWill}
        />
        <div className="Actions">
          <Actions
            owner = {this.state.owner}
            cur_address = {this.state.cur_address}
            executor = {this.state.executor}
            contract = {this.state.contract}
            beneficiaries = {this.state.beneficiaries}
            updatePayout = {this.getBeneficiaries}
          />
        </div>
        <div className ="Assets">
          <Assets
            owner = {this.state.owner}
            executor = {this.state.executor}
            contract = {this.state.contract}
            beneficiaries = {this.state.beneficiaries}
            balance = {this.state.balance}
            web3 = {this.state.web3}
            cur_address = {this.state.cur_address}
            provider = {this.state.provider}
            total_payout = {this.state.total_payout}
          />
        </div>
      </div>
    );
  }
}

export default App;
