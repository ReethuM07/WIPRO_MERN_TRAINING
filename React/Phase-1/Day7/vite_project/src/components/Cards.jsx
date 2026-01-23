import MyButton from "./Button"

export default function Card(obj) {
  return (
    <div className="border border-gray-300 w-72 rounded p-2 m-2 bg-gray-50 shadow-lg flex flex-col gap-4 transition-all duration-200 cursor-pointer hover:bg-neutral-300">
      
      <div className="card_header">
        <h3 className="font-bold">{obj.cardTitle}</h3>
      </div>

      <div className="card_body">
        <p>{obj.cardDescription}</p>
      </div>

      <div className="card_footer">
        <MyButton title="Click Here.." />
        <MyButton title="Read More.." />
      </div>

    </div>
  )
}
