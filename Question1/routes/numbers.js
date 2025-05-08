const express = require("express");
const router = express.Router();
const getNumbersData = require("../services/fetchingData");
const { cloneArray } = require("../utils/helperfile.js");

const WINDOW_SIZE = 10;
let numberWindow = [];

router.get("/:type", async (req, res) => {
  const { type } = req.params;
  const validTypes = ["p", "f", "e", "r"];
  if (!validTypes.includes(type)) {
    return res.status(400).json({ error: "Invalid number type" });
  }

  const { numbers, timeout } = await getNumbersData(type);
  const previousWindow = cloneArray(numberWindow);

  if (!timeout) {
    numbers.forEach(num => {
      if (!numberWindow.includes(num)) {
        numberWindow.push(num);
        if (numberWindow.length > WINDOW_SIZE) {
          numberWindow.shift();
        }
      }
    });
  }

  const average =
    numberWindow.length > 0?
         parseFloat(
          (numberWindow.reduce((sum, n) => sum + n, 0) / numberWindow.length).toFixed(2)
        )
      : 0;

  res.json({
    windowPrevState: previousWindow,
    windowCurrState: numberWindow,
    numbers,
    avg: average,
  });
});

module.exports = router;
