import styles from './About.module.scss';

function AboutPage() {
return (
  <div className="content">
      <div className="container">
          <div className={styles.root}>
           <h1>О нашей пиццерии</h1>
             <p>React Pizza - это не просто еда, это философия. Мы готовим из отборных ингредиентов уже более 10 лет.</p>
             <p>Наше тесто созревает 48 часов, а томатный соус мы делаем вручную из итальянских томатов.</p>
         </div>
      </div>
    </div>
  );
}

export default AboutPage
