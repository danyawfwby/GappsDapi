class GappsDapi{constructor(e=""){this.base=this.getBase(e)||this.createBase(e)}createBase(e){let t={method:"POST",contentType:"application/json",payload:JSON.stringify({mimeType:"application/vnd.google-apps.folder",name:e}),headers:{Authorization:`Bearer ${ScriptApp.getOAuthToken()}`}};try{JSON.parse(UrlFetchApp.fetch("https://www.googleapis.com/drive/v3/files/",t).getContentText())}catch{}return response}getBase(e){const t=`https://www.googleapis.com/drive/v3/files/?q=name='${e}' and trashed=false and mimeType = 'application/vnd.google-apps.folder'`,o={method:"GET",headers:{Authorization:`Bearer ${ScriptApp.getOAuthToken()}`}};try{JSON.parse(UrlFetchApp.fetch(t,o).getContentText()).files[0]}catch{}return response}deleteBase(e=this.base.id){const t=`https://www.googleapis.com/drive/v3/files/${e}`,o={method:"DELETE",headers:{Authorization:`Bearer ${ScriptApp.getOAuthToken()}`}};try{UrlFetchApp.fetch(t,o).getContentText()}catch{}}findPosts(e=[],t=20){let o="";return e.forEach((function(t,r){let s="";s+=`fullText contains '%22${function(e){let t="";return Object.entries(e).forEach((([e,o])=>t+=`${e}:${o}`)),t}(t)}%22'`,e.length>1?o+=r+1!=e.length?`(${s}) or `:`(${s})`:o=s})),o=`and (${o})`,this.getPosts(t,o)}getPosts(e=20,t=""){const o=`https://www.googleapis.com/drive/v3/files/?pageSize=${e}&${t?"":"orderBy=createdTime desc&"}q='${this.base.id}' in parents and trashed=false ${t}`,r={method:"GET",headers:{Authorization:`Bearer ${ScriptApp.getOAuthToken()}`}};try{JSON.parse(UrlFetchApp.fetch(o,r).getContentText()).files}catch{}return response}getValuePosts(e){let t={};return e.forEach((function(e){const o=`https://www.googleapis.com/drive/v3/files/${e}?alt=media`,r={method:"GET",headers:{Authorization:`Bearer ${ScriptApp.getOAuthToken()}`}};try{const s=UrlFetchApp.fetch(o,r).getContentText();t[e]=JSON.parse(s)}catch{}})),t}createPost(e=""){const t=Utilities.base64Encode((new Date).valueOf())+(o=1e5,r=999999,o=Math.ceil(o),r=Math.floor(r),Math.floor(Math.random()*(r-o))+o);var o,r;const s={contentType:"application/json",method:"POST",payload:JSON.stringify({mimeType:"text/plain",parents:[this.base.id],name:t}),headers:{Authorization:`Bearer ${ScriptApp.getOAuthToken()}`}},a=JSON.parse(UrlFetchApp.fetch("https://www.googleapis.com/drive/v3/files/",s).getContentText());return e?this.editPost(a.id,e):a}deletePost(e){const t=`https://www.googleapis.com/drive/v3/files/${e}`,o={method:"DELETE",headers:{Authorization:`Bearer ${ScriptApp.getOAuthToken()}`}};try{UrlFetchApp.fetch(t,o).getResponseCode()}catch{}return response}editPost(e,t=""){const o=`https://www.googleapis.com/upload/drive/v3/files/${e}`,r={method:"PATCH",contentType:"text/plain",payload:JSON.stringify(t),headers:{Authorization:`Bearer ${ScriptApp.getOAuthToken()}`}};try{JSON.parse(UrlFetchApp.fetch(o,r).getContentText())}catch{}return response}}function init(e){return new GappsDapi(e)}
