import hero from "../assets/hero.png";

function Hero() {
    return (
        <div>
            <img src={hero} className="w-full max-h-[600px] object-cover" />
        </div>
    );
}

export default Hero;