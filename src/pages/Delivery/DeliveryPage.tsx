import styles from './Delivery.module.scss';

function DeliveryPage () {
  return (
      <div className="content">
      <div className="container">
        <div className={styles.root}>
          <h1>Оплата и доставка</h1>
          <div className={styles.content}>
            <section>
              <h3>Доставка</h3>
              <ul>
                <li>Бесплатно при заказе от 1000 ₽</li>
                <li>Среднее время доставки - 45 минут</li>
                <li>Зоны доставки: весь город и пригород</li>
              </ul>
            </section>
            
            <section>
              <h3>Оплата</h3>
              <ul>
                <li>Картой на сайте</li>
                <li>Наличными или картой курьеру</li>
                <li>SberPay / СБП</li>
              </ul>
            </section>
          </div>
        </div>
    </div>
  </div>
);
}
export default DeliveryPage;

