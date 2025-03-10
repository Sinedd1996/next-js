import { store } from "@/store/store";
import { removeError, setError } from "@/store/slices/errorMessageSlice";
import { TIME_HIDE_ERROR_TOAST } from "@/consts";

let timerId: NodeJS.Timeout | null = null;

function startTimerErrorToast() {
  if (timerId) {
    clearTimeout(timerId);
  }

  timerId = setTimeout(() => {
    store.dispatch(removeError());
  }, TIME_HIDE_ERROR_TOAST);
}

export const errorToastHandle = (message: string | null): void => {
  store.dispatch(setError({ error: message }));
  startTimerErrorToast();
};
