function myPage() {
    let player = [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        []
    ]
    let ai = [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        []
    ]

    let findBoard = document.querySelector('.playHere')
    let findBoard2 = document.querySelector('.playHere2')


    function createBoard(board, array) {
        for (let k = 0; k < 10; k++) {
            for (let n = 0; n < 10; n++) {
                let createBlock = document.createElement('div')
                createBlock.className = 'block';
                createBlock.setAttribute('x-axis', n)
                createBlock.setAttribute('y-axis', k)
                board.appendChild(createBlock)
                array[k].push(createBlock)
            }
        }

    }
    createBoard(findBoard, player)
    createBoard(findBoard2, ai)



    let shipfus = [{
        name: 'destroyer',
        dir: [
            0, 1
        ]
    }, {
        name: 'submarine',
        dir: [
            0, 1, 2
        ]
    }, {
        name: 'cruiser',
        dir: [
            0, 1, 2
        ]
    }, {
        name: 'battleship',
        dir: [
            0, 1, 2, 3
        ]
    }, {
        name: 'carrier',
        dir: [
            0, 1, 2, 3, 4
        ]
    }]




    function shipMaker(ship) {
        let num = Math.floor(Math.random() * 2)
        let width = ship.dir.length

        if (num === 0) {
            const starth = Math.floor(Math.random() * 10)
            const startv = Math.floor(Math.random() * 10)
            let take = []
            for (let n = 0; n < width; n++) {
                if (startv >= 5) {
                    take.push(ai[starth][startv - n].classList.contains('took'))
                } else if (startv < 5) {
                    take.push(ai[starth][startv + n].classList.contains('took'))
                }
            }
            if (!take.includes(true)) {
                for (let n = 0; n < width; n++) {
                    if (startv >= 5) {
                        ai[starth][startv - n].classList.add('took', ship.name)
                    } else if (startv < 5) {
                        ai[starth][startv + n].classList.add('took', ship.name)
                    }
                }
            } else {
                take = []

                return shipMaker(ship)
            }
            take = []

        } else if (num === 1) {
            const starth = Math.floor(Math.random() * 10)
            const startv = Math.floor(Math.random() * 10)
            let take = []
            for (let n = 0; n < width; n++) {
                if (starth >= 5) {
                    take.push(ai[starth - n][startv].classList.contains('took'))

                } else if (starth < 5) {
                    take.push(ai[starth + n][startv].classList.contains('took'))
                }
            }

            if (!take.includes(true)) {
                for (let n = 0; n < width; n++) {
                    if (starth >= 5) {
                        ai[starth - n][startv].classList.add('took', ship.name)
                    } else if (starth < 5) {
                        ai[starth + n][startv].classList.add('took', ship.name)
                    }
                }
            } else {
                take = []
                return shipMaker(ship)
            }
            take = []

        }


    }
    shipMaker(shipfus[0])
    shipMaker(shipfus[1])
    shipMaker(shipfus[2])
    shipMaker(shipfus[3])
    shipMaker(shipfus[4])

    let option = true
    let rotateBtn = document.querySelector('.rotate')


    function rotate() {
        let sub = document.querySelector('.sub')
        let battle = document.querySelector('.battle')
        let carri = document.querySelector('.carri')
        let destroy = document.querySelector('.destroy')
        let cruise = document.querySelector('.cruise')
        let hold = document.querySelector('.shipTrans')
        if (option) {
            if (!(sub === null)) { sub.classList.toggle('vert-sub') }
            if (!(battle === null)) { battle.classList.toggle('vert-battle') }
            if (!(carri === null)) { carri.classList.toggle('vert-carri') }
            if (!(destroy === null)) { destroy.classList.toggle('vert-destroy') }
            if (!(cruise === null)) { cruise.classList.toggle('vert-cruise') }
            hold.classList.toggle('vert-shipTrans')
            option = false
            return
        }
        if (!option) {
            if (!(sub === null)) { sub.classList.toggle('vert-sub') }
            if (!(battle === null)) { battle.classList.toggle('vert-battle') }
            if (!(carri === null)) { carri.classList.toggle('vert-carri') }
            if (!(destroy === null)) { destroy.classList.toggle('vert-destroy') }
            if (!(cruise === null)) { cruise.classList.toggle('vert-cruise') }
            hold.classList.toggle('vert-shipTrans')
            option = true
            return
        }

    }
    rotateBtn.addEventListener('click', rotate)


function draggables() {
    const ships = document.querySelectorAll('.shipTrans .drag');

    let draggedShip = null;
    let draggedShipLength = 0;

    ships.forEach(ship => {
        ship.addEventListener('dragstart', e => e.preventDefault());

        ship.addEventListener('pointerdown', e => {
            e.preventDefault();

            draggedShip = ship;
            draggedShipLength = ship.children.length;

            ship.classList.add('dragging');
        });
    });

    function pointerMove(e) {
        if (!draggedShip) return;

        const target = document.elementFromPoint(e.clientX, e.clientY);
        const cell = target?.closest('.playHere .block');

        document.querySelectorAll('.hovered').forEach(square => {
            square.classList.remove('hovered');
        });

        if (cell) {
            cell.classList.add('hovered');
        }
    }

    function pointerUp(e) {
        if (!draggedShip) return;

        const target = document.elementFromPoint(e.clientX, e.clientY);
        const cell = target?.closest('.playHere .block');

        if (cell) {
            placeShip(cell);
        }

        draggedShip?.classList.remove('dragging');

        document.querySelectorAll('.hovered').forEach(square => {
            square.classList.remove('hovered');
        });

        draggedShip = null;
        draggedShipLength = 0;
    }

    document.addEventListener('pointermove', pointerMove);
    document.addEventListener('pointerup', pointerUp);
    document.addEventListener('pointercancel', pointerUp);

    function placeShip(cell) {
        const x = Number(cell.getAttribute('x-axis'));
        const y = Number(cell.getAttribute('y-axis'));

        const width = draggedShipLength;
        const horizontal = option;

        if (horizontal && x + width > 10) return;
        if (!horizontal && y + width > 10) return;

        const squares = [];

        for (let n = 0; n < width; n++) {
            const square = horizontal
                ? player[y][x + n]
                : player[y + n][x];

            if (square.classList.contains('took')) return;

            squares.push(square);
        }

        let shipClass;

        if (draggedShip.classList.contains('carri')) {
            shipClass = 'carrier';
        } else if (draggedShip.classList.contains('battle')) {
            shipClass = 'battleship';
        } else if (draggedShip.classList.contains('cruise')) {
            shipClass = 'cruiser';
        } else if (draggedShip.classList.contains('sub')) {
            shipClass = 'submarine';
        } else if (draggedShip.classList.contains('destroy')) {
            shipClass = 'destroyer';
        }

        if (!shipClass) return;

        squares.forEach(square => {
            square.classList.add('took', shipClass);
        });

        draggedShip.remove();
    }
}
draggables();




    document.querySelector('.start').addEventListener('click', gameStart)
    let bros = 0

    function gameStart() {
        let bruh = document.querySelectorAll('.drag')
        if (bruh.length === 0) {
            bros++
            document.querySelector('.start').style.visibility = 'hidden'
            document.querySelector('.wordState').innerHTML = 'Game Start'

        } else {
            alert('Place Your Ships')
        }
    }

    ai.forEach(array => array.forEach(square => square.addEventListener('click', game)))
    let turn = 'player'

    let carriPl = { life: 5 }
    let battPl = { life: 4 }
    let cruiPl = { life: 3 }
    let destPl = { life: 2 }
    let subPl = { life: 3 }

    let carriC = { life: 5 }
    let battC = { life: 4 }
    let cruiC = { life: 3 }
    let destC = { life: 2 }
    let subC = { life: 3 }

    function checkAll() {
        let words = document.querySelector('.wordState')
        if (carriPl.life === 0) {
            words.innerHTML = 'Players Carrier Has Sunk'
            carriPl.life--
        } else if (battPl.life === 0) {
            words.innerHTML = 'Players Battleship Has Sunk'
            battPl.life--
        } else if (cruiPl.life === 0) {
            words.innerHTML = 'Players Cruiser Has Sunk'
            cruiPl.life--
        } else if (subPl.life === 0) {
            words.innerHTML = 'Players Submarine Has Sunk'
            subPl.life--
        } else if (destPl.life === 0) {
            words.innerHTML = 'Players Destroyer Has Sunk'
            destPl.life--
        }
        if (carriC.life === 0) {
            words.innerHTML = 'Computers Carrier Has Sunk'
            carriC.life--
        } else if (destC.life === 0) {
            words.innerHTML = 'Computers Destroyer Has Sunk'
            destC.life--
        } else if (battC.life === 0) {
            words.innerHTML = 'Computers Battleship Has Sunk'
            battC.life--
        } else if (cruiC.life === 0) {
            words.innerHTML = 'Computers Cruiser Has Sunk'
            cruiC.life--
        } else if (subC.life === 0) {
            words.innerHTML = 'Computers Submarine Has Sunk'
            subC.life--
        }
        if (carriPl.life <= 0 && battPl.life <= 0 && subPl.life <= 0 && cruiPl.life <= 0 && destPl.life <= 0) {
            words.innerHTML = 'Computer Has Won'
            turn = 'won'
            bros=0;
        } else if (carriC.life <= 0 && battC.life <= 0 && subC.life <= 0 && cruiC.life <= 0 && destC.life <= 0) {
            words.innerHTML = 'Player Has Won'
            turn = 'won'
            bros=0;
        }



    }

    function game(e) {
        let curr = e.target
        if (bros > 0) {
            if (turn === 'player') {
                if (curr.classList.contains('took') && !curr.classList.contains('boom') && !curr.classList.contains('miss')) {
                    curr.classList.add('boom')
                    if (curr.classList.contains('carrier')) {
                        carriC.life--
                    } else if (curr.classList.contains('battleship')) {
                        battC.life--
                    } else if (curr.classList.contains('submarine')) {
                        subC.life--
                    } else if (curr.classList.contains('cruiser')) {
                        cruiC.life--
                    } else if (curr.classList.contains('destroyer')) {
                        destC.life--
                    }
                    checkAll()
                } else if (!curr.classList.contains('boom') && !curr.classList.contains('miss')) {
                    curr.classList.add('miss')
                    turn = 'computer'
                    return computer()
                }
            }
        }
    }
    let save = []
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    async function computer() {
        if (turn === 'computer') {
            if(save.length < 1 ){
                let starth = (Math.floor(Math.random() * 10) );
                let startv;
                if (starth % 2 == 0) {
                    startv = 1 + Math.floor(Math.random() * 5) * 2
                }
                 else {
                    startv = Math.floor(Math.random() * 5) * 2;
                }
                if (player[starth][startv].classList.contains('took')) {
                    player[starth][startv].classList.add('boom')
                    player[starth][startv].classList.remove('took')
                    if (player[starth][startv].classList.contains('carrier')) {
                        carriPl.life--
                        save.push({x:startv,y:starth, name: 'carrier',  dir: [checkUp, checkDown, checkLeft, checkRight], life: carriPl})
                    } else if (player[starth][startv].classList.contains('battleship')) {
                        battPl.life--
                        save.push({x:startv,y:starth,name:'battleship',  dir: [checkUp, checkDown, checkLeft, checkRight], life: battPl})
                    } else if (player[starth][startv].classList.contains('submarine')) {
                        subPl.life--
                        save.push({x:startv,y:starth, name: 'submarine',  dir: [checkUp, checkDown, checkLeft, checkRight], life: subPl})
                    } else if (player[starth][startv].classList.contains('cruiser')) {
                        cruiPl.life--
                        save.push({x:startv,y:starth, name: 'cruiser', dir: [checkUp, checkDown, checkLeft, checkRight], life: cruiPl})
                    } else if (player[starth][startv].classList.contains('destroyer')) {
                        destPl.life--
                        save.push({x:startv,y:starth, name: 'destroyer',  dir: [checkUp, checkDown, checkLeft, checkRight], life: destPl})
                    }
                    checkAll()
                    return computer();
                } else if (!player[starth][startv].classList.contains('boom') && !player[starth][startv].classList.contains('miss')) {
                    player[starth][startv].classList.add('miss')
                    turn = 'player'
                } else {
                    return computer()
                }
            } else {
                let current = save.pop()
                let saver = 1
                while(current.dir.length > 0){
                    await sleep(500);
                    let getDir = current.dir.pop()
                    let getAns = getDir(current, saver)
                    if(current.life.life > 0 && getAns === 1){
                        current.dir.push(getDir)
                        saver++
                    }else if(getAns === 0){
                        break;
                    }else{
                        saver = 1
                        if(current.life.life < 1){
                            return computer()
                        }
                    }
                }
                if(current.dir.length > 0 && current.life.life > 0){
                    save.push(current)
                }
                turn = 'player'
            }
        }
    }
    function checkLeft(current, addder){
                let starth = current.y
                let startv = current.x - addder
                if(startv > -1){
                    if(player[starth][startv].classList.contains('took')){
                    player[starth][startv].classList.add('boom')
                    player[starth][startv].classList.remove('took')
                    if(player[starth][startv].classList.contains(current.name)){
                        current.life.life--
                        checkAll()
                        if(current.life.life < 1){
                            return -1
                        }
                        return 1
                    }
                    else if (player[starth][startv].classList.contains('carrier')) {
                        carriPl.life--
                        save.push({x:startv,y:starth, name: 'carrier',  dir: [checkUp, checkDown, checkLeft, checkRight], life: carriPl})
                    } else if (player[starth][startv].classList.contains('battleship')) {
                        battPl.life--
                        save.push({x:startv,y:starth,name:'battleship',  dir: [checkUp, checkDown, checkLeft, checkRight], life: battPl})
                    } else if (player[starth][startv].classList.contains('submarine')) {
                        subPl.life--
                        save.push({x:startv,y:starth, name: 'submarine',  dir: [checkUp, checkDown, checkLeft, checkRight], life: subPl})
                    } else if (player[starth][startv].classList.contains('cruiser')) {
                        cruiPl.life--
                        save.push({x:startv,y:starth, name: 'cruiser', dir: [checkUp, checkDown, checkLeft, checkRight], life: cruiPl})
                    } else if (player[starth][startv].classList.contains('destroyer')) {
                        destPl.life--
                        save.push({x:startv,y:starth, name: 'destroyer',  dir: [checkUp, checkDown, checkLeft, checkRight], life: destPl})
                    }
                        checkAll()
                        return -1;
                    } 
                     if(!player[starth][startv].classList.contains('boom') && !player[starth][startv].classList.contains('miss')){
                        player[starth][startv].classList.add('miss')
                        return 0
                    }
                    return -1
                }else{
                    return -1;
                }
    }
    function checkRight(current, addder){
        let starth = current.y
        let startv = current.x + addder
                if(startv < 10){
                    if(player[starth][startv].classList.contains('took')){
                        player[starth][startv].classList.add('boom')
                        player[starth][startv].classList.remove('took')
                        if(player[starth][startv].classList.contains(current.name)){
                        current.life.life--
                        checkAll()
                        if(current.life.life < 1){
                            return -1
                        }
                        return 1
                    }
                    else if (player[starth][startv].classList.contains('carrier')) {
                        carriPl.life--
                        save.push({x:startv,y:starth, name: 'carrier',  dir: [checkUp, checkDown, checkLeft, checkRight], life: carriPl})
                    } else if (player[starth][startv].classList.contains('battleship')) {
                        battPl.life--
                        save.push({x:startv,y:starth,name:'battleship',  dir: [checkUp, checkDown, checkLeft, checkRight], life: battPl})
                    } else if (player[starth][startv].classList.contains('submarine')) {
                        subPl.life--
                        save.push({x:startv,y:starth, name: 'submarine',  dir: [checkUp, checkDown, checkLeft, checkRight], life: subPl})
                    } else if (player[starth][startv].classList.contains('cruiser')) {
                        cruiPl.life--
                        save.push({x:startv,y:starth, name: 'cruiser', dir: [checkUp, checkDown, checkLeft, checkRight], life: cruiPl})
                    } else if (player[starth][startv].classList.contains('destroyer')) {
                        destPl.life--
                        save.push({x:startv,y:starth, name: 'destroyer',  dir: [checkUp, checkDown, checkLeft, checkRight], life: destPl})
                    }
                        checkAll()
                        return -1;
                    }
                    if(!player[starth][startv].classList.contains('boom') && !player[starth][startv].classList.contains('miss')){
                        player[starth][startv].classList.add('miss')
                        return 0
                    }
                    return -1
                }else{
                    return -1;
                }
    }
    function checkUp(current, addder){
        let starth = current.y - addder
        let startv = current.x
        if(starth> -1){
                    if(player[starth][startv].classList.contains('took')){
                        player[starth][startv].classList.add('boom')
                        player[starth][startv].classList.remove('took')
                        if(player[starth][startv].classList.contains(current.name)){
                        current.life.life--
                        checkAll()
                        if(current.life.life < 1){
                            return -1
                        }
                        return 1
                    }
                    else if (player[starth][startv].classList.contains('carrier')) {
                        carriPl.life--
                        save.push({x:startv,y:starth, name: 'carrier',  dir: [checkUp, checkDown, checkLeft, checkRight], life: carriPl})
                    } else if (player[starth][startv].classList.contains('battleship')) {
                        battPl.life--
                        save.push({x:startv,y:starth,name:'battleship',  dir: [checkUp, checkDown, checkLeft, checkRight], life: battPl})
                    } else if (player[starth][startv].classList.contains('submarine')) {
                        subPl.life--
                        save.push({x:startv,y:starth, name: 'submarine',  dir: [checkUp, checkDown, checkLeft, checkRight], life: subPl})
                    } else if (player[starth][startv].classList.contains('cruiser')) {
                        cruiPl.life--
                        save.push({x:startv,y:starth, name: 'cruiser', dir: [checkUp, checkDown, checkLeft, checkRight], life: cruiPl})
                    } else if (player[starth][startv].classList.contains('destroyer')) {
                        destPl.life--
                        save.push({x:startv,y:starth, name: 'destroyer',  dir: [checkUp, checkDown, checkLeft, checkRight], life: destPl})
                    }
                        checkAll()
                        return -1;
                    }
                    if(!player[starth][startv].classList.contains('boom') && !player[starth][startv].classList.contains('miss')){
                        player[starth][startv].classList.add('miss')
                        return 0
                    }
                    return -1
                }else{
                    return -1;
                }
    }
    function checkDown(current, addder){
        let starth = current.y + addder
        let startv = current.x
        if(starth < 10){
                    if(player[starth][startv].classList.contains('took')){
                    player[starth][startv].classList.add('boom')
                    player[starth][startv].classList.remove('took')
                    if(player[starth][startv].classList.contains(current.name)){
                        current.life.life--
                        checkAll()
                        if(current.life.life < 1){
                            return -1
                        }
                        return 1
                    }
                    else if (player[starth][startv].classList.contains('carrier')) {
                        carriPl.life--
                        save.push({x:startv,y:starth, name: 'carrier',  dir: [checkUp, checkDown, checkLeft, checkRight], life: carriPl})
                    } else if (player[starth][startv].classList.contains('battleship')) {
                        battPl.life--
                        save.push({x:startv,y:starth,name:'battleship',  dir: [checkUp, checkDown, checkLeft, checkRight], life: battPl})
                    } else if (player[starth][startv].classList.contains('submarine')) {
                        subPl.life--
                        save.push({x:startv,y:starth, name: 'submarine',  dir: [checkUp, checkDown, checkLeft, checkRight], life: subPl})
                    } else if (player[starth][startv].classList.contains('cruiser')) {
                        cruiPl.life--
                        save.push({x:startv,y:starth, name: 'cruiser', dir: [checkUp, checkDown, checkLeft, checkRight], life: cruiPl})
                    } else if (player[starth][startv].classList.contains('destroyer')) {
                        destPl.life--
                        save.push({x:startv,y:starth, name: 'destroyer',  dir: [checkUp, checkDown, checkLeft, checkRight], life: destPl})
                    }
                        checkAll()
                        return -1;
                    }
                    if(!player[starth][startv].classList.contains('boom') && !player[starth][startv].classList.contains('miss')){
                        player[starth][startv].classList.add('miss')
                        return 0
                    }
                    return -1
                }else{
                    return -1;
                }
    }
}
myPage()
export { myPage };
myPage()
export { myPage };
