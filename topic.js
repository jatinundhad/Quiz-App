let topicquiz="";
const topics = Array.from(document.getElementsByClassName('subject'));
topics.forEach((topic) => {
    topic.addEventListener('click', (e) => {
        console.log((e.target).innerText);
        topicquiz=(e.target).innerText;
        topicquiz=topicquiz.toLowerCase()
        console.log(topicquiz);
        localStorage.setItem("topic",topicquiz)
        window.location.assign('difficulty.html');
    })
});