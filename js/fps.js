if (window.localStorage.getItem("fpson") == undefined || window.localStorage.getItem("fpson") == "1") {
    var rAF = function () {
        return (
            window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            }
        );
    }();
    var frame = 0;
    var allFrameCount = 0;
    var lastTime = Date.now();
    var lastFameTime = Date.now();
    var loop = function () {
        var now = Date.now();
        var fs = (now - lastFameTime);
        var fps = Math.round(1000 / fs);

        lastFameTime = now;
        // 不置 0，在动画的开头及结尾记录此值的差值算出 FPS
        allFrameCount++;
        frame++;

        if (now > 1000 + lastTime) {
            var fps = Math.round((frame * 1000) / (now - lastTime));
            if (fps <= 5) {
                var kd = `<span style="color:#bd0000">卡成ppt</span>`
            } else if (fps <= 15) {
                var kd = `<span style="color:red">电竞级帧率</span>`
            } else if (fps <= 25) {
                var kd = `<span style="color:orange">有点难受</span>`
            } else if (fps < 35) {
                var kd = `<span style="color:#9338e6">不太流畅</span>`
            } else if (fps <= 45) {
                var kd = `<span style="color:#08b7e4">还不错哦</span>`
            } else {
                var kd = `<span style="color:#39c5bb">十分流畅</span>`
            }
            document.getElementById("fps").innerHTML = `FPS:${fps} ${kd}`;
            frame = 0;
            lastTime = now;
        };

        rAF(loop);
    }

    loop();
} else {
    document.getElementById("fps").style = "display:none!important"
}


// 存数据
// name：命名 data：数据
function saveData(name, data) {
    localStorage.setItem(name, JSON.stringify({ 'time': Date.now(), 'data': data }))
}

// 取数据
// name：命名 time：过期时长,单位分钟,如传入30,即加载数据时如果超出30分钟返回0,否则返回数据
function loadData(name, time) {
    let d = JSON.parse(localStorage.getItem(name));
    // 过期或有错误返回 0 否则返回数据
    if (d) {
        let t = Date.now() - d.time
        if (t < (time * 60 * 1000) && t > -1) return d.data;
    }
    return 0;
}

// 上面两个函数如果你有其他需要存取数据的功能，也可以直接使用

// 读取背景
try {
    let data = loadData('blogbg', 1440)
    if (data) changeBg(data, 1)
    else localStorage.removeItem('blogbg');
} catch (error) { localStorage.removeItem('blogbg'); }

// 切换背景函数
// 此处的flag是为了每次读取时都重新存储一次,导致过期时间不稳定
// 如果flag为0则存储,即设置背景. 为1则不存储,即每次加载自动读取背景.
function changeBg(s, flag) {
    let bg = document.getElementById('web_bg')
    if (s.charAt(0) == '#') {
        bg.style.backgroundColor = s
        bg.style.backgroundImage = 'none'
    } else bg.style.backgroundImage = s
    if (!flag) { saveData('blogbg', s) }
}

// 以下为2.0新增内容

// 创建窗口
var winbox = ''

function createWinbox() {
    let div = document.createElement('div')
    document.body.appendChild(div)
    winbox = WinBox({
        id: 'changeBgBox',
        index: 999,
        title: "切换背景",
        x: "center",
        y: "center",
        minwidth: '300px',
        height: "60%",
        background: '#49b1f5',
        onmaximize: () => { div.innerHTML = `<style>body::-webkit-scrollbar {display: none;}div#changeBgBox {width: 100% !important;}</style>` },
        onrestore: () => { div.innerHTML = '' }
    });
    winResize();
    window.addEventListener('resize', winResize)

    // 每一类我放了一个演示，直接往下复制粘贴 a标签 就可以，需要注意的是 函数里面的链接 冒号前面需要添加反斜杠\进行转义
    winbox.body.innerHTML = `
    <div id="article-container" style="padding:10px;">
    <div class="content" style="display:flex">
    <div class="content-text" style="font-weight:bold; padding-left:10px"> 帧率监测 (刷新生效) </div><input type="checkbox" id="fpson" onclick="fpssw()">
    <div class="content-text" style="font-weight:bold; padding-left:20px"> 必应每日壁纸 </div><input type="checkbox" id="bingSet" onclick="setBing()">
    </div>
    <p><button onclick="localStorage.removeItem('blogbg');location.reload();" style="background:#5fcdff;display:block;width:100%;padding: 15px 0;border-radius:6px;color:white;"><i class="fa-solid fa-arrows-rotate"></i> 点我恢复默认背景</button></p>
    <h2 id="图片（电脑）"><a href="#图片（电脑）" class="headerlink" title="图片（电脑）"></a>图片（电脑）</h2>
    <div class="bgbox">
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://s1.vika.cn/space/2022/11/20/dfd7d6199462427c8227dbb870ddf6c7)" class="pimgbox" onclick="changeBg('url(https\://s1.vika.cn/space/2022/11/20/dfd7d6199462427c8227dbb870ddf6c7)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://pic3.zhimg.com/v2-58d652598269710fa67ec8d1c88d8f03_r.jpg?source=1940ef5c)" class="pimgbox" onclick="changeBg('url(https\://pic3.zhimg.com/v2-58d652598269710fa67ec8d1c88d8f03_r.jpg?source=1940ef5c)')"></a>
    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://cn.bing.com/th?id=OHR.GBRTurtle_ZH-CN6069093254_1920x1080.jpg)" class="imgbox" onclick="changeBg('url(https\://cn.bing.com/th?id=OHR.GBRTurtle_ZH-CN6069093254_1920x1080.jpg)')"></a>
    </div>
    
    
    
    <h2 id="渐变色"><a href="#渐变色" class="headerlink" title="渐变色"></a>渐变色</h2>
    <div class="bgbox">
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right, #eecda3, #ef629f)" onclick="changeBg('linear-gradient(to right, #eecda3, #ef629f)')"></a>
    </div>
    
    <h2 id="纯色"><a href="#纯色" class="headerlink" title="纯色"></a>纯色</h2>
    <div class="bgbox">
    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #7D9D9C" onclick="changeBg('#7D9D9C')"></a> 
    </div>
`;
}

