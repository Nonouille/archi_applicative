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

microservice_url = 'https://archi-applicative-server.onrender.com';

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

    msgs.sort((a, b) => new Date(b.date) - new Date(a.date));

    msgs.forEach(item => {
        const li = document.createElement('li');
        const messageDiv = document.createElement('div');
        messageDiv.textContent = item.msg;
        messageDiv.classList.add('message-content');
        
        const pseudoText = document.createElement('p');
        pseudoText.textContent = item.pseudo;
        pseudoText.classList.add('message-pseudo');

        const dateText = document.createElement('p');
        const dateObj = new Date(item.date);
        const formattedDate = `${dateObj.getDate().toString().padStart(2, '0')}/${(dateObj.getMonth() + 1).toString().padStart(2, '0')}/${dateObj.getFullYear()} at ${dateObj.getHours().toString().padStart(2, '0')}:${dateObj.getMinutes().toString().padStart(2, '0')}`;
        dateText.textContent = formattedDate;
        dateText.classList.add('message-date');

        const dataDiv = document.createElement('div');
        dataDiv.classList.add('message-data');
        dataDiv.appendChild(pseudoText);
        dataDiv.appendChild(dateText);
        
        li.appendChild(dataDiv);
        li.appendChild(messageDiv);
        ul.appendChild(li);
    });

    // Attach delete functionality after updating the list
    ul.addEventListener('click', function(event) {
        if (event.target.tagName === 'LI') {
            const index = Array.from(ul.children).indexOf(event.target);

            fetch(`${microservice_url}/msg/del/${index}`, {
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
    });
}

function sendMessage() {
    const textarea = document.querySelector('textarea');
    let msg = "";
    let pseudo = "";

    if ( textarea.value.includes("-") && textarea.value.split('-').length == 2) {
        msg = textarea.value.split('-')[0].trim();
        pseudo = textarea.value.split('-')[1] == "" ? "anonymous" : textarea.value.split('-')[1].trim();
    }

    
    fetch(`${microservice_url}/msg/post?msg=${msg}&pseudo=${pseudo}`, {
        method: 'GET',
    })
    .then(function(response) {
        if (response.status == 200) {
            data = response.json();
            if (data == -1) {
                throw new Error("Error post message");
            }
            else {
                window.location.reload();
            }
        }
        else {
            throw new Error("Error");
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

fetch(`${microservice_url}/msg/nber`)
.then(function(response) {
  return response.json();
})
.then(function(data) {
    document.getElementById('nber').innerHTML = "Recent messages (" + data + ")";
});
