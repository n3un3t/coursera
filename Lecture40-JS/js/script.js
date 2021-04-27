// var firstArray = new Array();
// firstArray[0] = 'Hello';
// firstArray[1] = 'dear';
// firstArray[2] = 'Sir';

// console.log(firstArray);

// for (var i = 0; i < firstArray.length; i++) {
//     console.log(firstArray[i]);
// };

// var secondArray = [
//     'wachstumsschwach',
//     'wachstumsstark',
//     'ständig wachsend',
//     'zykliker',
//     'Turnaround-Kandidaten',
//     'Substanzspekulation'
// ];

// console.log(secondArray);

// console.log('Aktienkategorien: ');
// for (var i = 0; i < secondArray.length; i++) {

//     console.log(secondArray[i]);
// };

// var names = ['Marius', 'Martha', 'Katja'];
// names.greeting = 'Hi';

// console.log(names)
// for (var nam in names) {
//     console.log(names.greeting + ' ' + names[nam])
// };

function MultipliziereMit(Faktor) {
    return (
        function (x) {
            return console.log(Faktor * x)
        }
    );
};

var double = MultipliziereMit(2);

double(5);