document.getElementById('сhildsBtn').addEventListener('click', function() {
    var childsText = document.getElementById('childsText')

    var url = 'http://127.0.0.1:8080/child/get'
    var result

    result = fetch(url)
    .then(response => {
        if (response.ok) {
            console.log('Данные успешно отправлены!');
        } else {
            console.error('Ошибка при отправке данных.');
        }
    })
    .then(data => {
        const strings = data; // предполагается, что API возвращает массив строк
        childsText.value = strings.join('\n'); // выводим строки в текстовое поле, разделяя их переносом строки
      })
    .catch(error => {
        console.error('Произошла ошибка:', error);
    });
});

