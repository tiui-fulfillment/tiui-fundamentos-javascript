var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function X(a, b) {
    var B = new XMLHttpRequest();
    B.onreadystatechange = function () {
        if (B.readyState === 4) {
            if (B.status === 200) {
                b(null, B.responseText);
            } else {
                b(`Error ${B.status}: ${B.statusText}`);
            }
        }
    };
    B.open('GET', a, true);
    B.send();
}

X(A, function (c, d) {
    if (c) return console.error('Error:', c);

    console.log('Primer Llamado...');
    var data = JSON.parse(d);

    X(A + data.results[0].id, function (e, f) {
        if (e) return console.error('Error:', e);

        console.log('Segundo Llamado...');
        var characterData = JSON.parse(f);

        X(characterData.origin.url, function (g, h) {
            if (g) return console.error('Error:', g);

            console.log('Tercer Llamado...');
            var originData = JSON.parse(h);
            console.log('Personajes:', data.info.count);
            console.log('Primer Personaje:', characterData.name);
            console.log('Dimensión:', originData.dimension);
        });
    });
});
