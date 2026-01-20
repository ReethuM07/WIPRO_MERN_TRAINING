import banner from "../assets/ebanner.jpg";

function Hero() {
  const handleShopClick = () => alert("Navigating to Shop page");

  return (
    <section className="bg-[#6f6f6f] h-420px px-80px py-40px flex items-center justify-between gap-10">
  <img
    src={banner}
    alt="Summer Collection"
    className="w-1/2 h-320px object-cover rounded-lg"
  />

  <div className="w-[40%] text-white">
    <h1 className="text-[36px] font-bold mb-3">
      SUMMER COLLECTION
    </h1>
    <p className="text-sm mb-5">
      Cool girls style up to 40% OFF
    </p>
    <button className="bg-blue-500 px-5 py-2 rounded">
      Shop Now
    </button>
  </div>
</section>

  );
}

export default Hero;
