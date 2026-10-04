# Birthday Universe ✦

A single-page animated birthday greeting built with HTML, CSS, JavaScript, Canvas and Tailwind CSS CDN.

## Personalize it

Open `script.js` and edit the `CONFIG` object at the very top:

```js
const CONFIG = {
  name: "Sofia",
  greeting: "Happy Birthday Sayang ✦",
  quote: "I Love You Everyday",
  finalMessage: "May your next chapter be full of light, laughter and beautiful surprises.",
  photos: [
    "assets/birthday-photo.jpeg",
    "https://example.com/another-photo.jpg"
  ]
};
```

The uploaded photo is included in `assets/birthday-photo.jpeg`.

## Flow

1. Matrix rain + 3 → 2 → 1 countdown.
2. HAPPY → BIRTHDAY → TO → NAME → ❤️ reveal.
3. Bear + guitar + birthday stickers + clickable envelope.
4. 3D birthday card flip with editable handwritten greeting.
5. Swipe/click photo carousel.
6. Final animated heart-shaped photo collage.
7. Replay button.

## Run

Open `index.html` in a browser. For best results, use a small local server such as VS Code Live Server because some browsers restrict local file behavior.

No build step is required.
