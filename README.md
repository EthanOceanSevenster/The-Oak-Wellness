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

Each new request is also emailed to `BOOKING_NOTIFY_EMAIL` (default `zenanitab@gmail.com`). Emails are only sent when SMTP is configured (see the environment variables below); otherwise they are printed in the Django terminal, or in the Vercel function logs.

## Deploying to Vercel

Both apps deploy as one Vercel project using [Vercel Services](https://vercel.com/docs/services), configured in `vercel.json`:

- `/admin` and `/static` go to Django (the admin and its styles).
- Everything else goes to Next.js.
- The Django API is not public. Next.js reaches it over an internal service binding, which sets `API_URL` for the frontend.

In the Vercel project:

1. **Settings → Build and Deployment**: set **Framework Preset** to **Services** and leave **Root Directory** as `./`.
2. **Storage**: add a Postgres database (e.g. Neon). This sets `DATABASE_URL`. Vercel's filesystem is read-only, so bookings can't be stored in SQLite there.
3. **Settings → Environment Variables**: add
   - `DJANGO_SECRET_KEY` – a long random value, e.g. from `python -c "import secrets; print(secrets.token_urlsafe(50))"`
   - optional, to send booking emails: `EMAIL_HOST`, `EMAIL_PORT` (default 587), `EMAIL_HOST_USER`, `EMAIL_HOST_PASSWORD`, `DEFAULT_FROM_EMAIL`
   - optional, for a custom domain: `DJANGO_CSRF_TRUSTED_ORIGINS`, e.g. `https://www.example.com`
4. Redeploy.

Then create the database tables and an admin login, from your machine, against the production database (copy `DATABASE_URL` from the Vercel project):

```sh
cd backend
$env:DATABASE_URL = "postgresql://..."   # PowerShell; cmd: set DATABASE_URL=...; macOS/Linux: export DATABASE_URL=...
python manage.py migrate
python manage.py createsuperuser
```

Run `migrate` the same way whenever a new migration is added.

## Tests

```sh
cd backend
python manage.py test
```
