# README image sources

## Drawing atelier banner

`kaplum-zeichenatelier-banner.png` is the owner's selected banner: the penguin and a crowned blue turtle draw geometric shapes on paper in a cosy atelier. It was generated with OpenAI's built-in Imagegen tool, using the earlier local Kaplum penguin banner as the actual identity/style reference. That earlier illustration used the owner's supplied pengusto profile banner. The existing crowned-turtle logo in `assets/branding/` is preserved unchanged.

This is an AI-generated narrative illustration, not a Studio screenshot, executable example or feature demonstration. Reference use follows the owner's instruction; no independent rights clearance or exclusive copyright claim is asserted. The project's MIT code licence does not replace terms applicable to supplied or generated artwork or third-party components. Existing licences and notices remain unchanged.

The earlier island banner, alternative scenes and original generated images are retained outside this repository. Only the selected atelier illustration is included here.

## Existing product screenshots

`kaplum-next-dark.png`, `kaplum-course.png` and their light/settings/mobile companions are existing real app screenshots produced by the production screenshot test in `tests/studio.spec.js`. They are retained unchanged. They show the real interface and example content, including separately licensed components. See the root README, `THIRD_PARTY_NOTICES.txt` and `components/react-bits/LICENSE.md` for the existing licence boundaries; the new banner does not supersede them.

## Theme and mobile variants

The original selected dark banner is retained unchanged as `kaplum-zeichenatelier-banner.png`. Three new Imagegen edits were generated from the actual selected illustration:

- `kaplum-zeichenatelier-light.png`: same desktop scene in daylight, ivory walls, dark plum title, honey wood and purple drawing accents; not a colour inversion.
- `kaplum-zeichenatelier-mobile-dark.png`: closer 3:2 composition with larger penguin, turtle and drawing paths, derived from the dark desktop scene.
- `kaplum-zeichenatelier-mobile-light.png`: matching daylight edit of that mobile composition, using the light desktop version as the colour reference.

The READMEs select theme assets through a `picture` element with `source` media queries and a light desktop fallback. At widths up to 600px the closer composition makes the characters and geometry more legible than shrinking the wide banner.

GitHub documents theme-aware picture markup in its [writing quickstart](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/quickstart-for-writing-on-github). The English and German markup was tested locally in both colour schemes at 1280, 390 and 320px, including actual image-source selection and the fallback. These local browser checks do not establish live GitHub rendering.
