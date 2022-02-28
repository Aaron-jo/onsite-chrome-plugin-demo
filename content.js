chrome.storage.sync.clear(() => {
  console.log(
    "%c 🌯 clear: ",
    "font-size:12px;background-color: #ED9EC7;color:#fff;",
    "clear"
  );
});

function parsingElement() {
  const priceList = [];

  function mutationObserverCallback(mutationsList, observer) {
    const dataset = mutationsList[0].target.dataset;
    const product = JSON.parse(dataset.pdpJson).products[0];
    const goodsInfo = {
      id: dataset.id,
      price: product.price,
      title: product.title,
      img: product.featured_image,
    };
    const goodsIndex = priceList.findIndex(
      (value) => value.id === goodsInfo.id
    );
    if (goodsIndex === -1) {
      priceList.push(goodsInfo);
    } else if (priceList[goodsIndex].price !== goodsInfo.price) {
      priceList[goodsIndex] = goodsInfo;
    }
    // TODO 触发频率较高, 排序比较耗费时间
    priceList.sort((a, b) => a.price - b.price);
    chrome.storage.sync.set({ priceList }, function () {});
  }

  // 创建一个观察器实例并传入回调函数
  const observer = new MutationObserver(mutationObserverCallback);

  // 配置开始观察目标节点
  const observeConfig = {
    attributes: true,
    characterData: true,
    attributeFilter: ["data-pdp-json"],
  };

  const saleList = document.getElementsByClassName("product-tile--placeholder");

  for (let index = 0; index < saleList.length; index++) {
    const element = saleList[index];

    observer.observe(element, observeConfig);

    if (element.dataset.pdpJson) {
      const payload = JSON.parse(element.dataset.pdpJson).products[0];
      const goodsInfo = {
        id: element.dataset.id,
        price: payload.price,
        title: payload.title,
        img: payload.featured_image,
      };
      priceList.push(goodsInfo);
    }
  }
  priceList.sort((a, b) => a.price - b.price);
  console.log(
    "%c 🍤 priceList: ",
    "font-size:12px;background-color: #FFDD4D;color:#fff;",
    priceList
  );

  chrome.storage.sync.set({ priceList }, function () {});
}
setTimeout(() => {
  parsingElement();
}, 3000);
