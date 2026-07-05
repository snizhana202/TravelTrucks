**TravelTrucks** 🚐
TravelTrucks — це вебзастосунок для пошуку та оренди кемперів, розроблений як частина навчального проєкту. Він поєднує зручний інтерфейс каталогу з можливістю детальної фільтрації та бронювання транспорту.

🚀 **Live Demo**
👉 https://travel-trucks-one-zeta.vercel.app/

🛠 **Технології**
Проєкт реалізовано з використанням сучасного стеку технологій:
**Framework:** Next.js (App Router)
**Language:** TypeScript
**State Management/Fetching:** TanStack Query (React Query)
**Styling:** CSS Modules
**Components:** Swiper.js (галерея), React Icons, React Hook Form
**API:** Campers API

📋 **Основні можливості**
**Каталог кемперів:** Зручний перегляд списку з пагінацією через useInfiniteQuery.
**Розумні фільтри:** Пошук за локацією, типом кузова, двигуном та трансмісією.
**Сторінка деталей:** Галерея зображень, технічні характеристики, відгуки користувачів та форма бронювання.
**Responsive Design:** Адаптивна верстка для десктопних пристроїв.

💻 Як запустити проєкт локально
Клонуйте репозиторій:

Bash
git clone https://github.com/snizhana202/TravelTrucks.git
cd travel-trucks

Встановіть залежності:
Bash
npm install

Запустіть середовище розробки:
Bash
npm run dev
Відкрийте застосунок:
Перейдіть за адресою http://localhost:3000 у вашому браузері.

📂 **Структура проєкту**
Проєкт організований за модульним принципом, що забезпечує легку підтримку та масштабованість:

src/app/ — сторінки та маршрутизація застосунку (Next.js App Router).

src/components/ — набір UI-компонентів, розділених за логікою (карточки кемперів, список, фільтри, хедер тощо).

src/constants/ — константи та конфігураційні дані.

src/hooks/ — користувацькі React-хуки для логіки запитів та стану.

src/providers/ — контексти та провайдери (наприклад, для TanStack Query).

src/services/ — логіка взаємодії з API (ендпоінти, сервіси запитів).

src/types/ — інтерфейси та типи TypeScript для забезпечення типізації даних.

👤 Про автора
**Snizhana** — Full-Stack Developer.
- [GitHub](https://github.com/snizhana202)
- [LinkedIn](https://www.linkedin.com/in/snizhana-petrushka)
