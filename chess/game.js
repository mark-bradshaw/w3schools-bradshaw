import { Chess } from './chess.js';
const chess = new Chess();
console.log(chess.ascii());

const turn = document.querySelector('#turn');
const cells = document.querySelectorAll('.cell');
const pieces = document.querySelectorAll('.piece');
let allowedMoves = [];

function handleDragStart(e) {
  // A move that ends in "+" means a check.
  // Moves are prepended with the piece type, so "Nf3" means a knight to f3.
  // We are just going to use the last two characters as a location id to match.
  allowedMoves = chess.moves({ square: e.target.parentNode.id }).map(m => m.replace('+', '').substr(-2));

  e.target.style.opacity = '0.4';
  if (allowedMoves.length === 0) {
    return false;
  }

  e.target.classList.add('dragging');
  allowedMoves.forEach(id => {
    document.getElementById(id).classList.add('allowed');
  });
}

function handleDragEnd(e) {
  e.target.style.opacity = '1';

  cells.forEach(cell => {
    cell.classList.remove('over');
    cell.classList.remove('allowed');
  });
}

function handleDragOver(e) {
  e.preventDefault();
  return false;
}

function handleDragEnter(e) {
  if (allowedMoves.length === 0) {
    return false;
  }

  let dropTarget = e.target;
  if (dropTarget.classList.contains('piece')) {
    dropTarget = dropTarget.parentNode;
  }
  if (allowedMoves.includes(dropTarget.id)) {
    e.target.classList.add('over');
  }
}

function handleDragLeave(e) {
  e.target.classList.remove('over');
}

function handleDrop(e) {
  e.preventDefault();
  e.stopPropagation();

  if (allowedMoves.length === 0) {
    return false;
  }

  const piece = document.querySelector('.piece.dragging');
  piece.classList.remove('dragging');
  const myColor = piece.classList.contains('black') ? 'black' : 'white';

  let dropTarget = e.target;
  let targetPiece;
  if (dropTarget.classList.contains('piece')) {
    targetPiece = dropTarget;
    dropTarget = targetPiece.parentNode;
  } else if (dropTarget.querySelector('.piece')) {
    targetPiece = dropTarget.querySelector('.piece');
  }

  const moveOptions = { from: piece.parentNode.id, to: dropTarget.id};
  const allowed = chess.move(moveOptions);
  console.log(chess.ascii());

  if (!allowed) {
    console.log('Disallowed by chess.js');
    return false;
  }

  if (targetPiece && !targetPiece.classList.contains(myColor)) {
      console.log('dropping on opponent piece');
      targetPiece.remove();
  }

  dropTarget.appendChild(piece);
  turn.innerHTML = chess.turn() === 'w' ? 'Turn: White' : 'Turn: Black';

  if (chess.turn() === 'w') {
    document.querySelectorAll('.piece.white').forEach(p => p.draggable = true);
    document.querySelectorAll('.piece.black').forEach(p => p.draggable = false);
  } else {
    document.querySelectorAll('.piece.white').forEach(p => p.draggable = false);
    document.querySelectorAll('.piece.black').forEach(p => p.draggable = true);
  }

  console.log('in check', chess.in_check());
  console.log('in checkmate', chess.in_checkmate());
  console.log('game over', chess.game_over());
}

pieces.forEach(p => {
  p.addEventListener('dragstart', handleDragStart);
  p.addEventListener('dragend', handleDragEnd);
});

cells.forEach(cell => {
  cell.addEventListener('dragstart', handleDragStart);
  cell.addEventListener('dragover', handleDragOver);
  cell.addEventListener('dragenter', handleDragEnter);
  cell.addEventListener('dragleave', handleDragLeave);
  cell.addEventListener('dragend', handleDragEnd);
  cell.addEventListener('drop', handleDrop);
});