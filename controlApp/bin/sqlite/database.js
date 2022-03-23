//var sqlite = require('sqlite')
var sqlite3 = require('sqlite3')
var md5 = require('md5')

const DBSOURCE = "db.sqlite"


// sqlite.open({
//     filename: '/db/db.sqlite',
//     driver: sqlite3.Database
// }).then((db) => {
//     console.log("connected")

//     module.exports = db
// })

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE config (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            key text, 
            title text,
            desc text,
            value text, 
            CONSTRAINT key_unique UNIQUE (key)
            )`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = 'INSERT INTO config (key, title, desc, value) VALUES (?,?,?,?)'
                db.run(insert, ["MUSIC_MOPIDY","Mopidy Music", "Mopidy Instanz für Musik - Hostname oder IP (ohne http)", "music.mopidy.com"]);
                db.run(insert, ["SCS_MOPIDY", "Mopidy SCS", "Mopidy Instanz für ShortCutSongs - Hostname oder IP (ohne http)", "scs.mopidy.com"]);
                db.run(insert, ["TORHYMNE","Torhymne", "Torhymne - URL zu .mp3", "http://scs.mopidy.com/torhymne.mp3"]);
                db.run(insert, ["EINLAUFMUSIK", "Einlaufmusik", "Einlaufmusik - URL zu .mp3", "http://scs.mopidy.com/einlaufmusik.mp3"]);
                db.run(insert, ["SCS_1", "SCS 1", "Weiterer ShortCutSong 1 - URL zu .mp3", ""]);
                db.run(insert, ["SCS_2", "SCS 2", "Weiterer ShortCutSong 2 - URL zu .mp3", ""]);
            
            }
        });  
    }
});

module.exports = db



