

//let snapstream = new SnapStream('ws://192.168.0.96:1780');



let snapstreamMusic = new SnapStream(config.baseUrl);
var streamMusicMac = "00:00:00:00:00:01";
snapstreamMusic.setClientParams('Music Speaker', streamMusicMac)
let snapstreamShortCut = new SnapStream(config.baseUrl);
var streamShortCutMac =  "00:00:00:00:00:02"
snapstreamShortCut.setClientParams('ShortCutSongs Speaker', streamShortCutMac)

let snapcontroller = new SnapControl(config.baseUrl);



function setSteamsAndGroups(){
    console.log(snapcontroller.server.groups)
    console.log(snapcontroller.server.streams)

    var snapStreamMusicID = SnapStream.getClientId(streamMusicMac);
    var snapStreamShortCutID = SnapStream.getClientId(streamShortCutMac);

    var musicGroup;
    var shortCutGroup

    for (let group of snapcontroller.server.groups) {
        for (let client of group.clients) {
            if (client && client.connected == false) {
                snapcontroller.deleteClient(client.id);
            }
            if (client.id == snapStreamMusicID) {
                musicGroup = group;
            }
            if (client.id == snapStreamShortCutID) {
                shortCutGroup = group;
            }
        }
    }

    var musicStream = snapcontroller.server.getStream("Music");
    var schortCutStream = snapcontroller.server.getStream("ShortCutSongs"); 


    console.log(musicStream + musicGroup)
    if (musicStream && musicGroup) {
        snapcontroller.setStream(musicGroup.id, musicStream.id);
    }
    console.log(schortCutStream + shortCutGroup)
    if (schortCutStream && shortCutGroup) {
        snapcontroller.setStream(shortCutGroup.id, schortCutStream.id);
    }
};

(async() => {
    console.log("waiting for variable");
    while(snapcontroller.server.groups.length == 0) // define the condition as you like
        await new Promise(resolve => setTimeout(resolve, 1000));

    console.log("variable is defined");
    setSteamsAndGroups();
})();
console.log("above code doesn't block main function stack");
