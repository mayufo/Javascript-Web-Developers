var book = {
    "title": "Professional JavaScript",
    "authors": [
        "Nicholas C. Zakas"
    ],
    edition: 3,
    year: 2011
}

var jsonText = JSON.stringify(book);

console.log(jsonText); //{"title":"may","author":["may"],"edition":3}

console.log(JSON.stringify(book, ['title', 'edition'])); //{"title":"may","edition":3}

var jsonText1 = JSON.stringify(book, function(key, value){
    switch(key){
        case "authors":
            return value.join(",")
        case "year":
            return 5000;
        case "edition":
            return undefined;
        default:
            return value;
    }
});

console.log(jsonText1);


console.log(JSON.stringify(book, null, 4));

console.log(JSON.stringify(book, null, '- -'));


var book3 = {
    "title": "Professional JavaScript",
    "authors": [
        "Nicholas C. Zakas"
    ],
    edition: 3,
    year: 2011,
    toJSON: function(){
        return this.title;
    }

}

var jsonText3 = JSON.stringify(book3);

console.log(jsonText3);

var book4 = {
    "title": "Professional JavaScript",
    "authors": [
        "Nicholas C. Zakas"
    ],
    edition: 3,
    year: 2011,
    releaseDate: new Date(2011, 11, 1)
}

var jsonText4 = JSON.stringify(book4);

var bookCopy = JSON.parse(jsonText4,function (key, value) {
    if(key == 'releaseDate') {
        return new Date(value);
    } else {
        return value;
    }
})

console.log(bookCopy.releaseDate.getFullYear());


