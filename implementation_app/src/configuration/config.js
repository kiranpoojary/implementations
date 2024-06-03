const configurations = {
  development: {
    SERVER_HOST: "http://localhost:3001", // "192.168.0.105:3001", //
    APP_HOST: "http://localhost:3000", //"192.168.0.102:3001",
  },
  production: {
    SERVER_HOST: "http://api.hutech.com",
    APP_HOST: "http://hutech.com",
  },
};

function getConfig() {
  let domain = document.domain;
  let env = "development";
  switch (domain) {
    case "localhost":
      env = "development";
      break;
    case "hutech":
      env = "production";
      break;
    default:
      env = "development";
  }
  return configurations?.[env] || null;
}

export default getConfig();
