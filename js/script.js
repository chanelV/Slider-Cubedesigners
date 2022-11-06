
/*document.getElementById("slide-track").animate([
    // key frames
    { transform: 'translateY(0px)' },
    { transform: 'translateY(-300px)' }
  ], {
    // sync options
    duration: 40000,
    iterations: Infinity,
    easing: "linear"
  });
  */

const $slideTrack = document.getElementById("slide-track");
const $slider = document.getElementById("slider");
const $slides = document.querySelectorAll(".slide");
const slideTrackInfo = $slideTrack.getBoundingClientRect();
const sliderInfo = $slider.getBoundingClientRect();

if($slides){
    $slides.forEach(result => $slideTrack.insertAdjacentHTML("beforeend", result.outerHTML));
}

let animateSlide = null

function keyframeAnimation(keyframes){
   return $slideTrack.animate([...keyframes], {
        duration: 4000,
        iterations: Infinity,
        easing: "linear"
    });
}

function leftAnimation(startPosition = 0){
    return [
        { transform: `translateX(-${slideTrackInfo.width}px)` },
        { transform: `translateX(${startPosition}px)` },
    ];
}

function rightAnimation(startPosition = 0){
    return [
        { transform: `translateX(${startPosition}px)` },
        { transform: `translateX(-${slideTrackInfo.width}px)` },
    ];
}

function startSlider(e){
    const position = e.clientX;
    const initPosition = sliderInfo.width / 2;
    
    if(position < initPosition){
        animateSlide = keyframeAnimation(leftAnimation());
    } else {
        animateSlide = keyframeAnimation(rightAnimation());
    }
}

function stopSlider(){
    if(animateSlide !== null) animateSlide.pause();
}

$slideTrack.addEventListener('mousemove', startSlider)
$slideTrack.addEventListener('mouseout', stopSlider)