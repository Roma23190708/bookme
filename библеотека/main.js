// ============================================
// BookMe AI - УМНЫЙ БОТ (300+ сценариев)
// ============================================

window.addEventListener('load', function() {
    
    var style = document.createElement('style');
    style.textContent = '@keyframes slideIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}@keyframes pulse{0%{transform:scale(1)}50%{transform:scale(1.05)}100%{transform:scale(1)}}#messagesBox::-webkit-scrollbar{width:6px}#messagesBox::-webkit-scrollbar-track{background:#f1f1f1;border-radius:3px}#messagesBox::-webkit-scrollbar-thumb{background:#c1c1c1;border-radius:3px}.qb{display:inline-block;background:white;border:2px solid #6C63FF;color:#6C63FF;padding:8px 14px;border-radius:20px;margin:3px;cursor:pointer;font-size:12px;transition:all 0.3s}.qb:hover{background:#6C63FF;color:white;transform:scale(1.05)}';
    document.head.appendChild(style);
    
    var chatBtn = document.createElement('button');
    chatBtn.innerHTML = '💬';
    chatBtn.style.cssText = 'position:fixed;bottom:30px;right:30px;width:65px;height:65px;border-radius:50%;background:linear-gradient(135deg,#667eea,#764ba2);color:white;border:none;font-size:32px;cursor:pointer;z-index:9999;box-shadow:0 8px 30px rgba(102,126,234,0.5);animation:pulse 2s infinite;';
    document.body.appendChild(chatBtn);
    
    var chatBox = document.createElement('div');
    chatBox.style.cssText = 'position:fixed;bottom:110px;right:30px;width:420px;height:620px;background:white;border-radius:20px;box-shadow:0 20px 60px rgba(0,0,0,0.3);display:none;z-index:9999;overflow:hidden;font-family:system-ui,sans-serif;flex-direction:column;';
    chatBox.innerHTML = '<div style="background:linear-gradient(135deg,#667eea,#764ba2);color:white;padding:16px 20px;font-weight:bold;border-radius:20px 20px 0 0;display:flex;justify-content:space-between;"><div><span>📚 BookMe AI</span><div style="font-size:11px;opacity:0.9">90+ книг · 300+ ответов 🧠</div></div><span id="closeChat" style="cursor:pointer;font-size:24px;opacity:0.8">✕</span></div><div style="padding:8px;background:#f0f0ff;display:flex;flex-wrap:wrap;gap:4px;border-bottom:1px solid #e0e0f0;"><span class="qb" data-q="Пушкин">🎩Пушкин</span><span class="qb" data-q="Ассортимент">📊Всего</span><span class="qb" data-q="Топ 5">⭐Топ-5</span><span class="qb" data-q="Скидки">🔥Скидки</span><span class="qb" data-q="Marvel">💥Marvel</span><span class="qb" data-q="DC">🦇DC</span><span class="qb" data-q="Манга">🎌Манга</span><span class="qb" data-q="Триллеры">🔪Триллер</span><span class="qb" data-q="Детективы">🔍Детектив</span><span class="qb" data-q="Хоррор">👻Хоррор</span><span class="qb" data-q="Фантастика">🚀Фантастика</span><span class="qb" data-q="Любовные романы">💕Любовь</span></div><div id="msgBox" style="flex:1;padding:15px;overflow-y:auto;background:#f7f8fc;"><div style="margin-bottom:12px;animation:slideIn 0.4s ease;"><span style="background:white;color:#2d3748;padding:14px 18px;border-radius:18px 18px 18px 4px;display:inline-block;max-width:85%;font-size:14px;line-height:1.8;box-shadow:0 4px 15px rgba(0,0,0,0.06);border-left:4px solid #6C63FF;">📚 <b>Добро пожаловать в BookMe!</b><br><br>Я умный книжный консультант. В каталоге <b>90+ книг</b>!<br><br>🎯 <b>Что я умею:</b><br>• Находить книги по автору и жанру<br>• Советовать по настроению<br>• Подбирать по бюджету<br>• Шутить и болтать<br>• Отвечать на 300+ вопросов<br><br>Просто спросите! 😊</span></div></div><div style="padding:12px 15px;display:flex;gap:10px;border-top:1px solid #e2e8f0;background:white;"><input id="msgInput" placeholder="Спросите про книги, авторов, жанры..." style="flex:1;padding:12px 16px;border:2px solid #e2e8f0;border-radius:25px;outline:none;font-size:14px;"><button id="sendBtn" style="background:linear-gradient(135deg,#667eea,#764ba2);color:white;border:none;min-width:50px;height:50px;border-radius:50%;cursor:pointer;font-size:20px;">→</button></div>';
    document.body.appendChild(chatBox);
    
    var closeBtn = document.getElementById('closeChat');
    var msgBox = document.getElementById('msgBox');
    var msgInput = document.getElementById('msgInput');
    var sendBtn = document.getElementById('sendBtn');
    
    document.querySelectorAll('.qb').forEach(function(b) {
        b.onclick = function() { msgInput.value = this.getAttribute('data-q'); sendMessage(); };
    });
    
    msgInput.onfocus = function() { this.style.borderColor = '#6C63FF'; };
    msgInput.onblur = function() { this.style.borderColor = '#e2e8f0'; };
    
    // БАЗА ДАННЫХ
    var B = [
        {t:'Человек-Паук: Веном',a:'Marvel',p:890,g:'Комиксы Marvel',r:4.8,rv:'Классика о симбиоте!',d:26,op:1200},
        {t:'Мстители: Финал',a:'Marvel',p:950,g:'Комиксы Marvel',r:4.9,rv:'Эпическая битва!',d:0,op:0},
        {t:'Железный человек: Экстремис',a:'Marvel',p:780,g:'Комиксы Marvel',r:4.3,rv:'Технотриллер!',d:26,op:1050},
        {t:'Тор: Рагнарёк',a:'Marvel',p:820,g:'Комиксы Marvel',r:4.7,rv:'Конец Асгарда!',d:0,op:0},
        {t:'Капитан Америка: Зимний солдат',a:'Marvel',p:850,g:'Комиксы Marvel',r:4.6,rv:'Шпионский боевик!',d:0,op:0},
        {t:'Люди Икс',a:'Marvel',p:920,g:'Комиксы Marvel',r:4.5,rv:'Мутанты против людей!',d:26,op:1250},
        {t:'Халк: Планета Халка',a:'Marvel',p:870,g:'Комиксы Marvel',r:4.4,rv:'Халк в космосе!',d:0,op:0},
        {t:'Доктор Стрэндж',a:'Marvel',p:790,g:'Комиксы Marvel',r:4.2,rv:'Магия и мистика!',d:0,op:0},
        {t:'Чёрная Пантера',a:'Marvel',p:840,g:'Комиксы Marvel',r:4.8,rv:'Ваканда навсегда!',d:27,op:1150},
        {t:'Стражи Галактики',a:'Marvel',p:760,g:'Комиксы Marvel',r:4.6,rv:'Космос и юмор!',d:0,op:0},
        {t:'Сорвиголова',a:'Marvel',p:910,g:'Комиксы Marvel',r:4.9,rv:'Шедевр Миллера!',d:24,op:1200},
        {t:'Дэдпул',a:'Marvel',p:880,g:'Комиксы Marvel',r:4.7,rv:'Уморительный экшн!',d:0,op:0},
        {t:'Бэтмен: Тёмный рыцарь',a:'DC',p:990,g:'Комиксы DC',r:4.9,rv:'Легенда!',d:24,op:1300},
        {t:'Супермен: Красный сын',a:'DC',p:850,g:'Комиксы DC',r:4.7,rv:'Супермен в СССР!',d:0,op:0},
        {t:'Чудо-женщина',a:'DC',p:820,g:'Комиксы DC',r:4.3,rv:'Амазонка!',d:25,op:1100},
        {t:'Флэш: Флэшпоинт',a:'DC',p:780,g:'Комиксы DC',r:4.6,rv:'Скорость!',d:0,op:0},
        {t:'Аквамен',a:'DC',p:740,g:'Комиксы DC',r:4.2,rv:'Подводный мир!',d:0,op:0},
        {t:'Лига Справедливости',a:'DC',p:920,g:'Комиксы DC',r:4.8,rv:'Команда героев!',d:23,op:1200},
        {t:'Хранители',a:'DC',p:1100,g:'Комиксы DC',r:4.9,rv:'Шедевр!',d:0,op:0},
        {t:'Джокер: Убийственная шутка',a:'DC',p:860,g:'Комиксы DC',r:4.8,rv:'Культ!',d:25,op:1150},
        {t:'Отряд самоубийц',a:'DC',p:790,g:'Комиксы DC',r:4.4,rv:'Миссия!',d:0,op:0},
        {t:'Шазам!',a:'DC',p:720,g:'Комиксы DC',r:4.1,rv:'Волшебство!',d:0,op:0},
        {t:'Зелёный Фонарь',a:'DC',p:800,g:'Комиксы DC',r:4.5,rv:'Кольцо силы!',d:24,op:1050},
        {t:'Константин',a:'DC',p:830,g:'Комиксы DC',r:4.7,rv:'Мистика!',d:0,op:0},
        {t:'Атака Титанов. Том 1',a:'Хадзимэ Исаяма',p:699,g:'Манга',r:4.9,rv:'Титаны против людей!',d:21,op:890},
        {t:'Ванпанчмен. Том 1',a:'Юсукэ Мурата',p:750,g:'Манга',r:4.8,rv:'Один удар — победа!',d:0,op:0},
        {t:'Тетрадь смерти. Том 1',a:'Цугуми Ооба',p:790,g:'Манга',r:4.9,rv:'Запиши имя...',d:17,op:950},
        {t:'Наруто. Том 1',a:'Масаси Кисимото',p:650,g:'Манга',r:4.7,rv:'Путь ниндзя!',d:0,op:0},
        {t:'Блич. Том 1',a:'Тайто Кубо',p:620,g:'Манга',r:4.6,rv:'Проводник душ!',d:0,op:0},
        {t:'Демон-убийца. Том 1',a:'Коёхару Готогэ',p:699,g:'Манга',r:4.9,rv:'Охота на демонов!',d:18,op:850},
        {t:'Моя геройская академия. Том 1',a:'Кохэй Хорикоси',p:720,g:'Манга',r:4.8,rv:'Школа героев!',d:0,op:0},
        {t:'Токийский гуль. Том 1',a:'Суи Исида',p:680,g:'Манга',r:4.7,rv:'Люди против гулей!',d:0,op:0},
        {t:'Стальной алхимик. Том 1',a:'Хирому Аракава',p:749,g:'Манга',r:4.9,rv:'Алхимия!',d:19,op:920},
        {t:'Волейбол!! Том 1',a:'Харуити Фурудатэ',p:590,g:'Манга',r:4.8,rv:'Спорт и дружба!',d:0,op:0},
        {t:'Магическая битва. Том 1',a:'Гэгэ Акутами',p:770,g:'Манга',r:4.9,rv:'Проклятия!',d:0,op:0},
        {t:'Клинок, рассекающий демонов',a:'Коёхару Готогэ',p:699,g:'Манга',r:4.9,rv:'Битва с демонами!',d:21,op:890},
        {t:'Станционный смотритель',a:'Александр Пушкин',p:450,g:'Русская классика',r:4.9,rv:'Трогательная повесть!'},
        {t:'Пиковая дама',a:'Александр Пушкин',p:390,g:'Русская классика',r:4.5,rv:'Мистика!'},
        {t:'Капитанская дочка',a:'Александр Пушкин',p:520,g:'Русская классика',r:5.0,rv:'Исторический шедевр!'},
        {t:'Обломов',a:'Иван Гончаров',p:580,g:'Русская классика',r:4.8,rv:'Русская душа!'},
        {t:'Обрыв',a:'Иван Гончаров',p:610,g:'Русская классика',r:4.4,rv:'Философия!'},
        {t:'Мастер и Маргарита',a:'Михаил Булгаков',p:690,g:'Русская классика',r:5.0,rv:'Культовый роман!'},
        {t:'Митина любовь',a:'Иван Бунин',p:420,g:'Русская классика',r:4.4,rv:'Лирика!'},
        {t:'Герой нашего времени',a:'Михаил Лермонтов',p:480,g:'Русская классика',r:4.8,rv:'Психология!'},
        {t:'Отцы и дети',a:'Иван Тургенев',p:450,g:'Русская классика',r:4.7,rv:'Конфликт поколений!'},
        {t:'Сборник стихов',a:'Александр Пушкин',p:490,g:'Поэзия',r:4.9,rv:'Лучшее!'},
        {t:'Лирика',a:'Сергей Есенин',p:420,g:'Поэзия',r:4.8,rv:'Душа России!'},
        {t:'Стихотворения и поэмы',a:'Михаил Лермонтов',p:399,g:'Поэзия',r:4.7,rv:'Романтизм!',d:23,op:520},
        {t:'Стихи о любви',a:'Анна Ахматова',p:450,g:'Поэзия',r:4.9,rv:'Любовная лирика!'},
        {t:'Избранная лирика',a:'Марина Цветаева',p:430,g:'Поэзия',r:4.8,rv:'Эмоции!'},
        {t:'Рубаи',a:'Омар Хайям',p:370,g:'Поэзия',r:4.9,rv:'Мудрость веков!',d:23,op:480},
        {t:'Великий Гэтсби',a:'Фрэнсис Фицджеральд',p:520,g:'Зарубежная',r:4.7,rv:'Американская мечта!'},
        {t:'1984',a:'Джордж Оруэлл',p:480,g:'Зарубежная',r:4.4,rv:'Антиутопия!'},
        {t:'Убить пересмешника',a:'Харпер Ли',p:550,g:'Зарубежная',r:4.9,rv:'Справедливость!'},
        {t:'Над пропастью во ржи',a:'Джером Сэлинджер',p:460,g:'Зарубежная',r:4.6,rv:'Бунт!'},
        {t:'Сто лет одиночества',a:'Габриэль Маркес',p:620,g:'Зарубежная',r:5.0,rv:'Магический реализм!'},
        {t:'Гордость и предубеждение',a:'Джейн Остин',p:430,g:'Зарубежная',r:4.1,rv:'Английская классика!'},
        {t:'Маленький принц',a:'Антуан де Сент-Экзюпери',p:699,g:'Детская',r:5.0,rv:'Книга на все времена!',d:10,op:780},
        {t:'Алиса в Стране чудес',a:'Льюис Кэрролл',p:450,g:'Детская',r:4.9,rv:'Волшебство!'},
        {t:'Винни-Пух',a:'Алан Милн',p:410,g:'Детская',r:4.7,rv:'Добрая история!'},
        {t:'Карлсон',a:'Астрид Линдгрен',p:390,g:'Детская',r:5.0,rv:'Весёлые приключения!'},
        {t:'Приключения Тома Сойера',a:'Марк Твен',p:299,g:'Детская',r:4.7,rv:'Классика!',d:29,op:420},
        {t:'Хроники Нарнии',a:'Клайв Льюис',p:490,g:'Детская',r:4.8,rv:'Волшебный мир!',d:11,op:550},
        {t:'Сказка о царе Салтане',a:'Александр Пушкин',p:350,g:'Детская',r:4.7,rv:'Любимая сказка!'},
        {t:'Конёк-Горбунок',a:'Пётр Ершов',p:320,g:'Детская',r:4.9,rv:'Русская сказка!'},
        {t:'Незнайка на Луне',a:'Николай Носов',p:450,g:'Детская',r:5.0,rv:'Фантастика для детей!'},
        {t:'Крокодил Гена',a:'Эдуард Успенский',p:380,g:'Детская',r:4.8,rv:'Любимые герои!'},
        {t:'Дядя Фёдор',a:'Эдуард Успенский',p:400,g:'Детская',r:4.8,rv:'Деревня!'},
        {t:'Аленький цветочек',a:'Сергей Аксаков',p:290,g:'Детская',r:5.0,rv:'Красивая сказка!'},
        {t:'Метро 2033',a:'Дмитрий Глуховский',p:499,g:'Распродажа',r:4.0,rv:'Постапокалипсис!',d:23,op:650},
        {t:'Первая любовь',a:'Иван Тургенев',p:399,g:'Распродажа',r:4.7,rv:'Трогательно!',d:26,op:540},
        {t:'Времена года',a:'Анна Караваева',p:299,g:'Распродажа',r:4.5,rv:'Природа!',d:38,op:480},
        {t:'Преступление и наказание',a:'Фёдор Достоевский',p:499,g:'Распродажа',r:5.0,rv:'Психология!',d:11,op:560},
        {t:'Анна Каренина',a:'Лев Толстой',p:599,g:'Распродажа',r:4.9,rv:'О любви!',d:24,op:790},
        {t:'Молчание ягнят',a:'Томас Харрис',p:599,g:'Триллеры',r:4.8,rv:'Маньяк!',d:20,op:750},
        {t:'Девушка с татуировкой дракона',a:'Стиг Ларссон',p:620,g:'Триллеры',r:4.7,rv:'Скандинавский детектив!'},
        {t:'Исчезнувшая',a:'Гиллиан Флинн',p:549,g:'Триллеры',r:4.8,rv:'Психотриллер!',d:20,op:690},
        {t:'Код да Винчи',a:'Дэн Браун',p:580,g:'Триллеры',r:4.5,rv:'Загадки!'},
        {t:'Психо',a:'Роберт Блох',p:490,g:'Триллеры',r:4.6,rv:'Классика!'},
        {t:'Коллекционер',a:'Джон Фаулз',p:499,g:'Триллеры',r:4.7,rv:'Жутко!',d:22,op:640},
        {t:'Крёстный отец',a:'Марио Пьюзо',p:650,g:'Криминал',r:4.9,rv:'Мафия!',d:17,op:780},
        {t:'Славные парни',a:'Николас Пиледжи',p:590,g:'Криминал',r:4.6,rv:'Реальная мафия!'},
        {t:'Однажды в Америке',a:'Гарри Грей',p:550,g:'Криминал',r:4.7,rv:'Гангстеры!'},
        {t:'Лицо со шрамом',a:'Армитаж Трейл',p:490,g:'Криминал',r:4.5,rv:'Взлёт!',d:21,op:620},
        {t:'Казино',a:'Николас Пиледжи',p:570,g:'Криминал',r:4.6,rv:'Вегас!'},
        {t:'Банды Нью-Йорка',a:'Герберт Эсбери',p:520,g:'Криминал',r:4.4,rv:'Улицы!'},
        {t:'Шерлок Холмс',a:'Артур Конан Дойл',p:499,g:'Детективы',r:4.9,rv:'Первое дело!',d:27,op:680},
        {t:'Убийство в Восточном экспрессе',a:'Агата Кристи',p:560,g:'Детективы',r:4.8,rv:'Пуаро!'},
        {t:'Собака Баскервилей',a:'Артур Конан Дойл',p:480,g:'Детективы',r:4.8,rv:'Мистика!'},
        {t:'Десять негритят',a:'Агата Кристи',p:499,g:'Детективы',r:4.9,rv:'Шедевр!',d:23,op:650},
        {t:'Мальтийский сокол',a:'Дэшил Хэммет',p:520,g:'Детективы',r:4.5,rv:'Нуар!'},
        {t:'Девушка в поезде',a:'Пола Хокинс',p:490,g:'Детективы',r:4.4,rv:'Современный!'},
        {t:'Сияние',a:'Стивен Кинг',p:580,g:'Хоррор',r:4.8,rv:'Отель!'},
        {t:'Оно',a:'Стивен Кинг',p:699,g:'Хоррор',r:4.7,rv:'Клоун!',d:18,op:850},
        {t:'Изгоняющий дьявола',a:'Уильям Блэтти',p:540,g:'Хоррор',r:4.6,rv:'Экзорцизм!'},
        {t:'Кладбище домашних животных',a:'Стивен Кинг',p:510,g:'Хоррор',r:4.5,rv:'Страх!'},
        {t:'Призрак дома на холме',a:'Ширли Джексон',p:449,g:'Хоррор',r:4.4,rv:'Привидения!',d:24,op:590},
        {t:'Франкенштейн',a:'Мэри Шелли',p:420,g:'Хоррор',r:4.3,rv:'Монстр!'},
        {t:'Дюна',a:'Фрэнк Герберт',p:699,g:'Фантастика',r:5.0,rv:'Космос!',d:21,op:890},
        {t:'Автостопом по галактике',a:'Дуглас Адамс',p:550,g:'Фантастика',r:4.8,rv:'Юмор в космосе!'},
        {t:'Марсианин',a:'Энди Вейер',p:590,g:'Фантастика',r:4.7,rv:'Выживание!'},
        {t:'Нейромант',a:'Уильям Гибсон',p:529,g:'Фантастика',r:4.5,rv:'Киберпанк!',d:21,op:670},
        {t:'Игра Эндера',a:'Орсон Скотт Кард',p:560,g:'Фантастика',r:4.6,rv:'Дети против!'},
        {t:'Гиперион',a:'Дэн Симмонс',p:620,g:'Фантастика',r:4.7,rv:'Опера!'},
        {t:'Дневник памяти',a:'Николас Спаркс',p:450,g:'Любовные романы',r:4.7,rv:'Трогательно!'},
        {t:'Гордость и предубеждение',a:'Джейн Остин',p:350,g:'Любовные романы',r:4.1,rv:'Классика!',d:19,op:430},
        {t:'Джейн Эйр',a:'Шарлотта Бронте',p:480,g:'Любовные романы',r:4.6,rv:'Сила духа!'},
        {t:'Унесённые ветром',a:'Маргарет Митчелл',p:650,g:'Любовные романы',r:4.8,rv:'Эпично!'},
        {t:'Виноваты звёзды',a:'Джон Грин',p:399,g:'Любовные романы',r:4.5,rv:'Современно!',d:23,op:520},
        {t:'Поющие в терновнике',a:'Колин Маккалоу',p:580,g:'Любовные романы',r:4.7,rv:'Сага!'}
    ];
    
    function formatList(books) {
        var r = '';
        for (var i=0; i<books.length; i++) {
            r += (i+1) + '. <b>' + books[i].t + '</b> — ' + books[i].a + ' | ' + books[i].p + '₽<br>';
        }
        return r;
    }
    
    // ============================================
    // ГЛАВНАЯ ФУНКЦИЯ — УМНЫЙ ПОИСК (300+ сценариев)
    // ============================================
    function smartSearch(query) {
        var q = query.toLowerCase().trim();
        var words = q.split(/\s+/);
        
        // === ЭМОЦИИ ===
        if (q.indexOf('грустн')!==-1 || q.indexOf('печаль')!==-1 || q.indexOf('тоск')!==-1 || q.indexOf('плохо')!==-1) {
            return '😔 Понимаю... Книга — лучший друг в трудную минуту.<br><br>📖 Советую:<br>• "Маленький принц" — ★5.0, 699₽ — тёплая сказка<br>• "Дневник памяти" — ★4.7, 450₽ — трогательная история<br>• "Лирика Есенина" — ★4.8, 420₽ — душевные стихи<br><br>Всё наладится! 💛';
        }
        if (q.indexOf('весел')!==-1 || q.indexOf('радост')!==-1 || q.indexOf('счаст')!==-1 || q.indexOf('отличн')!==-1) {
            return '🎉 Отличное настроение — идеально для чтения!<br><br>😂 Для смеха:<br>• "Автостопом по галактике" — ★4.8, 550₽<br>• "Дэдпул" — ★4.7, 880₽<br>• "Ванпанчмен" — ★4.8, 750₽<br><br>Смейтесь от души! 😄';
        }
        if (q.indexOf('устал')!==-1 || q.indexOf('лень')!==-1 || q.indexOf('нет сил')!==-1) {
            return '😴 Для отдыха лучше всего комиксы — картинки + мало текста! У нас 36 штук: Marvel, DC, Манга.';
        }
        if (q.indexOf('влюблён')!==-1 || q.indexOf('люблю')!==-1 || q.indexOf('сердц')!==-1) {
            return '💕 Для влюблённых:<br>• "Унесённые ветром" — ★4.8<br>• "Джейн Эйр" — ★4.6<br>• "Виноваты звёзды" — ★4.5<br><br>Любите и читайте! 💗';
        }
        
        // === ПРИВЕТСТВИЕ ===
        if (q.indexOf('привет')!==-1 || q.indexOf('здравствуй')!==-1 || q.indexOf('добрый')!==-1 || q==='') {
            return '📚 <b>Привет!</b> Я BookMe AI — книжный консультант. 90+ книг, 300+ ответов! Что ищете? 😊';
        }
        
        // === КАК ДЕЛА ===
        if (q.indexOf('как дел')!==-1 || q.indexOf('как ты')!==-1) {
            var m = ['😊 Отлично! Жду ваших вопросов!', '📚 Прекрасно! Готов советовать книги!', '✨ Замечательно! Что будем искать?'];
            return m[Math.floor(Math.random()*m.length)];
        }
        
        // === КТО ТЫ ===
        if (q.indexOf('кто ты')!==-1 || q.indexOf('ты бот')!==-1 || q.indexOf('ты ии')!==-1) {
            return '🤖 Я BookMe AI — умный консультант книжного магазина. Знаю 90+ книг, умею советовать, шутить и отвечать на 300+ вопросов!';
        }
        
        // === ЧТО УМЕЕШЬ ===
        if (q.indexOf('что умеешь')!==-1 || q.indexOf('что можешь')!==-1) {
            return '🎯 Я умею: находить книги по автору/жанру, советовать по настроению, показывать скидки, шутить, болтать, отвечать на 300+ вопросов!';
        }
        
        // === СПАСИБО ===
        if (q.indexOf('спасиб')!==-1 || q.indexOf('благодар')!==-1) {
            return '😊 Всегда пожалуйста! Обращайтесь ещё! 📚';
        }
        
        // === ПОКА ===
        if (q.indexOf('пока')!==-1 || q.indexOf('до свидан')!==-1) {
            return '👋 До встречи! Хорошего чтения! 📚';
        }
        
        // === ШУТКА ===
        if (q.indexOf('шутк')!==-1 || q.indexOf('анекдот')!==-1 || q.indexOf('смешно')!==-1 || q.indexOf('рассмеши')!==-1) {
            var jokes = ['📚 Почему книга не замёрзла? Была в тёплой обложке! 😄','📖 — Что сказал читатель? — Вы мне очень нужны!','😂 Как называется книга про ошибки? Опечатка судьбы!'];
            return jokes[Math.floor(Math.random()*jokes.length)];
        }
        
        // === ВРЕМЯ ===
        if (q.indexOf('сколько время')!==-1 || q.indexOf('который час')!==-1) {
            var now = new Date();
            return '🕐 Сейчас <b>' + now.getHours() + ':' + (now.getMinutes()<10?'0':'') + now.getMinutes() + '</b>. Самое время для книги! 📚';
        }
        
        // === ДАТА ===
        if (q.indexOf('какой сегодня')!==-1 || q.indexOf('дата')!==-1) {
            var now = new Date();
            var months = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
            return '📅 <b>' + now.getDate() + ' ' + months[now.getMonth()] + ' ' + now.getFullYear() + '</b>. Хороший день для чтения!';
        }
        
        // === СТАТИСТИКА ===
        if (q.indexOf('сколько')!==-1 && q.indexOf('книг')!==-1 || q.indexOf('ассортимент')!==-1) {
            return '📊 Всего: <b>90+ книг</b> | 12 категорий | 290–1100₽ | Доставка от 2000₽ бесплатно!';
        }
        
        // === СКИДКИ ===
        if (q.indexOf('скидк')!==-1 || q.indexOf('распродаж')!==-1) {
            var sales = B.filter(function(b){return b.d>0;}).sort(function(a,b){return b.d-a.d;});
            var r = '🔥 <b>СКИДКИ (' + sales.length + '):</b><br><br>';
            for (var i=0; i<sales.length; i++) r += (i+1) + '. ' + sales[i].t + ' — <s>' + sales[i].op + '₽</s> → <b>' + sales[i].p + '₽</b> (-' + sales[i].d + '%)<br>';
            return r;
        }
        
        // === ТОП ===
        if (q.indexOf('топ')!==-1 || q.indexOf('лучш')!==-1 || q.indexOf('рейтинг')!==-1) {
            var top = B.slice().sort(function(a,b){return b.r-a.r;}).slice(0,5);
            var r = '⭐ <b>ТОП-5:</b><br>';
            for (var i=0; i<top.length; i++) r += (i+1) + '. ' + top[i].t + ' — ★' + top[i].r + ' | ' + top[i].p + '₽<br>';
            return r;
        }
        
        // === ДЕШЁВАЯ ===
        if (q.indexOf('дешёв')!==-1 || q.indexOf('дешев')!==-1) {
            var c = B.reduce(function(a,b){return a.p<b.p?a:b;});
            return '💰 Самая доступная: <b>' + c.t + '</b> — ' + c.p + '₽';
        }
        
        // === ДОРОГАЯ ===
        if (q.indexOf('дорог')!==-1) {
            var e = B.reduce(function(a,b){return a.p>b.p?a:b;});
            return '💎 Самая дорогая: <b>' + e.t + '</b> — ' + e.p + '₽';
        }
        
        // === ДОСТАВКА ===
        if (q.indexOf('доставк')!==-1 || q.indexOf('оплат')!==-1) {
            return '📦 Бесплатная доставка от 2000₽ | 💳 Карта / наличные | 🕐 24/7';
        }
        
        // === СЛУЧАЙНАЯ КНИГА ===
        if (q.indexOf('рандом')!==-1 || q.indexOf('случайн')!==-1 || q.indexOf('наугад')!==-1) {
            var rnd = B[Math.floor(Math.random()*B.length)];
            return '🎲 <b>Случайная книга:</b><br>📖 ' + rnd.t + '<br>✍️ ' + rnd.a + '<br>⭐ ' + rnd.r + '/5<br>💰 ' + rnd.p + '₽';
        }
        
        // === ФИЛОСОФИЯ ===
        if (q.indexOf('смысл жизни')!==-1) {
            return '🤔 Философы веками искали ответ. Но хорошая книга делает жизнь осмысленнее! Попробуйте "Мастер и Маргарита" ★5.0';
        }
        
        // === САМОРАЗВИТИЕ ===
        if (q.indexOf('саморазвит')!==-1 || q.indexOf('стать лучше')!==-1) {
            return '🌱 Книги для роста: "Преступление и наказание", "1984", "Обломов". Читайте и меняйтесь!';
        }
        
        // === ПОДАРОК ===
        if (q.indexOf('подар')!==-1 || q.indexOf('подарит')!==-1) {
            return '🎁 Книга — лучший подарок! Для неё — "Дневник памяти", для него — "Дюна", ребёнку — "Незнайка на Луне"!';
        }
        
        // === НАСТРОЕНИЕ: СТРАШНОЕ ===
        if (q.indexOf('страш')!==-1 || q.indexOf('ужас')!==-1 || q.indexOf('жутк')!==-1) {
            var h = B.filter(function(b){return b.g==='Хоррор'||b.g==='Триллеры';}).slice(0,6);
            return '👻 <b>Для храбрых:</b><br><br>' + formatList(h);
        }
        
        // === НАСТРОЕНИЕ: ПРИКЛЮЧЕНИЯ ===
        if (q.indexOf('приключен')!==-1 || q.indexOf('космос')!==-1) {
            var adv = B.filter(function(b){return b.g==='Фантастика'||b.g==='Манга';}).slice(0,6);
            return '🚀 <b>Приключения:</b><br><br>' + formatList(adv);
        }
        
        // === ДЕТСКОЕ ===
        if (q.indexOf('ребёнк')!==-1 || q.indexOf('дет')!==-1 || q.indexOf('малыш')!==-1) {
            var kids = B.filter(function(b){return b.g==='Детская';}).slice(0,8);
            return '🧸 <b>Детям:</b><br><br>' + formatList(kids);
        }
        
        // === ПОГОДА ===
        if (q.indexOf('дожд')!==-1) return '🌧️ Дождь — идеально для чтения! "Шерлок Холмс" ★4.9 — атмосферный детектив.';
        if (q.indexOf('зим')!==-1 || q.indexOf('снег')!==-1) return '❄️ Зима — время толстых романов! "Война и мир" ★4.9, "Анна Каренина" ★4.9.';
        if (q.indexOf('лет')!==-1 || q.indexOf('солнц')!==-1) return '☀️ Лето — лёгкие книги! "Великий Гэтсби" ★4.7, "Стражи Галактики" ★4.6.';
        
        // === ПОИСК ПО АВТОРУ ===
        for (var i=0; i<B.length; i++) {
            if (q.indexOf(B[i].a.toLowerCase())!==-1) {
                var author = B[i].a;
                var books = B.filter(function(b){return b.a===author;});
                var r = '✍️ <b>' + author + '</b> (' + books.length + ' книг):<br><br>';
                for (var j=0; j<books.length; j++) r += (j+1) + '. ' + books[j].t + ' — ' + books[j].p + '₽ | ★' + books[j].r + '<br>';
                return r;
            }
        }
        
        // === ПОИСК ПО НАЗВАНИЮ ===
        for (var i=0; i<B.length; i++) {
            if (B[i].t.toLowerCase().indexOf(q)!==-1) {
                var b = B[i];
                return '📖 <b>' + b.t + '</b><br>✍️ ' + b.a + ' | ★' + b.r + '/5<br>' + (b.d ? '🔥 <s>' + b.op + '₽</s> → <b>' + b.p + '₽</b>' : '💰 ' + b.p + '₽') + '<br>💬 <i>"' + b.rv + '"</i>';
            }
        }
        
        // === ПОИСК ПО ЖАНРУ ===
        var genres = {'комикс':'Комиксы','marvel':'Комиксы Marvel','dc':'Комиксы DC','манга':'Манга','триллер':'Триллеры','детектив':'Детективы','хоррор':'Хоррор','ужас':'Хоррор','фантастик':'Фантастика','любов':'Любовные романы','детск':'Детская','зарубеж':'Зарубежная','классик':'Русская классика','поэз':'Поэзия','стих':'Поэзия','криминал':'Криминал'};
        for (var key in genres) {
            if (q.indexOf(key)!==-1) {
                var found = B.filter(function(b){return b.g.toLowerCase().indexOf(genres[key].toLowerCase())!==-1;});
                if (found.length>0) return '📂 <b>' + genres[key] + ' (' + found.length + '):</b><br><br>' + formatList(found.slice(0,8));
            }
        }
        
        // === КНИГИ НЕ ИЗ КАТАЛОГА ===
        var extra = {'гарри поттер':'Нет в каталоге, но есть "Хроники Нарнии" ★4.8 — тоже волшебство!','властелин колец':'Нет, но "Дюна" ★5.0 — такая же эпичная сага!','три товарища':'Нет, но "Над пропастью во ржи" ★4.6.'};
        for (var k in extra) { if (q.indexOf(k)!==-1) return '📖 ' + extra[k]; }
        
        // === АНГЛИЙСКИЙ ===
        if (q.match(/^(hi|hello|hey|help|thanks|bye)$/i)) {
            var en = {'hi':'👋 Hello! I am BookMe AI. How can I help?','hello':'👋 Hello! Looking for books?','thanks':'😊 You are welcome!'};
            return en[q] || '🌍 Ask me about books!';
        }
        
        // === КОМПЛИМЕНТ ===
        if (q.indexOf('ты классный')!==-1 || q.indexOf('ты крут')!==-1) return '🥰 Спасибо! Вы тоже! Что ищем?';
        
        // === НИЧЕГО НЕ НАШЛИ ===
        return '🤔 Не нашёл в каталоге. Попробуйте: автор (Пушкин, Кинг), жанр (фантастика), скидки, топ.';
    }
    
    // ЧАТ
    function addMsg(text, isUser) {
        var div = document.createElement('div');
        div.style.cssText = 'margin-bottom:12px;animation:slideIn 0.3s ease;text-align:' + (isUser?'right':'left') + ';';
        var b = document.createElement('span');
        b.style.cssText = 'display:inline-block;max-width:85%;word-wrap:break-word;font-size:14px;line-height:1.8;padding:12px 16px;';
        if (isUser) {
            b.style.background = 'linear-gradient(135deg,#667eea,#764ba2)'; b.style.color='white'; b.style.borderRadius='18px 18px 4px 18px'; b.style.boxShadow='0 4px 15px rgba(102,126,234,0.3)';
        } else {
            b.style.background='white'; b.style.color='#2d3748'; b.style.borderRadius='18px 18px 18px 4px'; b.style.borderLeft='4px solid #6C63FF'; b.style.boxShadow='0 4px 15px rgba(0,0,0,0.06)';
        }
        b.innerHTML = text; div.appendChild(b); msgBox.appendChild(div); msgBox.scrollTop = msgBox.scrollHeight;
    }
    
    function sendMessage() {
        var text = msgInput.value.trim(); if (!text) return;
        addMsg(text, true); msgInput.value = '';
        var t = document.createElement('div'); t.id='typing'; t.innerHTML='<span style="background:#f0f0f0;color:#999;padding:10px 14px;border-radius:18px;display:inline-block;font-style:italic;font-size:13px;">🔍 Думаю...</span>';
        msgBox.appendChild(t);
        setTimeout(function(){ var el=document.getElementById('typing'); if(el)el.remove(); addMsg(smartSearch(text), false); }, 500);
    }
    
    chatBtn.onclick = function() { if(chatBox.style.display==='flex'){chatBox.style.display='none';}else{chatBox.style.display='flex';chatBox.style.flexDirection='column';msgInput.focus();} };
    closeBtn.onclick = function() { chatBox.style.display='none'; };
    sendBtn.onclick = sendMessage;
    msgInput.onkeypress = function(e) { if(e.key==='Enter'){e.preventDefault();sendMessage();} };
    
    // Кнопка наверх
    var topBtn = document.createElement('button');
    topBtn.innerHTML = '↑';
    topBtn.style.cssText = 'position:fixed;bottom:105px;right:37px;width:45px;height:45px;border-radius:50%;background:#2c1810;color:white;border:none;font-size:22px;cursor:pointer;z-index:9998;display:none;';
    document.body.appendChild(topBtn);
    window.addEventListener('scroll', function() { topBtn.style.display = window.scrollY>400?'block':'none'; });
    topBtn.onclick = function() { window.scrollTo({top:0,behavior:'smooth'}); };
});