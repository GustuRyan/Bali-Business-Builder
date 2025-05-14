import { ResponseErrorObject } from "@/types";
export const useStateRequestHelper = () => {
  const message = ref<string>("");
  const alertType = ref<"error" | "success">("success");
  const loading = ref<boolean>(false);

  /**
   * composable error object to tranform errrors from response LARAVEL
   * - the composble just for vee validate at the moment
   * @example ctx.setErrors(transformErrors(error.value?.data))
   */
  function transformErrors(errorObject: ResponseErrorObject) {
    const transformedObject = ref<{ [key: string]: string | string[] }>({});
    for (let key in errorObject.errors) {
      transformedObject.value[key] = errorObject.errors[key][0];
    }
    return transformedObject.value;
  }

  function setSuccessMessage(successMessage: string) {
    message.value = successMessage;
    alertType.value = "success";
  }

  function setErrorMessage(errorMessage: string) {
    message.value = errorMessage;
    alertType.value = "error";
  }

  return {
    message,
    alertType,
    loading,
    transformErrors,
    setSuccessMessage,
    setErrorMessage,
  };
};
