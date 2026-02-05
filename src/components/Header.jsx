
export default function Header(){
  return (
          <div className="header">
        <div className="container">
          <div className="header__logo">
            <img width={38} src="/img/pizza-logo.svg" alt="Pizza logo" />
            <div>
              <h1>React Pizza</h1>
              <p>самая вкусная пицца во вселенной</p>
            </div>
          </div>

          <div className="header__cart">
            <a href="/cart.html" className="button button--cart">
              <span>520 ₽</span>

              <div className="button__delimiter" />

              <img
                width="18"
                height="18"
                src="img/iconfinder_shopping-cart.svg" 
                alt="shopping-cart icon"
              />

              <span style ={{marginLeft: "8px"}}>3</span>
            </a>
          </div>
        </div>
      </div>
  )
}