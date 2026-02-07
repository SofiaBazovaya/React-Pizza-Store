import styles from './ContactsPage.module.scss';

function ContactsPage ()  {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Сообщение отправлено!');
  };

  return (
    <div className="content">
      <div className="container">
        <div className={styles.root}>
          <h1>Контакты</h1>
          <div className={styles.grid}>
            <div className={styles.info}>
              <p><strong>Адрес:</strong> г. Москва, ул. Пиццерийная, д. 42</p>
              <p><strong>Телефон:</strong> <a href="tel:+79990000000">+7 (999) 000-00-00</a></p>
              
              <form className={styles.form} onSubmit={handleSubmit}>
                <h3>Напишите нам</h3>
                <input type="text" placeholder="Ваше имя" required />
                <textarea placeholder="Ваше сообщение" rows="5" required></textarea>
                <button type="submit" className="button">Отправить</button>
              </form>
            </div>

            <div className={styles.map}>
              {/* Упрощенный вариант с iframe. В реальном проекте лучше API карт */}
              <iframe 
                src="https://yandex.ru/map-widget/v1/?ll=37.617644%2C55.755819&z=12" 
                width="100%" 
                height="400" 
                title="map"
              ></iframe>
            </div>
          </div>
        </div>
       </div>
    </div>
  );
};


export default ContactsPage;