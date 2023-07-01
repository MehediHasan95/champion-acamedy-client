import { enqueueSnackbar } from "notistack";

const SnackbarSuccess = (message) =>
  enqueueSnackbar(message, {
    variant: "success",
    autoHideDuration: 3000,
  });

const SnackbarError = (message) =>
  enqueueSnackbar(message, {
    variant: "error",
    autoHideDuration: 3000,
  });

export { SnackbarSuccess, SnackbarError };
