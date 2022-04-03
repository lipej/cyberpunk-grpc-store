export const cardBrand = (num: string) => {
  //const number = num.split(" ").join("");
  const number = num
  const regex: Record<string, RegExp> = {
    electron: /^(4026|417500|4405|4508|4844|4913|4917)\d+$/,
    maestro:
      /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/,
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    mastercard: /^5[1-5][0-9]{14}$/,
  };

  const icons: Record<string, string> = {
    electron:
      "https://app.card-logo.com/uploads/thumbnail/128px/4ff61729623057e7078c1cfa7a588ae0c366ced5.png",
    maestro:
      "https://app.card-logo.com/uploads/thumbnail/128px/0e925cd0f1967bf5b9c0757293c9444c2fa8caaf.png",
    visa: "https://app.card-logo.com/uploads/thumbnail/128px/e0b4cdc54800b9d7abcb9c012990662978eb39d4.png",
    mastercard:
      "https://app.card-logo.com/uploads/thumbnail/128px/d51f7a234af740dcf1ad7dc9619e18c065a31cf7.png",
  };

  for (const key in regex) {
    if (regex[key].test(number)) {
      return { img: icons[key], brand: key };
    }
  }
  return { img: "", brand: "invalid" };
}
