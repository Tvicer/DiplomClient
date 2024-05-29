document.getElementById('sendButton').addEventListener('click', function() {
    var tell1 = document.getElementById('tell1Area').value;
    var tell2 = document.getElementById('tell2Area').value;
    var tell3 = document.getElementById('tell3Area').value;

    var data = { 
        tell1: tell1,
        tell2: tell2,
        tell3: tell3 
    };

    var url = 'http://127.0.0.1:8080/nlp/sendToNlp'
    var result

    result = fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            console.log('Данные успешно отправлены!');
        } else {
            console.error('Ошибка при отправке данных.');
        }
        console.log(response.json().then((value) => {
            console.log(value.answer);
            document.getElementById('resultText').value = value.answer
          })
        )
    })
    .catch(error => {
        console.error('Произошла ошибка:', error);
    });
});

document.getElementById('endButton').addEventListener('click', function() {
    var fio = document.getElementById('fio').value;
    var childAge = document.getElementById('childAge').value;
    var parentAge = document.getElementById('parentAge').value;
    var telephone = document.getElementById('telephone').value;
    var address = document.getElementById('address').value;
    var result = document.getElementById('resultText').value;

    var data = { 
        fio: fio,
        childAge: childAge,
        parentAge: parentAge,
        telephone: telephone,
        address: address,
        result: result
    };

    var url = 'http://127.0.0.1:8080/nlp/sendToDb'
    var result

    result = fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            console.log('Данные успешно отправлены!');
            window.location.href = "/psychologist.html";
        } else {
            console.error('Ошибка при отправке данных.');
        }
    })
    .catch(error => {
        console.error('Произошла ошибка:', error);
    });
});





// console.log(window.location.href)

// const constraints = { audio: true, video: false }

// let stream = null

// navigator.mediaDevices.getUserMedia(constraints)
//  .then((_stream) => { stream = _stream })
//  // если возникла ошибка, значит, либо пользователь отказал в доступе,
//  // либо запрашиваемое медиа-устройство не обнаружено
//  .catch((err) => { console.error(`Not allowed or not found: ${err}`) })

// let chunks = []
// let mediaRecorder = null
// let audioBlob = null
// // функция принимает объект с тегом создаваемого элемента,
// // дочерними элементами в виде массива и атрибутами
// const createEl = ({ tag = 'div', children, ...attrs }) => {
//     // создаем элемент
//     const el = document.createElement(tag)
   
//     // если имеются атрибуты
//     if (Object.keys(attrs).length > 0) {
//       // добавляем их к элементу
//       Object.entries(attrs).forEach(([attr, val]) => {
//         el[attr] = val
//       })
//     }
   
//     // если имеются дочерние элементы
//     if (children) {
//       // прибегаем к рекурсии
//       children.forEach((_el) => {
//         el.append(createEl(_el))
//       })
//     }
   
//     // возвращаем элемент
//     return el
//    }
   
//    // функция принимает элемент, новый и старый CSS-классы
//    const toggleClass = (el, oldC, newC) => {
//     el.classList.remove(oldC)
//     el.classList.add(newC)
//    }

// async function startRecord() {
//     // проверяем поддержку
//     if (!navigator.mediaDevices && !navigator.mediaDevices.getUserMedia) {
//       return console.warn('Not supported')
//     }
   
//     // меняем изображение на основе состояния `mediaRecorder`
//     record_img.src = `img/${
//       mediaRecorder && mediaRecorder.state === 'recording' ? 'microphone' : 'stop'
//     }.png`
   
//     // если запись не запущена
//     if (!mediaRecorder) {
//       try {
//         // получаем поток аудио-данных
//         const stream = await navigator.mediaDevices.getUserMedia({
//           audio: true
//         })
//         // создаем экземпляр `MediaRecorder`, передавая ему поток в качестве аргумента
//         mediaRecorder = new MediaRecorder(stream)
//         // запускаем запись
//         mediaRecorder.start()
//         // по окончанию записи и наличии данных добавляем эти данные в соответствующий массив
//         mediaRecorder.ondataavailable = (e) => {
//           chunks.push(e.data)
//         }
//         // обработчик окончания записи (см. ниже)
//         mediaRecorder.onstop = mediaRecorderStop
//       } catch (e) {
//         console.error(e)
//         record_img.src = ' img/microphone.png'
//       }
//     } else {
//       // если запись запущена, останавливаем ее
//       mediaRecorder.stop()
//     }
//    }

// function mediaRecorderStop() {
//     // если имеется предыдущая (новая) запись
//     if (audio_box.children[0]?.localName === 'audio') {
//       // удаляем ее
//       audio_box.children[0].remove()
//     }
   