// 适应窗口大小
function winResize() {
    var offsetWid = document.documentElement.clientWidth;
    if (offsetWid <= 768) {
        winbox.resize(offsetWid * 0.95 + "px", "90%").move("center", "center");
    } else {
        winbox.resize(offsetWid * 0.6 + "px", "70%").move("center", "center");
    }
}

// 切换状态，窗口已创建则控制窗口显示和隐藏，没窗口则创建窗口
function toggleWinbox() {
    if (document.querySelector('#changeBgBox')) winbox.toggleClass('hide');
    else createWinbox();
}



// 必应每日图片
if (localStorage.getItem("bing") == undefined) {
    localStorage.setItem("bing", "false");
  }
  if (localStorage.getItem("bing") == "true") {
    let bg = document.getElementById("web_bg");
    // 手机电脑分开
    let curUrl = screen.width <= 768 ? "url(https://bing.img.run/m.php)" : "url(https://bing.img.run/1920x1080.php)";
    bg.style.backgroundImage = curUrl;
  }
  function setBing() {
    // 打开就设置
    if (document.getElementById("bingSet").checked) {
      let bg = document.getElementById("web_bg");
      // 手机电脑分开
      let curUrl = screen.width <= 768 ? "url(https://bing.img.run/m.php)" : "url(https://bing.img.run/1920x1080.php)";
      bg.style.backgroundImage = curUrl;
      localStorage.setItem("bing", "true");
      localStorage.removeItem("blogbg");
    } else {
      // 关闭就移除并恢复默认壁纸
      localStorage.setItem("bing", "false");
      setTimeout(reload, 600);
    }
  }
  


// 透明度调节滑块
if (localStorage.getItem("transNum") == undefined) {
    localStorage.setItem("transNum", 95);
  }
  var curTransNum = localStorage.getItem("transNum");
  var curTransMini = curTransNum * 0.95;
  document.getElementById("transPercent").innerText = `:root{--trans-light: rgba(253, 253, 253, ${curTransNum}%) !important; --trans-dark: rgba(25, 25, 25, ${curTransNum}%) !important} `;
  function setTrans() {
    var elem = document.getElementById("transSet");
    var newTransNum = elem.value;
    var target = document.querySelector('.transValue');
    target.innerHTML = "透明度 (0%-100%): " + newTransNum + "%";
    localStorage.setItem("transNum", newTransNum);
    curTransMini = newTransNum * 0.95;
    curTransNum = newTransNum;  // 更新当前透明度
    document.querySelector('#rang_trans').style.width = curTransMini + "%";
    document.getElementById("transPercent").innerText = `:root{--trans-light: rgba(253, 253, 253, ${newTransNum}%) !important; --trans-dark: rgba(25, 25, 25, ${newTransNum}%) !important} `;
  };



// 帧率监测开关
if (localStorage.getItem("fpson") == undefined) {
    localStorage.setItem("fpson", "1");
  }
  function fpssw() {
    if (document.getElementById("fpson").checked) {
      localStorage.setItem("fpson", "1");
    } else {
      localStorage.setItem("fpson", "0");
    }
    setTimeout(reload, 600);
  }


  // 刷新窗口
function reload() {
    window.location.reload();
  }