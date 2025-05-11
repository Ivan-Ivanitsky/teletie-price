export default  function intro (){
    gsap.from(".title", { opacity: 0, scale: 0.7, duration: 2, ease: "power2.out" });
    gsap.from(".button-tariffs", { opacity: 0, scale: 0.7, duration: 2, ease: "power2.out" });
}