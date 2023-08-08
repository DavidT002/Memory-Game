document.querySelector(".control-buttons span").onclick = function () {
    
    let yourName = prompt("Whats Your Name?");

    if(yourName == null || yourName == ""){
        document.querySelector(".name span").innerHTML = 'Unknown';
    }
    else {
        document.querySelector(".name span").innerHTML = yourName;
    }

    document.querySelector(".control-buttons").remove();

};


let duration = 1000;
let blocksContainer = document.querySelector(".memory-game-blocks");
let blocks = Array.from(blocksContainer.children);
let orderRange = Array.from(Array(blocks.length).keys());

shuffle(orderRange);

blocks.forEach((block, index) => {
    block.style.order = orderRange[index];

    block.addEventListener('click', function () {
        flipBlock(block);
    });
});

function flipBlock(selectedBlock){
    selectedBlock.classList.add('is-flipped');
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

    if(allFlippedBlocks.length === 2) {
        stopClicking();
        checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
    }

    if(allFlippedBlocks.length === 19) {
        alert("GOOD JOB!");
    }

    const tryAgainButton = document.querySelector('.try-again-button');
    tryAgainButton.style.display = 'block';

    tryAgainButton.addEventListener('click', () => {
        resetGame();
        tryAgainButton.style.display = 'none';
    });
}

function stopClicking(){
    blocksContainer.classList.add('no-clicking');
    setTimeout(() => {
        blocksContainer.classList.remove('no-clicking');
    }, duration);

}

function checkMatchedBlocks(firstBlock, secondBlock) {
    let triesElement = document.querySelector('.tries span');

    if(firstBlock.dataset.technology === secondBlock.dataset.technology){
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped'); 

        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match'); 

        document.getElementById('success').play();
    }

    else{
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

        setTimeout(() => {
            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped'); 
        }, duration);
        document.getElementById('fail').play();
    }
}

function shuffle(array){
    let current = array.length, temp, random;

    while(current > 0){
        random = Math.floor(Math.random() * current);
        current--;
        temp = array[current];
        array[current] = array[random];
        array[random] = temp;
    }
    return array;
}

function resetGame(){
    blocks.forEach(block => {
        block.classList.remove("is-flipped", 'has-match');
    });

    document.querySelector('.tries span').innerHTML = '0';

    codeRange = shuffle(orderRange);
    blocks.forEach((block, index) => {
        block.style.order = orderRange[index];
    });
}