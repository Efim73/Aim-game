let container = document.getElementsByClassName('container')[0]
let images = []
let a = [1, 2, 3, 4, 5, 6, 7, 8, 9]
let counter = 0;
let openCards = [];



for (let i = 1; i < 13; i++) {
    images.push('0 (' + i + ').jpg')
    images.push('0 (' + i + ').jpg')
}
for (let i = 0; i < 24; i++) {
    let img = document.createElement('img')
    img.src = 'рубашка.webp'
    img.onclick = function (event) {
        if (img.src == 'рубашка.webp') {

            openCards.push(img)
            counter++;
        }

        img.style.pointerEvents = 'none'
        flipImage(event.target, images[i]);
        if (counter == 2) {
            let cards = document.getElementsByTagName('img')
            if (openCards[0].src == openCards[1].src) {
                console.log('верно');
                counter = 0;
                openCards = [];

                // for(let card of cards){
                //     card.style.pointerEvents='auto'
                // }
            }
            else {
                console.log('неверно');
                for (let card of cards) {
                    card.style.pointerEvents = 'none'
                }
                counter = 0;
                setTimeout(() => {
                    openCards[0].src = 'рубашка.webp'
                    openCards[1].src = 'рубашка.webp'
                    for (let card of cards) {
                        card.style.pointerEvents = 'auto'
                    }


                    openCards = [];
                }, 1000)

            }

        }

    }
    container.appendChild(img)

}
function flipImage(img, image) {
    img.src = image;

    // img.src='0 ('+Math.floor(Math.random()*12+1)+').jpg';

}
for (let i = a.length - 1; i > 0; i--) {
    let randomNumber = Math.floor(Math.random() * (i + 1))
    let vremenaya = a[i]
    a[i] = a[randomNumber]
    a[randomNumber] = vremenaya;
}