//     // создаем объект `Blob` с помощью соответствующего конструктора,
//     // передавая ему `blobParts` в виде массива и настройки с типом создаваемого объекта
//     // о том, что такое `Blob` и для чего он может использоваться
//     // очень хорошо написано здесь: https://learn.javascript.ru/blob
//     audioBlob = new Blob(chunks, { type: 'audio/mp3' })
//     // метод `createObjectURL()` может использоваться для создания временных ссылок на файлы
//     // данный метод "берет" `Blob` и создает уникальный `URL` для него в формате `blob:<origin>/<uuid>`
//     const src = URL.createObjectURL(audioBlob)
   
//     // создаем элемент `audio`
//     const audioEl = createEl({ tag: 'audio', src, controls: true })
   
//     audio_box.append(audioEl)
//     // переключаем классы
//     toggleClass(record_box, 'hide', 'show')
   
//     // выполняем очистку
//     mediaRecorder = null
//     chunks = []
//    }

// async function saveRecord() {
//     // данные должны иметь формат `multipart/form-data`
//     const formData = new FormData()
//     // запрашиваем у пользователя название для записи
//     let audioName = prompt('Name?')
//     // формируем название записи
//     audioName = audioName ? Date.now() + '-' + audioName : Date.now()
//     // первый аргумент - это название поля, которое должно совпадать
//     // с названием поля в посреднике `upload.single()`
//     formData.append('audio', audioBlob, audioName)
   
//     try {
//       await fetch('/save', {
//         method: 'POST',
//         body: formData
//       })
//       console.log('Saved')
//       // сброс
//       resetRecord()
//       // получение записей от сервера
//       fetchRecords()
//     } catch (e) {
//       console.error(e)
//     }

//    }

// function resetRecord() {
//     toggleClass(record_box, 'show', 'hide')
//     audioBlob = null
//    }
   
// function removeRecord() {
//     if (confirm('Sure?')) {
//       resetRecord()
//     }
//    }
   
//    async function fetchRecords() {
//     try {
//       // получаем файлы
//       const files = await (await fetch('/records')).json()
   
//       // очищаем контейнер
//       records_box.innerHTML = ''
   
//       // если имеется хотя бы один файл
//       if (files.length > 0) {
//         // формируем список
//         files.forEach((file) => {
//           records_box.append(createRecordEl(file))
//         })
//       // если файлов нет
//       } else {
//         // предлагаем пользователю что-нибудь записать
//         records_box.append(
//           createEl({
//             tag: 'p',
//             textContent: 'No records. Create one'
//           })
//         )
//       }
//     } catch (e) {
//       console.error(e)
//     }
//    }
   
//    const createRecordEl = (src) => {
//     // получаем дату создания и название файла
//     const [date, audioName] = src.replace('.mp3', '').split('-')
//     // форматируем дату
//     const audioDate = new Date(+date).toLocaleString()
   
//     // создаем элемент
//     return createEl({
//       className: 'audio_item',
//       children: [
//         {
//           tag: 'audio',
//           src,
//           // обработчик окончания воспроизведения записи
//           onended: ({ currentTarget }) => {
//             // меняем изображение
//             currentTarget.parentElement.querySelector('img').src = 'img/play.png'
//           }
//         },
//         {
//           tag: 'button',
//           className: 'btn',
//           // обработчик нажатия кнопки для запуска воспроизведения (см. ниже)
//           onclick: playRecord,
//           children: [
//             {
//               tag: 'img',
//               src: 'img/play.png'
//             }
//           ]
//         },
//         {
//           tag: 'p',
//           textContent: `${audioDate}${audioName ? ` - ${audioName}` : ''}`
//         }
//       ]
//     })
//    }

//    record_btn.onclick = startRecord
//    save_btn.onclick = saveRecord
//    remove_btn.onclick = removeRecord
   
//    fetchRecords()
   
// const URL = 'voice.php';
// let div = document.createElement('div');
// div.id = 'messages';
// let start = document.createElement('button');
// start.id = 'start';
// start.innerHTML = 'Start';
// let stop = document.createElement('button');
// stop.id = 'stop';
// stop.innerHTML = 'Stop';
// document.body.appendChild(div);
// document.body.appendChild(start);
// document.body.appendChild(stop);
// navigator.mediaDevices.getUserMedia({ audio: true})
//     .then(stream => {
//         const mediaRecorder = new MediaRecorder(stream);

//         document.querySelector('#start').addEventListener('click', function(){
//             mediaRecorder.start();
//         });
//         let audioChunks = [];
//         mediaRecorder.addEventListener("dataavailable",function(event) {
//             audioChunks.push(event.data);
//         });

//         document.querySelector('#stop').addEventListener('click', function(){
//             mediaRecorder.stop();
//         });

//         mediaRecorder.addEventListener("stop", function() {
//             const audioBlob = new Blob(audioChunks, {
//                 type: 'audio/wav'
//             });

//             let fd = new FormData();
//             fd.append('voice', audioBlob);
//             sendVoice(fd);
//             audioChunks = [];
//         });
//     });

// async function sendVoice(form) {
//     document.form = form
//     }

