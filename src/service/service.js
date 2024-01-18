import Swal from 'sweetalert2';

const Alert =  async (icon, title, text, confirmButtonText, showCancelButton = false, cancelButtonText = '', showCloseButton = true, backdrop = true) => {
    return await Swal.fire({
      icon,
      title,  
      html: text,
      confirmButtonText,
      cancelButtonText,
      showCancelButton,
      showCloseButton: showCloseButton,
      backdrop: backdrop,
      background: '.swal2-container.swal2-backdrop-show'
    }).then();
}

const validarText = (valor) => {
    if (valor === undefined || valor == null || valor === '' || valor === 'null' || valor <= 0) {
      return false;
    } else {
      return true;
    }
}

const validarCorreo = (email) => {
    // tslint:disable-next-line: max-line-length
    const pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(pattern)) {
        return true;
    } else {
        return false;
    }
}
  
export {
    Alert,
    validarText,
    validarCorreo
}