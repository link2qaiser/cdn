var PortletTools = {
    init: function() {
        var e;
         (e = new mPortlet("m_portlet_tools_1")).on("beforeCollapse", function(e) {
                setTimeout(function() {
                  
                }, 100)
            }), e.on("afterCollapse", function(e) {
                setTimeout(function() {
                    
                }, 2e3)
            }), e.on("beforeExpand", function(e) {
                setTimeout(function() {
                    
                }, 100)
            }), e.on("afterExpand", function(e) {
                setTimeout(function() {
                    
                }, 2e3)
            }), e.on("beforeRemove", function(e) {
                return confirm("Are you sure to remove this portlet ?")
            }), e.on("afterRemove", function(e) {
                setTimeout(function() {
                    
                }, 2e3)
            }), e.on("reload", function(e) {
                /*toastr.info("Leload event fired!"), mApp.block(e.getSelf(), {
                    overlayColor: "#ffffff",
                    type: "loader",
                    state: "accent",
                    opacity: .3,
                    size: "lg"
                }), setTimeout(function() {
                    mApp.unblock(e.getSelf())
                }, 2e3)*/
            }), e.on("afterFullscreenOn", function(e) {
               
                var t = $(e.getBody()).find("> .m-scrollable");
                t && (t.data("original-height", t.css("height")), t.css("height", "100%"), mUtil.scrollerUpdate(t[0]))
            }), e.on("afterFullscreenOff", function(e) {
                var t;
                (t = $(e.getBody()).find("> .m-scrollable")) && ((t = $(e.getBody()).find("> .m-scrollable")).css("height", t.data("original-height")), mUtil.scrollerUpdate(t[0]))
            })
    }
};
jQuery(document).ready(function() {
    PortletTools.init()
});