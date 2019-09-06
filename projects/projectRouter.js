const express = require("express");
const projectDb = require("../data/helpers/projectModel.js");

const router = express.Router();

router.post("/", (req, res) => {
  console.log(req.body);
  const { name, description, completed } = req.body;
  if (!name || !description) {
    res.status(400).json({
      errorMessage: "Please provide a name and description for the project."
    });
  }
  projectDb
    .insert({ name, description })
    .then(({ id }) => {
      projectDb
        .get(id)
        .then(project => {
          res.status(201).json(project);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: "There was an error while saving the project to the database"
          });
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "There was an error while saving the project to the database"
      });
    });
});

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

router.get("/:id", (req, res) => {
  const { id } = req.params;
  projectDb
    .get(id)
    .then(project => {
      console.log("project", project);
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).json({
          message: "The project with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

router.get("/:id/actions", (req, res) => {
  const { id } = req.params;
  projectDb
    .getProjectActions(id)
    .then(actions => {
      console.log("actions", actions);
      if (actions) {
        res.status(200).json(actions);
      } else {
        res.status(404).json({
          message:
            "The actions for the project with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: "The actions information could not be retrieved." });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  projectDb
    .remove(id)
    .then(deleted => {
      console.log(deleted);
      if (deleted) {
        res.status(200).end();
      } else {
        res.status(404).json({
          message: "The project with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "The project could not be removed" });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  if (!name && !description) {
    res.status(400).json({
      errorMessage: "Please provide name and description for the project."
    });
  }
  projectDb
    .update(id, { name, description })
    .then(updated => {
      if (updated) {
        projectDb
          .get(id)
          .then(project => res.status(200).json(project))
          .catch(err => {
            console.log(err);
            res.status(500).json({
              error: "The project information could not be modified."
            });
          });
      } else {
        res.status(404).json({
          message: "The project with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: "The project information could not be modified." });
    });
});

module.exports = router;
