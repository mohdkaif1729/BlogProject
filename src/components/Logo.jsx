import LogoImg from "../assets/LogoImg.webp"

function Logo() {
  return (
    <div>
      <img src={LogoImg} alt="" className={`h-10`} />
    </div>
  )
}

export default Logo