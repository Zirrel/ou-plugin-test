var PluginTester = (function(){

    var PluginList = [
        "Crypto",
        "Analytics",
        "AccessibilityStatusCheck",
        "Unzipper",
        "KeyboardNotifications",
        "MoviePlayer"
    ];
    var PluginResults = {};
    
    var Tester_init = function()
    {
        $(document).ready(function(){
                          
            $('body').html('<div style="position:absolute;width:100%;opacity:1.0;z-index:100"><div style="padding:20px; text-align:center">PLUGIN UNIT TESTS</div><button class="runTest">Run Tests</button><div id="pluginTesterBody"></div></div>');

            var cryptoHTML = '';
            cryptoHTML += '<div id="Crypto_result" style="font-size:0.8em; width:90%; padding:10px; overflow:auto"></div>';
            var analyticsHTML = '';
            analyticsHTML += '<div id="Analytics_result" style="font-size:0.8em; width:90%; padding:10px; overflow:auto"></div>';
            var accessHTML = '';
            accessHTML += '<div id="AccessibilityStatusCheck_result" style="font-size:0.8em; width:90%; padding:10px; overflow:auto"></div>';
            var unzipHTML = '';
            unzipHTML += '<div id="Unzipper_result" style="font-size:0.8em; width:90%; padding:10px; overflow:auto"></div>';
            var keyboardHTML = '';
            keyboardHTML += '<div id="KeyboardNotifications_result" style="font-size:0.8em; width:90%; padding:10px; overflow:auto"></div>';
            var moviePlayerHTML = '';
                moviePlayerHTML += '<div id="MoviePlayer_result" style="font-size:0.8em; width:90%; padding:10px; overflow:auto"></div>';
            var fileOpenerHTML = '';
                fileOpenerHTML += '<div id="FileOpener_result" style="font-size:0.8em; width:90%; padding:10px; overflow:auto"></div>';
            
            $('#pluginTesterBody').html(cryptoHTML+analyticsHTML+accessHTML+unzipHTML+keyboardHTML+moviePlayerHTML+fileOpenerHTML);
                          
            $('.runTest').on('click', function(){
                $(this).text('Please wait...');
                Tester_run();
            });

        });
    };

    var Tester_run = function()
    {
        for(var plug=0; plug<PluginList.length; plug++)
        {
            $("#"+PluginList[plug]+"_result").html("");
            PluginResults[PluginList[plug]] = {installed:false};
            var pObj = {
                sCallback : function(plugin){PluginResults[plugin].installed = true;},
                eCallback : function(error){}
            };
                   
            cordova.exec(pObj.sCallback, pObj.eCallback, PluginList[plug], "test", [{data: PluginList[plug]}]);
        }
        window.setTimeout(CheckResults,5000);
    };

    var CheckResults = function(){
        for(var plug=0; plug<PluginList.length; plug++)
        {
            var installed = (PluginResults[PluginList[plug]].installed)?" :- SUCCESS":" :- FAIL";
            $("#"+PluginList[plug]+"_result").html(PluginList[plug]+installed);
        }
        $('.runTest').text('Run Tests');
    };
    
    return {
    	Init : Tester_init
    };
    
})();