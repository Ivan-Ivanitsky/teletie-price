import tariffs from "./tariffs.js";
import modal from './modal.js';
import setLocalStore from "./localStore.js";
import downloadPDF from "./savePdf.js";
import intro from "./intro.js";


(function () {
  addEventListener("DOMContentLoaded", () => {
    const resp = JSON.parse(localStorage.getItem('data'))
    const btnSave = document.getElementById('downloadPDF');
    const btnStart = document.getElementById('btn-start')
    btnSave.addEventListener('click',()=> downloadPDF())


    const contentTariffs = document.querySelector(".tariffs-container");
      

    function addSocialElements(item){
        return  Array.from({length:item.length},(_,el)=> 
            `<img src=${item[el]}>`).join('')
    }


    function createCard(data) {
      data.forEach((item, i) => {
        i++
        const card = document.createElement("div");
        card.classList.add(`card-contaner`)
     
    
        if (item.name === `vdo-${i}`) {
          card.innerHTML = `<div class="card" id="vdo-${i}">
          <div class="card__header">  ${item.tariff}</div>
            <div class="card__content">
                    
                    <div id="loader" class="loader hidden">
                        <div class="loader-content">
                        <h1 class="loader-title">Телетай</h1>
                        <p class="loader-text">Обновляем  <span class="dots"></span></p>
                        </div>
                    </div>
                    <div class="card__content-col-1">
                        <div class="tariff__option tariff__option_minut">
                            <div class="quantity" type="number">
                                ${item.minut}
                            </div>
                            <div class="description">
                                Минут <p></p>
                                <span>по всей России</span>
                            </div>
                        </div>
                        <div class="tariff__option tariff__option_internet">
                            <div class="quantity" type="number">
                                ${item.Gb} <span class="tariff__text-gb">Гб</span> 
                            </div>
                            <div class="description">
                                Интернет*<p></p>
                                <span>по всей России</span>
                            </div>
                        </div>
                        <div class="tariff__option tariff__option_sms">
                            <div class="quantity" type="number">
                                ${item.sms}
                            </div>
                            <div class="description">
                                sms/mms<p></p>
                                <span>по всей России</span>
                            </div>
                        </div>
                        <div class="tariff__option tariff__option_calls">
                            <div class="logo-unlim">
                                <img src="./logo/infinity-svgrepo-com.svg" alt="infinity">
                            </div>
                            <div class="description">
                                звонки<p></p>
                                <span>на Телетай и Билайн</span>
                            </div>
                        </div>
                    </div>
                    <div class="card__content-col-2">
                        <div class="tariff__option tariff__option_unlim ">
                            <div class="logo-unlim_social ">
                                ${item.imgSocial? addSocialElements(item.imgSocial) :''}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="price">
                    <div class="price_value">
                        <span> ${item.price} ₽/мес</span>
                        <div class="logo-unlim logo-unlim_mr ">
                            <img src="./logo/infinity-svgrepo-com.svg" alt="infinity">
                        </div>
                    </div>
                </div>
            </div>`;
            
        } if(item.name==='drive') {
          card.innerHTML = ` 
            <div class="card card-drive" id="drive">
                <div class="card__content card__content-drive">
                    <div id="loader" class="loader hidden">
                        <div class="loader-content">
                        <h1 class="loader-title">Телетай</h1>
                        <p class="loader-text">Обновляем <span class="dots"></span></p>
                        </div>
                    </div>
                    <div class="tariff card__header">${item.tariff}</div>
                    <div class="tariff__option tariff__drive">
                        <div class="quantity " type="number">
                            ${item.Gb} Гб
                        </div>
                        <div class="description">
                            Интернет*<p></p>
                            <span>по всей России</span>
                        </div>
                    </div>
                </div>
                <div class="price price-drive">
                    <div class="price_value price_value-drive">
                        <span> ${item.price} ₽/мес</span>
                    </div>
                </div>
            </div> `;
        }

        
        contentTariffs.insertAdjacentElement('beforeend', card);
        const innerCard = card.firstElementChild
        if(innerCard){
         requestAnimationFrame(()=>{
            setTimeout(()=>{
              innerCard.classList.add('show')
            },100)
          })   
        }
   
      });
    }

    function skeleton(){
      for(let c in tariffs){
        const cardSkeleton = document.createElement('div')
        cardSkeleton.classList.add('card-skeleton')
        contentTariffs.insertAdjacentElement('beforeend',cardSkeleton)
        setTimeout(()=>{
          contentTariffs.classList.remove('loading')
          cardSkeleton.remove()
        },1000)
      } 
    }




    function render() { 
      skeleton()
      setTimeout(()=>{
        createCard(resp||tariffs)
        modal()
      },1000)
    }
    intro()
    btnStart.addEventListener('click',()=>{
        document.querySelector('.intro').classList.add('hidden')
        document.getElementById('price').style.display='block'
    })
    render()

  });
})();

