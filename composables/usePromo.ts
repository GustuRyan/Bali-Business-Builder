export default function () {
  const { formatCurrency } = useMoneyFormat();
  function getPromoType(amount: string | number, type: string, format = "$") {
    if (type === "percentage") {
      return Number(amount).toFixed(2) + "%";
    }

    return formatCurrency(Number(amount), format);
  }

  return {
    getPromoType,
  };
}
