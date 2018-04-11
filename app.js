console.log("starting app.js");

const fs= require('fs');
const _ = require('lodash');
const yargs=require('yargs');

const notes = require('./notes.js');

const argv=yargs
.command('add','Add note',{
    title:{
        describe:'Title of Note',
        demand:true,
        alias:'t'
    },
    body:{
        describe:"Body of Note",
        demand:true,
        alias:'b'
    }
})
.command('list','show all notes',{})
.command('read','read note',{
    title:{
        describe:'title of note',
        demand:true,
        alias:'t'
    }
})
.command('remove','remove note',{
    title:{
        describe:'title of note',
        demand:true,
        alias:'t'
    }
})
.command('')
.help()
.argv;
var cmd= process.argv[2];

if(cmd==='add'){
   var note=notes.addNote(argv.title,argv.body);
   if(note){
       console.log("note added :");
      notes.logNote(note);
   }
   else
   {
       console.log("note already exsist");
   }
}
else if(cmd==='list'){
    var allNotes=notes.getAll();
    console.log('Reading all Notes');
    allNotes.forEach((note)=>{
        notes.logNote(note);
    });
}
else if(cmd==='read'){
    var note=notes.readNote(argv.title);
    if(note){
        console.log("note found:");
       notes.logNote(note);
    }
    else
    {
        console.log("note not found");
    }
}
else if(cmd==='remove'){
    var notesRemoved=notes.removeNote(argv.title);
    notesRemoved?console.log("Successfully removed"):console.log("Note not found");
}
else
{
    console.log('command not recognized');
}