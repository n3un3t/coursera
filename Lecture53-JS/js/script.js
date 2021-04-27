document.addEventListener('DOMContentLoaded', function (event) {
    document.querySelector('button').onclick = sag;

    function sag() {
        console.log(this);
        var name = document.getElementById('name').value;
        document.getElementById('content').innerHTML = `<h2>Hello, dear Sir ${name}!</h2>`;
        document.querySelector('button').textContent = 'GESAGT!';
        var title = document.querySelector('h1').textContent;

        if (name === 'marius') {
            title += ' & I like it'
        };

        document.querySelector('h1').textContent = title;
    };

    document.querySelector('body').addEventListener('mousemove', function (event) {
        if (event.shiftKey === true) {
            console.log('x: ' + event.clientX);
            console.log('y: ' + event.clientY);
        }
    }
    );
}
);

