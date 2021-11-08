const container = document.getElementById('worker-container');
const sidebar = document.getElementById('sidebar');

const professionList = document.getElementById('profession-list');
const sidebarProfession = document.getElementById('profession-search');
const workObjectList = document.getElementById('work-object-list');
const sidebarWorkObject = document.getElementById('work-objects-search');
const sidebarButtons = [sidebarProfession, sidebarWorkObject];

const specificProfessionUrl = '/api/getAllWorkerByProfession/';
const allProfessionUrl = '/api/getAllProfession';
const specificWorkObjectUrl = '/api/getAllWorkerByWorkObject/';
const allWorkObjectUrl = '/api/getAllWorkObject';

const footerElement = document.getElementById('footer');

const workerCardContainer = document.getElementById('worker-card-container');

const pageTitle = document.getElementById('specificWorkerText');

function sidebarHeight() {
    const divisibleWithThree = (document.getElementsByClassName('worker-card').length % 3 === 0) ;
    const workerElements = Math.floor((document.getElementsByClassName('worker-card').length) / 3);
    console.log(workerElements)
    if (workerElements < 1) {
        footerElement.style.marginTop = '400px';
        sidebar.style.height = `${(workerElements + 2) * 330}px`
    } else if (document.getElementsByClassName('worker-card').length === 3) {
        footerElement.style.marginTop = '400px';
        sidebar.style.height = `${660}px`
    }else {
        if (divisibleWithThree) {
            sidebar.style.height = `${(workerElements) * 420}px`
        } else {
            sidebar.style.height = `${(workerElements + 1) * 420}px`
        }
        footerElement.style.marginTop = '30px';
    }
}

setInterval(sidebarHeight, 100);



function activateSideBarButton(button, url, listDiv, url2) {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        if (button.style.color === 'white') {
            button.style.color = '#818181';
        } else {
            button.style.color = 'white';
        }
        if (listDiv.childNodes.length < 2) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    for (const element of data) {
                        let node = document.createElement("LI");
                        let textNode = document.createTextNode(element);
                        node.appendChild(textNode);
                        node.style.fontSize = '18px'
                        node.style.marginLeft = '20px';
                        node.style.color = '#818181';
                        node.style.cursor = 'pointer';
                        node.addEventListener('mouseover', ()=> {
                            node.style.color = 'white';
                        })
                        node.addEventListener('mouseleave', ()=> {
                            node.style.color = '#818181';
                        })
                        node.addEventListener('click', (e) => {
                                node.style.color = 'white'
                                fetchWorkerCards(`${url2}${node.innerText}`);

                                let currentTitle = "Work Object";
                                if (url2.includes("Profession")) {
                                    currentTitle = 'Profession';
                                }
                            pageTitle.innerText = `Searched ${currentTitle} : ${node.innerText}`;

                        })
                        listDiv.appendChild(node)

                    }
                })
        } else {
            listDiv.innerHTML = "";
        }
    })
}

activateSideBarButton(sidebarProfession, allProfessionUrl, professionList, specificProfessionUrl);
activateSideBarButton(sidebarWorkObject, allWorkObjectUrl, workObjectList, specificWorkObjectUrl);

function fetchWorkerCards(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let currentContent = "";
            for (let worker of data) {
                let currentProfession = "";
                for (let profession of worker.profession) {
                    currentProfession+= profession;
                    currentProfession+= ", ";
                }
                currentContent += `
                    <div class="worker-card">
                        <div class="worker-detail">
                            <a href="/profile/${worker.userId}">
                                <img src="/img/${worker.image}">
                                <br>
                                <h3>
                                    ${worker.firstName} ${worker.lastName} (${worker.age})
                                </h3><br>
                                <h4>Profession(s): </h4>
                                <span class="professions">
                                    ${currentProfession.slice(0, -2)}
                            </span><br><br>
                            </a>
                        </div>
                    </div>
                `

            }
            workerCardContainer.innerHTML = currentContent;
        })
}