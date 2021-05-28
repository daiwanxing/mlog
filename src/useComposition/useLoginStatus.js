export function isLoginValid() {
  let login = false;
  const cookies = document.cookie.split(";");
  cookies.forEach((item) => {
    if (item) {
      let key = item.split("=");
      if (decodeURIComponent(key[0]) === "__remember_me" && key[1] === "true") {
        login = true;
        return;
      }
    }
  });
  return login;
}
