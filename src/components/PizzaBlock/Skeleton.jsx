import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader 
    className="pizza-block"
    speed={2}
    width={280}
    height={460}
    viewBox="0 0 280 460"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="133" cy="111" r="111" /> 
    <rect x="0" y="238" rx="12" ry="12" width="275" height="23" /> 
    <rect x="0" y="279" rx="12" ry="12" width="280" height="89" /> 
    <rect x="0" y="398" rx="11" ry="11" width="99" height="24" /> 
    <rect x="128" y="386" rx="25" ry="25" width="146" height="43" />
  </ContentLoader>
)

export default Skeleton