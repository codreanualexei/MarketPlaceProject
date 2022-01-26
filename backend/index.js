
URL = 'http://86.123.187.140/getAllUsers'
DATA = {
    "fname":"Codreanu",
    "lname":"Alexei",
    "email":"vero_andreea1997@yahoo.com",
    "tel":"0764844143",
    "password":"Vero"
}

ExepluPost = function(url, data) {
    return fetch(url, {method: "POST", body: data});
  }

console.log(ExepluPost(URL,DATA))
