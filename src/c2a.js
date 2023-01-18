import './style.css'
import data from "../6c410cf0b8c113dc6a7641b431390b11d5515082_14850.json";

document.querySelector('#app').innerHTML = `
  <p>Clone X to Animus</p>
  <div>
    <input placeholder="Enter a Clone X ID" id="clone" type="number" />
  </div>
  <div>
    <a id="egg" target="_blank"></a>
    <div id="clone-image"></div>
    <div id="donation-message"></div>
  </div>
`

const clone = document.getElementById('clone');
const egg = document.getElementById('egg');
const cloneImage = document.getElementById('clone-image');
const donationMessage = document.getElementById('donation-message');

clone.addEventListener('change', function(event) {
  egg.textContent = "Loading...";
  egg.setAttribute("href", "");
  const target = event.target;
  const cloneId = target.value;
  const eggId = Object.keys(data).find(k => data[k].toString() === cloneId);
  if (eggId) {
    const url = "https://opensea.io/assets/ethereum/0x6c410cf0b8c113dc6a7641b431390b11d5515082/" + eggId;
    egg.textContent = "OpenSea (Animus Egg)";
    egg.setAttribute("href", url);
    donationMessage.innerHTML = `
    <div class="notes">
      <p>Consider small donations if you want to support the creator's work:<br/><b>0x60E919d2099cC496615077d0722447DeD2D5b6C6</b></p>
    </div>
    `
  } else {
    egg.textContent = "This Clone hasn't claimed its egg or recently claimed an egg";
  }
  cloneImage.innerHTML = `
  <img src="https://clonex-assets.rtfkt.com/images/${cloneId}.png" width=200 height=200/>
  `;
});
