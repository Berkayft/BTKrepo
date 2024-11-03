const Layout = require("../utils/layout");
const ContentArea = require("../utils/contentArea");

const centeredTextLayout = new Layout("Centered Text", [
    new ContentArea("text", 0.3, 0.4, 0.4, 0.2, { fontSize: 32, align: "center", color: "red" }),
  ]);
  
const fiveLineLayout = new Layout("5 line", [
  new ContentArea("text", 0.1, 0.1, 0.8, 0.1, { fontSize: 40, isBold: true }),  // 1. Satır
  new ContentArea("text", 0.1, 0.22, 0.8, 0.1),                               // 2. Satır
  new ContentArea("text", 0.1, 0.34, 0.8, 0.1),                               // 3. Satır
  new ContentArea("text", 0.1, 0.46, 0.8, 0.1),                               // 4. Satır
  new ContentArea("text", 0.1, 0.58, 0.8, 0.1),                               // 5. Satır
],"list");

const fourLineLayout = new Layout("4 line", [
  new ContentArea("text", 0.1, 0.1, 0.8, 0.12, { fontSize: 44, isBold: true }), // 1. Satır
  new ContentArea("text", 0.1, 0.26, 0.8, 0.12),                                // 2. Satır
  new ContentArea("text", 0.1, 0.42, 0.8, 0.12),                                // 3. Satır
  new ContentArea("text", 0.1, 0.58, 0.8, 0.12),                                // 4. Satır
],"list");

const threeLineLayout = new Layout("3 line", [
  new ContentArea("text", 0.1, 0.15, 0.8, 0.15, { fontSize: 48, isBold: true }), // 1. Satır
  new ContentArea("text", 0.1, 0.35, 0.8, 0.15),                                 // 2. Satır
  new ContentArea("text", 0.1, 0.55, 0.8, 0.15),                                 // 3. Satır
],"list");

const twoLineLayout = new Layout("2 line", [
  new ContentArea("text", 0.1, 0.2, 0.8, 0.2, { fontSize: 52, isBold: true }),   // 1. Satır
  new ContentArea("text", 0.1, 0.5, 0.8, 0.2),                                   // 2. Satır
],"list");
const layoutlist = [centeredTextLayout,fiveLineLayout,fourLineLayout,threeLineLayout,twoLineLayout];

module.exports = layoutlist;

