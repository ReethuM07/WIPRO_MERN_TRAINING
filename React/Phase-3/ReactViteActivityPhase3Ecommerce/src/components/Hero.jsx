import { Link } from "react-router-dom";
import banner from "../assets/ebanner.jpg";

function Hero() {
  return (
    <section className="bg-gray-600 h-[420px] px-[80px] py-[40px] flex items-center justify-between gap-10">
      
      <img
        src={banner}
        alt="Girls Collection"
        className="w-1/2 h-[320px] object-cover rounded-lg"
      />

      <div className="w-[40%] text-white">
        <h1 className="text-[36px] font-bold mb-3">
          GIRLS COLLECTION
        </h1>

        <p className="text-sm mb-5">
          Cool girls style up to 40% OFF
        </p>

        <Link to="/shop">
          <button className="bg-blue-500 px-5 py-2 rounded hover:bg-blue-600">
            Shop Now
          </button>
        </Link>
      </div>
    </section>
  );
}

export default Hero;
