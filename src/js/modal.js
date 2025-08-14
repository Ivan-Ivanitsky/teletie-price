// import setLocalStore from "./localStore"

import setLocalStore from './localStore.js';
import tariffs from './tariffs.js';

export default function modal() {
  let currentCardId = '';

  const modal = document.getElementById('modalContent');
  const modalOverlay = document.getElementById('modalOverlay');
  const cards = document.querySelectorAll('.card');

  const form = document.getElementById('editForm');
  const cancelBtn = document.querySelector('.cancel-btn');
  const inputTariffName = document.getElementById('tariffName');
  const inputtariffMinutes = document.getElementById('tariffMinutes');
  const inputtariffGB = document.getElementById('tariffGB');
  const inputtariffSMS = document.getElementById('tariffSMS');
  const inputtariffPrice = document.getElementById('tariffPrice');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    modal.classList.remove('active');
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
    const formCardId = form.querySelector('.form-card').id;

    if (formCardId === currentCardId) {
      const formData = new FormData(form);
      const newTariff = {
        name: currentCardId,
        imgSocial: tariffs[0].imgSocial,
      };

      for (let [key, value] of formData) {
        newTariff[key] = value;
      }
      update(newTariff, currentCardId);
    } else {
      console.log('error');
    }
  });

  function update(data, id) {
    const unlim = './logo/png/infinity-svgrepo-com.png';
    const cardVdoUnlim = `<img src=${unlim} alt='unlim' style=width:32px>`;

    data.Gb === '' ? (data.Gb = cardVdoUnlim) : (data.Gb = `${data.Gb} Гб`);
    const index = tariffs.findIndex((item) => item.name === id);

    console.log(data.Gb);
    // const tariff__text = document.createElement('')
    const card = document.getElementById(id);

    const loader = card.querySelector('.loader');
    let newTariffs = [...tariffs];

    if (data) {
      newTariffs.splice(index, 1, data);
    }

    setLocalStore(newTariffs);
    loader.classList.remove('hidden');
    setTimeout(() => {
      loader.classList.add('hidden');
      renderCard(card, newTariffs[index]);
    }, 2000);
  }

  function renderCard(card, data) {
    if (data.name === card.id && data.name !== 'drive') {
      card.querySelector('.card__header').textContent = ` ${data.tariff}`;
      card.querySelector('.tariff__option_minut .quantity').textContent = `${data.minut}` || '';
      card.querySelector('.tariff__option_internet .quantity').innerHTML = data.Gb;
      card.querySelector('.tariff__option_sms .quantity').textContent = `${data.sms}` || '';
      card.querySelector('.price_value span').textContent = `${data.price} ₽/мес`;
    } else {
      card.querySelector('.card__header').textContent = ` ${data.tariff}`;
      card.querySelector('.tariff__drive .quantity').textContent = `${data.Gb} Гб`;
      card.querySelector('.price_value-drive span').textContent = `${data.price} ₽/мес`;
    }
  }

  function getNumber(str) {
    return Number(str.replace(/\D/g, ''));
  }

  function setFormCardAttribute(id, i) {
    if (id === `vdo-${i}`) {
      inputtariffMinutes.setAttribute('required', '');
      inputtariffSMS.setAttribute('required', '');
      form.querySelector('.form-card').setAttribute('id', id);
    } else {
      form.querySelector('.form-card').setAttribute('id', id);
      inputtariffMinutes.removeAttribute('required');
      inputtariffSMS.removeAttribute('required');
    }
  }

  cards.forEach((card, i) => {
    i++;
    card.addEventListener('click', (e) => {
      if (card.id === `vdo-${i}`) {
        const cardVdo = {
          name: card.querySelector('.card__header').textContent,
          minut: getNumber(card.querySelector('.tariff__option_minut .quantity').textContent),
          Gb: getNumber(card.querySelector('.tariff__option_internet .quantity').textContent),
          sms: getNumber(card.querySelector('.tariff__option_sms .quantity').textContent),
          price: getNumber(card.querySelector('.price_value span').textContent),
        };

        inputTariffName.value = cardVdo.name;
        inputtariffMinutes.value = cardVdo.minut;
        inputtariffGB.value = cardVdo.Gb;
        inputtariffSMS.value = cardVdo.sms;
        inputtariffPrice.value = cardVdo.price;

        inputtariffMinutes.parentElement.style.display = 'block';
        inputtariffSMS.parentElement.style.display = 'block';

        setFormCardAttribute(card.id, i);
        currentCardId = card.id;
        modal.classList.add('active');
        modalOverlay.classList.add('active');
      } else {
        const cardDrive = {
          name: card.querySelector('.tariff').textContent,
          gb: getNumber(card.querySelector('.tariff__drive .quantity').textContent),
          price: getNumber(card.querySelector('.price_value-drive span').textContent),
        };

        inputTariffName.value = cardDrive.name;
        inputtariffGB.value = cardDrive.gb;
        inputtariffPrice.value = cardDrive.price;

        setFormCardAttribute(card.id, i);

        currentCardId = card.id;

        inputtariffMinutes.parentElement.style.display = 'none';
        inputtariffSMS.parentElement.style.display = 'none';

        modal.classList.add('active');
        modalOverlay.classList.add('active');
      }

      function closeModal(e) {
        if (e.target) modal.classList.remove('active');
        modalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
      }

      document.body.style.overflow = 'hidden';
      cancelBtn.addEventListener('click', (e) => closeModal(e));
      modalOverlay.addEventListener('click', (e) => {
        modal.classList.remove('active');
        modalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
      });
    });
  });
}
