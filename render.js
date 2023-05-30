//字符串模板
function render(template, data) {
  let reg = /\{\{(\w+)\}\}/; //\匹配数字字符串_，
  if (reg.test(template)) {
    const name = reg.exec(template)[1]; //拿出{{}}里面的内容
    template = template.replace(reg, data[name]); //将当前模板字符串解析
    return render(template, data); //递归调用解析后面的模板字符串
  }
  return template;
}
let template = "我是{{name}},是一个{{type}}牛逼";
let person = {
  name: "奥特曼N",
  type: "银河系",
};
console.log(render(template, person));
