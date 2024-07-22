function calc(amount, term, rate, type) {
  term = term * 12;
  rate = rate / 100 / 12;
  amount = parseFloat(amount);

  let repayment =
    (amount * (rate * Math.pow(1 + rate, term))) /
    (Math.pow(1 + rate, term) - 1);
  repayment = parseFloat(repayment);

  let interest = parseFloat(repayment * term - amount).toFixed(2);
  interest = parseFloat(interest);

  console.log(typeof amount);
  console.log(typeof interest);
  console.log(typeof repayment);

  let total = parseFloat(amount + interest).toFixed(2);

  repayment = new Intl.NumberFormat().format(parseFloat(repayment).toFixed(2));
  interest = new Intl.NumberFormat().format(interest);
  total = new Intl.NumberFormat().format(total);

  if (type == 0) {
    return [repayment, total];
  } else {
    return [interest, total];
  }
}

export default calc;
