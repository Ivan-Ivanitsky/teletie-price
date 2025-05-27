export default function learn(id){
    const stepLearn = ['Кликните на любую карточку старифом',
        'Откроется модальное окно',
        'Введите нужные данные о тарифе нажмите сохранить',
        'Карточка обновится',
        'Проскрольте до конца страницы и сохраните прайс']

    const modalOverlay = document.getElementById('modalOverlay')
    if(id==='btn-learn'){
        const card = document.getElementById('vdo-2')
        modalOverlay.classList.add('active')

        stepsLearn(card,stepLearn,1000)

    }
    


}

async function stepsLearn(card,arrText){
    for(let i=0; i<arrText[i].length;i++){
        switch(i){
            case 0:createTeletipe(i,arrText[i])
            return 
        }
    }
}

async function createTeletipe(index,arrText){
    let str = ''
    const teletipe = document.createElement('p')
    const header = document.querySelector('.price__header')
    teletipe.classList.add('teletipe')
    teletipe.style.zIndex = 9999
    header.insertAdjacentElement('beforebegin',teletipe)

    for(let i=0; arrText.length>i;i++){
       await new Promise(res=> setTimeout(()=>{
            str += arrText.charAt(i)
            teletipe.textContent =str 
            res()
            console.log(str)
        },100))
    }
}