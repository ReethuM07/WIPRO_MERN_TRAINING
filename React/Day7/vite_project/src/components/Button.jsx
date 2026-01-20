const MyButton = (obj) => {
  return (
    <button className="bg-blue-400 m-1.5 text-white px-2 py-1 rounded-2xl cursor-pointer hover:bg-amber-600 transition-all duration-500">
      {obj.title}
    </button>
  )
}

export default MyButton
