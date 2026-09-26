# The Oak Wellness

Website for The Oak Wellness, a social work practice in Gqeberha.

- `backend/` – Django API.
  - `pages` app: the content for every page lives in `backend/pages/content.py` and is served at `/api/content/`.
  - `bookings` app: booking requests from the website. `POST /api/bookings/` saves a request and emails the practice; `GET /api/bookings/options/` lists the form's choices.
- `frontend/` – Next.js site (App Router, TypeScript, Tailwind) with these pages: Home, About (`/about`), Services (`/services`), Approach (`/approach`), Contact (`/contact`) and Book a session (`/book`).

## Running locally

Start the API (port 8000):

```sh
cd backend
python -m venv .venv
.venv\Scripts\activate        # macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

In a second terminal, start the site (port 3000):

```sh
cd frontend
npm install
npm run dev
```

Open http://localhost:3000.

The frontend calls the API at `http://127.0.0.1:8000` by default. To point it somewhere else, copy `frontend/.env.example` to `frontend/.env.local` and change `API_URL`.

## Bookings

Booking requests are saved to the database and listed in the Django admin at http://127.0.0.1:8000/admin/, where each one has a status (New, Contacted, Confirmed, Closed). Create a login for the admin with:

```sh
cd backend
python manage.py createsuperuser
```

Each new request is also emailed to `BOOKING_NOTIFY_EMAIL` (default `zenanitab@gmail.com`). In development, emails are printed in the Django terminal instead of being sent. Before going live, set up a real mailer in `MAILERS` in `backend/config/settings.py` and set `DEFAULT_FROM_EMAIL`.

## Tests

```sh
cd backend
python manage.py test
```
