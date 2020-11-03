chrome.runtime.onMessageExternal.addListener((request, _, response) => {
    if (request.type === "action spec") {
      response({
        name: actionSpec.name,
        actions: Object.entries(actionSpec.actions).map(
          ([name, { displayName }]) => {
            return { name, displayName };
          }
        )
      });
    } else if (request.type === "execute action") {
      const action = actionSpec.actions[request.action.name];
      if (action !== undefined) action.f();
    }
  });
  
  const actionSpec = {
    name: "Ex. Ex.",
    actions: {
      "extract book info": {
        displayName: "Amazon: Copy Book Information",
        f: requestExtractBookInfo
      }
    }
  };

  function requestExtractBookInfo() {
      chrome.tabs.query({active: true, currentWindow: true}, ([tab]) => {
        chrome.tabs.sendMessage(tab.id, {type: "extract book info"})
      })
  }