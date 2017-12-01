var users = [
    {
        "id": 1,
        "username": "goldroger",
        "name": "Gol D. Roger",
        "position": "Pirate King"
    },
    {
        "id": 2,
        "username": "mrzero",
        "name": "Sir Crocodile",
        "position": "Former-Shichibukai"
    },
    {
        "id": 3,
        "username": "luffy",
        "name": "Monkey D. Luffy",
        "position": "Captain"
    },
    {
        "id": 4,
        "username": "kuzan",
        "name": "Aokiji",
        "position": "Former Marine Admiral"
    },
    {
        "id": 5,
        "username": "shanks",
        "name": "'Red-Haired' Shanks",
        "position": "The 4 Emperors"
    }
];


Array.prototype.remove = function(index) {
           this.splice(index, 1);     
    };
  var fn = function(id){
         users.remove(id);
     }

  var text = function(){
      for(var i = 0; i<users.length;i++){
          console.log(users[i]);
      }
  }
 fn(1);
text();

   