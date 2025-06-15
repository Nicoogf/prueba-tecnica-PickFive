import { toast } from 'vue3-toastify'

export function notifySuccess(msg) {
  toast.success(msg)
}

export function notifyError(msg) {
  toast.error(msg)
}
