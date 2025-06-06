import tariffs from "./tariffs.js";
import modal from './modal.js';

import downloadPDF from "./savePdf.js";
import learn from "./learn.js";


(function () {
  addEventListener("DOMContentLoaded", () => {
    const resp = JSON.parse(localStorage.getItem('data'))
    const btnSave = document.getElementById('downloadPDF');
    const btnStart = document.getElementById('btn-start')
    const btnLearn = document.getElementById('btn-learn')
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
                                ${item.Gb} Гб 
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
                                <img src="./logo/png/infinity-svgrepo-com.png" alt="infinity">
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
                            <img src="./logo/png/infinity-svgrepo-com.png" alt="infinity">
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
                    <div class='tariff__drive-logo'><img src='./logo/png/modem.png'></div>
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


    function sleep(ms){
       return new Promise(resolve=>setTimeout(resolve,ms))
    }

    async function render(e) {
       if(e==='btn-start'){
        await sleep(1000) 
        await createCard(resp||tariffs)
        modal()
       }else
        await createCard(resp||tariffs)
    }
    
 
   

    btnStart.addEventListener('click',async(e)=>{
        document.querySelector('.intro').classList.add('hidden')
        document.getElementById('price').style.display='block'
        skeleton()
        await render(e.target.id)
    })

    btnLearn.addEventListener('click',(e)=>{
        document.querySelector('.intro').classList.add('hidden')
        document.getElementById('price').style.display='block'
        render(e.target.id)
        learn(e.target.id)
    })
  });
})();