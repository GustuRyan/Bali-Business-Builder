export default function () {
  const modal = ref<boolean>(false);
  function openModal() {
    modal.value = true;
  }
  function closeModal() {
    modal.value = false;
  }

  return {
    modal,
    openModal,
    closeModal,
  };
}
