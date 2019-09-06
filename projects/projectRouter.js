const express = require("express");
const projectDb = require("../data/helpers/projectModel.js");

const router = express.Router();

router.get("/", (req, res) => {
  projectDb
    .get()
    .then(project => res.status(200).json(project))
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: "The project information could not be retrieved." });
    });
});

module.exports = router;
