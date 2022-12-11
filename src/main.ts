import './style.css'
import { ethers } from "ethers";

const provider = ethers.providers.getDefaultProvider();
const animusAddress = "0x6c410cF0B8c113Dc6A7641b431390B11d5515082";
const animusAbi = [
  "function eggToClone(uint) view returns (uint)"
];
const animusContract = new ethers.Contract(animusAddress, animusAbi, provider);

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <input placeholder="Enter an Egg ID" id="egg" type="number" />
  </div>
  <div>
    <a id="clone" target="_blank"></a>
    <div id="clone-image"> </div>
  </div>
`

const input = document.getElementById('egg')!;
const clone = document.getElementById('clone')!;
const cloneImage = document.getElementById('clone-image')!;

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
  });
});
