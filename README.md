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
The `brands` array near the top of `js/script.js` drives the "Brands We Represent & Supply" section. All current brands (Wilkinson Hi-Rise, Columbia Chutes, Bilco, Precision Ladders, Hadrian, Bobrick, ASI, Bradley) use real logo files in `images/brands/`. To add another brand: drop its logo file in `images/brands/` and add an entry to the array with a `logo` path (or `logo: null` to show a styled text placeholder until you have the file).

## Adding job photos
1. Drop your photo file into `images/jobs/` (e.g. `images/jobs/smith-kitchen.jpg`).
2. Open `js/script.js` and find the `jobPhotos` array near the top.
3. Add an entry:
   ```js
   { image: "images/jobs/smith-kitchen.jpg", title: "Smith Kitchen Remodel", caption: "Mesquite, TX — full kitchen renovation." }
   ```
4. Remove the placeholder entries once you have enough real photos. You can add as many as you like — the grid reflows automatically.

## Reviews
- Sample/placeholder reviews are in the `sampleReviews` array in `js/script.js` — replace the text with your real reviews any time.
- The "Leave Us a Review" form on the site lets visitors submit a review. On submit it:
  1. Adds the review to the page immediately, marked "pending review".
  2. Opens the visitor's email app with the review pre-filled, addressed to your email, so you can read it and decide whether to keep it as a permanent sample review in `js/script.js`.
- The contact form works the same way (opens an email pre-filled to you) — there's no backend/server required.

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
- Quote/contact form submissions go to `wendy@blueskysalesinc.com`; review form submissions go to `peoplesdm14@gmail.com`. Both are set as constants (`QUOTE_EMAIL`, `OWNER_EMAIL`) near the top of `js/script.js`.
- Colors and fonts are defined as CSS variables at the top of `css/style.css` (`:root`).
