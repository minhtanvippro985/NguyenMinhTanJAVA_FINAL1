let nameInput = document.getElementById("title");
let AuthorInput = document.getElementById("artist");
let TableMusic = document.getElementById("songTable");
let searchMusic = document.getElementById("search");
let submitBtn = document.getElementById("submitBtn");
let formTitle = document.getElementById("formTitle");

let MyPlaylist = JSON.parse(localStorage.getItem("music_data")) || 
[
    { id: 1, name: "Shape of you", author: "Ed Sheeran" },
    { id: 2, name: "Stay With Me", author: "Miki Matsubara" },
    { id: 3, name: "Renai Circulation", author: "IDK" }
];

let editId = null; 

function saveToStorage() {
    localStorage.setItem("music_data", JSON.stringify(MyPlaylist));
}

function renderMusic(Playlist) {
    TableMusic.innerHTML = "";
    Playlist.forEach(music => {
        TableMusic.innerHTML += `
        <tr>
            <td>${music.id}</td>
            <td>${music.name}</td>
            <td>${music.author}</td>
            <td>
                <button class="btn-edit" onClick="editSong(${music.id})">Sửa</button>
                <button class="btn-delete" onClick="deleteMusic(${music.id})">Xóa</button>
            </td>
        </tr>`;
    });
}


function handleSubmit(event) {
    event.preventDefault();

    if (nameInput.value.trim() === "" || AuthorInput.value.trim() === "") {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    if (editId === null) {
    
        let newMusic = {
            id: MyPlaylist.length !== 0 ? MyPlaylist[MyPlaylist.length - 1].id + 1 : 1,
            name: nameInput.value,
            author: AuthorInput.value,
        };
        MyPlaylist.push(newMusic);
    } else {
    
        let index = MyPlaylist.findIndex(m => m.id === editId);
        MyPlaylist[index].name = nameInput.value;
        MyPlaylist[index].author = AuthorInput.value;
        editId = null;
        submitBtn.innerText = "Thêm";
        formTitle.innerText = "🎵 Thêm bài hát";
    }

    resetForm();
    saveToStorage();
    renderMusic(MyPlaylist);
}


function editSong(id) {
    let song = MyPlaylist.find(m => m.id === id);
    if (song) {
        nameInput.value = song.name;
        AuthorInput.value = song.author;
        editId = id;
        

        submitBtn.innerText = "Cập nhật";
        formTitle.innerText = "📝 Sửa bài hát";
        nameInput.focus();
    }
}

function deleteMusic(id) {
    if (confirm("Bạn có chắc chắn muốn xóa bài hát này?")) {
        MyPlaylist = MyPlaylist.filter(music => music.id !== id);
        saveToStorage();
        renderMusic(MyPlaylist);
    }
}

function searchSong() {
   
    let filteredStuff = MyPlaylist.filter(music => 
        music.name.toLowerCase().includes(searchMusic.value.toLowerCase())
    );
    renderMusic(filteredStuff);
}

function resetForm() {
    nameInput.value = "";
    AuthorInput.value = "";
    searchMusic.value = "";
}


renderMusic(MyPlaylist);