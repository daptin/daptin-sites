(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["app"],{0:function(e,i,t){e.exports=t("2f39")},1:function(e,i){},"2f39":function(e,i,t){"use strict";t.r(i);var a=t("967e"),d=t.n(a),o=(t("96cf"),t("fa84")),r=t.n(o),n=(t("7d6e"),t("e54f"),t("62f2"),t("7e6d"),t("a026")),l=t("b178");n["a"].use(l["b"],{config:{}});var _=function(){var e=this,i=e.$createElement,t=e._self._c||i;return t("div",{attrs:{id:"q-app"}},[t("router-view")],1)},s=[],c=(t("7f7f"),t("b2cb")),u=t.n(c),p=t("2f62");function m(){console.log("afsef test")}var f={computed:u()({},Object(p["c"])(["appLayout"]),{},Object(p["d"])(["path","models"])),name:"App",mounted:function(){this.refreshModels();for(var e=0;e<this.appLayout.templates.length;e++){var i=this.appLayout.templates[e];i.style||(i.style=""),function(e){n["a"].component(e.name,function(i,t){i({template:e.template,props:["localData","layout"],data:function(){return{styleTag:null}},methods:u()({itemSingleClick:function(e,i){}},Object(p["b"])(["fireEvent"])),beforeDestroy:function(){console.log("destroying template",e),this.styleTag&&this.styleTag.remove()},mounted:function(){if(console.log("mounted view: ",e,this.appLayout),m(),e.style){var i=e.style,t=document.head||document.getElementsByTagName("head")[0],a=document.createElement("style");t.appendChild(a),a.type="text/css",a.styleSheet?a.styleSheet.cssText=i:a.appendChild(document.createTextNode(i)),this.styleTag=a}}})})}(i)}this.saveConfig()},methods:u()({},Object(p["b"])(["saveConfig","setPath","refreshModels"])),watch:{path:function(e){null!=e&&(console.log("set path",e),this.setPath(null),this.$router.push(e))}}},h=f,g=t("2877"),b=Object(g["a"])(h,_,s,!1,null,null,null),v=b.exports,y=(t("7514"),t("551c"),t("06db"),t("6854")),w=!!Object({NODE_ENV:"production",CLIENT:!0,SERVER:!1,DEV:!1,PROD:!0,MODE:"spa",VUE_ROUTER_MODE:"history",VUE_ROUTER_BASE:"/",APP_URL:"undefined"}).DEBUG_API,k=new y["DaptinClient"]("https://daptin-ca-instance.dapt.xyz",w);k.worldManager.loadModels().then(function(){k.jsonApi.findAll("user_account").then(function(e){console.log("all todos",e.data)})});var x=k,T=t("3b70"),A=t("9dbb"),L=t.n(A),q={setLayout:function(e,i){var t=e.commit,a=e.state;console.log("set layout called",i),t("SET_LAYOUT",a.appLayout.layoutConfiguration[i])},setPath:function(e,i){var t=e.commit;e.state;t("SET_PATH",i)},createTemplate:function(e,i){var t=e.commit;e.state;t("NEW_TEMPLATE",i)},refreshModels:function(e){var i=e.commit;e.state;return new Promise(function(e,t){x.worldManager.loadModels().then(function(){var t=x.worldManager.getWorlds().map(function(e){return e.schema=JSON.parse(e.world_schema_json),e});console.log("world models",t),i("SET_WORLD_MODELS",t),e(t)}).catch(t)})},loginUser:function(e,i){var t=e.commit;e.state;return new Promise(function(e,a){x.actionManager.doAction("user_account","signin",{email:i.email,password:i.password}).then(function(i){console.log("sign in success"),t("SET_USER",i[0].Attributes.value),e(i)}).catch(function(e){console.log("sign in failed"),a(e)})})},setTemplate:function(e,i){e.commit;for(var t=e.state,a=0;a<t.appLayout.templates.length;a++)t.appLayout.templates[a].name==i.name&&(t.appLayout.templates[a].template=i.template)},fireEvent:function(e,i){var t=e.commit,a=e.state;console.log("single item clicked",i);var d=a.currentLayout.actions[i.name],o=L.a.render(d.path,a.data[i.index]);console.log("next path",o),t("SET_PATH",o)},saveConfig:function(e){var i=e.commit;e.state;i("SAVE_CONFIG")},getData:function(e,i){e.commit,e.state;var t=i.layout;return i=i.params,new Promise(function(e,a){if(console.log("current layout on refresh data",t),"list"==t.type){i||(i={});var d=u()({},t.params,{},i);x.jsonApi.findAll(t.item,d).then(function(i){console.log("loaded data",i),e(i.data)}).catch(function(e){console.log("Failed to load data",e)})}else{if(!i)return void a("no id provided");var o=u()({},t.params);x.jsonApi.find(t.item,i,o).then(function(i){console.log("loaded data",i),e(i.data)}).catch(function(e){console.log("Failed to load data",e)})}})},addNewTab:function(e,i){e.commit;var t=e.state;console.log("add tab",i),t.appLayout.tabs.push(i)},refreshData:function(e,i){var t=e.commit,a=e.state;if(a.currentLayout)return a.currentLayout.params||(a.currentLayout.params={}),new Promise(function(e,d){if(console.log("current layout on refresh data",a.currentLayout),a.loaded)if("list"==a.currentLayout.type){i||(i={});var o=u()({},a.currentLayout.params,{},i);x.jsonApi.findAll(a.currentLayout.item,o).then(function(e){console.log("loaded data",e);var i=e.data;t("SET_DATA",i),"list"==a.currentLayout.type?t("SET_LOCAL_DATA",Object(T["DataTransform"])({data:i},a.currentLayout.transform).transform()):t("SET_LOCAL_DATA",Object(T["DataTransform"])({data:[i]},a.currentLayout.transform).transform()[0])}).catch(function(e){console.log("Failed to load data",e)})}else{if(!i)return void d("no id provided");var r=u()({},a.currentLayout.params);x.jsonApi.find(a.currentLayout.item,i,r).then(function(e){console.log("loaded data",e);var i=e.data;t("SET_DATA",i),"list"==a.currentLayout.type?t("SET_LOCAL_DATA",Object(T["DataTransform"])({data:i},a.currentLayout.transform).transform()):t("SET_LOCAL_DATA",Object(T["DataTransform"])({data:[i]},a.currentLayout.transform).transform()[0])}).catch(function(e){console.log("Failed to load data",e)})}else x.worldManager.loadModels().then(function(){if(t("SET_LOADED",!0),console.log("loaded all worlds"),"list"==a.currentLayout.type){i||(i={});var e=u()({},a.currentLayout.params,{},i);x.jsonApi.findAll(a.currentLayout.item,e).then(function(e){console.log("loaded data",e);var i=e.data;t("SET_DATA",i),"list"==a.currentLayout.type?t("SET_LOCAL_DATA",Object(T["DataTransform"])({data:i},a.currentLayout.transform).transform()):t("SET_LOCAL_DATA",Object(T["DataTransform"])({data:[i]},a.currentLayout.transform).transform()[0])}).catch(function(e){console.log("Failed to load data",e)})}else{if(!i)return void d("no id provided");var o=u()({},a.currentLayout.params);x.jsonApi.find(a.currentLayout.item,i,o).then(function(e){console.log("loaded data",e);var i=e.data;t("SET_DATA",i),"list"==a.currentLayout.type?t("SET_LOCAL_DATA",Object(T["DataTransform"])({data:i},a.currentLayout.transform).transform()):t("SET_LOCAL_DATA",Object(T["DataTransform"])({data:[i]},a.currentLayout.transform).transform()[0])}).catch(function(e){console.log("Failed to load data",e)})}}).catch(function(){console.log("failed to load worlds",arguments)})})}},D={SET_ACTIVE_TYPE:function(e,i){var t=i.type;e.activeType=t},NEW_TEMPLATE:function(e,i){e.appLayout.templates.push({name:i.name,template:"<div>New template <br>{{localData}}</div>",style:".class-name{\n font-size: 14px;\n}"})},SET_WORLD_MODELS:function(e,i){e.worldModels=i,console.log("path set")},SET_PATH:function(e,i){e.path=i,console.log("path set")},SAVE_CONFIG:function(e){localStorage.setItem("config",JSON.stringify(e))},SET_LAYOUT:function(e,i){console.log("set layout",i),e.currentLayout=i},SET_LOADED:function(e,i){e.loaded=i},SET_USER:function(e,i){e.user=i},SET_LOCAL_DATA:function(e,i){e.localData=i},SET_DATA:function(e,i){console.log("transformation ",JSON.stringify(e.currentLayout.transform)),e.data=i}},E=(t("c5f6"),{activeIds:function(e){var i=e.activeType,t=e.itemsPerPage,a=e.lists;if(!i)return[];var d=Number(e.route.params.page)||1,o=(d-1)*t,r=d*t;return a[i].slice(o,r)},activeItems:function(e,i){return i.activeIds.map(function(i){return e.items[i]}).filter(function(e){return e})},user:function(e){return e.user},appLayout:function(e){return e.appLayout},currentTab:function(e){return e.currentTab},data:function(e){return e.data},localData:function(e){return e.localData},layout:function(e){return e.currentLayout},path:function(e){return e.path},models:function(e){return e.worldModels?e.worldModels.filter(function(e){return!e.is_hidden&&!e.is_join_table}):[]},icons:function(e){var i=[{icons:[{id:"3d_rotation"},{id:"accessibility"},{id:"accessibility_new"},{id:"accessible"},{id:"accessible_forward"},{id:"account_balance"},{id:"account_balance_wallet"},{id:"account_box"},{id:"account_circle"},{id:"add_shopping_cart"},{id:"alarm"},{id:"alarm_add"},{id:"alarm_off"},{id:"alarm_on"},{id:"all_inbox"},{id:"all_out"},{id:"android"},{id:"announcement"},{id:"arrow_right_alt"},{id:"aspect_ratio"},{id:"assessment"},{id:"assignment"},{id:"assignment_ind"},{id:"assignment_late"},{id:"assignment_return"},{id:"assignment_returned"},{id:"assignment_turned_in"},{id:"autorenew"},{id:"backup"},{id:"book"},{id:"bookmark"},{id:"bookmark_border"},{id:"bookmarks"},{id:"bug_report"},{id:"build"},{id:"cached"},{id:"calendar_today"},{id:"calendar_view_day"},{id:"camera_enhance"},{id:"card_giftcard"},{id:"card_membership"},{id:"card_travel"},{id:"change_history"},{id:"check_circle"},{id:"check_circle_outline"},{id:"chrome_reader_mode"},{id:"class"},{id:"code"},{id:"commute"},{id:"compare_arrows"},{id:"contact_support"},{id:"copyright"},{id:"credit_card"},{id:"dashboard"},{id:"date_range"},{id:"delete"},{id:"delete_forever"},{id:"delete_outline"},{id:"description"},{id:"dns"},{id:"done"},{id:"done_all"},{id:"done_outline"},{id:"donut_large"},{id:"donut_small"},{id:"drag_indicator"},{id:"eject"},{id:"euro_symbol"},{id:"event"},{id:"event_seat"},{id:"exit_to_app"},{id:"explore"},{id:"explore_off"},{id:"extension"},{id:"face"},{id:"favorite"},{id:"favorite_border"},{id:"feedback"},{id:"find_in_page"},{id:"find_replace"},{id:"fingerprint"},{id:"flight_land"},{id:"flight_takeoff"},{id:"flip_to_back"},{id:"flip_to_front"},{id:"g_translate"},{id:"gavel"},{id:"get_app"},{id:"gif"},{id:"grade"},{id:"group_work"},{id:"help"},{id:"help_outline"},{id:"highlight_off"},{id:"history"},{id:"home"},{id:"horizontal_split"},{id:"hourglass_empty"},{id:"hourglass_full"},{id:"http"},{id:"https"},{id:"important_devices"},{id:"info"},{id:"input"},{id:"invert_colors"},{id:"label"},{id:"label_important"},{id:"label_off"},{id:"language"},{id:"launch"},{id:"line_style"},{id:"line_weight"},{id:"list"},{id:"lock"},{id:"lock_open"},{id:"loyalty"},{id:"markunread_mailbox"},{id:"maximize"},{id:"minimize"},{id:"motorcycle"},{id:"note_add"},{id:"offline_bolt"},{id:"offline_pin"},{id:"opacity"},{id:"open_in_browser"},{id:"open_in_new"},{id:"open_with"},{id:"pageview"},{id:"pan_tool"},{id:"payment"},{id:"perm_camera_mic"},{id:"perm_contact_calendar"},{id:"perm_data_setting"},{id:"perm_device_information"},{id:"perm_identity"},{id:"perm_media"},{id:"perm_phone_msg"},{id:"perm_scan_wifi"},{id:"pets"},{id:"picture_in_picture"},{id:"picture_in_picture_alt"},{id:"play_for_work"},{id:"polymer"},{id:"power_settings_new"},{id:"pregnant_woman"},{id:"print"},{id:"query_builder"},{id:"question_answer"},{id:"receipt"},{id:"record_voice_over"},{id:"redeem"},{id:"remove_shopping_cart"},{id:"reorder"},{id:"report_problem"},{id:"restore"},{id:"restore_from_trash"},{id:"restore_page"},{id:"room"},{id:"rounded_corner"},{id:"rowing"},{id:"schedule"},{id:"search"},{imageUrls:{twotone:"twotone-settings-24px.svg",sharp:"sharp-settings-24px.svg",outline:"outline-settings-24px.svg",round:"round-settings-24px.svg",baseline:"baseline-settings-20px.svg"},id:"settings"},{id:"settings_applications"},{id:"settings_backup_restore"},{id:"settings_bluetooth"},{id:"settings_brightness"},{id:"settings_cell"},{id:"settings_ethernet"},{id:"settings_input_antenna"},{id:"settings_input_component"},{id:"settings_input_composite"},{id:"settings_input_hdmi"},{id:"settings_input_svideo"},{id:"settings_overscan"},{id:"settings_phone"},{id:"settings_power"},{id:"settings_remote"},{id:"settings_voice"},{id:"shop"},{id:"shop_two"},{id:"shopping_basket"},{id:"shopping_cart"},{id:"speaker_notes"},{id:"speaker_notes_off"},{id:"spellcheck"},{imageUrls:{twotone:"twotone-star_rate-18px.svg",sharp:"sharp-star_rate-18px.svg",outline:"outline-star_rate-18px.svg",round:"round-star_rate-18px.svg",baseline:"baseline-star_rate-18px.svg"},id:"star_rate"},{id:"stars"},{id:"store"},{id:"subject"},{id:"supervised_user_circle"},{id:"supervisor_account"},{id:"swap_horiz"},{id:"swap_horizontal_circle"},{id:"swap_vert"},{id:"swap_vertical_circle"},{id:"tab"},{id:"tab_unselected"},{id:"text_rotate_up"},{id:"text_rotate_vertical"},{id:"text_rotation_down"},{id:"text_rotation_none"},{id:"theaters"},{id:"thumb_down"},{id:"thumb_up"},{id:"thumbs_up_down"},{id:"timeline"},{id:"toc"},{id:"today"},{id:"toll"},{id:"touch_app"},{id:"track_changes"},{id:"translate"},{id:"trending_down"},{id:"trending_flat"},{id:"trending_up"},{id:"turned_in"},{id:"turned_in_not"},{id:"update"},{id:"verified_user"},{id:"vertical_split"},{id:"view_agenda"},{id:"view_array"},{id:"view_carousel"},{id:"view_column"},{id:"view_day"},{id:"view_headline"},{id:"view_list"},{id:"view_module"},{id:"view_quilt"},{id:"view_stream"},{id:"view_week"},{id:"visibility"},{id:"visibility_off"},{id:"voice_over_off"},{id:"watch_later"},{id:"work"},{id:"work_off"},{id:"work_outline"},{id:"youtube_searched_for"},{id:"zoom_in"},{id:"zoom_out"}],name:"action"},{icons:[{id:"add_alert"},{id:"error"},{id:"error_outline"},{id:"notification_important"},{id:"warning"}],name:"alert"},{icons:[{id:"4k"},{id:"add_to_queue"},{id:"airplay"},{id:"album"},{id:"art_track"},{id:"av_timer"},{id:"branding_watermark"},{id:"call_to_action"},{id:"closed_caption"},{id:"control_camera"},{id:"equalizer"},{id:"explicit"},{id:"fast_forward"},{id:"fast_rewind"},{id:"featured_play_list"},{id:"featured_video"},{id:"fiber_dvr"},{id:"fiber_manual_record"},{id:"fiber_new"},{id:"fiber_pin"},{id:"fiber_smart_record"},{id:"forward_10"},{id:"forward_30"},{id:"forward_5"},{id:"games"},{id:"hd"},{id:"hearing"},{id:"high_quality"},{id:"library_add"},{id:"library_books"},{id:"library_music"},{id:"loop"},{id:"mic"},{id:"mic_none"},{id:"mic_off"},{id:"missed_video_call"},{id:"movie"},{id:"music_video"},{id:"new_releases"},{id:"not_interested"},{id:"note"},{id:"pause"},{id:"pause_circle_filled"},{id:"pause_circle_outline"},{id:"play_arrow"},{id:"play_circle_filled"},{imageUrls:{twotone:"twotone-play_circle_filled_white-24px.svg",sharp:"sharp-play_circle_filled_white-24px.svg",outline:"outline-play_circle_filled_white-24px.svg",round:"round-play_circle_filled_white-24px.svg",baseline:"baseline-play_circle_filled_white-48px.svg"},id:"play_circle_filled_white"},{id:"play_circle_outline"},{id:"playlist_add"},{id:"playlist_add_check"},{id:"playlist_play"},{id:"queue"},{id:"queue_music"},{id:"queue_play_next"},{id:"radio"},{id:"recent_actors"},{id:"remove_from_queue"},{id:"repeat"},{id:"repeat_one"},{id:"replay"},{id:"replay_10"},{id:"replay_30"},{id:"replay_5"},{id:"shuffle"},{id:"skip_next"},{id:"skip_previous"},{id:"slow_motion_video"},{id:"snooze"},{id:"sort_by_alpha"},{id:"stop"},{id:"subscriptions"},{id:"subtitles"},{id:"surround_sound"},{id:"video_call"},{id:"video_label"},{id:"video_library"},{id:"videocam"},{id:"videocam_off"},{id:"volume_down"},{id:"volume_mute"},{id:"volume_off"},{id:"volume_up"},{id:"web"},{id:"web_asset"}],name:"av"},{icons:[{id:"alternate_email"},{id:"business"},{id:"call"},{id:"call_end"},{id:"call_made"},{id:"call_merge"},{id:"call_missed"},{id:"call_missed_outgoing"},{id:"call_received"},{id:"call_split"},{id:"cancel_presentation"},{id:"cell_wifi"},{id:"chat"},{id:"chat_bubble"},{id:"chat_bubble_outline"},{id:"clear_all"},{id:"comment"},{id:"contact_mail"},{id:"contact_phone"},{id:"contacts"},{id:"desktop_access_disabled"},{id:"dialer_sip"},{id:"dialpad"},{id:"domain_disabled"},{id:"duo"},{id:"email"},{id:"forum"},{id:"import_contacts"},{id:"import_export"},{id:"invert_colors_off"},{id:"list_alt"},{id:"live_help"},{id:"location_off"},{id:"location_on"},{id:"mail_outline"},{id:"message"},{id:"mobile_screen_share"},{id:"no_sim"},{id:"pause_presentation"},{id:"person_add_disabled"},{id:"phone"},{id:"phonelink_erase"},{id:"phonelink_lock"},{id:"phonelink_ring"},{id:"phonelink_setup"},{id:"portable_wifi_off"},{id:"present_to_all"},{id:"print_disabled"},{id:"ring_volume"},{id:"rss_feed"},{id:"screen_share"},{id:"sentiment_satisfied_alt"},{id:"speaker_phone"},{id:"stay_current_landscape"},{id:"stay_current_portrait"},{id:"stay_primary_landscape"},{id:"stay_primary_portrait"},{id:"stop_screen_share"},{id:"swap_calls"},{id:"textsms"},{id:"unsubscribe"},{id:"voicemail"},{id:"vpn_key"}],name:"communication"},{icons:[{id:"add"},{id:"add_box"},{id:"add_circle"},{id:"add_circle_outline"},{id:"archive"},{id:"backspace"},{id:"ballot"},{id:"block"},{id:"clear"},{id:"create"},{id:"delete_sweep"},{id:"drafts"},{id:"file_copy"},{id:"filter_list"},{id:"flag"},{id:"font_download"},{id:"forward"},{id:"gesture"},{id:"how_to_reg"},{id:"how_to_vote"},{id:"inbox"},{id:"link"},{id:"link_off"},{id:"low_priority"},{id:"mail"},{id:"markunread"},{id:"move_to_inbox"},{id:"next_week"},{id:"outlined_flag"},{id:"redo"},{id:"remove"},{id:"remove_circle"},{id:"remove_circle_outline"},{id:"reply"},{id:"reply_all"},{id:"report"},{id:"report_off"},{id:"save"},{id:"save_alt"},{id:"select_all"},{id:"send"},{id:"sort"},{id:"text_format"},{id:"unarchive"},{id:"undo"},{id:"waves"},{imageUrls:{twotone:"twotone-weekend-24px.svg",sharp:"sharp-weekend-24px.svg",outline:"outline-weekend-24px.svg",round:"round-weekend-24px.svg",baseline:"baseline-weekend-48px.svg"},id:"weekend"},{id:"where_to_vote"}],name:"content"},{icons:[{id:"access_alarm"},{id:"access_alarms"},{id:"access_time"},{id:"add_alarm"},{id:"add_to_home_screen"},{id:"airplanemode_active"},{id:"airplanemode_inactive"},{id:"battery_20"},{id:"battery_30"},{id:"battery_50"},{id:"battery_60"},{id:"battery_80"},{id:"battery_90"},{id:"battery_alert"},{id:"battery_charging_20"},{id:"battery_charging_30"},{id:"battery_charging_50"},{id:"battery_charging_60"},{id:"battery_charging_80"},{id:"battery_charging_90"},{id:"battery_charging_full"},{id:"battery_full"},{id:"battery_std"},{id:"battery_unknown"},{id:"bluetooth"},{id:"bluetooth_connected"},{id:"bluetooth_disabled"},{id:"bluetooth_searching"},{id:"brightness_auto"},{id:"brightness_high"},{id:"brightness_low"},{id:"brightness_medium"},{id:"data_usage"},{id:"developer_mode"},{id:"devices"},{id:"dvr"},{id:"gps_fixed"},{id:"gps_not_fixed"},{id:"gps_off"},{id:"graphic_eq"},{id:"location_disabled"},{id:"location_searching"},{id:"mobile_friendly"},{id:"mobile_off"},{id:"network_cell"},{id:"network_wifi"},{id:"nfc"},{id:"screen_lock_landscape"},{id:"screen_lock_portrait"},{id:"screen_lock_rotation"},{id:"screen_rotation"},{id:"sd_storage"},{id:"settings_system_daydream"},{id:"signal_cellular_0_bar"},{id:"signal_cellular_1_bar"},{id:"signal_cellular_2_bar"},{id:"signal_cellular_3_bar"},{id:"signal_cellular_4_bar"},{id:"signal_cellular_alt"},{id:"signal_cellular_connected_no_internet_0_bar"},{id:"signal_cellular_connected_no_internet_1_bar"},{id:"signal_cellular_connected_no_internet_2_bar"},{id:"signal_cellular_connected_no_internet_3_bar"},{id:"signal_cellular_connected_no_internet_4_bar"},{id:"signal_cellular_no_sim"},{id:"signal_cellular_null"},{id:"signal_cellular_off"},{id:"signal_wifi_0_bar"},{id:"signal_wifi_1_bar"},{id:"signal_wifi_1_bar_lock"},{id:"signal_wifi_2_bar"},{id:"signal_wifi_2_bar_lock"},{id:"signal_wifi_3_bar"},{id:"signal_wifi_3_bar_lock"},{id:"signal_wifi_4_bar"},{id:"signal_wifi_4_bar_lock"},{id:"signal_wifi_off"},{id:"storage"},{id:"usb"},{id:"wallpaper"},{id:"widgets"},{id:"wifi_lock"},{id:"wifi_tethering"}],name:"device"},{icons:[{id:"add_comment"},{id:"attach_file"},{id:"attach_money"},{id:"bar_chart"},{id:"border_all"},{id:"border_bottom"},{id:"border_clear"},{id:"border_color"},{id:"border_horizontal"},{id:"border_inner"},{id:"border_left"},{id:"border_outer"},{id:"border_right"},{id:"border_style"},{id:"border_top"},{id:"border_vertical"},{id:"bubble_chart"},{id:"drag_handle"},{id:"format_align_center"},{id:"format_align_justify"},{id:"format_align_left"},{id:"format_align_right"},{id:"format_bold"},{id:"format_clear"},{id:"format_color_fill"},{id:"format_color_reset"},{id:"format_color_text"},{id:"format_indent_decrease"},{id:"format_indent_increase"},{id:"format_italic"},{id:"format_line_spacing"},{id:"format_list_bulleted"},{id:"format_list_numbered"},{id:"format_list_numbered_rtl"},{id:"format_paint"},{id:"format_quote"},{id:"format_shapes"},{id:"format_size"},{id:"format_strikethrough"},{id:"format_textdirection_l_to_r"},{id:"format_textdirection_r_to_l"},{id:"format_underlined"},{id:"functions"},{id:"highlight"},{id:"insert_chart"},{id:"insert_chart_outlined"},{id:"insert_comment"},{id:"insert_drive_file"},{id:"insert_emoticon"},{id:"insert_invitation"},{id:"insert_link"},{id:"insert_photo"},{id:"linear_scale"},{id:"merge_type"},{id:"mode_comment"},{id:"monetization_on"},{id:"money_off"},{id:"multiline_chart"},{id:"notes"},{id:"pie_chart"},{id:"publish"},{id:"scatter_plot"},{id:"score"},{id:"short_text"},{id:"show_chart"},{id:"space_bar"},{id:"strikethrough_s"},{id:"table_chart"},{id:"text_fields"},{id:"title"},{id:"vertical_align_bottom"},{id:"vertical_align_center"},{id:"vertical_align_top"},{id:"wrap_text"}],name:"editor"},{icons:[{id:"attachment"},{id:"cloud"},{id:"cloud_circle"},{id:"cloud_done"},{id:"cloud_download"},{id:"cloud_off"},{id:"cloud_queue"},{id:"cloud_upload"},{id:"create_new_folder"},{id:"folder"},{id:"folder_open"},{id:"folder_shared"}],name:"file"},{icons:[{id:"cast"},{id:"cast_connected"},{imageUrls:{twotone:"twotone-cast_for_education-24px.svg",sharp:"sharp-cast_for_education-24px.svg",outline:"outline-cast_for_education-24px.svg",round:"round-cast_for_education-24px.svg",baseline:"baseline-cast_for_education-48px.svg"},id:"cast_for_education"},{id:"computer"},{id:"desktop_mac"},{id:"desktop_windows"},{id:"developer_board"},{id:"device_hub"},{id:"device_unknown"},{id:"devices_other"},{id:"dock"},{id:"gamepad"},{id:"headset"},{id:"headset_mic"},{id:"keyboard"},{id:"keyboard_arrow_down"},{id:"keyboard_arrow_left"},{id:"keyboard_arrow_right"},{id:"keyboard_arrow_up"},{id:"keyboard_backspace"},{id:"keyboard_capslock"},{id:"keyboard_hide"},{id:"keyboard_return"},{id:"keyboard_tab"},{id:"keyboard_voice"},{id:"laptop"},{id:"laptop_chromebook"},{id:"laptop_mac"},{id:"laptop_windows"},{id:"memory"},{id:"mouse"},{id:"phone_android"},{id:"phone_iphone"},{id:"phonelink"},{id:"phonelink_off"},{id:"power_input"},{id:"router"},{id:"scanner"},{id:"security"},{id:"sim_card"},{id:"smartphone"},{id:"speaker"},{id:"speaker_group"},{id:"tablet"},{id:"tablet_android"},{id:"tablet_mac"},{id:"toys"},{id:"tv"},{id:"videogame_asset"},{id:"watch"}],name:"hardware"},{icons:[{id:"add_a_photo"},{id:"add_photo_alternate"},{id:"add_to_photos"},{id:"adjust"},{id:"assistant"},{id:"assistant_photo"},{id:"audiotrack"},{id:"blur_circular"},{id:"blur_linear"},{id:"blur_off"},{id:"blur_on"},{id:"brightness_1"},{id:"brightness_2"},{id:"brightness_3"},{id:"brightness_4"},{id:"brightness_5"},{id:"brightness_6"},{id:"brightness_7"},{id:"broken_image"},{id:"brush"},{id:"burst_mode"},{id:"camera"},{id:"camera_alt"},{id:"camera_front"},{id:"camera_rear"},{id:"camera_roll"},{id:"center_focus_strong"},{id:"center_focus_weak"},{id:"collections"},{id:"collections_bookmark"},{id:"color_lens"},{id:"colorize"},{id:"compare"},{id:"control_point"},{id:"control_point_duplicate"},{id:"crop"},{id:"crop_16_9"},{id:"crop_3_2"},{id:"crop_5_4"},{id:"crop_7_5"},{id:"crop_din"},{id:"crop_free"},{id:"crop_landscape"},{id:"crop_original"},{id:"crop_portrait"},{id:"crop_rotate"},{id:"crop_square"},{id:"dehaze"},{id:"details"},{id:"edit"},{id:"exposure"},{id:"exposure_neg_1"},{id:"exposure_neg_2"},{id:"exposure_plus_1"},{id:"exposure_plus_2"},{id:"exposure_zero"},{id:"filter"},{id:"filter_1"},{id:"filter_2"},{id:"filter_3"},{id:"filter_4"},{id:"filter_5"},{id:"filter_6"},{id:"filter_7"},{id:"filter_8"},{id:"filter_9"},{id:"filter_9_plus"},{id:"filter_b_and_w"},{id:"filter_center_focus"},{id:"filter_drama"},{id:"filter_frames"},{id:"filter_hdr"},{id:"filter_none"},{id:"filter_tilt_shift"},{id:"filter_vintage"},{id:"flare"},{id:"flash_auto"},{id:"flash_off"},{id:"flash_on"},{id:"flip"},{id:"gradient"},{id:"grain"},{id:"grid_off"},{id:"grid_on"},{id:"hdr_off"},{id:"hdr_on"},{id:"hdr_strong"},{id:"hdr_weak"},{id:"healing"},{id:"image"},{id:"image_aspect_ratio"},{id:"image_search"},{id:"iso"},{id:"landscape"},{id:"leak_add"},{id:"leak_remove"},{id:"lens"},{id:"linked_camera"},{id:"looks"},{id:"looks_3"},{id:"looks_4"},{id:"looks_5"},{id:"looks_6"},{id:"looks_one"},{id:"looks_two"},{id:"loupe"},{id:"monochrome_photos"},{id:"movie_creation"},{id:"movie_filter"},{id:"music_note"},{id:"music_off"},{id:"nature"},{id:"nature_people"},{id:"navigate_before"},{id:"navigate_next"},{id:"palette"},{id:"panorama"},{id:"panorama_fish_eye"},{id:"panorama_horizontal"},{id:"panorama_vertical"},{id:"panorama_wide_angle"},{id:"photo"},{id:"photo_album"},{id:"photo_camera"},{id:"photo_filter"},{id:"photo_library"},{id:"photo_size_select_actual"},{id:"photo_size_select_large"},{id:"photo_size_select_small"},{id:"picture_as_pdf"},{id:"portrait"},{id:"remove_red_eye"},{id:"rotate_90_degrees_ccw"},{id:"rotate_left"},{id:"rotate_right"},{id:"shutter_speed"},{id:"slideshow"},{id:"straighten"},{id:"style"},{id:"switch_camera"},{id:"switch_video"},{id:"tag_faces"},{id:"texture"},{id:"timelapse"},{id:"timer"},{id:"timer_10"},{id:"timer_3"},{id:"timer_off"},{id:"tonality"},{id:"transform"},{id:"tune"},{id:"view_comfy"},{id:"view_compact"},{id:"vignette"},{id:"wb_auto"},{id:"wb_cloudy"},{id:"wb_incandescent"},{id:"wb_iridescent"},{id:"wb_sunny"}],name:"image"},{icons:[{id:"360"},{id:"add_location"},{id:"atm"},{id:"beenhere"},{id:"category"},{id:"compass_calibration"},{id:"departure_board"},{id:"directions"},{id:"directions_bike"},{id:"directions_boat"},{id:"directions_bus"},{id:"directions_car"},{id:"directions_railway"},{id:"directions_run"},{id:"directions_subway"},{id:"directions_transit"},{id:"directions_walk"},{id:"edit_attributes"},{id:"edit_location"},{id:"ev_station"},{id:"fastfood"},{id:"flight"},{id:"hotel"},{id:"layers"},{id:"layers_clear"},{id:"local_activity"},{id:"local_airport"},{id:"local_atm"},{id:"local_bar"},{id:"local_cafe"},{id:"local_car_wash"},{id:"local_convenience_store"},{id:"local_dining"},{id:"local_drink"},{id:"local_florist"},{id:"local_gas_station"},{id:"local_grocery_store"},{id:"local_hospital"},{id:"local_hotel"},{id:"local_laundry_service"},{id:"local_library"},{id:"local_mall"},{id:"local_movies"},{id:"local_offer"},{id:"local_parking"},{id:"local_pharmacy"},{id:"local_phone"},{id:"local_pizza"},{id:"local_play"},{id:"local_post_office"},{id:"local_printshop"},{id:"local_see"},{id:"local_shipping"},{id:"local_taxi"},{id:"map"},{id:"money"},{id:"my_location"},{id:"navigation"},{id:"near_me"},{id:"not_listed_location"},{id:"person_pin"},{id:"person_pin_circle"},{id:"pin_drop"},{id:"place"},{id:"rate_review"},{id:"restaurant"},{id:"restaurant_menu"},{id:"satellite"},{id:"store_mall_directory"},{id:"streetview"},{id:"subway"},{id:"terrain"},{id:"traffic"},{id:"train"},{id:"tram"},{id:"transfer_within_a_station"},{id:"transit_enterexit"},{id:"trip_origin"},{id:"zoom_out_map"}],name:"maps"},{icons:[{id:"apps"},{id:"arrow_back"},{id:"arrow_back_ios"},{id:"arrow_downward"},{id:"arrow_drop_down"},{id:"arrow_drop_down_circle"},{id:"arrow_drop_up"},{id:"arrow_forward"},{id:"arrow_forward_ios"},{id:"arrow_left"},{id:"arrow_right"},{id:"arrow_upward"},{id:"cancel"},{id:"check"},{id:"chevron_left"},{id:"chevron_right"},{id:"close"},{id:"expand_less"},{id:"expand_more"},{id:"first_page"},{id:"fullscreen"},{id:"fullscreen_exit"},{id:"last_page"},{id:"menu"},{id:"more_horiz"},{id:"more_vert"},{id:"refresh"},{id:"subdirectory_arrow_left"},{id:"subdirectory_arrow_right"},{id:"unfold_less"},{id:"unfold_more"}],name:"navigation"},{icons:[{id:"adb"},{id:"airline_seat_flat"},{id:"airline_seat_flat_angled"},{id:"airline_seat_individual_suite"},{id:"airline_seat_legroom_extra"},{id:"airline_seat_legroom_normal"},{id:"airline_seat_legroom_reduced"},{id:"airline_seat_recline_extra"},{id:"airline_seat_recline_normal"},{id:"bluetooth_audio"},{id:"confirmation_number"},{id:"disc_full"},{id:"drive_eta"},{id:"enhanced_encryption"},{id:"event_available"},{id:"event_busy"},{id:"event_note"},{id:"folder_special"},{id:"live_tv"},{id:"mms"},{id:"more"},{id:"network_check"},{id:"network_locked"},{id:"no_encryption"},{id:"ondemand_video"},{id:"personal_video"},{id:"phone_bluetooth_speaker"},{id:"phone_callback"},{id:"phone_forwarded"},{id:"phone_in_talk"},{id:"phone_locked"},{id:"phone_missed"},{id:"phone_paused"},{id:"power"},{id:"power_off"},{id:"priority_high"},{id:"sd_card"},{id:"sms"},{id:"sms_failed"},{id:"sync"},{id:"sync_disabled"},{id:"sync_problem"},{id:"system_update"},{id:"tap_and_play"},{id:"time_to_leave"},{id:"tv_off"},{id:"vibration"},{id:"voice_chat"},{id:"vpn_lock"},{id:"wc"},{id:"wifi"},{id:"wifi_off"}],name:"notification"},{icons:[{id:"ac_unit"},{id:"airport_shuttle"},{id:"all_inclusive"},{id:"beach_access"},{id:"business_center"},{id:"casino"},{id:"child_care"},{id:"child_friendly"},{id:"fitness_center"},{id:"free_breakfast"},{id:"golf_course"},{id:"hot_tub"},{id:"kitchen"},{id:"meeting_room"},{id:"no_meeting_room"},{id:"pool"},{id:"room_service"},{id:"rv_hookup"},{id:"smoke_free"},{id:"smoking_rooms"},{id:"spa"}],name:"places"},{icons:[{id:"cake"},{imageUrls:{twotone:"twotone-domain-24px.svg",sharp:"sharp-domain-24px.svg",outline:"outline-domain-24px.svg",round:"round-domain-24px.svg",baseline:"baseline-domain-48px.svg"},id:"domain"},{id:"group"},{id:"group_add"},{id:"location_city"},{id:"mood"},{id:"mood_bad"},{id:"notifications"},{id:"notifications_active"},{id:"notifications_none"},{id:"notifications_off"},{id:"notifications_paused"},{id:"pages"},{id:"party_mode"},{id:"people"},{id:"people_outline"},{id:"person"},{id:"person_add"},{id:"person_outline"},{id:"plus_one"},{id:"poll"},{id:"public"},{id:"school"},{id:"sentiment_dissatisfied"},{id:"sentiment_satisfied"},{id:"sentiment_very_dissatisfied"},{id:"sentiment_very_satisfied"},{id:"share"},{id:"thumb_down_alt"},{id:"thumb_up_alt"},{id:"whatshot"}],name:"social"},{icons:[{id:"check_box"},{id:"check_box_outline_blank"},{id:"indeterminate_check_box"},{id:"radio_button_checked"},{id:"radio_button_unchecked"},{id:"star"},{id:"star_border"},{id:"star_half"},{id:"toggle_off"},{id:"toggle_on"}],name:"toggle"}],t=[];return i.map(function(e){t=t.concat(e.icons)}),t}});n["a"].use(p["a"]),console.log(l["a"].getItem("config"));var S={user:O,token:O,currentTab:null,item:null,path:null,type:null,loaded:!1,data:null,worldModels:null,localData:null,currentLayout:null,appLayout:{defaultTab:"user_account",style:{background:"#e7e9ee"},background:"#e7e9ee",templates:[{name:"card-view-1",template:'<q-page>\n\n    <q-toolbar class="bg-primary text-white shadow-2" v-if="layout && layout.title">\n      <q-toolbar-title>{{layout.title}}</q-toolbar-title>\n    </q-toolbar>\n\n    <div class="q-pa-md row items-start q-gutter-md">\n      <template v-for="(row, i) in localData">\n        <q-card class="my-card" :key="row.key" @click.native="fireEvent({\'name\': \'ItemSingleClick\', \'index\': i, \'data\': row})">\n\n          <q-avatar color="grey" text-color="white">\n            {{ row.avatar }}\n          </q-avatar>\n\n          <q-card-section>\n            <q-item-label>{{row.title}}</q-item-label>\n            <q-item-label caption lines="2">{{row.description}}</q-item-label>\n          </q-card-section>\n\n          <q-card-section>\n            <q-item-label caption>{{row.created_at}}</q-item-label>\n          </q-card-section>\n        </q-card>\n      </template>\n    </div>\n  </q-page>'},{name:"list-view-1",template:'<q-page>\n\n    <q-toolbar class="bg-primary text-white shadow-2" v-if="layout && layout.title">\n      <q-toolbar-title>{{layout.title}}</q-toolbar-title>\n    </q-toolbar>\n\n    <q-list style="background: white">\n      <template v-for="(row, index) in localData">\n        <q-item :key="index" @click.native="fireEvent({\'name\': \'ItemSingleClick\', \'index\':index, \'data\': row})">\n\n          <q-item-section avatar>\n            <q-avatar color="grey" text-color="white">\n              {{ row.avatar }}\n            </q-avatar>\n          </q-item-section>\n\n          <q-item-section>\n            <q-item-label>{{row.title}}</q-item-label>\n            <q-item-label caption lines="2">{{row.description}}</q-item-label>\n          </q-item-section>\n\n          <q-item-section side top>\n            <q-item-label caption>{{row.created_at}}</q-item-label>\n          </q-item-section>\n        </q-item>\n        <q-separator spaced inset :key="\'sep_\' + row.key" v-if="index < localData.length - 1"/>\n      </template>\n    </q-list>\n\n  </q-page>'},{name:"another-form-view-1",template:'<q-page>\n    <q-toolbar class="bg-primary text-white shadow-2" v-if="localData && localData.title">\n      <q-toolbar-title>{{localData.title}}</q-toolbar-title>\n    </q-toolbar>\n\n    <div class="q-pa-md row items-start q-gutter-md">\n\n      {{localData}}\n    </div>\n  </q-page>',style:""}],tabs:[{label:"User accounts",icon:"face",path:"/user_template"},{label:"Mails",icon:"mail",path:"/mail_template"},{label:"Actions",icon:"lock",path:"/action_template"},{label:"Articles",icon:"list",path:"/article_template"}],layoutConfiguration:{mail_form_template:{item:"mail",type:"single",title:"View mail",transform:{list:"data",item:{title:"subject",description:"from_address",avatar:"label",created_at:"created_at",key:"reference_id"}},template:"another-form-view-1"},action_form_template:{item:"action",type:"single",title:"Edit action",template:"list-view-1",transform:{list:"data",item:{title:"label",description:"action_name",created_at:"created_at",avatar:"label",key:"reference_id"}}},user_form_template:{item:"user_account",type:"single",title:"Edit user",template:"another-form-view-1",transform:{list:"data",item:{title:"email",key:"reference_id",created_at:"created_at",avatar:"email",description:"email"},operate:[{run:"function dateParse(v){return new Date(Date.parse(v));};dateParse",on:"created_at"}]}},article_display_template:{title:"Article",type:"single",item:"article",style:{background:"white"},params:{included_relations:"heading_image"},transform:{list:"data",item:{title:"title",summary:"summary",created_at:"created_at",heading_image:"heading_image.0.contents",content:"article",avatar:"heading_image",key:"reference_id"},operate:[{run:"function dateParse(v){return new Date(Date.parse(v));};dateParse",on:"created_at"}]},actions:{ItemSingleClick:{type:"relocate",path:"/article_display_template/{{reference_id}}"}}},article_template:{template:"list-view-1",title:"Articles",type:"list",item:"article",params:{included_relations:"heading_image"},transform:{list:"data",item:{title:"title",summary:"summary",created_at:"created_at",heading_image:"heading_image.0.contents",avatar:"heading_image",key:"reference_id"},operate:[{run:"function dateParse(v){return new Date(Date.parse(v));};dateParse",on:"created_at"}]},actions:{ItemSingleClick:{type:"relocate",path:"/article_display_template/{{reference_id}}"}}},action_template:{title:"Actions",template:"list-view-1",type:"list",item:"action",transform:{list:"data",item:{title:"label",description:"action_name",created_at:"created_at",avatar:"label",key:"reference_id"},operate:[{run:"function dateParse(v){return new Date(Date.parse(v));};dateParse",on:"created_at"},{run:"function setAvatar(v){return v.substring(0, 1);};setAvatar",on:"avatar"}]},actions:{ItemSingleClick:{type:"relocate",path:"/action_form_template/{{reference_id}}"},ItemSingleDelete:{type:"action"}}},mail_template:{title:"Mails",type:"list",item:"mail",transform:{list:"data",item:{title:"subject",description:"from_address",avatar:"label",created_at:"created_at",key:"reference_id"},operate:[{run:"function dateParse(v){return new Date(Date.parse(v));};dateParse",on:"created_at"}]},actions:{ItemSingleClick:{type:"relocate",path:"/mail_form_template/{{reference_id}}"}},template:"card-view-1"},user_template:{title:"Users",type:"list",item:"user_account",template:"card-view-1",transform:{list:"data",item:{title:"email",key:"reference_id",created_at:"created_at",avatar:"email",description:"email"},operate:[{run:"function dateParse(v){return new Date(Date.parse(v));};dateParse",on:"created_at"},{run:"function setAvatar(v){return v ? v.substring(0, 1).toUpperCase() : '';};setAvatar",on:"avatar"}]},actions:{ItemSingleClick:{type:"relocate",path:"/user_form_template/{{reference_id}}"}}}}}},O=l["a"].getItem("token"),C=JSON.parse(l["a"].getItem("config")||JSON.stringify(S));function P(){return x.worldManager.loadModels(),console.log("Store created"),new p["a"].Store({state:C,actions:q,mutations:D,getters:E})}console.log("localhost state ",C),O&&(C.user=O,C.token=O);var j=t("8c4f"),z=[{path:"/make",component:function(){return t.e("1761f014").then(t.bind(null,"4d76"))},children:[{path:"",component:function(){return t.e("2d0e8be2").then(t.bind(null,"8b24"))}}]},{path:"/",component:function(){return t.e("2d22c0ff").then(t.bind(null,"f241"))},children:[{path:"",component:function(){return t.e("2d0e8be2").then(t.bind(null,"8b24"))}},{path:"/:layout/:referenceId",component:function(){return t.e("2d0e17a1").then(t.bind(null,"7b33"))}},{path:"/:layout",component:function(){return t.e("2d0e17a1").then(t.bind(null,"7b33"))}}]},{path:"/login",component:function(){return t.e("2d2311ab").then(t.bind(null,"eeb7"))},children:[{path:"",component:function(){return t.e("2d0a314a").then(t.bind(null,"013f"))}}]}];z.push({path:"*",component:function(){return t.e("4b47640d").then(t.bind(null,"e51e"))}});var M=z;n["a"].use(j["a"]);var I=function(){var e=new j["a"]({scrollBehavior:function(){return{x:0,y:0}},routes:M,mode:"history",base:"/"});return e.beforeEach(function(e,i,t){console.log("Router log ",i,e),t()}),e},U=function(){var e="function"===typeof P?P({Vue:n["a"]}):P,i="function"===typeof I?I({Vue:n["a"],store:e}):I;e.$router=i;var t={el:"#q-app",router:i,store:e,render:function(e){return e(v)}};return{app:t,store:e,router:i}},N=t("a925"),V={failed:"Action failed",success:"Action was successful"},R={"en-us":V},F=function(){var e=r()(d.a.mark(function e(i){var t,a;return d.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:t=i.app,a=i.Vue,a.use(N["a"]),t.i18n=new N["a"]({locale:"en-us",fallbackLocale:"en-us",messages:R});case 3:case"end":return e.stop()}},e)}));return function(i){return e.apply(this,arguments)}}(),J=t("11c8"),W=function(){var e=r()(d.a.mark(function e(i){var t;return d.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:i.app,t=i.Vue,t.use(J["a"]);case 2:case"end":return e.stop()}},e)}));return function(i){return e.apply(this,arguments)}}(),B=t("7c9e"),G=t("4a7a"),H=t.n(G),Y=(t("6dfc"),t("c4ca"),t("061c"),t("be9d"),t("146d"),t("14d4"),function(){var e=r()(d.a.mark(function e(i){var t;return d.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:t=i.Vue,t.component("editor",B),t.component("v-select",H.a);case 3:case"end":return e.stop()}},e)}));return function(i){return e.apply(this,arguments)}}()),$=U(),Q=$.app,K=$.store,X=$.router;function Z(){return ee.apply(this,arguments)}function ee(){return ee=r()(d.a.mark(function e(){var i,t;return d.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:i=[F,W,Y],t=0;case 2:if(!(t<i.length)){e.next=20;break}if("function"===typeof i[t]){e.next=5;break}return e.abrupt("continue",17);case 5:return e.prev=5,e.next=8,i[t]({app:Q,router:X,store:K,Vue:n["a"],ssrContext:null});case 8:e.next=17;break;case 10:if(e.prev=10,e.t0=e["catch"](5),!e.t0||!e.t0.url){e.next=15;break}return window.location.href=e.t0.url,e.abrupt("return");case 15:return console.error("[Quasar] boot error:",e.t0),e.abrupt("return");case 17:t++,e.next=2;break;case 20:new n["a"](Q);case 21:case"end":return e.stop()}},e,null,[[5,10]])})),ee.apply(this,arguments)}Z()},"7e6d":function(e,i,t){}},[[0,"runtime","vendor"]]]);