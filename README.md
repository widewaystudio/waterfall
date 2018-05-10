# waterfall
> 》原生js渲染页面 防抖处理优化性能 json读取数据 
### 设计规则：
#### 1.图片信息通过ajax,获取json数据，并对json数据进行进一步的处理
#### 2.图片展示为四列,通过原生的js获取图片的信息，获取图片的宽高，按找宽为228px,按比例缩小，并在图片没有加载时或进行一定占位处理。
#### 3.图片在加载的过程中，会由于网络原因不能正常加载，需要按图片的所占实际尺寸进行占位，因为图片的展示方式是，哪列图像的长度最小，下一张图片会出现在哪列图像的下面
#### 4.当浏览者滑动到一屏页面的底部，当超过一屏长度的最短列时，触发加载下一屏的图片信息，当所有图片信息加载完成，或没有图片信息可以展示时，会显示相应的信息提示
#### 5.在性能上，通过防抖的技术手段，进行性能优化。
### 页面效果如下
>### 效果1如图
![效果图](https://github.com/widewaystudio/waterfall/blob/master/src/images/1.jpg)
>### 效果图2
![效果图](https://github.com/widewaystudio/waterfall/blob/master/src/images/2.jpg)
>### 效果图3
![效果图](https://github.com/widewaystudio/waterfall/blob/master/src/images/3.jpg)
>### 效果图4
![效果4](https://github.com/widewaystudio/waterfall/blob/master/src/images/4.jpg)
