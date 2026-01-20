function Header() {
  function get_brand_name() {
    return "Learning React"
  }

  let brand_name = "Great Learning"

  return (
    <div className="p-5 border-b m-2 border-gray-300 w-full bg-neutral-900 text-amber-50">
      <h1 className="text-2xl font-bold underline">Welcome to React Basics</h1>
      <p className="font-light">
        Wow, we are welcoming you on this website we have created
      </p>
      <h1>Brand Name : {brand_name}</h1>
      <h1>Topic : {get_brand_name()}</h1>
    </div>
  )
}

export default Header
