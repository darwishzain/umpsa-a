// chrome.tabs.onActivated.addListener(tab=>{
//     console.log(tab)
//     chrome.tabs.get(tab.tabId,cur=>{
//         chrome.scripting.executeScript({
//             target: {tabId: tab.tabId,allFrames:true},
//             files: ['foregroup.js']
//           });
//     });

// })

async function getTab() {
  let queryOptions = { active: true, currentWindow: true };
  let tabs = await chrome.tabs.query(queryOptions);
  console.log(tabs);
  return tabs[0];
}

chrome.storage.sync.get(['username','password','role'],result=>{
  if(result.username =="" && result.password == "" && result.role == ""){
    alert("Please kindly fill out your username and password in the extension settings. Thank you!")
  }else{
    chrome.tabs.onUpdated.addListener(async function () {
      let tab = await getTab();
    
      chrome.scripting.executeScript({
        target: { tabId: tab.id, allFrames: true },
        files: ["foregroup.js"],
      });
    });
  }
})

chrome.webNavigation.onCompleted.addListener(function(details) {
  chrome.tabs.executeScript(details.tabId, { file: 'content.js' });
}, { url: [{ urlMatches: 'https://ecomm.ump.edu.my/*' }, { urlMatches: 'https://kalam.ump.edu.my/*' }] });



