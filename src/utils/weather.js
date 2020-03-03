/**
 * 百分比加载 
 * const dl = new DrawLoad('canvas');   
 * canvas为canvas元素id
 * dl.setPer(1) // 设置百分比为1
 * dl.clearAnimation() //清除动画刷新
 * 元素示例 <canvas id="canvas" width="150" height="150"></canvas>
 */
class DrawLoad {
  constructor(canvas) {
    this.per = 0;
    this.canvas = document.getElementById(canvas); //获取canvas元素
    this.context = this.canvas.getContext('2d'); //获取画图环境，指明为2d
    this.centerX = this.canvas.width / 2; //Canvas中心点x轴坐标
    this.centerY = this.canvas.height / 2; //Canvas中心点y轴坐标
    this.rad = Math.PI * 2 / 100; //将360度分成100份，那么每一份就是this.rad度
    this.drawFrame();
  }
  /**
   * 设置百分比
   * @param 整数 0-100
   */
  setPer(per) {
    this.per = per;
  }
  // 清除动画刷新
  clearAnimation() {
    window.cancelAnimationFrame(this.raf_id);
  }

  //绘制当前百分比圈
  currentCircle() {
    this.context.save();
    this.context.strokeStyle = "#6596f2"; //设置描边样式
    this.context.lineWidth = 8; //设置线宽
    this.context.beginPath(); //路径开始
    this.context.arc(this.centerX, this.centerY, 50, -Math.PI / 2, -Math.PI / 2 + this.per * this.rad, false); //用于绘制圆弧this.context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
    this.context.stroke(); //绘制
    this.context.closePath(); //路径结束
    this.context.restore();
  }
  //绘制轨迹圈
  bgCircle() {
    this.context.save();
    this.context.beginPath();
    this.context.lineWidth = 8; //设置线宽
    this.context.strokeStyle = "#ddd";
    this.context.arc(this.centerX, this.centerY, 50, 0, Math.PI * 2, false);
    this.context.stroke();
    this.context.closePath();
    this.context.restore();
  }
  //百分比文字绘制
  text() {
    this.context.save(); //save和restore可以保证样式属性只运用于该段canvas元素
    this.context.fillStyle = "#6596f2"; //设置描边样式
    this.context.font = "20px Arial"; //设置字体大小和字体
    //绘制字体，并且指定位置
    this.context.fillText(this.per.toFixed(0) + "%", this.centerX - 16, this.centerY + 6);
    // this.context.stroke(); //执行绘制
    this.context.restore();
  }
  //动画循环
  drawFrame() {
    this.raf_id = window.requestAnimationFrame(this.drawFrame.bind(this));
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.bgCircle();
    this.text();
    this.currentCircle();
  };
}
export default DrawLoad
