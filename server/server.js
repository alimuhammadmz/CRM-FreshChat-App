
const request = require('request');


exports = {

  /**
   * App setup event which is triggered at the time of installation. It can be used to allow/disallow app installation
   *
   * - Webhook URL can be generated using generateTargetURL()
   * - You can include an API call to the third party to register your webhook
   * - If the Webhook URL is generated properly and setup is successful, use `renderData();` to allow installation to complete
   * - If Webhook URL generation fails or some error occurs in setup, use `renderData({message: "<Message_text>"});` to disallow installation
   * @param {Object} payload
   */
  onAppInstallCallback: function (payload) {
    console.log("Logging arguments from onAppInstallevent : " + payload);
    generateTargetUrl()
      .then(function (url) {
        console.info("Generated Webhook URL : " + url);
        renderData();
      })
      .fail(function (err) {
        console.error(err);
        renderData({ message: "Generating Webhook URL failed" });
      });
  },
  /**
   * Payload passed to the generated webhook URL triggers the `onExternalEvent` callback.
   * @param {Object} payload
   */
  onExternalEventCallback: function (payload) {
    console.log(payload);
  },
  /**
   * When you click the uninstall icon, the `onAppUninstall` event occurs and then the registered callback method is executed.
   * @param {Object} payload
   */
  onAppUninstallCallback: function (payload) {

    console.log("Logging arguments from onAppUninstall event: " + payload);
    renderData();
  },

  //my custom-defined functions:
  onScheduledEventCallback: function (payload) {
    console.log("Logging arguments from onScheduledEvent: " + JSON.stringify(payload));
  },
  /**
   * 
   * @param {Object} payload 
   */

  onConversationCreateCallback: function (payload) {
    console.log(payload);
    const opt = {
      headers: {'content-type' : 'application/json'}, 
      method: 'POST',
      url: 'http://localhost:3000',
      body: JSON.stringify(payload)
    }

    request(opt, function(err, res, body){
      if(err){
        renderData({"message" : "error"});
      }
      console.log(res,body);
      renderData();
    });
    
  },
  onConversationUpdateCallback: function (payload) {
    console.log(payload);
  },
  onMessageCreateCallback: function (payload) {
    console.log(payload);
  },
  onUserCreateCallback: function (payload) {
    console.log(payload);
  },
  onUserUpdateCallback: function (payload) {
    console.log(payload);
  }

}
