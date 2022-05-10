import React, { Component } from "react";
import WillContract from "./contracts/Will.json";
import getWeb3 from "./getWeb3";

// import add_beneficiary from "./components/add_beneficiary";
import Actions from "./components/actions";
import Assets from "./components/assets";
import 'bootstrap/dist/css/bootstrap.min.css';
import Add_Beneficiary from "./components/add_beneficiary";

const huygenTest="http://18.182.45.18";

class App extends Component {
  state = { 
    owner: "",
    address_array: [],
    beneficiaries: [],
    balance: 0,
    total_payout: 0,
    web3: null, 
    provider: null,
    cur_address: null,
    accounts: null, 
    contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and aleerium instance.
      if (typeof window["aleereum"] !== "undefined"){
        const provider = window["aleereum"];
        console.log(provider)
      }
      const provider = window["aleereum"];
      console.log(provider)

      const providerAddress = "18.182.45.18"

      //Connect to mcp
      const options = {
        host: providerAddress,
        //port: 8765,
    }

      let Mcp = require("mcp.js");
      let mcp = new Mcp(options); 

      //Create contract instance
      mcp.Contract.setProvider(huygenTest)
      const core = "0x126d84BF66F8b3018DA6B575d9cD5Fb1228150F6"

      const contract = new mcp.Contract(WillContract.abi, core)
      console.log(contract)

      await provider.connect()

      //Set initial variables
      const owner = await contract.methods.owner().call();
      const address_array = await contract.methods.getAddresses().call();
      const account = await provider.account
      const balance = await provider.getBalance(account)

      //const balance = await web3.eth.getBalance(owner);

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({owner: owner, address_array: address_array, balance: balance, provider: provider, cur_address: account, contract: contract }, console.log(this.state));
      console.log(this.state)
      await this.getBeneficiaries();
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load provider, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }

  };

  getBeneficiaries = async () => {

    this.setState({ beneficiaries: [],
                    total_payout: 0,
    })


    for (let i = 0; i < this.state.address_array.length; i++) {
      const beneficiary = await this.state.contract.methods.beneficiaries(this.state.address_array[i]).call();


      this.setState(previousState => ({
        beneficiaries: [...previousState.beneficiaries, beneficiary],
        total_payout: parseInt(this.state.total_payout) + parseInt(beneficiary.payout) 
      }));
    }
    console.log(this.state)
  };


  createNewBen = async (address) => {
    const beneficiary = await this.state.contract.methods.beneficiaries(address).call();
    
    this.setState(previousState => ({
      address_array: [...previousState.address_array, address],
      beneficiaries: [...previousState.beneficiaries, beneficiary],
    }));

    console.log(this.state)
  }

  executeWill = async () => {

    // execute the will if it hasn't been executed yet
    for (var i = 0; i < this.state.address_array.length; i++) {
      const ben_address = this.state.address_array[i];

        console.log(ben_address)
      await this.state.contract.methods.executeWill(ben_address).send({
        from: this.state.owner,
        value: this.state.beneficiaries[i].payout
      });
    }
    window.location.reload(false);
  }


  render() {
    return (
      <div className="App">
        <Add_Beneficiary
          owner = {this.state.owner}
          contract = {this.state.contract}
          addresses = {this.state.address_array}
          beneficiaries = {this.state.beneficiaries}
          web3 = {this.state.web3}
          provider = {this.state.provider}
          cur_address = {this.state.cur_address}
          createNewBen = {this.createNewBen}
          execWill = {this.executeWill}
        />
        <div className="Actions">
        <Actions 
          owner = {this.state.owner}
          contract = {this.state.contract}
          beneficiaries = {this.state.beneficiaries}
          updatePayout = {this.getBeneficiaries}
        />
        </div>
        <div classname ="Assets">
        <Assets 
          owner = {this.state.owner}
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
