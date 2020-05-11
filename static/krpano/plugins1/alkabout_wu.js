function krpanoplugin() {
    var local = this;
    var krpano = null;
    var plugin = null;
    var device = null;

    var default_text = "先登录,在发表！";
    var input_text_left = "天空一声巨响,";
    var input_text_right = "闪亮登场!";
    var callout_default_text = "拖动到你需要标注的地方!";
    var max_default_text = "非常抱赚,长话短说";

    var content = null;
    var scene_name = null;
    var scene_ath = null;
    var scene_atv = null;
    var user_image = null;
    var user_name = null;

    var comment_project = null;
    var user_key = null;

    var switch_value = false;
    var img_url = "./service/getimage.php/?image=";

    local.registerplugin = function (krpanointerface, pluginpath, pluginobject) {

        krpano = krpanointerface;
        plugin = pluginobject;
        device = krpano.device;
        if (krpano.version < "1.19") {
            krpano.trace(3, "Radar Plugin - too old krpano version (min. 1.18)");
            krpano = null;
            plugin = null;
            return;
        }

        plugin.registerattribute("default_text", null, function (v) {
            Number(v) != "" ? default_text = v : default_text = default_text;
        }, function () {
            return default_text;
        });
        plugin.registerattribute("input_text_left", null, function (v) {
            Number(v) != "" ? input_text_left = v : input_text_left = input_text_left;
        }, function () {
            return input_text_left;
        });
        plugin.registerattribute("input_text_right", null, function (v) {
            Number(v) != "" ? input_text_right = v : input_text_right = input_text_right;
        }, function () {
            return input_text_right;
        });
        plugin.registerattribute("callout_default_text", null, function (v) {
            Number(v) != "" ? callout_default_text = v : callout_default_text = callout_default_text;
        }, function () {
            return callout_default_text;
        });
        plugin.registerattribute("max_default_text", null, function (v) {
            Number(v) != "" ? max_default_text = v : max_default_text = max_default_text;
        }, function () {
            return max_default_text;
        });
        plugin.registerattribute("comment_project", null, function (v) {
            comment_project = v;
        }, function () {
            return comment_project;
        });

        plugin.showtalkabout = showTalkabout;
        krpano.events.onloadcomplete = get_data;
    }

    local.unloadplugin = function () {
        plugin = null;
        krpano = null;
    }

    function checkLength(obj,maxlength){
        if(obj.value.length > maxlength){
            obj.value = obj.value.substring(0,maxlength);
        }
    }

    function uset_text() {
        content = this.value;
        krpano.set("layer[user_text].html", content);
        if(content.length <= 0){
            krpano.set("layer[user_text].html", callout_default_text);
        }
        
       if(content.length > 12 ){
            krpano.set("layer[user_text].html", max_default_text);
        }

        checkLength(this,13);
     
        if (device.mobile) {
            var Wap_commentbtn_publish = document.getElementById("Wap_commentbtn_publish");
            Wap_commentbtn_publish.style.backgroundColor = "#106cab";
            Wap_commentbtn_publish.addEventListener("click", add_mysql);
            Wap_commentbtn_publish.addEventListener("click", remove_dom);

        }
        if(!device.mobile ){
            var fdoComm = document.getElementById("fdoComm");
            fdoComm.style.backgroundColor = "#106cab";
            fdoComm.addEventListener("click", add_mysql);
            fdoComm.addEventListener("click", remove_dom);
        }
    }

    function add_mysql() {
        var add = randomString(6);
        window[add] = function (sqdata){
            switch(sqdata.state){
                    case 8000:
                        get_data(sqdata.addid);
                        break;
                    default:
                }
        }

        var url = encodeURI("./service/add_mysql.php?pr="+comment_project+"&con="+content+"&sne="+scene_name+"&ath="+scene_ath+"&atv="+scene_atv+"&img="+user_image+"&une="+user_name+"&add="+add+"&key="+user_key);
        var script = document.createElement('script');
        script.setAttribute('src', url);
        document.getElementsByTagName('head')[0].appendChild(script);
    }

    function showTalkabout() {
        var callback = randomString();
        window[callback] = function (userdata) {
            if (userdata.state == 0) {
            	user_image = userdata.headimgurl;
                user_name = userdata.nickname;
                show_dom(userdata.state);
                show_addkrpano();
            } else {
                show_dom(userdata.state);
            }
            if(switch_value){
                switch_comment();
            }
        }
        var url = "./service/request.php?&callback=" + callback;
        var script = document.createElement('script');
        script.setAttribute('src', url);
        document.getElementsByTagName('head')[0].appendChild(script);
    }

    function show_dom(sundata) {
        sundata == 4001 ? text_content = default_text : text_content = (input_text_left + user_name + input_text_right);
        if (device.mobile) {
            hide_skin();
            mobile_dom(text_content);
            var Wap_commentbtn_cancel = document.getElementById("Wap_commentbtn_cancel");
            Wap_commentbtn_cancel.onclick = remove_dom;
        }
        if (!device.mobile) {
            hide_skin();
            tabletop_dom(text_content);
            var qdoComm = document.getElementById("qdoComm");
            qdoComm.onclick = remove_dom;
        }

        if (sundata == 0 && device.mobile) {
            var Wap_usercomm = document.getElementById("Wap_usercomm");
            var Wap_commentbtn_publish = document.getElementById("Wap_commentbtn_publish");
            Wap_usercomm.removeAttribute("disabled");
            Wap_commentbtn_publish.style.backgroundColor = "#7896ab";
            Wap_commentbtn_publish.innerHTML = "发&nbsp表";
        }

        if (sundata == 0 && !device.mobile) {
            var usercomm = document.getElementById("usercomm");
            var fdoComm = document.getElementById("fdoComm");
            usercomm.removeAttribute("disabled");
            fdoComm.style.backgroundColor = "#7896ab";
            fdoComm.style.cursor = "hand";
            fdoComm.innerHTML = "发&nbsp;&nbsp;表";
        }

        if (sundata == 4001 && device.mobile) {
            var Wap_commentbtn_publish = document.getElementById("Wap_commentbtn_publish");
            Wap_commentbtn_publish.onclick = get_Verification;

        }

        if (sundata == 4001 && !device.mobile) {
            var fdoComm = document.getElementById("fdoComm");
            fdoComm.onclick = get_Verification;
        }
    }


    function up_view() {
        scene_name = krpano.get("scene[get(xml.scene)].name");
        scene_ath = krpano.get("hotspot[hotspot_line].ath");
        scene_atv = krpano.get("hotspot[hotspot_line].atv");
    }

    function remove_dom() {
        if (device.mobile) {
            var commentWapBox = document.getElementById("commentWapBox");
            commentWapBox.remove();
        }
        if (!device.mobile) {
            var commentBox = document.getElementById("commentBox");
            commentBox.remove();
        }

        show_skin();
        krpano.call("removehotspot(hotspot_line,true)");
        krpano.call("removelayer(user_text,true)");
    }


    function get_Verification() {
        if (isWeiXin()) {
            window.location.href = "./service/wx_api/wx_login.php";
        } else {
            window.location.href = "./service/qq_api/qq_login.php";
        }
    }

    function hide_skin() {
        krpano.call("set(layer[Say_skin].visible,'false');set(layer[Say_skin].alpha,0);");
    }

    function show_skin() {
        krpano.call("tween(layer[Say_skin].visible,1);tween(layer[Say_skin].alpha,1,2);");
    }

    function tabletop_dom(text_content) {

        var commentBox = document.createElement("div");
        commentBox.id = "commentBox";
        commentBox.setAttribute("style", "width:392px;height:152px;position:absolute;left:50%;margin-left:-196px;bottom:60px;z-index:9002;font-size:14px;color:#fff;background-color:rgba(30,30,30,0.9);user-select: none; -webkit-user-select: none;pointer-events: none;display:block;");

        var xonmment = document.createElement("div");
        xonmment.id = "xonmment";
        xonmment.setAttribute("style", "padding:0 16px;");

        var h4 = document.createElement("h4");
        h4.innerHTML = "说一说";
        h4.setAttribute("style", "margin:0;padding:0 0 0 30px;height:40px;line-height:40px;background:url(plugins/b2u/comm-title-icon.png) no-repeat left center transparent;");

        var usercomm = document.createElement("textarea");
        usercomm.id = "usercomm";
        usercomm.disabled = "readonly";
        usercomm.placeholder = text_content;
        usercomm.setAttribute("style", "width:348px;padding:5px;height:50px;font-size:16px;resize: none;background-color:#fff;border:none;pointer-events:auto;");

        var commentbtn = document.createElement("div");
        commentbtn.id = "commentbtn";
        commentbtn.setAttribute("style", "height:24px;line-height:24px;padding:10px 0;");

        var qdoComm = document.createElement("span");
        qdoComm.id = "qdoComm";
        qdoComm.innerHTML = "取&nbsp;消";
        qdoComm.setAttribute("style", "display:inline-block;text-align:center;height:26px;line-height:28px;padding:0 12px;margin: 0 2px 0 10px;float:right;border:1px solid #106cab;cursor:pointer;pointer-events:auto;");
        commentbtn.appendChild(qdoComm);

        var fdoComm = document.createElement("span");
        fdoComm.id = "fdoComm";
        fdoComm.innerHTML = "QQ&nbsp;授&nbsp;权";
        fdoComm.setAttribute("style", "display:inline-block;text-align:center;height:28px;line-height:28px;background-color: rgb(0, 165, 220);padding:0 16px;float:right;cursor:pointer;pointer-events:auto;");
        commentbtn.appendChild(fdoComm);

        var hide = document.createElement("i");
        hide.id = "comm-hide-icon";
        hide.innerHTML = "隐藏";
        hide.setAttribute("style", "display:inline-block;height:24px;line-height:24px;font-style:normal;cursor:pointer;padding:0 0 0 30px;margin: 0 20px 0 0;background:url(plugins/b2u/comm-hide-icon.png) no-repeat 8px center transparent;pointer-events:auto;");
        commentbtn.appendChild(hide);

        var body = document.body;
        body.appendChild(commentBox);
        commentBox.appendChild(xonmment);
        xonmment.appendChild(h4);
        xonmment.appendChild(usercomm);
        xonmment.appendChild(commentbtn);
        usercomm.addEventListener("keyup", uset_text);
        hide.addEventListener("click", switch_comment);
        hide.addEventListener("click", remove_dom);
    }

    function mobile_dom(text_content) {

        var commentWapBox = document.createElement("div");
        commentWapBox.id = "commentWapBox";
        commentWapBox.setAttribute("style", "width: 100%;height: 80px;background-color: #ffffff;padding: 8px 5px 0;box-sizing: border-box; -webkit-box-sizing: border-box;position:absolute;font-family: 'Arial,PingFangSC-Regular,Hiragino Sans GB,STHeiti,WenQuanYi Micro Hei,SimSun,sans-serif';bottom:0px;z-index:9999;");

        var Wap_usercomm = document.createElement("textarea");
        Wap_usercomm.id = "Wap_usercomm";
        Wap_usercomm.disabled = "readonly";
        Wap_usercomm.setAttribute("style", "width: 100%;height: 30px;padding: 6px;color: #333;line-height: 16px;font-size: 16px;outline: none;text-align:left;overflow:hidden;border-radius:5px;resize: none;box-sizing: border-box; -webkit-box-sizing: border-box;background-color:#fff;border:1px solid #106cab;");
        Wap_usercomm.placeholder = text_content;

        var Wap_commcommentbtn = document.createElement("div");
        Wap_commcommentbtn.id = "Wap_commcommentbtn";
        Wap_commcommentbtn.setAttribute("style", "height: 30px;padding: 3px 0 5px;");

        var Wap_commentbtn_cancel = document.createElement("span");
        Wap_commentbtn_cancel.id = "Wap_commentbtn_cancel";
        Wap_commentbtn_cancel.innerHTML = "取&nbsp;消";
        Wap_commentbtn_cancel.setAttribute("style", "height: 26px;line-height: 28px;width: 54px;text-align: center;font-size: 16px;border:1px solid #106cab;color: #106cab;float: right;margin-left: 13px;");

        var Wap_commentbtn_publish = document.createElement("span");
        Wap_commentbtn_publish.id = "Wap_commentbtn_publish";
        Wap_commentbtn_publish.innerHTML = "授&nbsp;权";
        Wap_commentbtn_publish.setAttribute("style", "height: 28px;line-height: 28px;width: 58px;text-align: center;font-size: 16px;background-color: #106cab;color: #fff;float: right;margin-left: 12px;");

        var Wap_hide_i = document.createElement("i");
        Wap_hide_i.id = "Wap_hide_i";
        Wap_hide_i.innerHTML = "隐藏";
        Wap_hide_i.setAttribute("style", "font-style:normal;height: 28px;line-height:28px;color: #000;display:inline-block;padding:0 0 0 30px;background:url(plugins/b2u/mobile-hide-icon.png) no-repeat 5px center transparent;background-size:19px 19px;");

        var body = document.body;
        body.appendChild(commentWapBox);
        commentWapBox.appendChild(Wap_usercomm);
        commentWapBox.appendChild(Wap_commcommentbtn);
        Wap_commcommentbtn.appendChild(Wap_commentbtn_cancel);
        Wap_commcommentbtn.appendChild(Wap_commentbtn_publish);
        Wap_commcommentbtn.appendChild(Wap_hide_i);
        // Wap_commcommentbtn.appendChild(Wap_change_i);
        Wap_usercomm.addEventListener("keyup", uset_text);
        Wap_usercomm.addEventListener("input", uset_text);
        Wap_hide_i.addEventListener("click", switch_comment);
        Wap_hide_i.addEventListener("click", remove_dom);
        //Wap_change_i.addEventListener("click", change_data);
        commentWapBox.addEventListener('touchmove', function (e) {
            e.preventDefault();
        });
    }


    function show_addkrpano() {

        krpano.call("addhotspot(hotspot_line)");
        krpano.set("hotspot[hotspot_line].url", '%SWFPATH%/plugins/b2u/comm_line.png');
        krpano.set("hotspot[hotspot_line].ath", krpano.get("view.hlookat"));
        krpano.set("hotspot[hotspot_line].atv", krpano.get("view.vlookat"));
        krpano.set("hotspot[hotspot_line].zorder",600);
        krpano.set("hotspot[hotspot_line].align", "bottom");
        krpano.set("hotspot[hotspot_line].edge", "bottom");
        krpano.set("hotspot[hotspot_line].zoom", false);
        krpano.set("hotspot[hotspot_line].onloaded", up_view);
        krpano.set("hotspot[hotspot_line].ondown", "draghotspot()");
        krpano.set("hotspot[hotspot_line].ondown2", "draghotspot(user_text)");
        krpano.set("hotspot[hotspot_line].onup", up_view);


        krpano.call("addlayer(user_text)");
        krpano.set("layer[user_text].parent", "hotspot[hotspot_line]");
        krpano.set("layer[user_text].url", "textfield.swf");
        krpano.set("layer[user_text].align", "left");
        krpano.set("layer[user_text].edge", "left");
        krpano.set("layer[user_text].x", "-10");
        krpano.set("layer[user_text].y", "-20");
        krpano.set("layer[user_text].autowidth", true);
        krpano.set("layer[user_text].height", "34");
        krpano.set("layer[user_text].backgroundcolor", "0x95d46f");
        krpano.set("layer[user_text].alpha", "1");
        krpano.set("layer[user_text].roundedge", "30");
        if (device.mobile) {
            krpano.set("layer[user_text].css", "text-align:center;color:#ffffff;line-height:30px;font-size:14px;padding-left:32px;padding-right:8px;");
        } else {
            krpano.set("layer[user_text].css", "text-align:center;color:#ffffff;line-height:30px;font-size:18px;padding-left:34px;padding-right:6px;");
        }
        krpano.set("layer[user_text].html", callout_default_text);
        krpano.set("layer[user_text].ondown", "callwith(hotspot[hotspot_line],ondown2)");
        krpano.set("layer[user_text].onup", "callwith(hotspot[hotspot_line],onup)");


        krpano.call("addlayer(user_container)");
        krpano.set("layer[user_container].parent", "layer[user_text]");
        krpano.set("layer[user_container].type", "container");
        krpano.set("layer[user_container].capture", false);
        krpano.set("layer[user_container].align", "left");
        krpano.set("layer[user_container].edge", "left");
        krpano.set("layer[user_container].width", "32");
        krpano.set("layer[user_container].height", "32");
        krpano.set("layer[user_container].alpha", "1");
        krpano.set("layer[user_container].bgborder", "1 0x95d46f 1");
        krpano.set("layer[user_container].maskchildren", true);
        krpano.set("layer[user_container].bgroundedge", "30");

        krpano.call("addlayer(user_portrait)");
        krpano.set("layer[user_portrait].parent", "layer[user_container]");
        krpano.set("layer[user_portrait].width", "32");
        krpano.set("layer[user_portrait].height", "32");
        krpano.set("layer[user_portrait].align", "center");
        krpano.set("layer[user_portrait].url", img_url + user_image);
        krpano.set("layer[user_portrait].capture", false);
        add_dragging_action();
    }

    function get_data(addid) {
        var out = randomString(12);
        window[out] = function (dataobj) {
            var dataobjlen = dataobj.length;
            for (var i = 0; i < dataobjlen; i++) {
                if (dataobj[i].scene_name === krpano.get("scene[get(xml.scene)].name")) {
                    var hot_name = "hot_name_" + dataobj[i].id;
                    var lay_cont = "lay_cont_" + dataobj[i].id;
                    var laye_msk = "laye_msk_" + dataobj[i].id;
                    var laye_img = "laye_img_" + dataobj[i].id;

                    krpano.call("addhotspot(" + hot_name + ")");
                    krpano.set("hotspot[" + hot_name + "].url", '%SWFPATH%/plugins/b2u/comm_line.png');
                    krpano.set("hotspot[" + hot_name + "].alpha", 0);
                    krpano.set("hotspot[" + hot_name + "].ath", dataobj[i].ath);
                    krpano.set("hotspot[" + hot_name + "].atv", dataobj[i].atv);
                    krpano.set("hotspot[" + hot_name + "].handcursor", false);
                    krpano.set("hotspot[" + hot_name + "].enabled", false);
                    krpano.set("hotspot[" + hot_name + "].align", "bottom");
                    krpano.set("hotspot[" + hot_name + "].edge", "bottom");
                    krpano.set("hotspot[" + hot_name + "].zoom", true);

                    krpano.call("addlayer(" + lay_cont + ")");
                    krpano.set("layer[" + lay_cont + "].parent", "hotspot[" + hot_name + "]");
                    krpano.set("layer[" + lay_cont + "].url", "textfield.swf");
                    krpano.set("layer[" + lay_cont + "].alpha", 0);
                    krpano.set("layer[" + lay_cont + "].align", "left");
                    krpano.set("layer[" + lay_cont + "].edge", "left");
                    krpano.set("layer[" + lay_cont + "].x", "-10");
                    krpano.set("layer[" + lay_cont + "].y", "-20");
                    krpano.set("layer[" + lay_cont + "].handcursor", false);
                    krpano.set("layer[" + lay_cont + "].enabled", false);
                    krpano.set("layer[" + lay_cont + "].autowidth", true);
                    krpano.set("layer[" + lay_cont + "].height", "34");
                    krpano.set("layer[" + lay_cont + "].backgroundcolor", "0x000000");
                    krpano.set("layer[" + lay_cont + "].backgroundalpha", "0.4");
                    krpano.set("layer[" + lay_cont + "].roundedge", "30");
                    if (device.mobile) {
                        krpano.set("layer[" + lay_cont + "].css", "text-align:center;color:#ffffff;line-height:30px;font-size:14px;padding-left:32px;padding-right:8px;");
                    } else {
                        krpano.set("layer[" + lay_cont + "].css", "text-align:center;color:#ffffff;line-height:30px;font-size:18px;padding-left:34px;padding-right:6px;");
                    }
                    krpano.set("layer[" + lay_cont + "].html", dataobj[i].content);

                    krpano.call("addlayer(" + laye_msk + ")");
                    krpano.set("layer[" + laye_msk + "].parent", "layer[" + lay_cont + "]");
                    krpano.set("layer[" + laye_msk + "].type", "container");
                    krpano.set("layer[" + laye_msk + "].handcursor", false);
                    krpano.set("layer[" + laye_msk + "].enabled", false);
                    krpano.set("layer[" + laye_msk + "].align", "left");
                    krpano.set("layer[" + laye_msk + "].edge", "left");
                    krpano.set("layer[" + laye_msk + "].width", "32");
                    krpano.set("layer[" + laye_msk + "].height", "32");
                    krpano.set("layer[" + laye_msk + "].alpha", 0);
                    krpano.set("layer[" + laye_msk + "].bgborder", "1 0x000000 1");
                    krpano.set("layer[" + laye_msk + "].maskchildren", true);
                    krpano.set("layer[" + laye_msk + "].bgroundedge", "30");

                    krpano.call("addlayer(" + laye_img + ")");
                    krpano.set("layer[" + laye_img + "].parent", "layer[" + laye_msk + "]");
                    krpano.set("layer[" + laye_img + "].width", "32");
                    krpano.set("layer[" + laye_img + "].height", "32");
                    krpano.set("layer[" + laye_img + "].handcursor", false);
                    krpano.set("layer[" + laye_img + "].enabled", false);
                    krpano.set("layer[" + laye_img + "].align", "center");
                    krpano.set("layer[" + laye_img + "].url", img_url + dataobj[i].image);
                    krpano.call("ifnot(layer[" + laye_img + "].onloaded,tween(hotspot[" + hot_name + "].alpha,1,2);tween(layer[" + lay_cont + "].alpha,1,2););tween(layer[" + laye_msk + "].alpha,1,2););");
                }
            }
            if(switch_value){
                switch_comment(switch_value = false);
            }
        }

        if(addid != null){
            var url = "./service/add_mysql.php?upi="+ addid + "&out=" + out;
        }else{
            var url = "./service/add_mysql.php?sc=" + krpano.get("scene[get(xml.scene)].name") + "&out=" + out + "&pr=" + comment_project;
        }

        var script = document.createElement('script');
        script.setAttribute('src', url);
        document.getElementsByTagName('head')[0].appendChild(script);
    }

    //隐藏评论
    function switch_comment() {
		krpano.call("set(layer[Say_skin].crop,0|234|80|80);");
        var hotspotlen = krpano.get("hotspot.count");
        if (switch_value === false) {
            for (var i = 0; i < hotspotlen; i++) {
                var hotspotname = krpano.get("hotspot[" + i + "].name");
                if (hotspotname.substring(0, 9) === "hot_name_") {
                    krpano.call("set(hotspot[" + i + "].visible,false);set(layer[Say_skin].backgroundcolor,0x95d46f);");
                }
            }
            switch_value = true;
        } else {
			krpano.call("set(layer[Say_skin].crop,0|154|80|80);");
            for (var i = 0; i < hotspotlen; i++) {
                var hotspotname = krpano.get("hotspot[" + i + "].name");
                if (hotspotname.substring(0, 9) === "hot_name_") {
                    krpano.call("set(hotspot[" + i + "].visible,true);set(layer[Say_skin].backgroundcolor,0xff0510);");
                }
            }
            switch_value = false;
        }
    }

    function add_dragging_action() {
        krpano.set("action[draghotspot].content", "spheretoscreen(ath, atv, hotspotcenterx, hotspotcentery, 'l');sub(drag_adjustx, mouse.stagex, hotspotcenterx);sub(drag_adjusty, mouse.stagey, hotspotcentery);if(%1 != null,asyncloop(plugin[%1].pressed,sub(dx, mouse.stagex, drag_adjustx);sub(dy, mouse.stagey, drag_adjusty);screentosphere(dx, dy, ath, atv););,asyncloop(pressed,sub(dx, mouse.stagex, drag_adjustx);sub(dy, mouse.stagey, drag_adjusty);screentosphere(dx, dy, ath, atv);););");
    }

    function isWeiXin() {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        } else {

            return false;
        }
    }

    function randomString(len) {
        len = len || 10;
        var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
        var maxPos = $chars.length;
        var pwd = '';
        for (i = 0; i < len; i++) {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    }
}