export const useCountPercen = () => {
  const gapPencen = ref(0);
  const totalGap = ref(0);

  function countPencen(greatValue: number, lowValue: number) {
    totalGap.value = greatValue - lowValue;
    gapPencen.value = (totalGap.value / lowValue) * 100;
    return totalGap.value;
  }

  return {
    gapPencen,
    countPencen,
  };
};
