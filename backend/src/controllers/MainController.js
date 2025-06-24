class MainController {
  constructor(parameters) {
    const express = require("express");
    this.app = express();
    const PORT = 3000;

    this.app.use(express.static("../../../frontend"));

    this.app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  }

  getApp(){
    return this.app
  }
}

export default MainController;

