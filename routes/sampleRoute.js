const express = require("express");

const router = express.Router();

router.get("/test-error", (req, res, next) => {

    try {

        throw new Error("Database connection failed");

    } catch (error) {

        next(error);

    }

});

module.exports = router;