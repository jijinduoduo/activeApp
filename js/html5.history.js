/**
 * History html5 version
 * @author yulipu
 * 
 *     用法
 *      var his = new History_Html5('key');  // 参数为键值
 *         his.add("标题", "连接 如 www.baidu.com", "其他内容")； 
 *         得到历史数据 返回的是json数据
 *         var data = his.getList();  // [{title:"标题", link:"www.baidu.com", other:"其他内容"}]
 *     删除记录
 *         his.clearHistory();
 */
function History_Html5(key) {
    this.local = window.localStorage;
    this.limit = 10;  // 最多10条记录
    this.key = key || 'y_his';  // 键值
    this.jsonData = null;  // 数据缓存
}
History_Html5.prototype = {
    constructor : History_Html5
    ,getLocalData : function(key) {
        var d = this.local.getItem(key);
        
        return null == d ? null : decodeURIComponent(d);
    }
    ,setLocalData : function(key, value) {
        this.local.setItem(key, encodeURIComponent(value));
    }
    ,delLocalData : function(key) {
        this.local.removeItem(key);
    }
    ,initRow : function(title, link, other) {
        return '{"title":"'+title+'", "link":"'+link+'", "other":"'+other+'"}';
    }
    ,parse2Json : function(jsonStr) {
        var json = [];
        try {
            json = JSON.parse(jsonStr);
        } catch(e) {
            //alert('parse error');return;
            json = eval(jsonStr);
        }
        
        return json;
    }
    
    // 用户接口
    ,add : function(title, link, other) {
        var jsonStr = this.getLocalData(this.key);

        // 有数据
        if(null != jsonStr && "" != jsonStr) {
            this.jsonData = this.parse2Json(jsonStr);
            
            // 排重
            for(var x=0; x<this.jsonData.length; x++) {
                if(link == this.jsonData[x]['link']) {
                    return false;
                }
            }
            // 重新赋值 组装 json 字符串
            jsonStr = '[' + this.initRow(title, link, other) + ',';
            for(var i=0; i<this.limit-1; i++) {
                if(undefined != this.jsonData[i]) {
                    jsonStr += this.initRow(this.jsonData[i]['title'], this.jsonData[i]['link'], this.jsonData[i]['other']) + ',';
                } else {
                    break;
                }
            }
            jsonStr = jsonStr.substring(0, jsonStr.lastIndexOf(','));
            jsonStr += ']';
        
        } else {
            // 没有数据
            jsonStr = '['+ this.initRow(title, link, other) +']';
        }
        
        this.jsonData = this.parse2Json(jsonStr);
        this.delLocalData(this.key);  // 一些浏览器有 bug 先删除再添加 
        this.setLocalData(this.key, jsonStr);
    }
    // 得到记录
    ,getList : function() {
        // 有缓存直接返回
        if(null != this.jsonData) {
            return this.jsonData;  // Array
        } 
        // 没有缓存从 localStorage 取
        var jsonStr = this.getLocalData(this.key);
        if(null != jsonStr && "" != jsonStr) {
            this.jsonData = this.parse2Json(jsonStr);
        }
        
        return this.jsonData;
    }
    // 清空历史
    ,clearHistory : function() {
        this.delLocalData(this.key);
        this.jsonData = null;
    }
};