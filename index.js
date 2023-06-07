const electron=require('electron')
const { app,BrowserWindow }=electron;


let mainWindow;
app.on("ready",()=>{
    mainWindow=new BrowserWindow({
         webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
         }
    });
    mainWindow.loadURL("http://localhost:2222");
});