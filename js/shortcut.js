(function(w){
function fabu(){
				if (localStorage.getItem("uid")) { //查看本地储存
						mui.openWindow({
							id: 'fabu',
							url: 'ajax/fabu.html',
							styles: {
									scrollIndicator:'none',//窗口是否显示滚动条					
								},
							show: {
								autoShow: true, //页面loaded事件发生后自动显示，默认为true
								aniShow: 'slide-in-right' //,//页面显示动画，默认为”slide-in-right“；
									//   duration:animationTime//页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
							},
							waiting: {
								autoShow: false //自动显示等待框，默认为true			
							}
						});
			} else {
				     mui.toast('请先登录');
						mui.openWindow({
							url: 'ajax/denglu.html',
							id: 'denglu',
								styles: {
										//bounce: 'all',//窗口遇到边框是否有反弹效果
			//							hardwareAccelerated:localStorage.getItem("yjjs"),//开启硬件加速
										render: "onscreen",//窗口渲染模式"onscreen" 可见时渲染 "always" 在任何时候都渲染					
			//							decelerationRate:1, //(Number 类型 )窗口内容停止.滑动的减速度设置值越大,手指松开后的滑动速度越快（滑动距离越长），其值域范围为0.0-1.0，默认值为0.989。
										background:'transparent'// (String 类型 )窗口的背景颜色设置background为“transparent”，则表示窗口背景透明，						
									}
						});
			}
}
function about(){

						mui.openWindow({
							id: 'about',
							url: 'ajax/about.html',
							styles: {
									scrollIndicator:'none',//窗口是否显示滚动条					
								},
							show: {
								autoShow: true, //页面loaded事件发生后自动显示，默认为true
								aniShow: 'slide-in-right' //,//页面显示动画，默认为”slide-in-right“；
									//   duration:animationTime//页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
							},
							waiting: {
								autoShow: false //自动显示等待框，默认为true			
							}
						});
	
}
document.addEventListener('plusready',function(){
	checkArguments();
},false);

// 判断启动方式
function checkArguments(){
	console.log("Shortcut-plus.runtime.launcher: "+plus.runtime.launcher);
	if(plus.runtime.launcher=='shortcut'){
	try{
						//苹果3d touch
						var cmd = JSON.parse(plus.runtime.arguments);
						console.log("Shortcut-plus.runtime.arguments: "+plus.runtime.arguments)
						var type=cmd&&cmd.type;
						switch(type){
						    case 'fabu':
						        // 用户点击了‘fabu'菜单项
						     fabu();
						    break;
						    case 'about':
						    about();
						        // 用户点击了’about'菜单项
						    break;
						    default:
						    break;
						}
	}catch(e){
		console.log("Shortcut-exception: "+e);
	}
	}
}
// 打开页面
function openWebview(id,a,s){
	if(!_openw||_openw.id!=id){
		clicked(id,a,s);
	}
}

// 处理从后台恢复
document.addEventListener('newintent',function(){
	console.log("Shortcut-newintent");
	checkArguments();
},false);

})(window);