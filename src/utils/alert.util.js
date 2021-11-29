import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  showCloseButton: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

export const success = (message) => Toast.fire({
  icon: 'success',
  title: message,
});

export const error = (message) => Toast.fire({
  icon: 'error',
  title: message,
});

export const warning = (message) => Toast.fire({
  icon: 'warning',
  title: message,
});
