document.querySelector(".control-button .start").onclick = function () {
  let yourName = prompt("What Is Your Name ?");

  if (yourName === null || yourName === "") {
    document.querySelector(".name span").innerHTML = "Unknown";
  } else {
    document.querySelector(".name span").innerHTML = yourName;
  }

  document.querySelector(".control-button").remove();
};

// ========================================================================= //

let duration = 1000; // 1s === 1000 millseconds

let blocksContainer = document.querySelector(".memory-game-blocks");

let blocks = Array.from(blocksContainer.children);

// let orderRange = Array.from(Array(blocks.length).keys());
// OR
let orderRange = [...Array(blocks.length).keys()];

shuffle(orderRange);

// Shuffle Function
function shuffle(array) {
  let current = array.length;
  let temp, random;

  while (current > 0) {
    // Get Random Number
    random = Math.floor(Math.random() * current);

    // Decrease Length By One
    current--;

    // [1] Save Current Element In Stash
    temp = array[current];

    // [2] Current Element = Random Element
    array[current] = array[random];

    // [3] Random Element = Get Element Form Stash
    array[random] = temp;
  }

  return array;
}

// ========================================================================= //

// Add Order Css Property To Games Blocks
blocks.forEach((block, index) => {
  block.style.order = orderRange[index];

  // Add Event Click
  block.addEventListener("click", function () {
    // Trigger The Flip Block Function
    flipBlock(block);
  });
});

// ========================================================================= //

// flip Block Function
function flipBlock(selectedBlock) {
  // Add Class Is-Flipped
  selectedBlock.classList.add("is-flipped");

  // Collect All Flipped Cards
  let allFlippedBlocks = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped")
  );

  // If There Is Two Selected Blocks
  if (allFlippedBlocks.length === 2) {
    // Stop Clicking Function
    stopClicking();

    // Check Matched Blocks Function
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}

// ========================================================================= //

// Stop Clicking Function

function stopClicking() {
  // Add Class No Clicking On Main Container
  blocksContainer.classList.add("no-clicking");

  // Remove Class No Clicking After The Duration
  setTimeout(() => {
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}

// ========================================================================= //

// Check Matched Blocks
function checkMatchedBlocks(firstBlock, secondBlock) {
  let triesElement = document.querySelector(".tries span");

  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");

    firstBlock.classList.add("has-matched");
    secondBlock.classList.add("has-matched");
    document.getElementById("success").play();
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, duration);
    document.getElementById("fail").play();
  }
}

// ========================================================================= //
