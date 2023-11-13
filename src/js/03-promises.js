import Notiflix from "notiflix";

const form = document.querySelector('.form');
const options = {
  position: 'center-bottom',
  distance: '15px',
  borderRadius: '15px',
  timeout: 10000,
  clickToClose: true,
  cssAnimationStyle: 'from-right',
};


form.addEventListener('submit', function (event) {
  event.preventDefault();
  const amount = parseInt(form.amount.value);
  const delay = parseInt(form.delay.value);
  const step = parseInt(form.step.value);
  let i;

  
  for (i = 1; i <= amount; i++) {
    createPromise(i, delay + step * (i - 1))
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise
         ${position} in ${delay}ms`,
          options);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position}
         in ${delay}ms`,
          options);
      });
  }
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
       if (shouldResolve) {
    // Fulfill
     resolve({ position, delay });
  } else {
    // Reject
   reject({ position, delay });
      }
    }, delay);
  });
}
