
async function downloadPDF() {
    // Получаем доступ к функции jsPDF
    const { jsPDF } = window.jspdf;

    // Указываем, какой элемент HTML мы хотим сохранить
    const element = document.getElementById("container-pdf");
    const clone = createClone(element)
   
    document.body.append(clone)   

   showSpinner()

    const canvas = await html2canvas(clone, {
      scale: 4, // Увеличение масштаба для лучшего качества
      useCORS: true // Если используются внешние стили/изображения с CORS
    });


    
    // Преобразуем canvas в изображение
    const imgData = canvas.toDataURL('image/jpeg', 1.0);

    // Создаем PDF в альбомной ориентации (L — landscape), формат A4
   
    const pdf = new jsPDF('l', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    clone.remove()
    removeSpiner()
    // Добавляем картинку во весь лист PDF
 
    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    // Сохраняем PDF с указанным именем
    pdf.save("tariff.pdf");

  }


  function createClone(element){
    const clone = element.cloneNode(true)
    const width = `${1030}px`
    const height = `${780}px`


    
    clone.style.width  = width
    clone.style.height = height 
    clone.style.position = 'fixed'
    clone.style.left = '-99999px'
    clone.querySelector('.btn-save').remove()
    clone.querySelector('.price__header').style.cssText = `flex-direction: row;
    text-align: auto;
    gap: 0;
    `
    clone.querySelector('.tariffs-container').style.justifyContent = 'normal';
    return clone
  }

  function showSpinner(){
    const spinner = document.getElementById('spinner')
    spinner.classList.add('show')
    spinner.querySelectorAll('span').forEach(el=>{
        el.style.display='block'
    })
  }


  function removeSpiner(){
    const spinner = document.getElementById('spinner')
    spinner.classList.remove('show')
    spinner.querySelectorAll('span').forEach(el=>{
        el.style.display='none'
    })
  }
  export default downloadPDF