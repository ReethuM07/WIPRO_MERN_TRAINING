import Header from './components/Header'
import Footer from './components/Footer'
import Card from './components/Cards'
import MyButton from './components/Button'
import Courses from './components/Courses'
import './App.css'

function App() {
  return (
    <>
      <Header />
      <Courses />
      <h3>Hi, This is the app content.</h3>
      <p>React app content can be added here.</p>

      <div className="flex flex-wrap">
        <Card cardTitle="React Js Course" cardDescription="Module frontend course for 40 days" />
        <Card cardTitle="Full Stack Java Course" cardDescription="Module frontend course for 40 days" />
        <Card cardTitle="MEAN Course" cardDescription="Module frontend course for 40 days" />
        <Card cardTitle="MERN Course" cardDescription="Module frontend course for 40 days" />
        <Card cardTitle="DevOps Course" cardDescription="Module frontend course for 40 days" />
        <Card cardTitle="Cloud Computing Course" cardDescription="Module frontend course for 40 days" />
        <Card cardTitle="Dot Net Course" cardDescription="Module frontend course for 40 days" />
        <Card cardTitle="Python Course" cardDescription="Module frontend course for 40 days" />
        <Card cardTitle="Azure Course" cardDescription="Module frontend course for 40 days" />
        <Card cardTitle="Angular Course" cardDescription="Module frontend course for 40 days" />
        <Card cardTitle="Data Analyst Course" cardDescription="Module frontend course for 40 days" />
        <Card cardTitle="Data Science Course" cardDescription="Module frontend course for 40 days" />
      </div>

      <Footer />
    </>
  )
}

export default App
