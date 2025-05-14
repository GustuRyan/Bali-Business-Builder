export default function () {
  const minDate = computed(() => {
    return useDateFormat(useNow(), "YYYY-MM-DD").value;
  });

  return {
    minDate,
  };
}
