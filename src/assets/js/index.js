
// 底部菜单展开按钮以及菜单显示隐藏
var current = 45
function openMenu(type) {
    if (current === 45) {
      current = 225;
      this.$("."+type+"-info").css("display", "block");
    } else {
      current = 45;
      this.$("."+type+"-info").css("display", "none");
    }
    this.$("."+type).css("transform","rotate("+current+"deg)");
}

