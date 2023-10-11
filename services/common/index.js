// const Authenticator = (req, res) => {
//   const token = req.headers.authorization;
// };

// const Authorizator = (req, res) => { };
//
const Authenticator = (url) => ((req, res, next) => {
  console.log("Authenticating");
  next()
});

const Authorizator = (url) => ((req, res, next) => {
  console.log("Checking for Authorization");
  next()
});

export {
  Authenticator,
  Authorizator  
};
