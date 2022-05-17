let rubashka = 'рубашка1.png'
let container = document.getElementsByClassName('container')[0]
let images = []
let a = [1, 2, 3, 4, 5, 6, 7, 8, 9]
let counter = 0;
let openCards = [];
let steps = document.getElementsByClassName('steps')[0];
let step = 0;
let newGame = document.getElementsByClassName('newGame')[0];
let wins = 0;
let title = document.getElementsByClassName('title')[0];
let h1 = document.getElementsByTagName('h1')[0];



title.onclick = function () {
    let allCards = document.getElementsByTagName('img')
    for (i = 0; i < 24; i++) {
       allCards[i].src = 'салют.jpg'
       allCards[i].style.borderRadius='83px';

       
    }
}
newGame.onclick = function () {
    counter = 0;
    document.body.style.background = 'url("геометрия.png")'
    step = 0;
    steps.innerHTML = 'Попытки: ' + step
    openCards = [];
    let allCards = document.getElementsByTagName('img')
    
    for (let i = 0; i < 24; i++) {
        allCards[i].src = 'рубашка.webp'
        allCards[i].style.pointerEvents = 'auto';
    }
    for (let i = images.length - 1; i > 0; i--) {
        let randomNumber = Math.floor(Math.random() * (i + 1))
        let vremenaya = images[i]
        images[i] = images[randomNumber]
        images[randomNumber] = vremenaya;
    }
}

for (let i = 1; i < 13; i++) {
    images.push('0 (' + i + ').jpg')
    images.push('0 (' + i + ').jpg')
}


for (let i = images.length - 1; i > 0; i--) {
    let randomNumber = Math.floor(Math.random() * (i + 1))
    let vremenaya = images[i]
    images[i] = images[randomNumber]
    images[randomNumber] = vremenaya;
}
for (let i = 0; i < 24; i++) {
    let img = document.createElement('img')
    img.src = rubashka
    title.onclick = function(){
        img.src = 'салют.jpg'
    }
    img.onclick = function (event) {
        // для извлечения напзвания картинки как в файле. Если игрок кликнул по рубашке, тогда засчитывать нажатие.
        if (img.getAttribute('src')==rubashka) {
            // добавить данную карточку в массив с открытыми карточками
            openCards.push(img)
            counter++;
            img.style.pointerEvents = 'none'
            // event.target - (тэг по которому кликает игрок)
            flipImage(event.target, images[i]);
            // если открыли 2 карточки
            if (counter == 2) {
                step++;
                steps.innerHTML = 'Попытки: ' + step;
                let cards = document.getElementsByTagName('img')
                // если картинки совпали                
                if (openCards[0].src == openCards[1].src) {
                    wins++
                    console.log('верно');
                    counter = 0;
                    openCards = [];
                    if (wins == 12) {
                        document.body.style.background = 'url("салют.jpg")'
                    }
                }
                else {
                    console.log('неверно');
                    // цикл перебирает все карточки и блокирует их
                    for (let card of cards) {
                        card.style.pointerEvents = 'none'
                    }
                    counter = 0;
                    // пауза пред закрытием двух карточек
                    setTimeout(() => {
                        openCards[0].src = rubashka
                        openCards[1].src = rubashka
                        for (let card of cards) {
                            card.style.pointerEvents = 'auto'
                        }
                        openCards = [];
                    }, 1000)
                }
            }
        }
    }
    // добавляет карточки в контеинер
    container.appendChild(img)

}
function flipImage(img, image) {
    img.src = image;

}






