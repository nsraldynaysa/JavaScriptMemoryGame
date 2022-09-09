
document.querySelector(".control-buttons span").onclick = function () {
    
    let yourName = prompt("Whats your name?");

    if (yourName == null || yourName == "") {

        document.querySelector(".name span").innerHTML = 'Unknown';

    } else {

        document.querySelector(".name span").innerHTML = yourName;

    }

    document.querySelector(".control-buttons").remove();
};

//Effect Duration
let duration = 1000;

// Select Blocks Container
let blocksContainer = document.querySelector(".memory-game-blocks");

// Create Array From Game Blocks
let blocks = Array.from(blocksContainer.children);

// Create Range Of Keys
// let orderRange = [...Array(blocks.length).keys()];
let orderRange = Array.from(Array(blocks.length).keys());

// Run Shuffel Funtion
shuffle(orderRange);
// console.log(orderRange);

// Add Order Css Property To Game Blocks
blocks.forEach((block, index) => {

    block.style.order = orderRange[index];

    // Add Click Event
    block.addEventListener('click', function () {

        flipBlock(block);
    });

});

// Flip Block Function
function flipBlock(SelectedBlock) {

    // Add Class is-flipped
    SelectedBlock.classList.add('is-flipped');

    // Collect All Flipped Cards
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

    // If Theres Two Selected Blocks
    if (allFlippedBlocks.length === 2) {

    // Stop Clicking Function
        stopClicking();

    // Check Matched Block Function
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);

    }
}

// Stop Clicking Function
function stopClicking() {

    //Add Class no Clicking on Main Container
    blocksContainer.classList.add('no-clicking');

    setTimeout(() => {

        blocksContainer.classList.remove('no-clicking');

    }, duration);
}

// Check Matched Block 
function checkMatchedBlocks(firstBlock, secondBlock) {

    let triesElement =document.querySelector('.tries span');

    if (firstBlock.dataset.cars === secondBlock.dataset.cars) {

        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');

       // document.getElementById('success').play();

    } else {
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

        setTimeout(() => {

            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');    

        }, duration);

      //  document.getElementById('fail').play();
    }
}

// Shuffle Function
function shuffle(array) {
    // Setting Vars
    let current = array.length,
        temp,
        random;

    while (current > 0) {

        // Get Random Number
        random = Math.floor(Math.random() * current);

        // Decrease Length By One
        current--;

        // [1] Save Current Element in Stash
        temp = array[current];
        
        // [2] Current Element = Random Element
        array[current] = array[random];

        // [3] random Element = GEt Element From Stash
        array[random] = temp;
    }

    return array;
}