import { lightFormat } from 'date-fns';


import { add, create, divide, isInteger } from 'lodash';

const axios = require('axios').default;

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
            console.log(take)
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
        let ships = document.querySelectorAll('#drag')
        ships.forEach(ship => ship.addEventListener('dragstart', dragStart))
        player.forEach(array => array.forEach(square => square.addEventListener('dragstart', dragStart)))
        player.forEach(array => array.forEach(square => square.addEventListener('dragover', dragOver)))
        player.forEach(array => array.forEach(square => square.addEventListener('dragenter', dragEnter)))
        player.forEach(array => array.forEach(square => square.addEventListener('dragleave', dragLeave)))
        player.forEach(array => array.forEach(square => square.addEventListener('drop', dragDrop)))
        player.forEach(array => array.forEach(square => square.addEventListener('dragend', dragEnd)))
        let selectedShipNameWithIndex;
        let draggedShip;
        let draggedShipLength;

        ships.forEach(ship => ship.addEventListener('mousedown', (e) => {
            selectedShipNameWithIndex = e.target.id
            draggedShipLength = e.target.childElementCount
            console.log(selectedShipNameWithIndex)
        }))

        function dragStart() {
            draggedShip = this
            draggedShipLength = this.children.length
            console.log(draggedShipLength)
            console.log(draggedShip)
            return draggedShipLength
        }

        function dragOver(e) {
            e.preventDefault()
        }

        function dragEnter(e) {
            e.preventDefault()
        }

        function dragLeave() {
            console.log('drag leave')
        }
        let kuck = 0

        function dragDrop(e) {
            let sub = document.querySelector('.sub')
            let battle = document.querySelector('.battle')
            let carri = document.querySelector('.carri')
            let destroy = document.querySelector('.destroy')
            let cruise = document.querySelector('.cruise')
            let curr = e.target
            let findx = parseInt(curr.getAttribute('x-axis'))
            let findy = parseInt(curr.getAttribute('y-axis'))
            let width = parseInt(draggedShipLength)
            let check = []
            for (let n = 0; n < width; n++) {
                if (option) {
                    if ((10 < (findx + width))) {
                        e.preventDefault()
                    } else {
                        check.push(player[findy][findx + n].classList.contains('took'))
                    }
                } else if (!option) {
                    if ((10 < (findy + width))) {
                        e.preventDefault()
                    } else {
                        check.push(player[findy + n][findx].classList.contains('took'))
                    }
                }

            }

            if (!check.includes(true)) {
                for (let n = 0; n < width; n++) {
                    if (option && !(10 < (findx + width))) {
                        if (width === 5) {
                            player[findy][findx + n].classList.add('took', 'carrier')
                            carri.remove()
                        } else if (width === 4) {
                            player[findy][findx + n].classList.add('took', 'battleship')
                            battle.remove()
                        } else if (width === 3) {
                            if (kuck < 3) {
                                player[findy][findx + n].classList.add('took', 'submarine')
                                sub.remove()
                                kuck++
                            } else {
                                player[findy][findx + n].classList.add('took', 'cruiser')
                                cruise.remove()
                            }
                        } else if (width === 2) {
                            player[findy][findx + n].classList.add('took', 'destroyer')
                            destroy.remove()
                        }

                    } else if (!option && !(10 < (findy + width))) {
                        if (width === 5) {
                            player[findy + n][findx].classList.add('took', 'carrier')
                            carri.remove()
                        } else if (width === 4) {
                            player[findy + n][findx].classList.add('took', 'battleship')
                            battle.remove()
                        } else if (width === 3) {
                            if (kuck < 3) {
                                player[findy + n][findx].classList.add('took', 'submarine')
                                sub.remove()
                                kuck++
                            } else {
                                player[findy + n][findx].classList.add('took', 'cruiser')
                                cruise.remove()
                            }
                        } else if (width === 2) {
                            player[findy + n][findx].classList.add('took', 'destroyer')
                            destroy.remove()
                        }
                    }
                }
            } else {
                check = []
                e.preventDefault()
            }
            check = []
        }


        function dragEnd() {
            console.log('dragend')
        }
    }

    draggables()


    document.querySelector('.start').addEventListener('click', gameStart)
    let bros = 0

    function gameStart() {
        let bruh = document.querySelectorAll('#drag')
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

    let carriPl = 5
    let battPl = 4
    let cruiPl = 3
    let destPl = 2
    let subPl = 3
    let carriC = 5
    let battC = 4
    let cruiC = 3
    let destC = 2
    let subC = 3

    function checkAll() {
        let words = document.querySelector('.wordState')
        if (carriPl === 0) {
            words.innerHTML = 'Players Carrier Has Sunk'
            carriPl--
        } else if (battPl === 0) {
            words.innerHTML = 'Players Battleship Has Sunk'
            battPl--
        } else if (cruiPl === 0) {
            words.innerHTML = 'Players Cruiser Has Sunk'
            cruiPl--
        } else if (subPl === 0) {
            words.innerHTML = 'Players Submarine Has Sunk'
            subPl--
        } else if (destPl === 0) {
            words.innerHTML = 'Players Destroyer Has Sunk'
            destPl--
        }
        if (carriC === 0) {
            words.innerHTML = 'Computers Carrier Has Sunk'
            carriC--
        } else if (destC === 0) {
            words.innerHTML = 'Computers Destroyer Has Sunk'
            destC--
        } else if (battC === 0) {
            words.innerHTML = 'Computers Battleship Has Sunk'
            battC--
        } else if (cruiC === 0) {
            words.innerHTML = 'Computers Cruiser Has Sunk'
            cruiC--
        } else if (subC === 0) {
            words.innerHTML = 'Computers Submarine Has Sunk'
            subC--
        }
        if (carriPl <= 0 && battPl <= 0 && subPl <= 0 && cruiPl <= 0 && destPl <= 0) {
            words.innerHTML = 'Computer Has Won'
            turn = 'won'
        } else if (carriC <= 0 && battC <= 0 && subC <= 0 && cruiC <= 0 && destC <= 0) {
            words.innerHTML = 'Player Has Won'
            turn = 'won'
        }



    }

    function game(e) {
        let curr = e.target
        if (bros > 0) {
            if (turn === 'player') {
                if (curr.classList.contains('took') && !curr.classList.contains('boom') && !curr.classList.contains('miss')) {
                    curr.classList.add('boom')
                    if (curr.classList.contains('carrier')) {
                        carriC--
                    } else if (curr.classList.contains('battleship')) {
                        battC--
                    } else if (curr.classList.contains('submarine')) {
                        subC--
                    } else if (curr.classList.contains('cruiser')) {
                        cruiC--
                    } else if (curr.classList.contains('destroyer')) {
                        destC--
                    }
                    turn = 'computer'
                    checkAll()
                    computer()
                } else if (!curr.classList.contains('boom') && !curr.classList.contains('miss')) {
                    curr.classList.add('miss')
                    turn = 'computer'
                    computer()
                }
            }
        }
    }

    function computer() {
        const starth = Math.floor(Math.random() * 10)
        const startv = Math.floor(Math.random() * 10)
        if (turn === 'computer') {
            if (player[starth][startv].classList.contains('took') && !player[starth][startv].classList.contains('boom') && !player[starth][startv].classList.contains('miss')) {
                player[starth][startv].classList.add('boom')
                player[starth][startv].classList.remove('took')
                if (player[starth][startv].classList.contains('carrier')) {
                    carriPl--
                } else if (player[starth][startv].classList.contains('battleship')) {
                    battPl--
                } else if (player[starth][startv].classList.contains('submarine')) {
                    subPl--
                } else if (player[starth][startv].classList.contains('cruiser')) {
                    cruiPl--
                } else if (player[starth][startv].classList.contains('destroyer')) {
                    destPl--
                }
                turn = 'player'
                checkAll()
            } else if (!player[starth][startv].classList.contains('boom') && !player[starth][startv].classList.contains('miss')) {
                player[starth][startv].classList.add('miss')
                turn = 'player'
            } else {
                return computer()
            }
        }
    }

}
myPage()
export { myPage };