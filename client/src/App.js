import React, { Component } from "react";
import WillContract from "./contracts/Will.json";
import getWeb3 from "./getWeb3";

// import add_beneficiary from "./components/add_beneficiary";
import Actions from "./components/actions";
import Assets from "./components/assets";
import 'bootstrap/dist/css/bootstrap.min.css';
import Add_Beneficiary from "./components/add_beneficiary";

class App extends Component {
  state = { 
    owner: "",
    address_array: [],
    beneficiaries: [],
    balance: 0,
    total_payout: 0,
    web3: null, 
    accounts: null, 
    contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = WillContract.networks[networkId];
      const contract = new web3.eth.Contract(
        WillContract.abi,
        deployedNetwork && deployedNetwork.address,
      );
      contract.options.address = deployedNetwork.address
      const owner = await contract.methods.owner().call();
      const address_array = await contract.methods.getAddresses().call();
      const balance = await web3.eth.getBalance(owner);

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({owner: owner, address_array: address_array, balance: balance, web3: web3, accounts: accounts, contract: contract }, console.log(this.state));
      await this.getBeneficiaries();
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
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
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <Add_Beneficiary
          owner = {this.state.owner}
          contract = {this.state.contract}
          addresses = {this.state.address_array}
          beneficiaries = {this.state.beneficiaries}
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
          total_payout = {this.state.total_payout}
        />
        </div>
      </div>
    );
  }
}

export default App;
