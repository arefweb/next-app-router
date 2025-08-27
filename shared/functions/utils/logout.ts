import http from "@/shared/services/http";
import {redirectToLogin} from "@/shared/functions/utils/index";

function logout() {
  http.post('/auth/logout').then((resp) => {
    if (resp.ok) {
      localStorage.removeItem('userId');
      redirectToLogin()
    }
  })
}

export default logout;