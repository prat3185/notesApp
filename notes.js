console.log('starting notes.js');

const fs=require('fs');


var fetchNotes=()=>{
    try{
        var notesString=fs.readFileSync('notes.json');
        return JSON.parse(notesString);
        }
    catch(e){
        return [];
    }
}

var saveNotes=(notes)=>{
    fs.writeFileSync('notes.json',JSON.stringify(notes));
}

var addNote=(title,body)=>{
    var notes=[];
    var note={
        title,
        body
    };
    notes=fetchNotes();
    var duplicateNotes=notes.filter((note)=>note.title===title);
    if(duplicateNotes.length==0){
    notes.push(note);
    saveNotes(notes);
    return note;
}
}

var getAll=()=>{
    return fetchNotes();
}

var readNote=(title)=>{
    var notes=fetchNotes();
    var filteredNotes=notes.filter((note)=>note.title===title);
    return filteredNotes[0];
}

var removeNote=(title)=>{
    var notes=fetchNotes();
    var filteredNotes=notes.filter((note)=>note.title!==title);
    saveNotes(filteredNotes);
    return notes.length!==filteredNotes.length;
}

var logNote=(note)=>{
    console.log("------");
    console.log(`Title : ${note.title}`);
    console.log(`Body : ${note.body}`);
}

module.exports={
    addNote,
    getAll,
    readNote,
    removeNote,
    logNote
}