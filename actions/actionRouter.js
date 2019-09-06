const express = require("express");
const actionDb = require("../data/helpers/actionModel.js");

const router = express.Router();

router.get("/", (req, res) => {
  actionDb
    .get()
    .then(action => res.status(200).json(action))
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: "The action information could not be retrieved." });
    });
});

module.exports = router;
