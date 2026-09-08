# Blue Sky Sales, Inc. — Website

A static website for Blue Sky Sales, Inc., an installation subcontractor and manufacturer's representative in Mesquite, Texas.

## Files
- `index.html` — page content/structure
- `css/style.css` — all styling
- `js/script.js` — gallery data, reviews, brands, forms, nav, animations
- `images/jobs/` — completed-job photos live here
- `images/brand/` — Blue Sky Sales' own logo (header/footer) and favicon
- `images/brands/` — manufacturer/partner logos shown on the Brands section

## Brands section
The `brands` array near the top of `js/script.js` drives the "Brands We Represent & Work With" section. `category: "rep"` (Bilco, Precision Ladders only — the two brands Blue Sky Sales is an actual manufacturer's rep for) renders under "Manufacturer Representative For"; `category: "supply"` (everyone else) renders under "Brands We Work Closely With". Keep it this way — only Bilco and Precision Ladders should ever claim rep/authorized-rep status; every other brand should use "work closely with" language. All current brands use real logo files in `images/brands/`. To add another brand: drop its logo file in `images/brands/` and add an entry to the array with a `logo` path (or `logo: null` to show a styled text placeholder until you have the file). A brand entry can also carry a `note` field (used on Bilco and Precision Ladders for "North Texas Rep") to show a small badge on its tile, and a `url` field to make the whole tile a link to that brand's official website (opens in a new tab).

## Adding job photos
1. Drop your photo file into `images/jobs/` (e.g. `images/jobs/smith-kitchen.jpg`).
2. Open `js/script.js` and find the `jobPhotos` array near the top.
3. Add an entry:
   ```js
   { image: "images/jobs/smith-kitchen.jpg", title: "Smith Kitchen Remodel", caption: "Mesquite, TX — full kitchen renovation." }
   ```
4. Remove the placeholder entries once you have enough real photos. You can add as many as you like — the grid reflows automatically.

## Reviews
- Real review text (copied from the Blue Sky Sales Google Business listing) is in the `sampleReviews` array in `js/script.js` — reviewer names are shown as "Customer" rather than their real name. Add more any time by adding another entry.
- This is a static, display-only list — it does not pull live from Google, and there is no visitor-facing submission form. To add a new review, edit the array directly.
- The contact/quote form ("Request a Free Estimate") sends silently in the background via Web3Forms — see "Silent quote-form submission" below.

## Silent quote-form submission (Web3Forms)
The contact form submits in the background with no email app popup, straight to `wendy@blueskysalesinc.com`, using [Web3Forms](https://web3forms.com) (free, no server needed). This needs one manual, one-time step that only Blue Sky Sales can do (it has to go to Wendy's inbox):
1. Go to https://web3forms.com and enter `wendy@blueskysalesinc.com`.
2. Web3Forms emails that inbox an access key instantly (no account/password needed).
3. Paste that key into the `WEB3FORMS_ACCESS_KEY` constant near the top of `js/script.js` (in the "Contact form: silent send" section).
Until that key is set, the form automatically falls back to opening the visitor's email app instead (pre-filled to Wendy), so the site keeps working either way.

## "Email Me" on the Line List (EmailJS)
The Line List modal ("Browse Our Full Line List") has an "Email Me" button next to Download — a visitor types their own email and gets the full list sent to them. This is the opposite direction from the quote form (site → visitor, not visitor → Wendy), so Web3Forms can't handle it; it only relays submissions to one fixed inbox. This needs [EmailJS](https://www.emailjs.com) instead:
1. Sign up at https://www.emailjs.com and connect/verify `wendy@blueskysalesinc.com` as the sending account.
2. Create an email template and attach `documents/blue-sky-sales-line-list.pdf` to it directly (the same file every time — the subject/body text are filled in dynamically, the attachment is static).
3. Paste the Public Key, Service ID, and Template ID into the `EMAILJS_PUBLIC_KEY`, `EMAILJS_SERVICE_ID`, and `EMAILJS_TEMPLATE_ID` constants near the top of `js/script.js` (in the "Email Me" section).
4. Add the EmailJS SDK script tag to `index.html`'s `<head>` (EmailJS's dashboard gives you the exact `<script>` snippet to paste in) so the `emailjs.send(...)` call in `js/script.js` has something to call.
Until those keys are set, "Email Me" falls back to opening the visitor's own email app pre-addressed to what they typed — they can still send it themselves, just without the PDF automatically attached (a plain `mailto:` link can never attach a file; that's a browser/email-standard limit, not something code can work around).

## Running locally
No build step needed. Just open `index.html` in a browser, or serve the folder:
```
python3 -m http.server 8000
```
then visit `http://localhost:8000`.

## Deploying
This is a plain static site, so it can be hosted for free on GitHub Pages, Netlify, Vercel, or any static host — just upload the whole folder.

## Customizing
- Update phone/fax number, email, and address in `index.html` (search for `972`).
- Quote/contact form submissions go to `wendy@blueskysalesinc.com`, set as the `QUOTE_EMAIL` constant near the top of `js/script.js`.
- Colors and fonts are defined as CSS variables at the top of `css/style.css` (`:root`).
