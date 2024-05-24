import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Modal from "./components/Modal";
import "./App.css";
import logo from './images/gdrive4.png';
import lock from './images/lock.png';
import bg from './images/bg3.jpg';
import envelope from './images/envelope.png';
import earth from './images/earth.png';
import book from './images/openbook.png';
import nlink from './video/networklink.mp4';




function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

        const contract = new ethers.Contract(
          contractAddress,
          Upload.abi,
          signer
        );
        //console.log(contract);
        setContract(contract);
        setProvider(provider);
      } else {
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider();
  }, []);
  return (
    <>
      <div class="topbg">
      <div class="bg">
      <h1 id="dgd"> DGD </h1>
      <p >
      <i id="user" class="fa-solid fa-circle-user fa-2xl mx-2" ></i>
          Account : {account ? account : "Not connected"}
      </p>
      </div>
      </div>
      
      <video className="nlink" src={nlink} autoPlay loop muted></video>
     
      <div class="introimg">
       
        <h1 id="heading"> DECENTRALIZED DRIVE</h1>
        
        <h1 id="tittle">Empowering Data Ownership </h1>
        <h2 id="tittle3">Decentralized Google Drive, powered by blockchain, offers highly secure 
        and efficient cloud storage. It decentralizes data, enhancing security by distributing it
         across nodes and using an immutable ledger to prevent tampering. Users gain control over
          their data, with features like encryption and smart contracts ensuring secure and reliable
           transactions. This system promotes digital independence by empowering users to manage 
           their files autonomously and confidently. </h2>
           </div>

           <div className="difference">
             
            <h1 id="diff1">How Decentralized storage is different from centralized ?</h1>
            <h2 id="diff2">Decentralized storage differs from centralized storage by distributing data across
               a network of nodes instead of relying on a single central server. In decentralized
                storage, data is redundantly stored across multiple nodes, increasing data resilience 
                and reducing the risk of data loss due to server failures or attacks. This approach 
                also enhances privacy and security since data is not stored in a single location, 
                making it harder for unauthorized access. Furthermore, decentralized storage systems
                 often leverage blockchain technology, providing transparency, immutability, and 
                 trust in data integrity without relying on a central authority.</h2>
                 
             </div>



           <div className="reasons">
             <div className="first-reason">
                <div className="para1">
                    <h1 id="H1">ENHANCED SECURITY</h1>
                    <h2 id="H2"> Blockchain's cryptographic algorithms and decentralized
                     nature make it highly secure. Data is encrypted and stored across a
                      network of nodes, making it challenging for unauthorized parties to
                       access or tamper with sensitive information.</h2>
                </div>
              <div id="r-image">
                <img id="icons"  src={lock}></img>
             </div>
          </div>     
               
               <div className="first-reason">
               <img id="icons"  src={earth}></img>
                 <div className="para1">
                     <h1 id="H1">ENVIRONMENTAL SUSTAINABILITY</h1>
                     <h2 id="H2">Some blockchain platforms are transitioning to energy-efficient
                      consensus mechanisms like Proof of Stake (PoS), reducing their environmental
                       impact compared to traditional Proof of Work (PoW) systems.</h2>
                </div>
                

              </div>
            
              <div className="first-reason">
                 <div className="para1">
                     <h1 id="H1">TRANSPARENCY</h1>
                     <h2 id="H2">The transparent nature of blockchain allows all participants to 
                     view transaction history while maintaining privacy through encryption,
                      ensuring accountability and trust.</h2>
                </div>
                <div id="r-image">
                <img id="icons"  src={book}></img>
                </div>
              </div>

              <div className="first-reason">

              <img id="icons" src={envelope}></img>
                 <div className="para1">
                     <h1 id="H1">IMMUTABLE DATA</h1>
                     <h2 id="H2">Once data is stored on a blockchain, it becomes immutable.
                      This immutability ensures data integrity and provides a reliable 
                      audit trail, crucial for applications requiring verifiable records,
                       such as legal documents or financial transactions.</h2>
                </div>
                <div id="r-image">
                   
                </div>
              </div>
      </div>
      <div className="appintro">
         <div className="appintrotext">
      <h1 id="tittle2">DIVE INTO THE FUTURE</h1>
      <h2 id="tittle4">Blockchain technology stands at the forefront of innovation, promising a paradigm
       shift in how we navigate digital landscapes. Its decentralized nature, secured by cryptographic
        algorithms, ensures data integrity and transparency across networks. Through immutable ledgers, 
        blockchain enables traceable and tamper-proof transactions, making it a cornerstone of trust in
         various industries.Beyond cryptocurrencies, blockchain's potential spans supply chain management,
          healthcare, and voting systems. Its decentralized architecture eliminates intermediaries,
           reducing costs and enhancing efficiency. Smart contracts automate agreements, streamlining 
           processes and fostering faster, reliable transactions.

</h2>
      </div>
      </div>
      <div className="App">
      

      {!modalOpen && (
        <button className="share" onClick={() => setModalOpen(true)}>
          Share 
          <i id="fa" class="fa-solid fa-paper-plane mx-2"></i>
        </button>
               
      )}
      {modalOpen && (
        <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
      )}*/
      
      <img id="logo" src={logo}  /> 
       
        <FileUpload
          account={account}
          provider={provider}
          contract={contract}
        ></FileUpload>
        <Display contract={contract} account={account}></Display>
      </div>
    </>
  );
}

export default App;
