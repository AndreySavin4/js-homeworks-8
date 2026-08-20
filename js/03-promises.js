const refs = {
  delay: document.querySelector("input[name=delay]"),
  step: document.querySelector("input[name=step]"),
  amount: document.querySelector("input[name=amount]"),
  form: document.querySelector(".form"),
};

const { delay, step, amount, form } = refs;

form.addEventListener("submit", (evt) => {
  evt.preventDefault();

  let newDelay = Number(delay.value);

  for (let i = 1; i <= amount.value; i += 1) {
    createPromise(i, newDelay);

    newDelay += Number(step.value);
  }
});

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  })
    .then(({ position, delay }) => {
      console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}
