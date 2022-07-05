export const handlerSuspender = (promise) => {
  let status = "pending";
  let result;
  let suspender;

  suspender = promise
    .then((res) => {
      status = "success";
      result = res;
    })
    .catch((err) => {
      status = "error";
      result = err;
    });

  return {
    read() {
      if (status === "pending") {
        console.log(status);
        throw suspender;
      } else if (status === "error") {
        console.log(status);
        throw result;
      } else if (status === "success") {
        console.log(status);
        return result;
      }
    },
  };
};
