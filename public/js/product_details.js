function change(flag) {
    const heart = document.getElementById('heart')

    if (heart.src == "https://img.icons8.com/ios/30/null/hearts--v1.png") heart.src = "https://img.icons8.com/emoji/30/null/heart-suit.png"
    else heart.src = "https://img.icons8.com/ios/30/null/hearts--v1.png"
}
function clicking(smallimg) {
    var fullimg = document.getElementById("change");
    fullimg.src = smallimg.src;
}