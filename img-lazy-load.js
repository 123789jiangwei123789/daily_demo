//图片懒加载
//步骤：需要占位符

let imgList = [...document.querySelectorAll("img")];
console.log(imgList, "imgList");
const imgLazyLoad = (function () {
  let count = 0;
  return function () {
    let deleteIndexList = [];
    imgList.forEach((img, index) => {
      let reg = img.getBoundingClientRect(); //获取距离视口的left right top bottom
      console.log(reg, "reg");
      if (reg.top < innerHeight) {
        console.log(img.dataset.src);
        img.src = img.dataset.src;
        deleteIndexList.push(index);
        count++;
        if (count == imgList.length) {
          document.removeEventListener("scroll", imgLazyLoad);
        }
      }
    });
    imgList = imgList.filter((item, index) => !deleteIndexList.includes(index));
  };
})();
document.addEventListener("scroll", imgLazyLoad);
imgLazyLoad();


const asyncLoadImage = (srcList) => {
  srcList.forEach(v => {
    const img = new Image()
    img.src = v;
    img.onload = function () {
      dom.src = v;
    }
  })
}