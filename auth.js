function auth(req, res, next) {
  const authToken = req.headers["authorization"];
  if (authToken != undefined) {
    const token = authToken.split(" ")[1];

    jwt.verify(token, JWTSecret, (err, data) => {
      if (err) {
        res.status(401).json({ error: { msg: "Login não autorizado!" } });
      } else {
        req.token = token;
        req.loggedUser = data;
        next();
      }
    });
  } else {
    res.status(401).json({ error: { msg: "Login não autorizado!" } });
  }
}
