export const useMoneyFormat = () => {
  const defaultCurrency = ref("IDR");

  function formatCurrency(amount: any, chooseCurrency = "$") {
    chooseCurrency = chooseCurrency ?? defaultCurrency.value;

    if (amount) {
      if (isNaN(parseInt(amount))) {
        return amount;
      }

      const priceToString = String(amount);
      return (
        chooseCurrency +
        " " +
        priceToString.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
      );
    } else {
      return chooseCurrency + "0.00";
    }
  }

  return {
    defaultCurrency,
    formatCurrency,
  };
};
