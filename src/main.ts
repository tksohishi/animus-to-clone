import './style.css'
import { ethers } from "ethers";

const provider = ethers.providers.getDefaultProvider();
const animusAddress = "0x6c410cF0B8c113Dc6A7641b431390B11d5515082";
const animusAbi = [
  "function eggToClone(uint) view returns (uint)"
];
const animusContract = new ethers.Contract(animusAddress, animusAbi, provider);

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <p>Animus Egg to Clone X</p>
  <div>
    <input placeholder="Enter an Egg ID" id="egg" type="number" />
  </div>
  <div>
    <a id="clone" target="_blank"></a>
    <div id="clone-image"></div>
    <div id="donation-message"></div>
  </div>
`

const input = document.getElementById('egg')!;
const clone = document.getElementById('clone')!;
const cloneImage = document.getElementById('clone-image')!;
const donationMessage = document.getElementById('donation-message')!;

input.addEventListener('change', function(event) {
  clone.textContent = "Loading...";
  clone.setAttribute("href", "");
  const target = event.target as HTMLInputElement;
  const eggId = ethers.BigNumber.from(target.value);
  animusContract.eggToClone(eggId).then(function(result: ethers.BigNumber) {
    const cloneId = result.toString();
    const url = "https://opensea.io/assets/ethereum/0x49cf6f5d44e70224e2e23fdcdd2c053f30ada28b/" + cloneId;
    clone.textContent = "OpenSea";
    clone.setAttribute("href", url);
    cloneImage.innerHTML = `
    <img src="https://clonex-assets.rtfkt.com/images/${cloneId}.png" width=200 height=200/>
    `
    donationMessage.innerHTML = `
    <div class="notes">
      <p>Consider small donations if you want to support the creator's work:<br/><b>0x60E919d2099cC496615077d0722447DeD2D5b6C6</b></p>
    </div>
    `
  });
});
