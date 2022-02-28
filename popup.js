function showData() {
  chrome.storage.sync.get(null, function (data) {
    const { priceList } = data;
    if (priceList.length == 0) return;
    const maxPriceInfo = priceList[priceList.length - 1];
    const minPriceInfo = priceList[0];
    maxPriceInfo.price = `$ ${maxPriceInfo.price / 100}`;
    minPriceInfo.price = `$ ${minPriceInfo.price / 100}`;

    document.querySelector(".total")["innerHTML"] = priceList.length;

    document.querySelector(".maxPrice")["innerHTML"] =
      maxPriceInfo.price || 100;
    document.querySelector(".minPrice")["innerHTML"] = minPriceInfo.price || 0;

    document.querySelector(".maxPriceGoodsImg")[
      "src"
    ] = `https://${maxPriceInfo.img}`;
    document.querySelector(".maxPriceGoodsTitle")["innerHTML"] =
      maxPriceInfo.title || 0;
    document.querySelector(".maxPriceGoods")["innerHTML"] =
      maxPriceInfo.price || 0;

    document.querySelector(".minPriceGoodsImg")[
      "src"
    ] = `https://${minPriceInfo.img}`;
    document.querySelector(".minPriceGoodsTitle")["innerHTML"] =
      minPriceInfo.title || 0;
    document.querySelector(".minPriceGoods")["innerHTML"] =
      minPriceInfo.price || 0;
  });
}

document.addEventListener("DOMContentLoaded", function () {
  showData();
});

chrome.storage.onChanged.addListener(function (changes, namespace) {
  showData();
});
