// function fact(n) {
//     if (n == 0) {
//         return 1;
//     } else {
//         return n * fact(n - 1);
//     }
// }

// function applique(f, tab) {
//     return tab.map(f);
// }

// console.log(fact(5));

// console.log(applique(fact, [1, 2, 3, 4, 5, 6]));

// console.log(applique(function (n) { return (n + 1); }, [1, 2, 3, 4, 5, 6]));

microservice_url = 'https://f9b63721-9ee8-4576-b2ef-f0074e8d985f-00-243contaq2da5.riker.replit.dev';

// Messages data structure with metadata (pseudo, date)
let msgs = [
    { "msg": "Hello World", "pseudo": "user1", "date": new Date(2023, 0, 15, 10, 30) },
    { "msg": "Blah Blah", "pseudo": "user2", "date": new Date(2023, 0, 16, 11, 45) },
    { "msg": "I love cats", "pseudo": "cat_lover", "date": new Date(2023, 0, 17, 9, 20) },
    { "msg": "I love dogs", "pseudo": "dog_fan", "date": new Date(2023, 0, 18, 14, 15) },
    { "msg": "I love animals", "pseudo": "animal_lover", "date": new Date(2023, 0, 19, 16, 30) }
];

function toggleStyle() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
}

function update(msgs) {
    let ul = document.querySelector('ul');
  
    ul.innerHTML = '';

    msgs.sort((a, b) => b.date - a.date);

    msgs.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.pseudo + " : " + item.msg;
        ul.appendChild(li);
    });
}

function sendMessage() {
    const textarea = document.querySelector('textarea');
    const msg = textarea.value;
    
    fetch(`${microservice_url}/msg/post?msg=${msg}&pseudo=me`, {
        method: 'GET',
    })
    .then(function(response) {
        if (response.status != 200) {
            throw new Error("Error");
        }
        else {
            window.location.reload();
        }
    })
}

fetch(`${microservice_url}/msg/getAll`)
.then(function(response) {
  return response.json();
})
.then(function(data) {
  update(data);
});

