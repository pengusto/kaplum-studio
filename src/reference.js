export const reference = [
  {
    "name": "setBackground",
    "alias": "setzeHintergrund",
    "signature": "setBackground(paintColor = \"black\")",
    "text": {
      "en": "paintColor fills the whole canvas; defaults to black.",
      "de": "paintColor füllt die ganze Zeichenfläche; Standard ist black.",
      "ja": "paintColorで画面全体を塗ります。省略するとblackです。",
      "tr": "paintColor tüm alanı doldurur; varsayılan black.",
      "hy": "paintColor-ը լցնում է ամբողջ դաշտը․ լռելյայնը black է։"
    },
    "anchor": {
      "en": "Covers the whole canvas and resets position to (0, 0) and direction to 0.",
      "de": "Füllt die Zeichenfläche und setzt Position auf (0, 0) und Richtung auf 0.",
      "ja": "画面全体を塗り、位置を(0, 0)、向きを0に戻します。",
      "tr": "Tüm çizim alanını kaplar; konumu (0, 0), yönü 0 yapar.",
      "hy": "Լցնում է ամբողջ նկարի դաշտը և դիրքը վերադարձնում է (0, 0), ուղղությունը՝ 0։"
    },
    "rotation": {
      "en": "Does not use the turtle direction.",
      "de": "Nutzt die Turtle-Richtung nicht.",
      "ja": "タートルの向きは使いません。",
      "tr": "Turtle yönünü kullanmaz.",
      "hy": "Չի օգտագործում Turtle-ի ուղղությունը։"
    },
    "code": "setBackground(\"white\"); hideTurtle(); goto(0,0); setBackground(\"skyblue\");"
  },
  {
    "name": "setDualBackground",
    "alias": "setzeZweiFarbenHintergrund",
    "signature": "setDualBackground(topColor = \"skyblue\", bottomColor = \"green\", horizonY = 0)",
    "text": {
      "en": "topColor colours the sky; bottomColor colours the ground. horizonY is the boundary height in turtle units.",
      "de": "topColor färbt den Himmel; bottomColor den Boden. horizonY ist die Grenzhöhe in Turtle-Einheiten.",
      "ja": "topColorは空、bottomColorは地面の色。horizonYは境目の高さです。",
      "tr": "topColor gökyüzünü, bottomColor yeri boyar. horizonY sınırın Turtle birimindeki yüksekliğidir.",
      "hy": "topColor-ը գունավորում է երկինքը, bottomColor-ը՝ գետինը։ horizonY-ը սահմանի բարձրությունն է Turtle միավորներով։"
    },
    "anchor": {
      "en": "Covers the whole canvas and resets position to (0, 0) and direction to 0.",
      "de": "Füllt die Zeichenfläche und setzt Position auf (0, 0) und Richtung auf 0.",
      "ja": "画面全体を塗り、位置を(0, 0)、向きを0に戻します。",
      "tr": "Tüm çizim alanını kaplar; konumu (0, 0), yönü 0 yapar.",
      "hy": "Լցնում է ամբողջ նկարի դաշտը և դիրքը վերադարձնում է (0, 0), ուղղությունը՝ 0։"
    },
    "rotation": {
      "en": "Does not use the turtle direction.",
      "de": "Nutzt die Turtle-Richtung nicht.",
      "ja": "タートルの向きは使いません。",
      "tr": "Turtle yönünü kullanmaz.",
      "hy": "Չի օգտագործում Turtle-ի ուղղությունը։"
    },
    "code": "setBackground(\"white\"); hideTurtle(); goto(0,0); setDualBackground(\"skyblue\",\"green\",-80);"
  },
  {
    "name": "setTiltedBackground",
    "alias": "setzeGedrehtenHintergrund",
    "signature": "setTiltedBackground(topColor = \"SkyBlue\", bottomColor = \"DodgerBlue\", rotation = 0)",
    "text": {
      "en": "topColor colours the upper half; bottomColor the lower half. rotation tilts their boundary clockwise in degrees.",
      "de": "topColor färbt die obere Hälfte; bottomColor die untere. rotation neigt die Grenze im Uhrzeigersinn in Grad.",
      "ja": "topColorは上半分、bottomColorは下半分の色です。rotationは境目を時計回りに傾ける角度です。",
      "tr": "topColor üst yarıyı, bottomColor alt yarıyı boyar. rotation sınırı dereceyle saat yönünde eğer.",
      "hy": "topColor-ը վերևի կեսի գույնն է, bottomColor-ը՝ ներքևի։ rotation-ը սահմանը թեքում է ժամացույցի սլաքի ուղղությամբ՝ աստիճաններով։"
    },
    "anchor": {
      "en": "Covers the whole canvas and resets position to (0, 0) and direction to 0.",
      "de": "Füllt die Zeichenfläche und setzt Position auf (0, 0) und Richtung auf 0.",
      "ja": "画面全体を塗り、位置を(0, 0)、向きを0に戻します。",
      "tr": "Tüm çizim alanını kaplar; konumu (0, 0), yönü 0 yapar.",
      "hy": "Լցնում է ամբողջ նկարի դաշտը և դիրքը վերադարձնում է (0, 0), ուղղությունը՝ 0։"
    },
    "rotation": {
      "en": "rotation = 0 is horizontal; positive degrees tilt the boundary clockwise.",
      "de": "rotation = 0 ist waagerecht; positive Grad neigen die Grenze im Uhrzeigersinn.",
      "ja": "rotation = 0は水平。正の角度は境目を時計回りに傾けます。",
      "tr": "rotation = 0 yataydır; pozitif dereceler sınırı saat yönünde eğer.",
      "hy": "rotation = 0-ը հորիզոնական է․ դրական աստիճանները սահմանը թեքում են ժամացույցի սլաքի ուղղությամբ։"
    },
    "code": "setBackground(\"white\"); hideTurtle(); goto(0,0); setTiltedBackground(\"skyblue\",\"blue\",20);"
  },
  {
    "name": "setTextColor",
    "alias": "setzeSchriftFarbe",
    "signature": "setTextColor(paintColor = \"black\")",
    "text": {
      "en": "Set the colour used by write().",
      "de": "Setze die Farbe für write().",
      "ja": "write()で使う色を決めます。",
      "tr": "write() rengini ayarlar.",
      "hy": "Սահմանում է write()-ի գույնը։"
    },
    "anchor": {
      "en": "No drawing position is needed.",
      "de": "Keine Zeichenposition nötig.",
      "ja": "描く位置は必要ありません。",
      "tr": "Çizim konumu gerekmez.",
      "hy": "Նկարելու դիրք պետք չէ։"
    },
    "rotation": {
      "en": "Does not use the turtle direction.",
      "de": "Nutzt die Turtle-Richtung nicht.",
      "ja": "タートルの向きは使いません。",
      "tr": "Turtle yönünü kullanmaz.",
      "hy": "Չի օգտագործում Turtle-ի ուղղությունը։"
    },
    "code": "setBackground(\"white\"); hideTurtle(); goto(0,0); setTextColor(\"coral\"); write(\"Hello!\");"
  },
  {
    "name": "setTextSize",
    "alias": "setzeSchriftGroesse",
    "signature": "setTextSize(size = 20)",
    "text": {
      "en": "Set the font size in pixels for write().",
      "de": "Setze die Schriftgröße in Pixeln für write().",
      "ja": "write()の文字の大きさをピクセルで決めます。",
      "tr": "write() için piksel cinsinden yazı boyutunu ayarlar.",
      "hy": "Սահմանում է write()-ի տառաչափը պիքսելներով։"
    },
    "anchor": {
      "en": "No drawing position is needed.",
      "de": "Keine Zeichenposition nötig.",
      "ja": "描く位置は必要ありません。",
      "tr": "Çizim konumu gerekmez.",
      "hy": "Նկարելու դիրք պետք չէ։"
    },
    "rotation": {
      "en": "Does not use the turtle direction.",
      "de": "Nutzt die Turtle-Richtung nicht.",
      "ja": "タートルの向きは使いません。",
      "tr": "Turtle yönünü kullanmaz.",
      "hy": "Չի օգտագործում Turtle-ի ուղղությունը։"
    },
    "code": "setBackground(\"white\"); hideTurtle(); goto(0,0); setTextSize(30); write(\"Hello!\");"
  },
  {
    "name": "writeText",
    "alias": "schreibeText",
    "signature": "writeText(text, size = 20, paintColor = \"black\")",
    "text": {
      "en": "text is the message. size is the font size; paintColor is its colour.",
      "de": "text ist die Nachricht. size ist die Schriftgröße; paintColor ihre Farbe.",
      "ja": "textは文字。sizeは文字の大きさ、paintColorは色です。",
      "tr": "text mesajdır. size yazı boyutu, paintColor rengidir.",
      "hy": "text-ը հաղորդագրությունն է։ size-ը տառաչափն է, paintColor-ը՝ գույնը։"
    },
    "anchor": {
      "en": "Writes at the current point and changes text colour and font size.",
      "de": "Schreibt am aktuellen Punkt und ändert Textfarbe und Schriftgröße.",
      "ja": "現在の点に書き、文字の色と大きさを変えます。",
      "tr": "Geçerli noktaya yazar; metin rengini ve yazı boyutunu değiştirir.",
      "hy": "Գրում է ընթացիկ կետում և փոխում է տեքստի գույնը ու տառաչափը։"
    },
    "rotation": {
      "en": "Does not use the turtle direction.",
      "de": "Nutzt die Turtle-Richtung nicht.",
      "ja": "タートルの向きは使いません。",
      "tr": "Turtle yönünü kullanmaz.",
      "hy": "Չի օգտագործում Turtle-ի ուղղությունը։"
    },
    "code": "setBackground(\"white\"); hideTurtle(); goto(0,0); writeText(\"Hello!\",30,\"coral\");"
  },
  {
    "name": "drawCircle",
    "alias": "zeichneKreis",
    "signature": "drawCircle(radius = 50, paintColor = \"\", filled = false)",
    "text": {
      "en": "Draw: a circle. paintColor: colour name or hex colour; empty chooses a random colour. filled: true fills the shape, false draws the outline. radius: distance from centre to edge.",
      "de": "Zeichne: einen Kreis. paintColor: Farbname oder Hex-Farbe; leer wählt eine Zufallsfarbe. filled: true füllt die Form, false zeichnet den Umriss. radius: Abstand von der Mitte zum Rand.",
      "ja": "描くもの: 円. paintColor: 色の名前か16進数。空ならランダムな色です。 filled: trueは中を塗り、falseは輪郭だけを描きます。 radius: 中心から端までの長さです。",
      "tr": "Çiz: bir daire. paintColor: renk adı veya hex rengi; boş değer rastgele renk seçer. filled: true içini doldurur, false dış çizgiyi çizer. radius: merkezden kenara uzaklık.",
      "hy": "Նկարի՛ր: շրջան. paintColor՝ գույնի անուն կամ hex գույն․ դատարկը ընտրում է պատահական գույն։ filled՝ true-ը լցնում է պատկերը, false-ը նկարում է եզրագիծը։ radius՝ կենտրոնից եզր հեռավորությունը։"
    },
    "anchor": {
      "en": "Starts at the current edge or corner and follows the turtle direction. May move the turtle. Colour is changed; filled shapes use the fill path and endFill.",
      "de": "Beginnt am aktuellen Rand oder an der Ecke und folgt der Turtle-Richtung. Kann die Turtle bewegen. Farbe wird geändert; gefüllte Formen nutzen den Füllpfad und endFill.",
      "ja": "現在の辺や角から、タートルの向きに描きます。タートルの位置が変わることがあります。 色が変わります。塗る形は塗りの経路とendFillを使います。",
      "tr": "Geçerli kenardan veya köşeden, Turtle yönünde başlar. Turtle yerini değiştirebilir. Renk değişir; dolu şekiller dolgu yolu ve endFill kullanır.",
      "hy": "Սկսվում է ընթացիկ եզրից կամ անկյունից՝ Turtle-ի ուղղությամբ։ Կարող է փոխել Turtle-ի դիրքը։ Գույնը փոխվում է․ լցված պատկերները օգտագործում են լցման ուղին և endFill։"
    },
    "rotation": {
      "en": "Angles are degrees. 0 is up, 90 is right; positive turns are clockwise.",
      "de": "Winkel in Grad. 0 ist oben, 90 rechts; positive Drehung ist im Uhrzeigersinn.",
      "ja": "角度は度です。0は上、90は右。正の値は時計回りです。",
      "tr": "Açılar derece cinsindedir. 0 yukarı, 90 sağdır; pozitif dönüş saat yönündedir.",
      "hy": "Անկյունները աստիճաններով են։ 0-ը վերև է, 90-ը՝ աջ․ դրական պտույտը ժամացույցի սլաքի ուղղությամբ է։"
    },
    "code": "setBackground(\"white\"); hideTurtle(); goto(0,0); drawCircle(80,\"coral\",true);"
  },
  {
    "name": "drawHalfCircle",
    "alias": "zeichneHalbkreis",
    "signature": "drawHalfCircle(radius = 50, paintColor = \"\", filled = false)",
    "text": {
      "en": "Draw: a semicircle. paintColor: colour name or hex colour; empty chooses a random colour. filled: true fills the shape, false draws the outline. radius: distance from centre to edge.",
      "de": "Zeichne: einen Halbkreis. paintColor: Farbname oder Hex-Farbe; leer wählt eine Zufallsfarbe. filled: true füllt die Form, false zeichnet den Umriss. radius: Abstand von der Mitte zum Rand.",
      "ja": "描くもの: 半円. paintColor: 色の名前か16進数。空ならランダムな色です。 filled: trueは中を塗り、falseは輪郭だけを描きます。 radius: 中心から端までの長さです。",
      "tr": "Çiz: bir yarım daire. paintColor: renk adı veya hex rengi; boş değer rastgele renk seçer. filled: true içini doldurur, false dış çizgiyi çizer. radius: merkezden kenara uzaklık.",
      "hy": "Նկարի՛ր: կիսաշրջան. paintColor՝ գույնի անուն կամ hex գույն․ դատարկը ընտրում է պատահական գույն։ filled՝ true-ը լցնում է պատկերը, false-ը նկարում է եզրագիծը։ radius՝ կենտրոնից եզր հեռավորությունը։"
    },
    "anchor": {
      "en": "Starts at the current edge or corner and follows the turtle direction. May move the turtle. Colour is changed; filled shapes use the fill path and endFill.",
      "de": "Beginnt am aktuellen Rand oder an der Ecke und folgt der Turtle-Richtung. Kann die Turtle bewegen. Farbe wird geändert; gefüllte Formen nutzen den Füllpfad und endFill.",
      "ja": "現在の辺や角から、タートルの向きに描きます。タートルの位置が変わることがあります。 色が変わります。塗る形は塗りの経路とendFillを使います。",
      "tr": "Geçerli kenardan veya köşeden, Turtle yönünde başlar. Turtle yerini değiştirebilir. Renk değişir; dolu şekiller dolgu yolu ve endFill kullanır.",
      "hy": "Սկսվում է ընթացիկ եզրից կամ անկյունից՝ Turtle-ի ուղղությամբ։ Կարող է փոխել Turtle-ի դիրքը։ Գույնը փոխվում է․ լցված պատկերները օգտագործում են լցման ուղին և endFill։"
    },
    "rotation": {
      "en": "Angles are degrees. 0 is up, 90 is right; positive turns are clockwise.",
      "de": "Winkel in Grad. 0 ist oben, 90 rechts; positive Drehung ist im Uhrzeigersinn.",
      "ja": "角度は度です。0は上、90は右。正の値は時計回りです。",
      "tr": "Açılar derece cinsindedir. 0 yukarı, 90 sağdır; pozitif dönüş saat yönündedir.",
      "hy": "Անկյունները աստիճաններով են։ 0-ը վերև է, 90-ը՝ աջ․ դրական պտույտը ժամացույցի սլաքի ուղղությամբ է։"
    },
    "code": "setBackground(\"white\"); hideTurtle(); goto(0,0); drawHalfCircle(80,\"coral\",true);"
  },
  {
    "name": "drawOvalArc",
    "alias": "zeichneOvalBogen",
    "signature": "drawOvalArc(widthValue = 100, height = 50, degrees = 180, paintColor = \"\", filled = false)",
    "text": {
      "en": "Draw: an oval or oval arc. paintColor: colour name or hex colour; empty chooses a random colour. filled: true fills the shape, false draws the outline. widthValue: width or first side length. height: height or second side length. degrees: sweep angle; 360 makes a full oval.",
      "de": "Zeichne: ein Oval oder einen Ovalbogen. paintColor: Farbname oder Hex-Farbe; leer wählt eine Zufallsfarbe. filled: true füllt die Form, false zeichnet den Umriss. widthValue: Breite oder erste Seitenlänge. height: Höhe oder zweite Seitenlänge. degrees: Bogenwinkel; 360 ergibt ein ganzes Oval.",
      "ja": "描くもの: 楕円または楕円の弧. paintColor: 色の名前か16進数。空ならランダムな色です。 filled: trueは中を塗り、falseは輪郭だけを描きます。 widthValue: 幅、または最初の辺の長さです。 height: 高さ、または2番目の辺の長さです。 degrees: 描く角度。360は楕円全体です。",
      "tr": "Çiz: bir oval veya oval yay. paintColor: renk adı veya hex rengi; boş değer rastgele renk seçer. filled: true içini doldurur, false dış çizgiyi çizer. widthValue: genişlik veya ilk kenar uzunluğu. height: yükseklik veya ikinci kenar uzunluğu. degrees: yay açısı; 360 tam oval yapar.",
      "hy": "Նկարի՛ր: օվալ կամ օվալաձև աղեղ. paintColor՝ գույնի անուն կամ hex գույն․ դատարկը ընտրում է պատահական գույն։ filled՝ true-ը լցնում է պատկերը, false-ը նկարում է եզրագիծը։ widthValue՝ լայնություն կամ առաջին կողմի երկարություն։ height՝ բարձրություն կամ երկրորդ կողմի երկարություն։ degrees՝ աղեղի անկյուն․ 360-ը տալիս է ամբողջ օվալը։"
    },
    "anchor": {
      "en": "Centred at the current turtle position; position is preserved.",
      "de": "Mitte an der aktuellen Turtle-Position; die Position bleibt erhalten.",
      "ja": "中心は現在のタートルの位置です。位置は変わりません。",
      "tr": "Merkez geçerli Turtle konumudur; konum korunur.",
      "hy": "Կենտրոնը Turtle-ի ընթացիկ դիրքում է․ դիրքը պահպանվում է։"
    },
    "rotation": {
      "en": "Does not use the turtle direction.",
      "de": "Nutzt die Turtle-Richtung nicht.",
      "ja": "タートルの向きは使いません。",
      "tr": "Turtle yönünü kullanmaz.",
      "hy": "Չի օգտագործում Turtle-ի ուղղությունը։"
    },
    "code": "setBackground(\"white\"); hideTurtle(); goto(0,0); drawOvalArc(140,80,360,\"coral\",true);"
  },
  {
    "name": "drawHalfOval",
    "alias": "zeichneHalbOval",
    "signature": "drawHalfOval(widthValue = 100, height = 50, paintColor = \"\", filled = false)",
    "text": {
      "en": "Draw: a half oval. paintColor: colour name or hex colour; empty chooses a random colour. filled: true fills the shape, false draws the outline. widthValue: width or first side length. height: height or second side length.",
      "de": "Zeichne: ein halbes Oval. paintColor: Farbname oder Hex-Farbe; leer wählt eine Zufallsfarbe. filled: true füllt die Form, false zeichnet den Umriss. widthValue: Breite oder erste Seitenlänge. height: Höhe oder zweite Seitenlänge.",
      "ja": "描くもの: 半楕円. paintColor: 色の名前か16進数。空ならランダムな色です。 filled: trueは中を塗り、falseは輪郭だけを描きます。 widthValue: 幅、または最初の辺の長さです。 height: 高さ、または2番目の辺の長さです。",
      "tr": "Çiz: bir yarım oval. paintColor: renk adı veya hex rengi; boş değer rastgele renk seçer. filled: true içini doldurur, false dış çizgiyi çizer. widthValue: genişlik veya ilk kenar uzunluğu. height: yükseklik veya ikinci kenar uzunluğu.",
      "hy": "Նկարի՛ր: կիսաօվալ. paintColor՝ գույնի անուն կամ hex գույն․ դատարկը ընտրում է պատահական գույն։ filled՝ true-ը լցնում է պատկերը, false-ը նկարում է եզրագիծը։ widthValue՝ լայնություն կամ առաջին կողմի երկարություն։ height՝ բարձրություն կամ երկրորդ կողմի երկարություն։"
    },
    "anchor": {
      "en": "The current point is the centre of its base line. Position and direction stay unchanged.",
      "de": "Der aktuelle Punkt ist die Mitte der Grundlinie. Position und Richtung bleiben gleich.",
      "ja": "現在の点が底辺の中心です。位置と向きは変わりません。",
      "tr": "Geçerli nokta taban çizgisinin ortasıdır. Konum ve yön değişmez.",
      "hy": "Ընթացիկ կետը հիմքի գծի կենտրոնն է։ Դիրքը և ուղղությունը չեն փոխվում։"
    },
    "rotation": {
      "en": "Ignores the turtle direction; the base line stays horizontal.",
      "de": "Ignoriert die Turtle-Richtung; die Grundlinie bleibt waagerecht.",
      "ja": "タートルの向きは使わず、底辺は水平です。",
      "tr": "Turtle yönünü kullanmaz; taban çizgisi yatay kalır.",
      "hy": "Չի օգտագործում Turtle-ի ուղղությունը․ հիմքի գիծը մնում է հորիզոնական։"
    },
    "code": "setBackground(\"white\"); hideTurtle(); goto(0,0); drawHalfOval(140,80,\"coral\",true);"
  },
  {
    "name": "drawRect",
    "alias": "zeichneRechteck",
    "signature": "drawRect(widthValue = 50, height = 50, paintColor = \"\", filled = false)",
    "text": {
      "en": "Draw: a rectangle. paintColor: colour name or hex colour; empty chooses a random colour. filled: true fills the shape, false draws the outline. widthValue: width or first side length. height: height or second side length.",
      "de": "Zeichne: ein Rechteck. paintColor: Farbname oder Hex-Farbe; leer wählt eine Zufallsfarbe. filled: true füllt die Form, false zeichnet den Umriss. widthValue: Breite oder erste Seitenlänge. height: Höhe oder zweite Seitenlänge.",
      "ja": "描くもの: 長方形. paintColor: 色の名前か16進数。空ならランダムな色です。 filled: trueは中を塗り、falseは輪郭だけを描きます。 widthValue: 幅、または最初の辺の長さです。 height: 高さ、または2番目の辺の長さです。",
      "tr": "Çiz: bir dikdörtgen. paintColor: renk adı veya hex rengi; boş değer rastgele renk seçer. filled: true içini doldurur, false dış çizgiyi çizer. widthValue: genişlik veya ilk kenar uzunluğu. height: yükseklik veya ikinci kenar uzunluğu.",
      "hy": "Նկարի՛ր: ուղղանկյուն. paintColor՝ գույնի անուն կամ hex գույն․ դատարկը ընտրում է պատահական գույն։ filled՝ true-ը լցնում է պատկերը, false-ը նկարում է եզրագիծը։ widthValue՝ լայնություն կամ առաջին կողմի երկարություն։ height՝ բարձրություն կամ երկրորդ կողմի երկարություն։"
    },
    "anchor": {
      "en": "Starts at the current edge or corner and follows the turtle direction. May move the turtle. Colour is changed; filled shapes use the fill path and endFill.",
      "de": "Beginnt am aktuellen Rand oder an der Ecke und folgt der Turtle-Richtung. Kann die Turtle bewegen. Farbe wird geändert; gefüllte Formen nutzen den Füllpfad und endFill.",
      "ja": "現在の辺や角から、タートルの向きに描きます。タートルの位置が変わることがあります。 色が変わります。塗る形は塗りの経路とendFillを使います。",
      "tr": "Geçerli kenardan veya köşeden, Turtle yönünde başlar. Turtle yerini değiştirebilir. Renk değişir; dolu şekiller dolgu yolu ve endFill kullanır.",
      "hy": "Սկսվում է ընթացիկ եզրից կամ անկյունից՝ Turtle-ի ուղղությամբ։ Կարող է փոխել Turtle-ի դիրքը։ Գույնը փոխվում է․ լցված պատկերները օգտագործում են լցման ուղին և endFill։"
    },
    "rotation": {
      "en": "Angles are degrees. 0 is up, 90 is right; positive turns are clockwise.",
      "de": "Winkel in Grad. 0 ist oben, 90 rechts; positive Drehung ist im Uhrzeigersinn.",
      "ja": "角度は度です。0は上、90は右。正の値は時計回りです。",
      "tr": "Açılar derece cinsindedir. 0 yukarı, 90 sağdır; pozitif dönüş saat yönündedir.",
      "hy": "Անկյունները աստիճաններով են։ 0-ը վերև է, 90-ը՝ աջ․ դրական պտույտը ժամացույցի սլաքի ուղղությամբ է։"
    },
    "code": "setBackground(\"white\"); hideTurtle(); goto(0,0); drawRect(120,80,\"coral\",true);"
  },
  {
    "name": "drawTriangle",
    "alias": "zeichneDreieck",
    "signature": "drawTriangle(size = 50, paintColor = \"\", filled = false)",
    "text": {
      "en": "Draw: a triangle. size: positive figure size. paintColor: colour name or hex colour; empty chooses a random colour. filled: true fills the shape, false draws the outline.",
      "de": "Zeichne: ein Dreieck. size: positive Figurengröße. paintColor: Farbname oder Hex-Farbe; leer wählt eine Zufallsfarbe. filled: true füllt die Form, false zeichnet den Umriss.",
      "ja": "描くもの: 三角形. size: 図形の大きさ。正の数を使います。 paintColor: 色の名前か16進数。空ならランダムな色です。 filled: trueは中を塗り、falseは輪郭だけを描きます。",
      "tr": "Çiz: bir üçgen. size: pozitif şekil boyutu. paintColor: renk adı veya hex rengi; boş değer rastgele renk seçer. filled: true içini doldurur, false dış çizgiyi çizer.",
      "hy": "Նկարի՛ր: եռանկյուն. size՝ պատկերի դրական չափը։ paintColor՝ գույնի անուն կամ hex գույն․ դատարկը ընտրում է պատահական գույն։ filled՝ true-ը լցնում է պատկերը, false-ը նկարում է եզրագիծը։"
    },
    "anchor": {
      "en": "Starts at the current edge or corner and follows the turtle direction. May move the turtle. Colour is changed; filled shapes use the fill path and endFill.",
      "de": "Beginnt am aktuellen Rand oder an der Ecke und folgt der Turtle-Richtung. Kann die Turtle bewegen. Farbe wird geändert; gefüllte Formen nutzen den Füllpfad und endFill.",
      "ja": "現在の辺や角から、タートルの向きに描きます。タートルの位置が変わることがあります。 色が変わります。塗る形は塗りの経路とendFillを使います。",
      "tr": "Geçerli kenardan veya köşeden, Turtle yönünde başlar. Turtle yerini değiştirebilir. Renk değişir; dolu şekiller dolgu yolu ve endFill kullanır.",
      "hy": "Սկսվում է ընթացիկ եզրից կամ անկյունից՝ Turtle-ի ուղղությամբ։ Կարող է փոխել Turtle-ի դիրքը։ Գույնը փոխվում է․ լցված պատկերները օգտագործում են լցման ուղին և endFill։"
    },
    "rotation": {
      "en": "Angles are degrees. 0 is up, 90 is right; positive turns are clockwise.",
      "de": "Winkel in Grad. 0 ist oben, 90 rechts; positive Drehung ist im Uhrzeigersinn.",
      "ja": "角度は度です。0は上、90は右。正の値は時計回りです。",
      "tr": "Açılar derece cinsindedir. 0 yukarı, 90 sağdır; pozitif dönüş saat yönündedir.",
      "hy": "Անկյունները աստիճաններով են։ 0-ը վերև է, 90-ը՝ աջ․ դրական պտույտը ժամացույցի սլաքի ուղղությամբ է։"
    },
    "code": "setBackground(\"white\"); hideTurtle(); goto(0,0); drawTriangle(100,\"coral\",true);"
  },
  {
    "name": "drawStar",
    "alias": "zeichneStern",
    "signature": "drawStar(points = 5, size = 50, paintColor = \"\", filled = false)",
    "text": {
      "en": "Draw: a star. size: positive figure size. paintColor: colour name or hex colour; empty chooses a random colour. filled: true fills the shape, false draws the outline. points: number of star points, at least 3. size is each edge length.",
      "de": "Zeichne: einen Stern. size: positive Figurengröße. paintColor: Farbname oder Hex-Farbe; leer wählt eine Zufallsfarbe. filled: true füllt die Form, false zeichnet den Umriss. points: Anzahl der Sternzacken, mindestens 3. size ist jede Kantenlänge.",
      "ja": "描くもの: 星. size: 図形の大きさ。正の数を使います。 paintColor: 色の名前か16進数。空ならランダムな色です。 filled: trueは中を塗り、falseは輪郭だけを描きます。 points: 星の先の数。3以上にします。 sizeは各辺の長さです。",
      "tr": "Çiz: bir yıldız. size: pozitif şekil boyutu. paintColor: renk adı veya hex rengi; boş değer rastgele renk seçer. filled: true içini doldurur, false dış çizgiyi çizer. points: yıldız köşesi sayısı, en az 3. size her kenarın uzunluğudur.",
      "hy": "Նկարի՛ր: աստղ. size՝ պատկերի դրական չափը։ paintColor՝ գույնի անուն կամ hex գույն․ դատարկը ընտրում է պատահական գույն։ filled՝ true-ը լցնում է պատկերը, false-ը նկարում է եզրագիծը։ points՝ աստղի ծայրերի թիվը՝ առնվազն 3։ size-ը ամեն եզրի երկարությունն է։"
    },
    "anchor": {
      "en": "Starts at the current edge or corner and follows the turtle direction. May move the turtle. Colour is changed; filled shapes use the fill path and endFill.",
      "de": "Beginnt am aktuellen Rand oder an der Ecke und folgt der Turtle-Richtung. Kann die Turtle bewegen. Farbe wird geändert; gefüllte Formen nutzen den Füllpfad und endFill.",
      "ja": "現在の辺や角から、タートルの向きに描きます。タートルの位置が変わることがあります。 色が変わります。塗る形は塗りの経路とendFillを使います。",
      "tr": "Geçerli kenardan veya köşeden, Turtle yönünde başlar. Turtle yerini değiştirebilir. Renk değişir; dolu şekiller dolgu yolu ve endFill kullanır.",
      "hy": "Սկսվում է ընթացիկ եզրից կամ անկյունից՝ Turtle-ի ուղղությամբ։ Կարող է փոխել Turtle-ի դիրքը։ Գույնը փոխվում է․ լցված պատկերները օգտագործում են լցման ուղին և endFill։"
    },
    "rotation": {
      "en": "Angles are degrees. 0 is up, 90 is right; positive turns are clockwise.",
      "de": "Winkel in Grad. 0 ist oben, 90 rechts; positive Drehung ist im Uhrzeigersinn.",
      "ja": "角度は度です。0は上、90は右。正の値は時計回りです。",
      "tr": "Açılar derece cinsindedir. 0 yukarı, 90 sağdır; pozitif dönüş saat yönündedir.",
      "hy": "Անկյունները աստիճաններով են։ 0-ը վերև է, 90-ը՝ աջ․ դրական պտույտը ժամացույցի սլաքի ուղղությամբ է։"
    },
    "code": "setBackground(\"white\"); hideTurtle(); goto(0,0); drawStar();"
  },
  {
    "name": "drawFlower",
    "alias": "zeichneBlume",
    "signature": "drawFlower(petals = 6, size = 35, outerColor = \"orchid\", innerColor = \"gold\")",
    "text": {
      "en": "Draw: a flower. size: positive figure size. petals: number of petals; size sets each petal size. outerColor colours the petals; innerColor colours the centre.",
      "de": "Zeichne: eine Blume. size: positive Figurengröße. petals: Anzahl der Blütenblätter; size ist ihre Größe. outerColor färbt die Blütenblätter; innerColor die Mitte.",
      "ja": "描くもの: 花. size: 図形の大きさ。正の数を使います。 petals: 花びらの数。sizeは花びらの大きさです。 outerColorは花びら、innerColorは中心の色です。",
      "tr": "Çiz: bir çiçek. size: pozitif şekil boyutu. petals: taç yaprağı sayısı; size yaprak boyutudur. outerColor yaprakları, innerColor merkezi renklendirir.",
      "hy": "Նկարի՛ր: ծաղիկ. size՝ պատկերի դրական չափը։ petals՝ ծաղկաթերթերի թիվը․ size-ը դրանց չափն է։ outerColor-ը գունավորում է թերթերը, innerColor-ը՝ կենտրոնը։"
    },
    "anchor": {
      "en": "Centred at the current turtle position; position is preserved.",
      "de": "Mitte an der aktuellen Turtle-Position; die Position bleibt erhalten.",
      "ja": "中心は現在のタートルの位置です。位置は変わりません。",
      "tr": "Merkez geçerli Turtle konumudur; konum korunur.",
      "hy": "Կենտրոնը Turtle-ի ընթացիկ դիրքում է․ դիրքը պահպանվում է։"
    },
    "rotation": {
      "en": "Uses the current direction; positive turns are clockwise.",
      "de": "Nutzt die aktuelle Richtung; positive Drehung ist im Uhrzeigersinn.",
      "ja": "現在の向きを使います。正の角度は時計回りです。",
      "tr": "Geçerli yönü kullanır; pozitif dönüş saat yönündedir.",
      "hy": "Օգտագործում է ընթացիկ ուղղությունը․ դրական պտույտը ժամացույցի սլաքի ուղղությամբ է։"
    },
    "code": "setBackground(\"white\"); hideTurtle(); goto(0,0); drawFlower();"
  },
  {
    "name": "drawCloud",
    "alias": "zeichneWolke",
    "signature": "drawCloud(size = 60, paintColor = \"white\")",
    "text": {
      "en": "Draw: a cloud. size: positive figure size. paintColor: colour name or hex colour; empty chooses a random colour.",
      "de": "Zeichne: eine Wolke. size: positive Figurengröße. paintColor: Farbname oder Hex-Farbe; leer wählt eine Zufallsfarbe.",
      "ja": "描くもの: 雲. size: 図形の大きさ。正の数を使います。 paintColor: 色の名前か16進数。空ならランダムな色です。",
      "tr": "Çiz: bir bulut. size: pozitif şekil boyutu. paintColor: renk adı veya hex rengi; boş değer rastgele renk seçer.",
      "hy": "Նկարի՛ր: ամպ. size՝ պատկերի դրական չափը։ paintColor՝ գույնի անուն կամ hex գույն․ դատարկը ընտրում է պատահական գույն։"
    },
    "anchor": {
      "en": "Draws around the current point. Restores position and leaves the pen down.",
      "de": "Zeichnet um den aktuellen Punkt. Stellt die Position wieder her und senkt den Stift.",
      "ja": "現在の点のまわりに描きます。位置を元に戻し、ペンを下げます。",
      "tr": "Geçerli noktanın çevresine çizer. Konumu geri yükler ve kalemi aşağıda bırakır.",
      "hy": "Նկարում է ընթացիկ կետի շուրջը։ Վերականգնում է դիրքը և գրիչը թողնում է իջեցված։"
    },
    "rotation": {
      "en": "Uses the current direction; positive turns are clockwise.",
      "de": "Nutzt die aktuelle Richtung; positive Drehung ist im Uhrzeigersinn.",
      "ja": "現在の向きを使います。正の角度は時計回りです。",
      "tr": "Geçerli yönü kullanır; pozitif dönüş saat yönündedir.",
      "hy": "Օգտագործում է ընթացիկ ուղղությունը․ դրական պտույտը ժամացույցի սլաքի ուղղությամբ է։"
    },
    "code": "setBackground(\"#eaf5ff\"); hideTurtle(); goto(0,0); drawCloud();"
  },
  {
    "name": "drawDino",
    "alias": "zeichneDino",
    "signature": "drawDino(size = 70, paintColor = \"LimeGreen\", legAngle = 20)",
    "text": {
      "en": "Draw: a dinosaur. size: positive figure size. paintColor: colour name or hex colour. legAngle: leg swing in degrees; dinosaur legs are limited to -45…45.",
      "de": "Zeichne: einen Dino. size: positive Figurengröße. paintColor: Farbname oder Hex-Farbe. legAngle: Beinwinkel in Grad; Dinobeine werden auf -45…45 begrenzt.",
      "ja": "描くもの: 恐竜. size: 図形の大きさ。正の数を使います。 paintColor: 色の名前か16進数。 legAngle: 足を振る角度。恐竜は-45〜45に制限されます。",
      "tr": "Çiz: bir dinozor. size: pozitif şekil boyutu. paintColor: renk adı veya hex rengi. legAngle: bacak salınımı; dinozor için -45…45 ile sınırlıdır.",
      "hy": "Նկարի՛ր: դինոզավր. size՝ պատկերի դրական չափը։ paintColor՝ գույնի անուն կամ hex գույն։ legAngle՝ ոտքի ճոճման անկյուն․ դինոզավրի համար սահմանը -45…45 է։"
    },
    "anchor": {
      "en": "Centred at the current turtle position; position is preserved.",
      "de": "Mitte an der aktuellen Turtle-Position; die Position bleibt erhalten.",
      "ja": "中心は現在のタートルの位置です。位置は変わりません。",
      "tr": "Merkez geçerli Turtle konumudur; konum korunur.",
      "hy": "Կենտրոնը Turtle-ի ընթացիկ դիրքում է․ դիրքը պահպանվում է։"
    },
    "rotation": {
      "en": "Does not use the turtle direction.",
      "de": "Nutzt die Turtle-Richtung nicht.",
      "ja": "タートルの向きは使いません。",
      "tr": "Turtle yönünü kullanmaz.",
      "hy": "Չի օգտագործում Turtle-ի ուղղությունը։"
    },
    "code": "setBackground(\"white\"); hideTurtle(); goto(0,0); drawDino();"
  },
  {
    "name": "drawPacman",
    "alias": "zeichnePacman",
    "signature": "drawPacman(radius = 50, paintColor = \"gold\", mouth = 60, direction)",
    "text": {
      "en": "Draw: Pacman. paintColor: colour name or hex colour. radius: distance from centre to edge. mouth: mouth opening, limited to 10…160 degrees. direction defaults to the current turtle angle.",
      "de": "Zeichne: Pacman. paintColor: Farbname oder Hex-Farbe. radius: Abstand von der Mitte zum Rand. mouth: Mundöffnung, begrenzt auf 10…160 Grad. direction nutzt ohne Angabe den Turtle-Winkel.",
      "ja": "描くもの: パックマン. paintColor: 色の名前か16進数。 radius: 中心から端までの長さです。 mouth: 口の開き。10〜160度に制限されます。directionを省くと現在の向きです。",
      "tr": "Çiz: Pacman. paintColor: renk adı veya hex rengi. radius: merkezden kenara uzaklık. mouth: ağız açıklığı, 10…160 dereceyle sınırlıdır. direction verilmezse Turtle yönüdür.",
      "hy": "Նկարի՛ր: Pacman. paintColor՝ գույնի անուն կամ hex գույն։ radius՝ կենտրոնից եզր հեռավորությունը։ mouth՝ բերանի բացվածք՝ 10…160 աստիճան։ direction-ը չտալու դեպքում օգտագործվում է Turtle-ի ուղղությունը։"
    },
    "anchor": {
      "en": "Centred at the current turtle position; position is preserved.",
      "de": "Mitte an der aktuellen Turtle-Position; die Position bleibt erhalten.",
      "ja": "中心は現在のタートルの位置です。位置は変わりません。",
      "tr": "Merkez geçerli Turtle konumudur; konum korunur.",
      "hy": "Կենտրոնը Turtle-ի ընթացիկ դիրքում է․ դիրքը պահպանվում է։"
    },
    "rotation": {
      "en": "Angles are degrees. 0 is up, 90 is right; positive turns are clockwise.",
      "de": "Winkel in Grad. 0 ist oben, 90 rechts; positive Drehung ist im Uhrzeigersinn.",
      "ja": "角度は度です。0は上、90は右。正の値は時計回りです。",
      "tr": "Açılar derece cinsindedir. 0 yukarı, 90 sağdır; pozitif dönüş saat yönündedir.",
      "hy": "Անկյունները աստիճաններով են։ 0-ը վերև է, 90-ը՝ աջ․ դրական պտույտը ժամացույցի սլաքի ուղղությամբ է։"
    },
    "code": "setBackground(\"white\"); hideTurtle(); goto(0,0); drawPacman();"
  },
  {
    "name": "drawButterfly",
    "alias": "zeichneSchmetterling",
    "signature": "drawButterfly(size = 60, paintColor = \"royalblue\", wingAngle = 35)",
    "text": {
      "en": "Draw: a butterfly. size: positive figure size. paintColor: colour name or hex colour; empty chooses a random colour. wingAngle: wing opening, limited to 0…90 degrees.",
      "de": "Zeichne: einen Schmetterling. size: positive Figurengröße. paintColor: Farbname oder Hex-Farbe; leer wählt eine Zufallsfarbe. wingAngle: Flügelöffnung, begrenzt auf 0…90 Grad.",
      "ja": "描くもの: チョウ. size: 図形の大きさ。正の数を使います。 paintColor: 色の名前か16進数。空ならランダムな色です。 wingAngle: 羽の開き。0〜90度に制限されます。",
      "tr": "Çiz: bir kelebek. size: pozitif şekil boyutu. paintColor: renk adı veya hex rengi; boş değer rastgele renk seçer. wingAngle: kanat açıklığı, 0…90 dereceyle sınırlıdır.",
      "hy": "Նկարի՛ր: թիթեռ. size՝ պատկերի դրական չափը։ paintColor՝ գույնի անուն կամ hex գույն․ դատարկը ընտրում է պատահական գույն։ wingAngle՝ թևի բացվածք՝ սահմանափակված 0…90 աստիճանով։"
    },
    "anchor": {
      "en": "Starts at the body; turns with the turtle. Restores position and direction.",
      "de": "Beginnt am Körper; dreht sich mit der Turtle. Stellt Position und Richtung wieder her.",
      "ja": "体の始点から描き、タートルと同じ向きに回ります。位置と向きを元に戻します。",
      "tr": "Gövdenin başında başlar; Turtle ile döner. Konumu ve yönü geri yükler.",
      "hy": "Սկսվում է մարմնի սկզբնակետից և պտտվում է Turtle-ի հետ։ Վերականգնում է դիրքը և ուղղությունը։"
    },
    "rotation": {
      "en": "Angles are degrees. 0 is up, 90 is right; positive turns are clockwise.",
      "de": "Winkel in Grad. 0 ist oben, 90 rechts; positive Drehung ist im Uhrzeigersinn.",
      "ja": "角度は度です。0は上、90は右。正の値は時計回りです。",
      "tr": "Açılar derece cinsindedir. 0 yukarı, 90 sağdır; pozitif dönüş saat yönündedir.",
      "hy": "Անկյունները աստիճաններով են։ 0-ը վերև է, 90-ը՝ աջ․ դրական պտույտը ժամացույցի սլաքի ուղղությամբ է։"
    },
    "code": "setBackground(\"white\"); hideTurtle(); goto(0,0); drawButterfly();"
  },
  {
    "name": "drawFish",
    "alias": "zeichneFisch",
    "signature": "drawFish(size = 90, paintColor = \"orange\", facing = \"right\", tailAngle = 0)",
    "text": {
      "en": "Draw: a fish. size: positive figure size. paintColor: colour name or hex colour. facing: right or left; German alias also accepts rechts or links. tailAngle is in degrees.",
      "de": "Zeichne: einen Fisch. size: positive Figurengröße. paintColor: Farbname oder Hex-Farbe. facing: right oder left; der deutsche Alias nimmt auch rechts oder links. tailAngle ist in Grad.",
      "ja": "描くもの: 魚. size: 図形の大きさ。正の数を使います。 paintColor: 色の名前か16進数。 facing: rightかleft。ドイツ語の命令ではrechtsとlinksも使えます。tailAngleは尾の角度です。",
      "tr": "Çiz: bir balık. size: pozitif şekil boyutu. paintColor: renk adı veya hex rengi. facing: right veya left; Almanca ad rechts veya links de kabul eder. tailAngle derece cinsindedir.",
      "hy": "Նկարի՛ր: ձուկ. size՝ պատկերի դրական չափը։ paintColor՝ գույնի անուն կամ hex գույն։ facing՝ right կամ left․ գերմաներեն անունը ընդունում է նաև rechts կամ links։ tailAngle-ը աստիճաններով է։"
    },
    "anchor": {
      "en": "Centred at the current turtle position; position is preserved.",
      "de": "Mitte an der aktuellen Turtle-Position; die Position bleibt erhalten.",
      "ja": "中心は現在のタートルの位置です。位置は変わりません。",
      "tr": "Merkez geçerli Turtle konumudur; konum korunur.",
      "hy": "Կենտրոնը Turtle-ի ընթացիկ դիրքում է․ դիրքը պահպանվում է։"
    },
    "rotation": {
      "en": "Does not use the turtle direction.",
      "de": "Nutzt die Turtle-Richtung nicht.",
      "ja": "タートルの向きは使いません。",
      "tr": "Turtle yönünü kullanmaz.",
      "hy": "Չի օգտագործում Turtle-ի ուղղությունը։"
    },
    "code": "setBackground(\"white\"); hideTurtle(); goto(0,0); drawFish();"
  },
  {
    "name": "drawSubmarine",
    "alias": "zeichneUboot",
    "signature": "drawSubmarine(size = 160, paintColor = \"gold\")",
    "text": {
      "en": "Draw: a submarine. size: positive figure size. paintColor: colour name or hex colour.",
      "de": "Zeichne: ein U-Boot. size: positive Figurengröße. paintColor: Farbname oder Hex-Farbe.",
      "ja": "描くもの: 潜水艦. size: 図形の大きさ。正の数を使います。 paintColor: 色の名前か16進数。",
      "tr": "Çiz: bir denizaltı. size: pozitif şekil boyutu. paintColor: renk adı veya hex rengi.",
      "hy": "Նկարի՛ր: սուզանավ. size՝ պատկերի դրական չափը։ paintColor՝ գույնի անուն կամ hex գույն։"
    },
    "anchor": {
      "en": "Centred at the current turtle position; position is preserved.",
      "de": "Mitte an der aktuellen Turtle-Position; die Position bleibt erhalten.",
      "ja": "中心は現在のタートルの位置です。位置は変わりません。",
      "tr": "Merkez geçerli Turtle konumudur; konum korunur.",
      "hy": "Կենտրոնը Turtle-ի ընթացիկ դիրքում է․ դիրքը պահպանվում է։"
    },
    "rotation": {
      "en": "Does not use the turtle direction.",
      "de": "Nutzt die Turtle-Richtung nicht.",
      "ja": "タートルの向きは使いません。",
      "tr": "Turtle yönünü kullanmaz.",
      "hy": "Չի օգտագործում Turtle-ի ուղղությունը։"
    },
    "code": "setBackground(\"white\"); hideTurtle(); goto(0,0); drawSubmarine();"
  },
  {
    "name": "drawRocket",
    "alias": "zeichneRakete",
    "signature": "drawRocket(size = 110, paintColor = \"coral\", rotation = 0)",
    "text": {
      "en": "Draw: a rocket. size: positive figure size. paintColor: colour name or hex colour. rotation: rotation in degrees.",
      "de": "Zeichne: eine Rakete. size: positive Figurengröße. paintColor: Farbname oder Hex-Farbe. rotation: Drehung in Grad.",
      "ja": "描くもの: ロケット. size: 図形の大きさ。正の数を使います。 paintColor: 色の名前か16進数。 rotation: 回転角度（度）です。",
      "tr": "Çiz: bir roket. size: pozitif şekil boyutu. paintColor: renk adı veya hex rengi. rotation: derece cinsinden dönüş.",
      "hy": "Նկարի՛ր: հրթիռ. size՝ պատկերի դրական չափը։ paintColor՝ գույնի անուն կամ hex գույն։ rotation՝ պտույտը աստիճաններով։"
    },
    "anchor": {
      "en": "Centred at the current turtle position; position is preserved.",
      "de": "Mitte an der aktuellen Turtle-Position; die Position bleibt erhalten.",
      "ja": "中心は現在のタートルの位置です。位置は変わりません。",
      "tr": "Merkez geçerli Turtle konumudur; konum korunur.",
      "hy": "Կենտրոնը Turtle-ի ընթացիկ դիրքում է․ դիրքը պահպանվում է։"
    },
    "rotation": {
      "en": "Angles are degrees. 0 is up, 90 is right; positive turns are clockwise.",
      "de": "Winkel in Grad. 0 ist oben, 90 rechts; positive Drehung ist im Uhrzeigersinn.",
      "ja": "角度は度です。0は上、90は右。正の値は時計回りです。",
      "tr": "Açılar derece cinsindedir. 0 yukarı, 90 sağdır; pozitif dönüş saat yönündedir.",
      "hy": "Անկյունները աստիճաններով են։ 0-ը վերև է, 90-ը՝ աջ․ դրական պտույտը ժամացույցի սլաքի ուղղությամբ է։"
    },
    "code": "setBackground(\"white\"); hideTurtle(); goto(0,0); drawRocket();"
  },
  {
    "name": "drawFirework",
    "alias": "zeichneFeuerwerk",
    "signature": "drawFirework(size = 120, paintColor = \"gold\", rotation = 0, rays = 24)",
    "text": {
      "en": "Draw: a firework. size: positive figure size. paintColor: colour name or hex colour. rays: an integer from 3 to 120. size is the diameter. rotation: rotation in degrees.",
      "de": "Zeichne: ein Feuerwerk. size: positive Figurengröße. paintColor: Farbname oder Hex-Farbe. rays: ganze Zahl von 3 bis 120. size ist der Durchmesser. rotation: Drehung in Grad.",
      "ja": "描くもの: 花火. size: 図形の大きさ。正の数を使います。 paintColor: 色の名前か16進数。 rays: 3〜120の整数。sizeは直径です。 rotation: 回転角度（度）です。",
      "tr": "Çiz: bir havai fişek. size: pozitif şekil boyutu. paintColor: renk adı veya hex rengi. rays: 3 ile 120 arasında tam sayı. size çaptır. rotation: derece cinsinden dönüş.",
      "hy": "Նկարի՛ր: հրավառություն. size՝ պատկերի դրական չափը։ paintColor՝ գույնի անուն կամ hex գույն։ rays՝ ամբողջ թիվ 3-ից 120։ size-ը տրամագիծն է։ rotation՝ պտույտը աստիճաններով։"
    },
    "anchor": {
      "en": "Centred at the current turtle position; position is preserved.",
      "de": "Mitte an der aktuellen Turtle-Position; die Position bleibt erhalten.",
      "ja": "中心は現在のタートルの位置です。位置は変わりません。",
      "tr": "Merkez geçerli Turtle konumudur; konum korunur.",
      "hy": "Կենտրոնը Turtle-ի ընթացիկ դիրքում է․ դիրքը պահպանվում է։"
    },
    "rotation": {
      "en": "Angles are degrees. 0 is up, 90 is right; positive turns are clockwise.",
      "de": "Winkel in Grad. 0 ist oben, 90 rechts; positive Drehung ist im Uhrzeigersinn.",
      "ja": "角度は度です。0は上、90は右。正の値は時計回りです。",
      "tr": "Açılar derece cinsindedir. 0 yukarı, 90 sağdır; pozitif dönüş saat yönündedir.",
      "hy": "Անկյունները աստիճաններով են։ 0-ը վերև է, 90-ը՝ աջ․ դրական պտույտը ժամացույցի սլաքի ուղղությամբ է։"
    },
    "code": "setBackground(\"white\"); hideTurtle(); goto(0,0); drawFirework();"
  },
  {
    "name": "drawJet",
    "alias": "zeichneJet",
    "signature": "drawJet(size = 120)",
    "text": {
      "en": "Draw: a jet. size: positive figure size.",
      "de": "Zeichne: einen Jet. size: positive Figurengröße.",
      "ja": "描くもの: ジェット機. size: 図形の大きさ。正の数を使います。",
      "tr": "Çiz: bir jet. size: pozitif şekil boyutu.",
      "hy": "Նկարի՛ր: ինքնաթիռ. size՝ պատկերի դրական չափը։"
    },
    "anchor": {
      "en": "Centred at the current turtle position; position is preserved.",
      "de": "Mitte an der aktuellen Turtle-Position; die Position bleibt erhalten.",
      "ja": "中心は現在のタートルの位置です。位置は変わりません。",
      "tr": "Merkez geçerli Turtle konumudur; konum korunur.",
      "hy": "Կենտրոնը Turtle-ի ընթացիկ դիրքում է․ դիրքը պահպանվում է։"
    },
    "rotation": {
      "en": "Does not use the turtle direction.",
      "de": "Nutzt die Turtle-Richtung nicht.",
      "ja": "タートルの向きは使いません。",
      "tr": "Turtle yönünü kullanmaz.",
      "hy": "Չի օգտագործում Turtle-ի ուղղությունը։"
    },
    "code": "setBackground(\"white\"); hideTurtle(); goto(0,0); drawJet();"
  },
  {
    "name": "drawBomb",
    "alias": "zeichneSprengkoerper",
    "signature": "drawBomb(size = 50)",
    "text": {
      "en": "Draw: a cartoon bomb. size: positive figure size.",
      "de": "Zeichne: einen Cartoon-Sprengkörper. size: positive Figurengröße.",
      "ja": "描くもの: 漫画の爆弾. size: 図形の大きさ。正の数を使います。",
      "tr": "Çiz: bir çizgi film bombası. size: pozitif şekil boyutu.",
      "hy": "Նկարի՛ր: մուլտֆիլմի ռումբ. size՝ պատկերի դրական չափը։"
    },
    "anchor": {
      "en": "Centred at the current turtle position; position is preserved.",
      "de": "Mitte an der aktuellen Turtle-Position; die Position bleibt erhalten.",
      "ja": "中心は現在のタートルの位置です。位置は変わりません。",
      "tr": "Merkez geçerli Turtle konumudur; konum korunur.",
      "hy": "Կենտրոնը Turtle-ի ընթացիկ դիրքում է․ դիրքը պահպանվում է։"
    },
    "rotation": {
      "en": "Does not use the turtle direction.",
      "de": "Nutzt die Turtle-Richtung nicht.",
      "ja": "タートルの向きは使いません。",
      "tr": "Turtle yönünü kullanmaz.",
      "hy": "Չի օգտագործում Turtle-ի ուղղությունը։"
    },
    "code": "setBackground(\"white\"); hideTurtle(); goto(0,0); drawBomb();"
  },
  {
    "name": "drawFireball",
    "alias": "zeichneFeuerball",
    "signature": "drawFireball(size = 80)",
    "text": {
      "en": "Draw: a fireball. size: positive figure size.",
      "de": "Zeichne: einen Feuerball. size: positive Figurengröße.",
      "ja": "描くもの: 火の玉. size: 図形の大きさ。正の数を使います。",
      "tr": "Çiz: bir ateş topu. size: pozitif şekil boyutu.",
      "hy": "Նկարի՛ր: հրե գունդ. size՝ պատկերի դրական չափը։"
    },
    "anchor": {
      "en": "Centred at the current turtle position; position is preserved.",
      "de": "Mitte an der aktuellen Turtle-Position; die Position bleibt erhalten.",
      "ja": "中心は現在のタートルの位置です。位置は変わりません。",
      "tr": "Merkez geçerli Turtle konumudur; konum korunur.",
      "hy": "Կենտրոնը Turtle-ի ընթացիկ դիրքում է․ դիրքը պահպանվում է։"
    },
    "rotation": {
      "en": "Does not use the turtle direction.",
      "de": "Nutzt die Turtle-Richtung nicht.",
      "ja": "タートルの向きは使いません。",
      "tr": "Turtle yönünü kullanmaz.",
      "hy": "Չի օգտագործում Turtle-ի ուղղությունը։"
    },
    "code": "setBackground(\"white\"); hideTurtle(); goto(0,0); drawFireball();"
  },
  {
    "name": "drawDog",
    "alias": "zeichneHund",
    "signature": "drawDog(size = 90, facing = \"right\", tailAngle = 0, legAngle = 0)",
    "text": {
      "en": "Draw a dog. size sets its scale; facing is right or left (German alias: rechts or links). tailAngle and legAngle are finite degrees.",
      "de": "Zeichne einen Hund. size setzt die Größe; facing ist right oder left (deutscher Alias: rechts oder links). tailAngle und legAngle sind endliche Winkel in Grad.",
      "ja": "犬を描きます。sizeは大きさ、facingはrightかleft（ドイツ語ではrechtsかlinks）。tailAngleとlegAngleは有限の角度です。",
      "tr": "Bir köpek çiz. size boyuttur; facing right veya left (Almanca ad: rechts veya links). tailAngle ve legAngle sonlu derece değerleridir.",
      "hy": "Նկարի՛ր շուն։ size-ը չափն է, facing-ը՝ right կամ left (գերմաներեն՝ rechts կամ links)։ tailAngle և legAngle-ը վերջավոր անկյուններ են աստիճաններով։"
    },
    "anchor": {
      "en": "The current position marks the paws on the ground.",
      "de": "Die aktuelle Position markiert die Pfoten am Boden.",
      "ja": "現在の位置が、地面に接する足の位置です。",
      "tr": "Geçerli konum yerdeki patileri gösterir.",
      "hy": "Ընթացիկ դիրքը ցույց է տալիս թաթերի տեղը գետնին։"
    },
    "rotation": {
      "en": "Does not use the turtle direction.",
      "de": "Nutzt die Turtle-Richtung nicht.",
      "ja": "タートルの向きは使いません。",
      "tr": "Turtle yönünü kullanmaz.",
      "hy": "Չի օգտագործում Turtle-ի ուղղությունը։"
    },
    "code": "setBackground(\"white\"); hideTurtle(); goto(0,0); drawDog();"
  },
  {
    "name": "drawFerrisWheel",
    "alias": "zeichneRiesenrad",
    "signature": "drawFerrisWheel(size = 300, rotation = 0)",
    "text": {
      "en": "Draw: a Ferris wheel. size: positive figure size. rotation: rotation in degrees.",
      "de": "Zeichne: ein Riesenrad. size: positive Figurengröße. rotation: Drehung in Grad.",
      "ja": "描くもの: 観覧車. size: 図形の大きさ。正の数を使います。 rotation: 回転角度（度）です。",
      "tr": "Çiz: bir dönme dolap. size: pozitif şekil boyutu. rotation: derece cinsinden dönüş.",
      "hy": "Նկարի՛ր: դիտանիվ. size՝ պատկերի դրական չափը։ rotation՝ պտույտը աստիճաններով։"
    },
    "anchor": {
      "en": "Centred at the current turtle position; position is preserved.",
      "de": "Mitte an der aktuellen Turtle-Position; die Position bleibt erhalten.",
      "ja": "中心は現在のタートルの位置です。位置は変わりません。",
      "tr": "Merkez geçerli Turtle konumudur; konum korunur.",
      "hy": "Կենտրոնը Turtle-ի ընթացիկ դիրքում է․ դիրքը պահպանվում է։"
    },
    "rotation": {
      "en": "Angles are degrees. 0 is up, 90 is right; positive turns are clockwise.",
      "de": "Winkel in Grad. 0 ist oben, 90 rechts; positive Drehung ist im Uhrzeigersinn.",
      "ja": "角度は度です。0は上、90は右。正の値は時計回りです。",
      "tr": "Açılar derece cinsindedir. 0 yukarı, 90 sağdır; pozitif dönüş saat yönündedir.",
      "hy": "Անկյունները աստիճաններով են։ 0-ը վերև է, 90-ը՝ աջ․ դրական պտույտը ժամացույցի սլաքի ուղղությամբ է։"
    },
    "code": "setBackground(\"white\"); hideTurtle(); goto(0,0); drawFerrisWheel();"
  },
  {
    "name": "drawLine",
    "alias": "zeichneLinie",
    "signature": "drawLine(x1, y1, x2, y2, paintColor = \"black\", thickness = 1)",
    "text": {
      "en": "Draw: a line. paintColor: colour name or hex colour. x1, y1 start the line; x2, y2 end it. thickness sets line width.",
      "de": "Zeichne: eine Linie. paintColor: Farbname oder Hex-Farbe. x1, y1 sind der Anfang; x2, y2 das Ende. thickness ist die Liniendicke.",
      "ja": "描くもの: 線. paintColor: 色の名前か16進数。 x1, y1が始点、x2, y2が終点です。thicknessは線の太さです。",
      "tr": "Çiz: bir çizgi. paintColor: renk adı veya hex rengi. x1, y1 başlangıç; x2, y2 bitiştir. thickness çizgi kalınlığıdır.",
      "hy": "Նկարի՛ր: գիծ. paintColor՝ գույնի անուն կամ hex գույն։ x1, y1-ը սկիզբն են, x2, y2-ը՝ վերջը։ thickness-ը գծի հաստությունն է։"
    },
    "anchor": {
      "en": "From (x1, y1) to (x2, y2). Leaves the turtle at the end with pen down, new colour and thickness.",
      "de": "Von (x1, y1) nach (x2, y2). Turtle bleibt am Ende mit gesenktem Stift, neuer Farbe und Dicke.",
      "ja": "(x1, y1)から(x2, y2)へ描きます。終点に移動し、ペンは下、新しい色と太さになります。",
      "tr": "(x1, y1) noktasından (x2, y2) noktasına. Turtle sonda, kalem aşağıda, yeni renk ve kalınlıkla kalır.",
      "hy": "(x1, y1)-ից (x2, y2)։ Turtle-ը մնում է վերջնակետում՝ իջեցված գրիչով, նոր գույնով և հաստությամբ։"
    },
    "rotation": {
      "en": "Does not use the turtle direction.",
      "de": "Nutzt die Turtle-Richtung nicht.",
      "ja": "タートルの向きは使いません。",
      "tr": "Turtle yönünü kullanmaz.",
      "hy": "Չի օգտագործում Turtle-ի ուղղությունը։"
    },
    "code": "setBackground(\"white\"); hideTurtle(); goto(0,0); drawLine(-80,-50,80,50,\"coral\",6);"
  },
  {
    "name": "drawArc",
    "alias": "zeichneBogen",
    "signature": "drawArc(radius = 50, degrees = 180, paintColor = \"\", filled = false)",
    "text": {
      "en": "Draw an arc from the current edge. radius is the approximate circle radius; degrees is the clockwise sweep (360 makes a whole polygonal circle). paintColor empty chooses a random colour; filled = true closes and fills the path.",
      "de": "Zeichne einen Bogen ab dem aktuellen Rand. radius ist der ungefähre Kreisradius; degrees der Bogenwinkel im Uhrzeigersinn (360 ergibt einen ganzen Vieleckkreis). Leeres paintColor wählt eine Zufallsfarbe; filled = true schließt und füllt den Pfad.",
      "ja": "現在の辺から円弧を描きます。radiusはおよその半径、degreesは時計回りの角度（360で多角形の円全体）。paintColorが空ならランダムな色、filled = trueなら閉じて塗ります。",
      "tr": "Geçerli kenardan bir yay çiz. radius yaklaşık yarıçap, degrees saat yönündeki yay açısıdır (360 tam çokgen daire yapar). paintColor boşsa rastgele renk; filled = true yolu kapatıp doldurur.",
      "hy": "Ընթացիկ եզրից նկարի՛ր աղեղ։ radius-ը մոտավոր շառավիղն է, degrees-ը՝ ժամացույցի սլաքի ուղղությամբ անկյունը (360-ը տալիս է ամբողջ բազմանկյուն շրջան)։ Դատարկ paintColor-ը ընտրում է պատահական գույն․ filled = true-ը փակում և լցնում է ուղին։"
    },
    "anchor": {
      "en": "Starts at the current edge or corner and follows the turtle direction. May move the turtle. Colour is changed; filled shapes use the fill path and endFill.",
      "de": "Beginnt am aktuellen Rand oder an der Ecke und folgt der Turtle-Richtung. Kann die Turtle bewegen. Farbe wird geändert; gefüllte Formen nutzen den Füllpfad und endFill.",
      "ja": "現在の辺や角から、タートルの向きに描きます。タートルの位置が変わることがあります。 色が変わります。塗る形は塗りの経路とendFillを使います。",
      "tr": "Geçerli kenardan veya köşeden, Turtle yönünde başlar. Turtle yerini değiştirebilir. Renk değişir; dolu şekiller dolgu yolu ve endFill kullanır.",
      "hy": "Սկսվում է ընթացիկ եզրից կամ անկյունից՝ Turtle-ի ուղղությամբ։ Կարող է փոխել Turtle-ի դիրքը։ Գույնը փոխվում է․ լցված պատկերները օգտագործում են լցման ուղին և endFill։"
    },
    "rotation": {
      "en": "Angles are degrees. 0 is up, 90 is right; positive turns are clockwise.",
      "de": "Winkel in Grad. 0 ist oben, 90 rechts; positive Drehung ist im Uhrzeigersinn.",
      "ja": "角度は度です。0は上、90は右。正の値は時計回りです。",
      "tr": "Açılar derece cinsindedir. 0 yukarı, 90 sağdır; pozitif dönüş saat yönündedir.",
      "hy": "Անկյունները աստիճաններով են։ 0-ը վերև է, 90-ը՝ աջ․ դրական պտույտը ժամացույցի սլաքի ուղղությամբ է։"
    },
    "code": "setBackground(\"white\"); hideTurtle(); goto(0,0); drawArc(80,120,\"coral\");"
  },
  {
    "name": "drawSpiral",
    "alias": "zeichneSpirale",
    "signature": "drawSpiral(steps = 100, turn = 61, paintColor)",
    "text": {
      "en": "Draw: a spiral. steps: up to 1000 steps. turn: degrees per step. paintColor can also be a colour array.",
      "de": "Zeichne: eine Spirale. steps: höchstens 1000 Schritte. turn: Grad je Schritt. paintColor darf auch ein Farbarray sein.",
      "ja": "描くもの: らせん. steps: 最大1000回。turn: 1回ごとの角度。paintColorには色の配列も使えます。",
      "tr": "Çiz: bir spiral. steps: en fazla 1000 adım. turn: adım başına derece. paintColor renk dizisi de olabilir.",
      "hy": "Նկարի՛ր: պարույր. steps՝ առավելագույնը 1000 քայլ։ turn՝ աստիճաններ մեկ քայլում։ paintColor-ը կարող է նաև գույների զանգված լինել։"
    },
    "anchor": {
      "en": "Starts at the current point, repeatedly moves forward and turns; leaves a new position, direction and pen colour.",
      "de": "Beginnt am aktuellen Punkt, geht wiederholt vorwärts und dreht; verändert Position, Richtung und Stiftfarbe.",
      "ja": "現在の点から、前進と回転を繰り返します。位置、向き、ペンの色が変わります。",
      "tr": "Geçerli noktada başlayıp ilerler ve döner; konum, yön ve kalem rengi değişir.",
      "hy": "Սկսում է ընթացիկ կետից, կրկնում է առաջ շարժումն ու պտույտը․ փոխում է դիրքը, ուղղությունը և գրչի գույնը։"
    },
    "rotation": {
      "en": "Starts in the current direction; turn is the clockwise change per step in degrees.",
      "de": "Startet in Blickrichtung; turn ist die Drehung im Uhrzeigersinn je Schritt in Grad.",
      "ja": "現在の向きから始めます。turnは1歩ごとの時計回りの角度です。",
      "tr": "Geçerli yönde başlar; turn adım başına saat yönündeki derece değişimidir.",
      "hy": "Սկսում է ընթացիկ ուղղությամբ․ turn-ը մեկ քայլում ժամացույցի սլաքի ուղղությամբ անկյան փոփոխությունն է։"
    },
    "code": "setBackground(\"white\"); hideTurtle(); goto(0,0); drawSpiral(50,61,\"coral\");"
  },
  {
    "name": "jumpHeight",
    "alias": "sprungHoehe",
    "signature": "jumpHeight(tick, height = 100, duration = 40)",
    "text": {
      "en": "tick: teaching frames since take-off. height: maximum height. duration: teaching frames; returns 0 outside the jump.",
      "de": "tick: Lernbilder seit Absprung. height: maximale Höhe. duration: Lernbilder; außerhalb des Sprungs kommt 0 zurück.",
      "ja": "tick: 離陸後のフレーム数。height: 最大の高さ。duration: フレーム数。範囲外では0です。",
      "tr": "tick: kalkıştan sonraki öğretim kareleri. height: en yüksek nokta. duration: kare sayısı; dışarıda 0 döner.",
      "hy": "tick՝ թռիչքից հետո ուսումնական կադրերը։ height՝ առավելագույն բարձրությունը։ duration՝ կադրերի թիվը․ սահմաններից դուրս վերադարձնում է 0։"
    },
    "anchor": {
      "en": "No drawing position is needed.",
      "de": "Keine Zeichenposition nötig.",
      "ja": "描く位置は必要ありません。",
      "tr": "Çizim konumu gerekmez.",
      "hy": "Նկարելու դիրք պետք չէ։"
    },
    "rotation": {
      "en": "Does not use the turtle direction.",
      "de": "Nutzt die Turtle-Richtung nicht.",
      "ja": "タートルの向きは使いません。",
      "tr": "Turtle yönünü kullanmaz.",
      "hy": "Չի օգտագործում Turtle-ի ուղղությունը։"
    },
    "code": "setBackground(\"white\"); hideTurtle(); goto(0,0); goto(0,jumpHeight(20)); drawDino();"
  },
  {
    "name": "getRandomNumber",
    "alias": "zufallsZahl",
    "signature": "getRandomNumber(min = 1, max = 100)",
    "text": {
      "en": "min and max are inclusive; reversed bounds are swapped. Returns a whole number.",
      "de": "min und max sind eingeschlossen; vertauschte Grenzen werden getauscht. Gibt eine ganze Zahl zurück.",
      "ja": "minとmaxを含む整数を返します。大小が逆なら入れ替えます。",
      "tr": "min ve max dahildir; ters sınırlar yer değiştirir. Tam sayı döndürür.",
      "hy": "min և max-ը ներառված են․ հակառակ սահմանները փոխատեղվում են։ Վերադարձնում է ամբողջ թիվ։"
    },
    "anchor": {
      "en": "No drawing position is needed.",
      "de": "Keine Zeichenposition nötig.",
      "ja": "描く位置は必要ありません。",
      "tr": "Çizim konumu gerekmez.",
      "hy": "Նկարելու դիրք պետք չէ։"
    },
    "rotation": {
      "en": "Does not use the turtle direction.",
      "de": "Nutzt die Turtle-Richtung nicht.",
      "ja": "タートルの向きは使いません。",
      "tr": "Turtle yönünü kullanmaz.",
      "hy": "Չի օգտագործում Turtle-ի ուղղությունը։"
    },
    "code": "setBackground(\"white\"); hideTurtle(); goto(0,0); writeText(getRandomNumber(1,10));"
  },
  {
    "name": "getRandomColor",
    "alias": "zufallsFarbe",
    "signature": "getRandomColor()",
    "text": {
      "en": "Return a random CSS colour from a fixed palette. No values needed.",
      "de": "Gib eine zufällige CSS-Farbe aus einer festen Palette zurück. Keine Werte nötig.",
      "ja": "決まった色の一覧から、ランダムなCSSの色を返します。値は不要です。",
      "tr": "Sabit paletten rastgele bir CSS rengi döndürür. Değer gerekmez.",
      "hy": "Ֆիքսված գունաշարքից վերադարձնում է պատահական CSS գույն։ Արժեքներ պետք չեն։"
    },
    "anchor": {
      "en": "No drawing position is needed.",
      "de": "Keine Zeichenposition nötig.",
      "ja": "描く位置は必要ありません。",
      "tr": "Çizim konumu gerekmez.",
      "hy": "Նկարելու դիրք պետք չէ։"
    },
    "rotation": {
      "en": "Does not use the turtle direction.",
      "de": "Nutzt die Turtle-Richtung nicht.",
      "ja": "タートルの向きは使いません。",
      "tr": "Turtle yönünü kullanmaz.",
      "hy": "Չի օգտագործում Turtle-ի ուղղությունը։"
    },
    "code": "setBackground(\"white\"); hideTurtle(); goto(0,0); drawCircle(70,getRandomColor(),true);"
  },
  {
    "name": "jumpRandom",
    "alias": "springeZufaellig",
    "signature": "jumpRandom()",
    "text": {
      "en": "Lift the pen, go to random x and y between -300 and 300, then lower the pen.",
      "de": "Hebe den Stift, gehe zu zufälligem x und y von -300 bis 300 und senke den Stift.",
      "ja": "ペンを上げ、-300〜300のランダムなxとyへ移動してから、ペンを下げます。",
      "tr": "Kalemi kaldırır, -300…300 arasında rastgele x ve y konumuna gider, sonra kalemi indirir.",
      "hy": "Բարձրացնում է գրիչը, գնում է պատահական x և y դիրքի՝ -300-ից 300, ապա իջեցնում է գրիչը։"
    },
    "anchor": {
      "en": "No drawing position is needed.",
      "de": "Keine Zeichenposition nötig.",
      "ja": "描く位置は必要ありません。",
      "tr": "Çizim konumu gerekmez.",
      "hy": "Նկարելու դիրք պետք չէ։"
    },
    "rotation": {
      "en": "Does not use the turtle direction.",
      "de": "Nutzt die Turtle-Richtung nicht.",
      "ja": "タートルの向きは使いません。",
      "tr": "Turtle yönünü kullanmaz.",
      "hy": "Չի օգտագործում Turtle-ի ուղղությունը։"
    },
    "code": "setBackground(\"white\"); hideTurtle(); goto(0,0); jumpRandom(); drawCircle(40,\"coral\",true);"
  },
  {
    "name": "hideArrow",
    "alias": "versteckePfeil",
    "signature": "hideArrow()",
    "text": {
      "en": "Raises the pen and moves to (1000, 1000); use hideTurtle to preserve position.",
      "de": "Hebt den Stift und bewegt nach (1000, 1000); hideTurtle erhält die Position.",
      "ja": "ペンを上げて(1000, 1000)へ動きます。位置を保つならhideTurtleです。",
      "tr": "Kalemi kaldırıp (1000, 1000) konumuna gider; konumu korumak için hideTurtle kullan.",
      "hy": "Բարձրացնում է գրիչը և գնում է (1000, 1000) դիրքին․ դիրքը պահելու համար օգտագործի՛ր hideTurtle։"
    },
    "anchor": {
      "en": "Raises the pen and moves to (1000, 1000); use hideTurtle to preserve position.",
      "de": "Hebt den Stift und bewegt nach (1000, 1000); hideTurtle erhält die Position.",
      "ja": "ペンを上げて(1000, 1000)へ動きます。位置を保つならhideTurtleです。",
      "tr": "Kalemi kaldırıp (1000, 1000) konumuna gider; konumu korumak için hideTurtle kullan.",
      "hy": "Բարձրացնում է գրիչը և գնում է (1000, 1000) դիրքին․ դիրքը պահելու համար օգտագործի՛ր hideTurtle։"
    },
    "rotation": {
      "en": "Does not use the turtle direction.",
      "de": "Nutzt die Turtle-Richtung nicht.",
      "ja": "タートルの向きは使いません。",
      "tr": "Turtle yönünü kullanmaz.",
      "hy": "Չի օգտագործում Turtle-ի ուղղությունը։"
    },
    "code": "setBackground(\"white\"); hideTurtle(); goto(0,0); hideArrow(); goto(0,0); drawCircle(70,\"coral\",true);"
  },
  {
    "name": "goto",
    "alias": "geheZu",
    "signature": "goto(x, y)",
    "text": {
      "en": "Jump to x, y without drawing a line or changing direction. Values are truncated towards zero to integer coordinates.",
      "de": "Springe zu x, y ohne Linie und ohne Richtungswechsel. Werte werden zu ganzen Koordinaten gekürzt.",
      "ja": "線を描かず、向きを変えずにx, yへ移動します。座標は整数に切り捨てられます。",
      "tr": "Çizgi çizmeden ve yönü değiştirmeden x, y konumuna sıçrar. Koordinatlar tam sayıya kesilir.",
      "hy": "Գնում է x, y դիրքին՝ առանց գիծ գծելու կամ ուղղությունը փոխելու։ Կոորդինատները կտրվում են մինչև ամբողջ թիվ։"
    },
    "anchor": {
      "en": "Uses the current turtle position.",
      "de": "Nutzt die aktuelle Turtle-Position.",
      "ja": "現在のタートルの位置を使います。",
      "tr": "Geçerli Turtle konumunu kullanır.",
      "hy": "Օգտագործում է Turtle-ի ընթացիկ դիրքը։"
    },
    "rotation": {
      "en": "Angles are degrees. 0 is up, 90 is right; positive turns are clockwise.",
      "de": "Winkel in Grad. 0 ist oben, 90 rechts; positive Drehung ist im Uhrzeigersinn.",
      "ja": "角度は度です。0は上、90は右。正の値は時計回りです。",
      "tr": "Açılar derece cinsindedir. 0 yukarı, 90 sağdır; pozitif dönüş saat yönündedir.",
      "hy": "Անկյունները աստիճաններով են։ 0-ը վերև է, 90-ը՝ աջ․ դրական պտույտը ժամացույցի սլաքի ուղղությամբ է։"
    },
    "code": "setBackground(\"white\"); hideTurtle(); goto(0,0); goto(-80, 40); drawCircle(40, \"coral\", true);"
  },
  {
    "name": "angle",
    "alias": "setzeWinkel",
    "signature": "angle(degrees)",
    "text": {
      "en": "Set the direction to degrees.",
      "de": "Setze die Richtung auf degrees.",
      "ja": "向きをdegrees度にします。",
      "tr": "Yönü degrees dereceye ayarlar.",
      "hy": "Ուղղությունը սահմանում է degrees աստիճանով։"
    },
    "anchor": {
      "en": "Uses the current turtle position.",
      "de": "Nutzt die aktuelle Turtle-Position.",
      "ja": "現在のタートルの位置を使います。",
      "tr": "Geçerli Turtle konumunu kullanır.",
      "hy": "Օգտագործում է Turtle-ի ընթացիկ դիրքը։"
    },
    "rotation": {
      "en": "Angles are degrees. 0 is up, 90 is right; positive turns are clockwise.",
      "de": "Winkel in Grad. 0 ist oben, 90 rechts; positive Drehung ist im Uhrzeigersinn.",
      "ja": "角度は度です。0は上、90は右。正の値は時計回りです。",
      "tr": "Açılar derece cinsindedir. 0 yukarı, 90 sağdır; pozitif dönüş saat yönündedir.",
      "hy": "Անկյունները աստիճաններով են։ 0-ը վերև է, 90-ը՝ աջ․ դրական պտույտը ժամացույցի սլաքի ուղղությամբ է։"
    },
    "code": "setBackground(\"white\"); hideTurtle(); goto(0,0); angle(90); forward(100);"
  },
  {
    "name": "forward",
    "alias": "vorwaerts",
    "signature": "forward(distance)",
    "text": {
      "en": "Move distance units forward in the current direction.",
      "de": "Gehe distance Einheiten in Blickrichtung vorwärts.",
      "ja": "現在の向きにdistanceだけ進みます。",
      "tr": "Geçerli yönde distance birim ilerler.",
      "hy": "Ընթացիկ ուղղությամբ առաջ է գնում distance միավոր։"
    },
    "anchor": {
      "en": "Uses the current turtle position.",
      "de": "Nutzt die aktuelle Turtle-Position.",
      "ja": "現在のタートルの位置を使います。",
      "tr": "Geçerli Turtle konumunu kullanır.",
      "hy": "Օգտագործում է Turtle-ի ընթացիկ դիրքը։"
    },
    "rotation": {
      "en": "Angles are degrees. 0 is up, 90 is right; positive turns are clockwise.",
      "de": "Winkel in Grad. 0 ist oben, 90 rechts; positive Drehung ist im Uhrzeigersinn.",
      "ja": "角度は度です。0は上、90は右。正の値は時計回りです。",
      "tr": "Açılar derece cinsindedir. 0 yukarı, 90 sağdır; pozitif dönüş saat yönündedir.",
      "hy": "Անկյունները աստիճաններով են։ 0-ը վերև է, 90-ը՝ աջ․ դրական պտույտը ժամացույցի սլաքի ուղղությամբ է։"
    },
    "code": "setBackground(\"white\"); hideTurtle(); goto(0,0); forward(100);"
  },
  {
    "name": "right",
    "alias": "rechts",
    "signature": "right(degrees)",
    "text": {
      "en": "Turn degrees clockwise without moving.",
      "de": "Drehe degrees Grad im Uhrzeigersinn ohne Bewegung.",
      "ja": "位置を変えず、時計回りにdegrees度回ります。",
      "tr": "Hareket etmeden saat yönünde degrees derece döner.",
      "hy": "Առանց շարժվելու պտտվում է degrees աստիճանով՝ ժամացույցի սլաքի ուղղությամբ։"
    },
    "anchor": {
      "en": "Uses the current turtle position.",
      "de": "Nutzt die aktuelle Turtle-Position.",
      "ja": "現在のタートルの位置を使います。",
      "tr": "Geçerli Turtle konumunu kullanır.",
      "hy": "Օգտագործում է Turtle-ի ընթացիկ դիրքը։"
    },
    "rotation": {
      "en": "Angles are degrees. 0 is up, 90 is right; positive turns are clockwise.",
      "de": "Winkel in Grad. 0 ist oben, 90 rechts; positive Drehung ist im Uhrzeigersinn.",
      "ja": "角度は度です。0は上、90は右。正の値は時計回りです。",
      "tr": "Açılar derece cinsindedir. 0 yukarı, 90 sağdır; pozitif dönüş saat yönündedir.",
      "hy": "Անկյունները աստիճաններով են։ 0-ը վերև է, 90-ը՝ աջ․ դրական պտույտը ժամացույցի սլաքի ուղղությամբ է։"
    },
    "code": "setBackground(\"white\"); hideTurtle(); goto(0,0); forward(80); right(90); forward(80);"
  },
  {
    "name": "left",
    "alias": "links",
    "signature": "left(degrees)",
    "text": {
      "en": "Turn degrees anticlockwise without moving.",
      "de": "Drehe degrees Grad gegen den Uhrzeigersinn ohne Bewegung.",
      "ja": "位置を変えず、反時計回りにdegrees度回ります。",
      "tr": "Hareket etmeden saat yönünün tersine degrees derece döner.",
      "hy": "Առանց շարժվելու պտտվում է degrees աստիճանով՝ ժամացույցի սլաքին հակառակ։"
    },
    "anchor": {
      "en": "Uses the current turtle position.",
      "de": "Nutzt die aktuelle Turtle-Position.",
      "ja": "現在のタートルの位置を使います。",
      "tr": "Geçerli Turtle konumunu kullanır.",
      "hy": "Օգտագործում է Turtle-ի ընթացիկ դիրքը։"
    },
    "rotation": {
      "en": "Angles are degrees. 0 is up, 90 is right; positive turns are clockwise.",
      "de": "Winkel in Grad. 0 ist oben, 90 rechts; positive Drehung ist im Uhrzeigersinn.",
      "ja": "角度は度です。0は上、90は右。正の値は時計回りです。",
      "tr": "Açılar derece cinsindedir. 0 yukarı, 90 sağdır; pozitif dönüş saat yönündedir.",
      "hy": "Անկյունները աստիճաններով են։ 0-ը վերև է, 90-ը՝ աջ․ դրական պտույտը ժամացույցի սլաքի ուղղությամբ է։"
    },
    "code": "setBackground(\"white\"); hideTurtle(); goto(0,0); forward(80); left(90); forward(80);"
  },
  {
    "name": "penup",
    "alias": "stiftHoch",
    "signature": "penup()",
    "text": {
      "en": "Lift the pen; movement leaves no line. No values needed.",
      "de": "Hebe den Stift; Bewegung zeichnet keine Linie. Keine Werte nötig.",
      "ja": "ペンを上げます。移動しても線は描きません。値は不要です。",
      "tr": "Kalemi kaldırır; hareket çizgi bırakmaz. Değer gerekmez.",
      "hy": "Բարձրացնում է գրիչը․ շարժումը գիծ չի թողնում։ Արժեքներ պետք չեն։"
    },
    "anchor": {
      "en": "Uses the current turtle position.",
      "de": "Nutzt die aktuelle Turtle-Position.",
      "ja": "現在のタートルの位置を使います。",
      "tr": "Geçerli Turtle konumunu kullanır.",
      "hy": "Օգտագործում է Turtle-ի ընթացիկ դիրքը։"
    },
    "rotation": {
      "en": "Angles are degrees. 0 is up, 90 is right; positive turns are clockwise.",
      "de": "Winkel in Grad. 0 ist oben, 90 rechts; positive Drehung ist im Uhrzeigersinn.",
      "ja": "角度は度です。0は上、90は右。正の値は時計回りです。",
      "tr": "Açılar derece cinsindedir. 0 yukarı, 90 sağdır; pozitif dönüş saat yönündedir.",
      "hy": "Անկյունները աստիճաններով են։ 0-ը վերև է, 90-ը՝ աջ․ դրական պտույտը ժամացույցի սլաքի ուղղությամբ է։"
    },
    "code": "setBackground(\"white\"); hideTurtle(); goto(0,0); penup(); goto(-80,0); pendown(); forward(80);"
  },
  {
    "name": "pendown",
    "alias": "stiftRunter",
    "signature": "pendown()",
    "text": {
      "en": "Lower the pen; movement draws a line. No values needed.",
      "de": "Senke den Stift; Bewegung zeichnet Linien. Keine Werte nötig.",
      "ja": "ペンを下げます。移動すると線を描きます。値は不要です。",
      "tr": "Kalemi indirir; hareket çizgi çizer. Değer gerekmez.",
      "hy": "Իջեցնում է գրիչը․ շարժումը գիծ է գծում։ Արժեքներ պետք չեն։"
    },
    "anchor": {
      "en": "Uses the current turtle position.",
      "de": "Nutzt die aktuelle Turtle-Position.",
      "ja": "現在のタートルの位置を使います。",
      "tr": "Geçerli Turtle konumunu kullanır.",
      "hy": "Օգտագործում է Turtle-ի ընթացիկ դիրքը։"
    },
    "rotation": {
      "en": "Angles are degrees. 0 is up, 90 is right; positive turns are clockwise.",
      "de": "Winkel in Grad. 0 ist oben, 90 rechts; positive Drehung ist im Uhrzeigersinn.",
      "ja": "角度は度です。0は上、90は右。正の値は時計回りです。",
      "tr": "Açılar derece cinsindedir. 0 yukarı, 90 sağdır; pozitif dönüş saat yönündedir.",
      "hy": "Անկյունները աստիճաններով են։ 0-ը վերև է, 90-ը՝ աջ․ դրական պտույտը ժամացույցի սլաքի ուղղությամբ է։"
    },
    "code": "setBackground(\"white\"); hideTurtle(); goto(0,0); penup(); goto(-80,0); pendown(); forward(80);"
  },
  {
    "name": "color",
    "alias": "setzeFarbe",
    "signature": "color(paintColor; or red, green, blue)",
    "text": {
      "en": "Set the pen colour by CSS colour string, or red, green, blue values from 0 to 255.",
      "de": "Setze die Stiftfarbe als CSS-Farbe oder Rot-, Grün-, Blauwerte von 0 bis 255.",
      "ja": "ペンの色をCSSの色文字列、または0〜255の赤・緑・青の値で指定します。",
      "tr": "Kalem rengini CSS renk metni veya 0–255 arası kırmızı, yeşil, mavi değerleriyle ayarlar.",
      "hy": "Գրչի գույնը տալիս է CSS գույնի տողով կամ 0–255 կարմիր, կանաչ, կապույտ արժեքներով։"
    },
    "anchor": {
      "en": "Uses the current turtle position.",
      "de": "Nutzt die aktuelle Turtle-Position.",
      "ja": "現在のタートルの位置を使います。",
      "tr": "Geçerli Turtle konumunu kullanır.",
      "hy": "Օգտագործում է Turtle-ի ընթացիկ դիրքը։"
    },
    "rotation": {
      "en": "Angles are degrees. 0 is up, 90 is right; positive turns are clockwise.",
      "de": "Winkel in Grad. 0 ist oben, 90 rechts; positive Drehung ist im Uhrzeigersinn.",
      "ja": "角度は度です。0は上、90は右。正の値は時計回りです。",
      "tr": "Açılar derece cinsindedir. 0 yukarı, 90 sağdır; pozitif dönüş saat yönündedir.",
      "hy": "Անկյունները աստիճաններով են։ 0-ը վերև է, 90-ը՝ աջ․ դրական պտույտը ժամացույցի սլաքի ուղղությամբ է։"
    },
    "code": "setBackground(\"white\"); hideTurtle(); goto(0,0); color(\"coral\"); forward(100);"
  },
  {
    "name": "width",
    "alias": "setzeBreite",
    "signature": "width(value)",
    "text": {
      "en": "Set line thickness to value canvas units.",
      "de": "Setze die Liniendicke auf value Zeicheneinheiten.",
      "ja": "線の太さをvalueにします。",
      "tr": "Çizgi kalınlığını value çizim birimi yapar.",
      "hy": "Գծի հաստությունը սահմանում է value նկարչական միավորով։"
    },
    "anchor": {
      "en": "Uses the current turtle position.",
      "de": "Nutzt die aktuelle Turtle-Position.",
      "ja": "現在のタートルの位置を使います。",
      "tr": "Geçerli Turtle konumunu kullanır.",
      "hy": "Օգտագործում է Turtle-ի ընթացիկ դիրքը։"
    },
    "rotation": {
      "en": "Angles are degrees. 0 is up, 90 is right; positive turns are clockwise.",
      "de": "Winkel in Grad. 0 ist oben, 90 rechts; positive Drehung ist im Uhrzeigersinn.",
      "ja": "角度は度です。0は上、90は右。正の値は時計回りです。",
      "tr": "Açılar derece cinsindedir. 0 yukarı, 90 sağdır; pozitif dönüş saat yönündedir.",
      "hy": "Անկյունները աստիճաններով են։ 0-ը վերև է, 90-ը՝ աջ․ դրական պտույտը ժամացույցի սլաքի ուղղությամբ է։"
    },
    "code": "setBackground(\"white\"); hideTurtle(); goto(0,0); width(8); forward(100);"
  },
  {
    "name": "beginFill",
    "alias": "beginneFuellung",
    "signature": "beginFill(paintColor = undefined)",
    "text": {
      "en": "Start a shape at the current point. Optional paintColor sets the fill; omitted means black.",
      "de": "Beginne eine Form am aktuellen Punkt. Optionales paintColor setzt die Füllfarbe; ohne Angabe schwarz.",
      "ja": "現在の点から形を始めます。paintColorは塗る色。省略すると黒です。",
      "tr": "Geçerli noktada şekle başlar. İsteğe bağlı paintColor dolgu rengidir; verilmezse siyahtır.",
      "hy": "Սկսում է պատկեր ընթացիկ կետում։ Ընտրովի paintColor-ը լցման գույնն է․ բաց թողնելիս սև է։"
    },
    "anchor": {
      "en": "Uses the current turtle position.",
      "de": "Nutzt die aktuelle Turtle-Position.",
      "ja": "現在のタートルの位置を使います。",
      "tr": "Geçerli Turtle konumunu kullanır.",
      "hy": "Օգտագործում է Turtle-ի ընթացիկ դիրքը։"
    },
    "rotation": {
      "en": "Angles are degrees. 0 is up, 90 is right; positive turns are clockwise.",
      "de": "Winkel in Grad. 0 ist oben, 90 rechts; positive Drehung ist im Uhrzeigersinn.",
      "ja": "角度は度です。0は上、90は右。正の値は時計回りです。",
      "tr": "Açılar derece cinsindedir. 0 yukarı, 90 sağdır; pozitif dönüş saat yönündedir.",
      "hy": "Անկյունները աստիճաններով են։ 0-ը վերև է, 90-ը՝ աջ․ դրական պտույտը ժամացույցի սլաքի ուղղությամբ է։"
    },
    "code": "setBackground(\"white\"); hideTurtle(); goto(0,0); beginFill(\"coral\"); forward(80); right(120); forward(80); right(120); forward(80); endFill();"
  },
  {
    "name": "endFill",
    "alias": "beendeFuellung",
    "signature": "endFill(paintColor = undefined)",
    "text": {
      "en": "Close and fill the current shape. Optional paintColor overrides the starting colour; no active fill does nothing.",
      "de": "Schließe und fülle die Form. Optionales paintColor ersetzt die Startfarbe; ohne begonnene Füllung passiert nichts.",
      "ja": "形を閉じて塗ります。paintColorで最初の色を変えられます。開始していなければ何もしません。",
      "tr": "Şekli kapatıp doldurur. İsteğe bağlı paintColor başlangıç rengini değiştirir; aktif dolgu yoksa bir şey yapmaz.",
      "hy": "Փակում և լցնում է պատկերը։ Ընտրովի paintColor-ը փոխում է սկզբնական գույնը․ եթե լցում չի սկսվել, ոչինչ չի անում։"
    },
    "anchor": {
      "en": "Uses the current turtle position.",
      "de": "Nutzt die aktuelle Turtle-Position.",
      "ja": "現在のタートルの位置を使います。",
      "tr": "Geçerli Turtle konumunu kullanır.",
      "hy": "Օգտագործում է Turtle-ի ընթացիկ դիրքը։"
    },
    "rotation": {
      "en": "Angles are degrees. 0 is up, 90 is right; positive turns are clockwise.",
      "de": "Winkel in Grad. 0 ist oben, 90 rechts; positive Drehung ist im Uhrzeigersinn.",
      "ja": "角度は度です。0は上、90は右。正の値は時計回りです。",
      "tr": "Açılar derece cinsindedir. 0 yukarı, 90 sağdır; pozitif dönüş saat yönündedir.",
      "hy": "Անկյունները աստիճաններով են։ 0-ը վերև է, 90-ը՝ աջ․ դրական պտույտը ժամացույցի սլաքի ուղղությամբ է։"
    },
    "code": "setBackground(\"white\"); hideTurtle(); goto(0,0); beginFill(\"coral\"); forward(80); right(120); forward(80); right(120); forward(80); endFill();"
  },
  {
    "name": "clear",
    "alias": "loesche",
    "signature": "clear()",
    "text": {
      "en": "Erase the drawing while keeping turtle position and direction.",
      "de": "Lösche die Zeichnung; Turtle-Position und Richtung bleiben erhalten.",
      "ja": "絵を消します。タートルの位置と向きは変わりません。",
      "tr": "Çizimi siler; Turtle konumu ve yönü korunur.",
      "hy": "Ջնջում է նկարը՝ պահպանելով Turtle-ի դիրքը և ուղղությունը։"
    },
    "anchor": {
      "en": "Uses the current turtle position.",
      "de": "Nutzt die aktuelle Turtle-Position.",
      "ja": "現在のタートルの位置を使います。",
      "tr": "Geçerli Turtle konumunu kullanır.",
      "hy": "Օգտագործում է Turtle-ի ընթացիկ դիրքը։"
    },
    "rotation": {
      "en": "Angles are degrees. 0 is up, 90 is right; positive turns are clockwise.",
      "de": "Winkel in Grad. 0 ist oben, 90 rechts; positive Drehung ist im Uhrzeigersinn.",
      "ja": "角度は度です。0は上、90は右。正の値は時計回りです。",
      "tr": "Açılar derece cinsindedir. 0 yukarı, 90 sağdır; pozitif dönüş saat yönündedir.",
      "hy": "Անկյունները աստիճաններով են։ 0-ը վերև է, 90-ը՝ աջ․ դրական պտույտը ժամացույցի սլաքի ուղղությամբ է։"
    },
    "code": "setBackground(\"white\"); hideTurtle(); goto(0,0); drawCircle(50); clear(); drawCircle(80,\"blue\",true);"
  },
  {
    "name": "hideTurtle",
    "alias": "versteckeTurtle",
    "signature": "hideTurtle()",
    "text": {
      "en": "Hide the green arrow without changing position.",
      "de": "Verstecke den grünen Pfeil ohne Positionsänderung.",
      "ja": "位置を変えずに緑の矢印を隠します。",
      "tr": "Konumu değiştirmeden yeşil oku gizler.",
      "hy": "Թաքցնում է կանաչ սլաքը՝ առանց դիրքը փոխելու։"
    },
    "anchor": {
      "en": "Uses the current turtle position.",
      "de": "Nutzt die aktuelle Turtle-Position.",
      "ja": "現在のタートルの位置を使います。",
      "tr": "Geçerli Turtle konumunu kullanır.",
      "hy": "Օգտագործում է Turtle-ի ընթացիկ դիրքը։"
    },
    "rotation": {
      "en": "Angles are degrees. 0 is up, 90 is right; positive turns are clockwise.",
      "de": "Winkel in Grad. 0 ist oben, 90 rechts; positive Drehung ist im Uhrzeigersinn.",
      "ja": "角度は度です。0は上、90は右。正の値は時計回りです。",
      "tr": "Açılar derece cinsindedir. 0 yukarı, 90 sağdır; pozitif dönüş saat yönündedir.",
      "hy": "Անկյունները աստիճաններով են։ 0-ը վերև է, 90-ը՝ աջ․ դրական պտույտը ժամացույցի սլաքի ուղղությամբ է։"
    },
    "code": "setBackground(\"white\"); hideTurtle(); goto(0,0); hideTurtle(); drawCircle(80,\"coral\",true);"
  },
  {
    "name": "draw",
    "alias": "zeichne",
    "signature": "draw()",
    "text": {
      "en": "Refresh the visible result after drawing with automatic refresh disabled.",
      "de": "Aktualisiere das sichtbare Ergebnis bei ausgeschalteter automatischer Aktualisierung.",
      "ja": "自動更新を切って描いた結果を表示します。",
      "tr": "Otomatik yenileme kapalıyken çizilen sonucu yeniler.",
      "hy": "Թարմացնում է տեսանելի արդյունքը, երբ ավտոմատ թարմացումը անջատված է։"
    },
    "anchor": {
      "en": "Uses the current turtle position.",
      "de": "Nutzt die aktuelle Turtle-Position.",
      "ja": "現在のタートルの位置を使います。",
      "tr": "Geçerli Turtle konumunu kullanır.",
      "hy": "Օգտագործում է Turtle-ի ընթացիկ դիրքը։"
    },
    "rotation": {
      "en": "Angles are degrees. 0 is up, 90 is right; positive turns are clockwise.",
      "de": "Winkel in Grad. 0 ist oben, 90 rechts; positive Drehung ist im Uhrzeigersinn.",
      "ja": "角度は度です。0は上、90は右。正の値は時計回りです。",
      "tr": "Açılar derece cinsindedir. 0 yukarı, 90 sağdır; pozitif dönüş saat yönündedir.",
      "hy": "Անկյունները աստիճաններով են։ 0-ը վերև է, 90-ը՝ աջ․ դրական պտույտը ժամացույցի սլաքի ուղղությամբ է։"
    },
    "code": "setBackground(\"white\"); hideTurtle(); goto(0,0); drawCircle(80,\"coral\",true); draw();"
  },
  {
    "name": "wrap",
    "alias": "setzeRandUmbruch",
    "signature": "wrap(enabled)",
    "text": {
      "en": "enabled = true lets movement continue from the opposite canvas edge; false disables wrapping.",
      "de": "enabled = true lässt Bewegung am gegenüberliegenden Rand weitergehen; false schaltet es aus.",
      "ja": "enabled = trueなら、反対の端から進み続けます。falseなら無効です。",
      "tr": "enabled = true hareketi karşı kenardan sürdürür; false kapatır.",
      "hy": "enabled = true-ը շարժումը շարունակում է հակառակ եզրից․ false-ը անջատում է դա։"
    },
    "anchor": {
      "en": "Uses the current turtle position.",
      "de": "Nutzt die aktuelle Turtle-Position.",
      "ja": "現在のタートルの位置を使います。",
      "tr": "Geçerli Turtle konumunu kullanır.",
      "hy": "Օգտագործում է Turtle-ի ընթացիկ դիրքը։"
    },
    "rotation": {
      "en": "Angles are degrees. 0 is up, 90 is right; positive turns are clockwise.",
      "de": "Winkel in Grad. 0 ist oben, 90 rechts; positive Drehung ist im Uhrzeigersinn.",
      "ja": "角度は度です。0は上、90は右。正の値は時計回りです。",
      "tr": "Açılar derece cinsindedir. 0 yukarı, 90 sağdır; pozitif dönüş saat yönündedir.",
      "hy": "Անկյունները աստիճաններով են։ 0-ը վերև է, 90-ը՝ աջ․ դրական պտույտը ժամացույցի սլաքի ուղղությամբ է։"
    },
    "code": "setBackground(\"white\"); hideTurtle(); goto(0,0); wrap(true); forward(450);"
  },
  {
    "name": "redrawOnMove",
    "alias": "zeichneBeiBewegung",
    "signature": "redrawOnMove(enabled)",
    "text": {
      "en": "enabled = true refreshes after each movement; false waits until draw().",
      "de": "enabled = true aktualisiert nach Bewegung; false wartet auf draw().",
      "ja": "enabled = trueは移動ごとに表示を更新します。falseはdraw()まで待ちます。",
      "tr": "enabled = true her hareketten sonra yeniler; false draw() bekler.",
      "hy": "enabled = true-ը թարմացնում է ամեն շարժումից հետո․ false-ը սպասում է draw()-ին։"
    },
    "anchor": {
      "en": "Uses the current turtle position.",
      "de": "Nutzt die aktuelle Turtle-Position.",
      "ja": "現在のタートルの位置を使います。",
      "tr": "Geçerli Turtle konumunu kullanır.",
      "hy": "Օգտագործում է Turtle-ի ընթացիկ դիրքը։"
    },
    "rotation": {
      "en": "Angles are degrees. 0 is up, 90 is right; positive turns are clockwise.",
      "de": "Winkel in Grad. 0 ist oben, 90 rechts; positive Drehung ist im Uhrzeigersinn.",
      "ja": "角度は度です。0は上、90は右。正の値は時計回りです。",
      "tr": "Açılar derece cinsindedir. 0 yukarı, 90 sağdır; pozitif dönüş saat yönündedir.",
      "hy": "Անկյունները աստիճաններով են։ 0-ը վերև է, 90-ը՝ աջ․ դրական պտույտը ժամացույցի սլաքի ուղղությամբ է։"
    },
    "code": "setBackground(\"white\"); hideTurtle(); goto(0,0); redrawOnMove(false); forward(80); draw();"
  },
  {
    "name": "getTurtleState",
    "alias": "liesTurtleZustand",
    "signature": "getTurtleState()",
    "text": {
      "en": "Return x, y and angleDeg without changing the drawing.",
      "de": "Gib x, y und angleDeg zurück ohne die Zeichnung zu verändern.",
      "ja": "絵を変えずにx、y、angleDegを返します。",
      "tr": "Çizimi değiştirmeden x, y ve angleDeg döndürür.",
      "hy": "Վերադարձնում է x, y և angleDeg՝ առանց նկարը փոխելու։"
    },
    "anchor": {
      "en": "No drawing position is needed.",
      "de": "Keine Zeichenposition nötig.",
      "ja": "描く位置は必要ありません。",
      "tr": "Çizim konumu gerekmez.",
      "hy": "Նկարելու դիրք պետք չէ։"
    },
    "rotation": {
      "en": "Does not use the turtle direction.",
      "de": "Nutzt die Turtle-Richtung nicht.",
      "ja": "タートルの向きは使いません。",
      "tr": "Turtle yönünü kullanmaz.",
      "hy": "Չի օգտագործում Turtle-ի ուղղությունը։"
    },
    "code": "setBackground(\"white\"); hideTurtle(); goto(0,0); const state=getTurtleState(); writeText(state.x);"
  },
  {
    "name": "write",
    "alias": "schreibe",
    "signature": "write(message)",
    "text": {
      "en": "Write message at the current position using the pen colour and font.",
      "de": "Schreibe message an der aktuellen Position mit Stiftfarbe und Schrift.",
      "ja": "現在の位置に、ペンの色とフォントでmessageを書きます。",
      "tr": "message metnini geçerli konumda kalem rengi ve yazı tipiyle yazar.",
      "hy": "Ընթացիկ դիրքում գրում է message-ը՝ գրչի գույնով և տառատեսակով։"
    },
    "anchor": {
      "en": "Uses the current turtle position.",
      "de": "Nutzt die aktuelle Turtle-Position.",
      "ja": "現在のタートルの位置を使います。",
      "tr": "Geçerli Turtle konumunu kullanır.",
      "hy": "Օգտագործում է Turtle-ի ընթացիկ դիրքը։"
    },
    "rotation": {
      "en": "Angles are degrees. 0 is up, 90 is right; positive turns are clockwise.",
      "de": "Winkel in Grad. 0 ist oben, 90 rechts; positive Drehung ist im Uhrzeigersinn.",
      "ja": "角度は度です。0は上、90は右。正の値は時計回りです。",
      "tr": "Açılar derece cinsindedir. 0 yukarı, 90 sağdır; pozitif dönüş saat yönündedir.",
      "hy": "Անկյունները աստիճաններով են։ 0-ը վերև է, 90-ը՝ աջ․ դրական պտույտը ժամացույցի սլաքի ուղղությամբ է։"
    },
    "code": "setBackground(\"white\"); hideTurtle(); goto(0,0); write(\"Hello!\");"
  },
  {
    "name": "setFont",
    "alias": "setzeSchrift",
    "signature": "setFont(font)",
    "text": {
      "en": "font is a CSS font string, such as 30px sans-serif.",
      "de": "font ist eine CSS-Schriftangabe, etwa 30px sans-serif.",
      "ja": "fontは30px sans-serifなどのCSSフォント指定です。",
      "tr": "font, 30px sans-serif gibi bir CSS yazı tipi metnidir.",
      "hy": "font-ը CSS տառատեսակի տող է, օրինակ՝ 30px sans-serif։"
    },
    "anchor": {
      "en": "Uses the current turtle position.",
      "de": "Nutzt die aktuelle Turtle-Position.",
      "ja": "現在のタートルの位置を使います。",
      "tr": "Geçerli Turtle konumunu kullanır.",
      "hy": "Օգտագործում է Turtle-ի ընթացիկ դիրքը։"
    },
    "rotation": {
      "en": "Angles are degrees. 0 is up, 90 is right; positive turns are clockwise.",
      "de": "Winkel in Grad. 0 ist oben, 90 rechts; positive Drehung ist im Uhrzeigersinn.",
      "ja": "角度は度です。0は上、90は右。正の値は時計回りです。",
      "tr": "Açılar derece cinsindedir. 0 yukarı, 90 sağdır; pozitif dönüş saat yönündedir.",
      "hy": "Անկյունները աստիճաններով են։ 0-ը վերև է, 90-ը՝ աջ․ դրական պտույտը ժամացույցի սլաքի ուղղությամբ է։"
    },
    "code": "setBackground(\"white\"); hideTurtle(); goto(0,0); setFont(\"30px sans-serif\"); write(\"Hello!\");"
  },
  {
    "name": "requestAnimationFrame",
    "alias": "naechstesBild",
    "signature": "requestAnimationFrame(callback)",
    "text": {
      "en": "Call callback on the next teaching frame (60 per second). Returns an id to cancel.",
      "de": "Rufe callback im nächsten Lernbild auf (60 pro Sekunde). Gibt eine Abbruch-ID zurück.",
      "ja": "次の学習フレームでcallbackを呼びます（毎秒60回）。停止用のidを返します。",
      "tr": "Sonraki öğretim karesinde callback çağırır (saniyede 60). İptal için id döndürür.",
      "hy": "Հաջորդ ուսումնական կադրում կանչում է callback-ը (վայրկյանում 60)։ Վերադարձնում է չեղարկման id։"
    },
    "anchor": {
      "en": "No drawing position is needed.",
      "de": "Keine Zeichenposition nötig.",
      "ja": "描く位置は必要ありません。",
      "tr": "Çizim konumu gerekmez.",
      "hy": "Նկարելու դիրք պետք չէ։"
    },
    "rotation": {
      "en": "Does not use the turtle direction.",
      "de": "Nutzt die Turtle-Richtung nicht.",
      "ja": "タートルの向きは使いません。",
      "tr": "Turtle yönünü kullanmaz.",
      "hy": "Չի օգտագործում Turtle-ի ուղղությունը։"
    },
    "code": "setBackground(\"white\"); hideTurtle(); goto(0,0); requestAnimationFrame(()=>drawCircle(80,\"coral\",true));"
  },
  {
    "name": "cancelAnimationFrame",
    "alias": "brecheBildAb",
    "signature": "cancelAnimationFrame(id)",
    "text": {
      "en": "Cancel the pending callback with the returned id.",
      "de": "Brich den wartenden Aufruf mit der erhaltenen id ab.",
      "ja": "受け取ったidで、待機中の呼び出しを取り消します。",
      "tr": "Dönen id ile bekleyen çağrıyı iptal eder.",
      "hy": "Ստացված id-ով չեղարկում է սպասող կանչը։"
    },
    "anchor": {
      "en": "No drawing position is needed.",
      "de": "Keine Zeichenposition nötig.",
      "ja": "描く位置は必要ありません。",
      "tr": "Çizim konumu gerekmez.",
      "hy": "Նկարելու դիրք պետք չէ։"
    },
    "rotation": {
      "en": "Does not use the turtle direction.",
      "de": "Nutzt die Turtle-Richtung nicht.",
      "ja": "タートルの向きは使いません。",
      "tr": "Turtle yönünü kullanmaz.",
      "hy": "Չի օգտագործում Turtle-ի ուղղությունը։"
    },
    "code": "setBackground(\"white\"); hideTurtle(); goto(0,0); const id=requestAnimationFrame(()=>setBackground(\"red\")); cancelAnimationFrame(id); drawCircle(80,\"coral\",true);"
  },
  {
    "name": "setTimeout",
    "alias": "verzoegere",
    "signature": "setTimeout(callback, delayMilliseconds)",
    "text": {
      "en": "Call callback once after delayMilliseconds. Returns an id to cancel.",
      "de": "Rufe callback einmal nach delayMilliseconds auf. Gibt eine Abbruch-ID zurück.",
      "ja": "delayMillisecondsミリ秒後にcallbackを1回呼びます。停止用のidを返します。",
      "tr": "delayMilliseconds sonra callback bir kez çağrılır. İptal için id döndürür.",
      "hy": "delayMilliseconds միլիվայրկյան հետո մեկ անգամ կանչում է callback-ը։ Վերադարձնում է չեղարկման id։"
    },
    "anchor": {
      "en": "No drawing position is needed.",
      "de": "Keine Zeichenposition nötig.",
      "ja": "描く位置は必要ありません。",
      "tr": "Çizim konumu gerekmez.",
      "hy": "Նկարելու դիրք պետք չէ։"
    },
    "rotation": {
      "en": "Does not use the turtle direction.",
      "de": "Nutzt die Turtle-Richtung nicht.",
      "ja": "タートルの向きは使いません。",
      "tr": "Turtle yönünü kullanmaz.",
      "hy": "Չի օգտագործում Turtle-ի ուղղությունը։"
    },
    "code": "setBackground(\"white\"); hideTurtle(); goto(0,0); setTimeout(()=>drawCircle(80,\"coral\",true),100);"
  },
  {
    "name": "clearTimeout",
    "alias": "beendeVerzoegerung",
    "signature": "clearTimeout(id)",
    "text": {
      "en": "Cancel the waiting timeout by id.",
      "de": "Brich die wartende Verzögerung mit id ab.",
      "ja": "idで、待機中のタイマーを取り消します。",
      "tr": "Bekleyen zamanlayıcıyı id ile iptal eder.",
      "hy": "id-ով չեղարկում է սպասող ժամանակաչափը։"
    },
    "anchor": {
      "en": "No drawing position is needed.",
      "de": "Keine Zeichenposition nötig.",
      "ja": "描く位置は必要ありません。",
      "tr": "Çizim konumu gerekmez.",
      "hy": "Նկարելու դիրք պետք չէ։"
    },
    "rotation": {
      "en": "Does not use the turtle direction.",
      "de": "Nutzt die Turtle-Richtung nicht.",
      "ja": "タートルの向きは使いません。",
      "tr": "Turtle yönünü kullanmaz.",
      "hy": "Չի օգտագործում Turtle-ի ուղղությունը։"
    },
    "code": "setBackground(\"white\"); hideTurtle(); goto(0,0); const id=setTimeout(()=>setBackground(\"red\"),100); clearTimeout(id); drawCircle(80,\"coral\",true);"
  },
  {
    "name": "setInterval",
    "alias": "wiederholeZeitlich",
    "signature": "setInterval(callback, delayMilliseconds)",
    "text": {
      "en": "Repeat callback every delayMilliseconds. Returns an id to stop.",
      "de": "Wiederhole callback alle delayMilliseconds. Gibt eine Stopp-ID zurück.",
      "ja": "delayMillisecondsミリ秒ごとにcallbackを繰り返します。停止用のidを返します。",
      "tr": "callback her delayMilliseconds süresinde tekrarlanır. Durdurmak için id döndürür.",
      "hy": "Ամեն delayMilliseconds միլիվայրկյանը մեկ կրկնում է callback-ը։ Վերադարձնում է կանգնեցման id։"
    },
    "anchor": {
      "en": "No drawing position is needed.",
      "de": "Keine Zeichenposition nötig.",
      "ja": "描く位置は必要ありません。",
      "tr": "Çizim konumu gerekmez.",
      "hy": "Նկարելու դիրք պետք չէ։"
    },
    "rotation": {
      "en": "Does not use the turtle direction.",
      "de": "Nutzt die Turtle-Richtung nicht.",
      "ja": "タートルの向きは使いません。",
      "tr": "Turtle yönünü kullanmaz.",
      "hy": "Չի օգտագործում Turtle-ի ուղղությունը։"
    },
    "code": "setBackground(\"white\"); hideTurtle(); goto(0,0); setInterval(()=>{clear(); drawCircle(getRandomNumber(20,80),\"coral\",true);},200);"
  },
  {
    "name": "clearInterval",
    "alias": "beendeZeitlicheWiederholung",
    "signature": "clearInterval(id)",
    "text": {
      "en": "Stop the repeating timer by id.",
      "de": "Stoppe die zeitliche Wiederholung mit id.",
      "ja": "idで、繰り返すタイマーを止めます。",
      "tr": "Tekrarlanan zamanlayıcıyı id ile durdurur.",
      "hy": "id-ով կանգնեցնում է կրկնվող ժամանակաչափը։"
    },
    "anchor": {
      "en": "No drawing position is needed.",
      "de": "Keine Zeichenposition nötig.",
      "ja": "描く位置は必要ありません。",
      "tr": "Çizim konumu gerekmez.",
      "hy": "Նկարելու դիրք պետք չէ։"
    },
    "rotation": {
      "en": "Does not use the turtle direction.",
      "de": "Nutzt die Turtle-Richtung nicht.",
      "ja": "タートルの向きは使いません。",
      "tr": "Turtle yönünü kullanmaz.",
      "hy": "Չի օգտագործում Turtle-ի ուղղությունը։"
    },
    "code": "setBackground(\"white\"); hideTurtle(); goto(0,0); const id=setInterval(()=>setBackground(\"red\"),100); clearInterval(id); drawCircle(80,\"coral\",true);"
  },
  {
    "name": "radToDeg",
    "alias": "radianInGrad",
    "signature": "radToDeg(radians)",
    "text": {
      "en": "Convert radians to degrees; Math.PI returns 180.",
      "de": "Rechne Radianten in Grad um; Math.PI ergibt 180.",
      "ja": "ラジアンを度に変換します。Math.PIは180になります。",
      "tr": "Radyanı dereceye dönüştürür; Math.PI için 180 döndürür.",
      "hy": "Ռադիանները փոխարկում է աստիճանների․ Math.PI-ի համար վերադարձնում է 180։"
    },
    "anchor": {
      "en": "No drawing position is needed.",
      "de": "Keine Zeichenposition nötig.",
      "ja": "描く位置は必要ありません。",
      "tr": "Çizim konumu gerekmez.",
      "hy": "Նկարելու դիրք պետք չէ։"
    },
    "rotation": {
      "en": "Does not use the turtle direction.",
      "de": "Nutzt die Turtle-Richtung nicht.",
      "ja": "タートルの向きは使いません。",
      "tr": "Turtle yönünü kullanmaz.",
      "hy": "Չի օգտագործում Turtle-ի ուղղությունը։"
    },
    "code": "setBackground(\"white\"); hideTurtle(); goto(0,0); writeText(radToDeg(Math.PI));"
  },
  {
    "name": "degToRad",
    "alias": "gradInRadian",
    "signature": "degToRad(degrees)",
    "text": {
      "en": "Convert degrees to radians; 180 returns Math.PI.",
      "de": "Rechne Grad in Radianten um; 180 ergibt Math.PI.",
      "ja": "度をラジアンに変換します。180はMath.PIになります。",
      "tr": "Dereceyi radyana dönüştürür; 180 için Math.PI döndürür.",
      "hy": "Աստիճանները փոխարկում է ռադիանների․ 180-ի համար վերադարձնում է Math.PI։"
    },
    "anchor": {
      "en": "No drawing position is needed.",
      "de": "Keine Zeichenposition nötig.",
      "ja": "描く位置は必要ありません。",
      "tr": "Çizim konumu gerekmez.",
      "hy": "Նկարելու դիրք պետք չէ։"
    },
    "rotation": {
      "en": "Does not use the turtle direction.",
      "de": "Nutzt die Turtle-Richtung nicht.",
      "ja": "タートルの向きは使いません。",
      "tr": "Turtle yönünü kullanmaz.",
      "hy": "Չի օգտագործում Turtle-ի ուղղությունը։"
    },
    "code": "setBackground(\"white\"); hideTurtle(); writeText(degToRad(180));"
  }
];


reference.push(...[
  {
    "name": "position",
    "alias": "liesPosition",
    "signature": "position()",
    "text": {
      "en": "Returns a new {x, y} object without moving or drawing.",
      "de": "Gibt ein neues {x, y}-Objekt zurück, ohne zu bewegen oder zu zeichnen.",
      "ja": "移動や描画をせず、新しい{x, y}を返します。",
      "tr": "Hareket veya çizim yapmadan yeni bir {x, y} nesnesi döndürür.",
      "hy": "Առանց շարժվելու կամ նկարելու վերադարձնում է նոր {x, y} օբյեկտ։"
    },
    "code": "const p = position(); writeText(JSON.stringify(p));"
  },
  {
    "name": "heading",
    "alias": "liesRichtung",
    "signature": "heading()",
    "text": {
      "en": "Returns the current direction in degrees: 0 is up, positive turns clockwise.",
      "de": "Liest die aktuelle Richtung in Grad: 0 ist oben, positive Winkel drehen im Uhrzeigersinn.",
      "ja": "現在の向きを度で返します。0は上、正の角度は時計回りです。",
      "tr": "Yönü derece olarak döndürür: 0 yukarıdır, pozitif açı saat yönündedir.",
      "hy": "Վերադարձնում է ուղղությունը աստիճաններով․ 0-ը վերև է, դրականը՝ ժամացույցի ուղղությամբ։"
    },
    "code": "angle(90); writeText(heading());"
  },
  {
    "name": "distanceTo",
    "alias": "abstandZu",
    "signature": "distanceTo(x, y)",
    "text": {
      "en": "Returns the straight-line distance to (x, y), without moving.",
      "de": "Liest den direkten Abstand zu (x, y), ohne die Turtle zu bewegen.",
      "ja": "移動せずに(x, y)までの直線距離を返します。",
      "tr": "Hareket etmeden (x, y) noktasına olan düz mesafeyi verir.",
      "hy": "Առանց շարժվելու վերադարձնում է ուղիղ հեռավորությունը մինչև (x, y)։"
    },
    "code": "writeText(distanceTo(30, 40));"
  },
  {
    "name": "directionTo",
    "alias": "richtungZu",
    "signature": "directionTo(x, y)",
    "text": {
      "en": "Returns the direction towards (x, y). At the current point, keeps the current heading.",
      "de": "Liest die Richtung zu (x, y). Am aktuellen Punkt gilt die bisherige Richtung.",
      "ja": "(x, y)への向きを返します。同じ位置では現在の向きを返します。",
      "tr": "(x, y) yönünü verir. Aynı noktada mevcut yönü korur.",
      "hy": "Վերադարձնում է (x, y)-ի ուղղությունը․ նույն կետում պահում է ընթացիկ ուղղությունը։"
    },
    "code": "angle(directionTo(100, 0)); forward(100);"
  },
  {
    "name": "backward",
    "alias": "rueckwaerts",
    "signature": "backward(distance)",
    "text": {
      "en": "Moves backwards by distance; draws only when the pen is down.",
      "de": "Bewegt sich um distance rückwärts; zeichnet nur mit gesenktem Stift.",
      "ja": "distanceだけ後退します。ペンが下りている場合のみ描画します。",
      "tr": "distance kadar geri gider; yalnızca kalem aşağıdaysa çizer.",
      "hy": "Հետ է շարժվում distance չափով․ նկարում է միայն իջեցված գրիչով։"
    },
    "code": "backward(100);"
  },
  {
    "name": "home",
    "alias": "zurMitte",
    "signature": "home()",
    "text": {
      "en": "Teleports to (0, 0) and faces up, without erasing or drawing a connecting line.",
      "de": "Springt nach (0, 0) und schaut nach oben, ohne zu löschen oder eine Verbindungslinie zu zeichnen.",
      "ja": "線を引いたり消したりせず、(0, 0)に移動して上を向きます。",
      "tr": "Silmeden veya bağlantı çizgisi çizmeden (0, 0) konumuna döner ve yukarı bakar.",
      "hy": "Առանց ջնջելու կամ միացնող գիծ նկարելու վերադառնում է (0, 0) և նայում վերև։"
    },
    "code": "goto(100, 80); home();"
  },
  {
    "name": "showTurtle",
    "alias": "zeigeTurtle",
    "signature": "showTurtle()",
    "text": {
      "en": "Shows the turtle without changing position or pen state.",
      "de": "Zeigt die Turtle, ohne Position oder Stiftzustand zu ändern.",
      "ja": "位置やペンの状態を変えずにタートルを表示します。",
      "tr": "Konumu veya kalem durumunu değiştirmeden Turtle gösterilir.",
      "hy": "Ցույց է տալիս Turtle-ը՝ առանց դիրքը կամ գրիչի վիճակը փոխելու։"
    },
    "code": "hideTurtle(); showTurtle();"
  },
  {
    "name": "isVisible",
    "alias": "istSichtbar",
    "signature": "isVisible()",
    "text": {
      "en": "Returns true when the turtle is visible, otherwise false.",
      "de": "Gibt true zurück, wenn die Turtle sichtbar ist, sonst false.",
      "ja": "タートルが見える場合はtrue、それ以外はfalseです。",
      "tr": "Turtle görünürse true, değilse false döndürür.",
      "hy": "Վերադարձնում է true, եթե Turtle-ը տեսանելի է, այլապես false։"
    },
    "code": "writeText(isVisible());"
  },
  {
    "name": "isPenDown",
    "alias": "istStiftUnten",
    "signature": "isPenDown()",
    "text": {
      "en": "Returns true when movement draws a line, otherwise false.",
      "de": "Gibt true zurück, wenn Bewegungen eine Linie zeichnen, sonst false.",
      "ja": "移動時に線を描く場合はtrue、それ以外はfalseです。",
      "tr": "Hareket çizgi çiziyorsa true, değilse false döndürür.",
      "hy": "Վերադարձնում է true, եթե շարժումը գիծ է նկարում, այլապես false։"
    },
    "code": "writeText(isPenDown());"
  },
  {
    "name": "onKey",
    "alias": "beiTaste",
    "signature": "onKey(key, handler)",
    "text": {
      "en": "Calls handler(key) on a key press while the canvas is focused. Returns an unsubscribe function.",
      "de": "Ruft handler(key) bei einem Tastendruck auf der fokussierten Zeichenfläche auf. Gibt eine Abmeldefunktion zurück.",
      "ja": "描画領域にフォーカスがある時、キーでhandler(key)を呼びます。解除関数を返します。",
      "tr": "Çizim alanı odaktayken tuşa basınca handler(key) çağrılır. Aboneliği kaldıran işlev döndürür.",
      "hy": "Դաշտն ընտրված լինելիս ստեղնի սեղմումը կանչում է handler(key)։ Վերադարձնում է անջատման ֆունկցիա։"
    },
    "code": "onKey(\"ArrowRight\", () => { angle(90); forward(20); });"
  },
  {
    "name": "onClick",
    "alias": "beiKlick",
    "signature": "onClick(handler)",
    "text": {
      "en": "Calls handler({x, y}) on a primary pointer press, in logical turtle coordinates. Returns an unsubscribe function.",
      "de": "Ruft handler({x, y}) beim primären Klick mit logischen Turtle-Koordinaten auf. Gibt eine Abmeldefunktion zurück.",
      "ja": "主ボタンで押すと、タートル座標でhandler({x, y})を呼びます。解除関数を返します。",
      "tr": "Birincil tıklamada Turtle koordinatlarıyla handler({x, y}) çağrılır. Aboneliği kaldıran işlev döndürür.",
      "hy": "Հիմնական սեղմումը կանչում է handler({x, y}) Turtle կոորդինատներով։ Վերադարձնում է անջատման ֆունկցիա։"
    },
    "code": "onClick(({ x, y }) => { goto(x, y); drawCircle(20, \"coral\", true); });"
  }
]);
reference.push({
  "name": "circle",
  "alias": "kreisPfad",
  "signature": "circle(radius, extent = 360, steps)",
  "text": {
    "en": "Moves along a circle from the current tangent. Positive radius curves left, negative right. Extent: -360 to 360 degrees; steps: 3 to 2000. Pen-up moves without drawing. Unlike drawCircle, this changes position and heading.",
    "de": "Bewegt die Turtle vom aktuellen Tangentenpunkt auf einem Kreis. Positiver Radius: links; negativer: rechts. Winkel: -360 bis 360 Grad; Schritte: 3 bis 2000. Mit gehobenem Stift ohne Linie. Anders als drawCircle ändert dies Position und Richtung.",
    "ja": "現在の位置と向きから円の経路を進みます。正の半径は左、負は右。角度は-360〜360度、分割数は3〜2000。ペンを上げると線を描きません。drawCircleと違い位置と向きが変わります。",
    "tr": "Mevcut konum ve yönden dairesel bir yol izler. Pozitif yarıçap sola, negatif sağa döner. Açı: -360–360 derece; adım: 3–2000. Kalem yukarıdayken çizmez. drawCircle aksine konum ve yön değişir.",
    "hy": "Շարժվում է շրջանաձև ուղով ընթացիկ դիրքից և ուղղությունից։ Դրական շառավիղը՝ ձախ, բացասականը՝ աջ։ Անկյունը՝ -360–360 աստիճան, քայլերը՝ 3–2000։ Բարձրացված գրիչով չի նկարում։ Ի տարբերություն drawCircle-ի՝ փոխում է դիրքն ու ուղղությունը։"
  },
  "code": "goto(80, 0); color(\"DeepSkyBlue\"); width(4); circle(80, 270);"
});

reference.push(...[
  {
    "name": "stamp",
    "alias": "stemple",
    "signature": "stamp()",
    "text": {
      "en": "Leaves a coloured arrow impression at the current position and direction, even when the turtle is hidden. Returns its ID. Stamps form a removable layer above ordinary drawing; maximum 1000.",
      "de": "Setzt einen farbigen Pfeilstempel an Position und Richtung, auch bei versteckter Turtle. Gibt seine Kennung zurück. Stempel liegen als löschbare Ebene über der Zeichnung; maximal 1000.",
      "ja": "現在の位置と向きに色付き矢印を残し、IDを返します。タートルが非表示でも使えます。描画の上に独立した層として表示。最大1000個。",
      "tr": "Mevcut konum ve yönde renkli ok bırakır ve kimliğini verir. Gizli Turtle ile de çalışır. Çizimin üstünde silinebilir katman; en fazla 1000.",
      "hy": "Ընթացիկ դիրքում և ուղղությամբ թողնում է գունավոր սլաք և վերադարձնում նույնացուցիչը, նույնիսկ թաքնված Turtle-ի դեպքում։ Նկարի վերևում ջնջվող շերտ է․ առավելագույնը 1000։"
    },
    "code": "hideTurtle(); penup(); color(\"coral\"); for(let x=-160;x<=160;x+=80){goto(x,0); angle(x); stamp();}"
  },
  {
    "name": "clearStamp",
    "alias": "loescheStempel",
    "signature": "clearStamp(stampId)",
    "text": {
      "en": "Removes only the stamp with this positive integer ID. Returns true if removed, false if missing. clear() removes all stamps and ordinary ink.",
      "de": "Entfernt nur den Stempel mit dieser positiven ganzzahligen Kennung. Gibt true bei Löschung zurück, sonst false. clear() entfernt alle Stempel und die Zeichnung.",
      "ja": "正の整数IDのスタンプだけを削除。削除したらtrue、存在しなければfalse。clear()は全スタンプと描画を消します。",
      "tr": "Pozitif tam sayı kimliğindeki damgayı siler. Silindiyse true, yoksa false verir. clear() tüm damgaları ve çizimi siler.",
      "hy": "Ջնջում է միայն դրական ամբողջ նույնացուցիչով դրոշմը։ Վերադարձնում է true ջնջելիս, false՝ բացակայելիս։ clear()-ը ջնջում է բոլոր դրոշմներն ու նկարը։"
    },
    "code": "hideTurtle();color(\"coral\");goto(-60,0);const id=stamp();goto(60,0);stamp();clearStamp(id);"
  }
]);

const examples = new Set(["drawDino","drawPacman","drawButterfly","drawFish","drawSubmarine","drawRocket","drawFirework","drawJet","drawBomb","drawFireball","drawDog","drawFerrisWheel","drawCloud","drawFlower","jumpHeight","jumpRandom"]);
const drawingHelpers = new Set(["setBackground","setDualBackground","setTiltedBackground","setTextColor","setTextSize","writeText","drawCircle","drawHalfCircle","drawOvalArc","drawHalfOval","drawRect","drawTriangle","drawStar","drawLine","drawArc","drawSpiral","getRandomNumber","getRandomColor"]);
for (const item of reference) item.category = examples.has(item.name) ? "example" : drawingHelpers.has(item.name) ? "drawing" : "turtle";

export const recipes = [
  {
    "id": "figur-pacman",
    "title": {
      "en": "Pacman",
      "de": "Pacman",
      "ja": "パックマン",
      "tr": "Pacman",
      "hy": "Pacman"
    },
    "shortCode": "drawPacman(85, \"gold\", 60);",
    "code": "setBackground(\"white\"); hideTurtle(); goto(0, 0);\nangle(90);\ndrawPacman(85, \"gold\", 60);"
  },
  {
    "id": "figur-dino",
    "title": {
      "en": "Dinosaur",
      "de": "Dino",
      "ja": "恐竜",
      "tr": "Dinozor",
      "hy": "Դինոզավր"
    },
    "shortCode": "drawDino(120, \"LimeGreen\", 25);",
    "code": "setBackground(\"white\"); hideTurtle(); goto(0, 0);\ndrawDino(120, \"LimeGreen\", 25);"
  },
  {
    "id": "figur-schmetterling",
    "title": {
      "en": "Butterfly",
      "de": "Schmetterling",
      "ja": "チョウ",
      "tr": "Kelebek",
      "hy": "Թիթեռ"
    },
    "shortCode": "drawButterfly(110, \"royalblue\", 35);",
    "code": "setBackground(\"white\"); hideTurtle(); goto(0, 0);\ndrawButterfly(110, \"royalblue\", 35);"
  },
  {
    "id": "figur-fisch",
    "title": {
      "en": "Fish",
      "de": "Fisch",
      "ja": "魚",
      "tr": "Balık",
      "hy": "Ձուկ"
    },
    "shortCode": "drawFish(190, \"coral\");\ndraw();",
    "code": "setBackground(\"white\"); hideTurtle(); goto(0, 0);\ndrawFish(190, \"coral\");"
  },
  {
    "id": "figur-uboot",
    "title": {
      "en": "Submarine",
      "de": "U-Boot",
      "ja": "潜水艦",
      "tr": "Denizaltı",
      "hy": "Սուզանավ"
    },
    "shortCode": "drawSubmarine(250, \"gold\");\ndraw();",
    "code": "setBackground(\"white\"); hideTurtle(); goto(0, 0);\ndrawSubmarine(250, \"gold\");"
  },
  {
    "id": "figur-rakete",
    "title": {
      "en": "Rocket",
      "de": "Rakete",
      "ja": "ロケット",
      "tr": "Roket",
      "hy": "Հրթիռ"
    },
    "shortCode": "drawRocket(220, \"coral\", 0);\ndraw();",
    "code": "setBackground(\"white\"); hideTurtle(); goto(0, 0);\ndrawRocket(220, \"coral\", 0);"
  },
  {
    "id": "figur-feuerwerk",
    "title": {
      "en": "Firework",
      "de": "Feuerwerk",
      "ja": "花火",
      "tr": "Havai fişek",
      "hy": "Հրավառություն"
    },
    "shortCode": "drawFirework(240, \"gold\", 15, 24);\ndraw();",
    "code": "setBackground(\"white\"); hideTurtle(); goto(0, 0);\ndrawFirework(240, \"gold\", 15, 24);"
  },
  {
    "id": "figur-jet",
    "title": {
      "en": "Jet",
      "de": "Jet",
      "ja": "ジェット機",
      "tr": "Jet",
      "hy": "Ինքնաթիռ"
    },
    "shortCode": "drawJet(220);\ndraw();",
    "code": "setBackground(\"white\"); hideTurtle(); goto(0, 0);\ndrawJet(220);"
  },
  {
    "id": "figur-sprengkoerper",
    "title": {
      "en": "Cartoon bomb",
      "de": "Cartoon-Sprengkörper",
      "ja": "漫画の爆弾",
      "tr": "Çizgi film bombası",
      "hy": "Մուլտֆիլմի ռումբ"
    },
    "shortCode": "drawBomb(200);\ndraw();",
    "code": "setBackground(\"white\"); hideTurtle(); goto(0, 0);\ndrawBomb(200);"
  },
  {
    "id": "figur-feuerball",
    "title": {
      "en": "Fireball",
      "de": "Feuerball",
      "ja": "火の玉",
      "tr": "Ateş topu",
      "hy": "Հրե գունդ"
    },
    "shortCode": "drawFireball(240);\ndraw();",
    "code": "setBackground(\"white\"); hideTurtle(); goto(0, 0);\ndrawFireball(240);"
  },
  {
    "id": "figur-hund",
    "title": {
      "en": "Dog",
      "de": "Hund",
      "ja": "犬",
      "tr": "Köpek",
      "hy": "Շուն"
    },
    "shortCode": "drawDog(230, \"right\", 15);\ndraw();",
    "code": "setBackground(\"white\"); hideTurtle(); goto(0, -30);\ndrawDog(230, \"right\", 15);"
  },
  {
    "id": "figur-riesenrad",
    "title": {
      "en": "Ferris wheel",
      "de": "Riesenrad",
      "ja": "観覧車",
      "tr": "Dönme dolap",
      "hy": "Դիտանիվ"
    },
    "shortCode": "drawFerrisWheel(280, 20);\ndraw();",
    "code": "setBackground(\"white\"); hideTurtle(); goto(0, 30);\ndrawFerrisWheel(280, 20);"
  },
  {
    "id": "figur-kreis",
    "title": {
      "en": "Circle",
      "de": "Kreis",
      "ja": "円",
      "tr": "Daire",
      "hy": "Շրջան"
    },
    "shortCode": "drawCircle(90, \"tomato\", true);",
    "code": "setBackground(\"white\"); hideTurtle(); goto(-60, 0);\nangle(0);\ndrawCircle(90, \"tomato\", true);"
  },
  {
    "id": "figur-rechteck",
    "title": {
      "en": "Rectangle",
      "de": "Rechteck",
      "ja": "長方形",
      "tr": "Dikdörtgen",
      "hy": "Ուղղանկյուն"
    },
    "shortCode": "drawRect(80, 120, \"cornflowerblue\", true);",
    "code": "setBackground(\"white\"); hideTurtle(); goto(-60, -40);\nangle(0);\ndrawRect(80, 120, \"cornflowerblue\", true);"
  },
  {
    "id": "figur-dreieck",
    "title": {
      "en": "Triangle",
      "de": "Dreieck",
      "ja": "三角形",
      "tr": "Üçgen",
      "hy": "Եռանկյուն"
    },
    "shortCode": "drawTriangle(140, \"orange\", true);",
    "code": "setBackground(\"white\"); hideTurtle(); goto(-40, -40);\nangle(0);\ndrawTriangle(140, \"orange\", true);"
  },
  {
    "id": "figur-stern",
    "title": {
      "en": "Star",
      "de": "Stern",
      "ja": "星",
      "tr": "Yıldız",
      "hy": "Աստղ"
    },
    "shortCode": "drawStar(5, 95, \"gold\", true);",
    "code": "setBackground(\"white\"); hideTurtle(); goto(-40, -50);\nangle(0);\ndrawStar(5, 95, \"gold\", true);"
  },
  {
    "id": "figur-bogen",
    "title": {
      "en": "Arc",
      "de": "Bogen",
      "ja": "円弧",
      "tr": "Yay",
      "hy": "Աղեղ"
    },
    "shortCode": "drawArc(80, 90, \"orchid\", false);",
    "code": "setBackground(\"white\"); hideTurtle(); goto(-40, -40);\nangle(0);\ndrawArc(80, 90, \"orchid\", false);"
  },
  {
    "id": "figur-halbkreis",
    "title": {
      "en": "Semicircle",
      "de": "Halbkreis",
      "ja": "半円",
      "tr": "Yarım daire",
      "hy": "Կիսաշրջան"
    },
    "shortCode": "drawHalfCircle(65, \"coral\", true);",
    "code": "setBackground(\"white\"); hideTurtle(); goto(-65, 0);\nangle(0);\ndrawHalfCircle(65, \"coral\", true);"
  },
  {
    "id": "figur-oval",
    "title": {
      "en": "Oval",
      "de": "Oval",
      "ja": "楕円",
      "tr": "Oval",
      "hy": "Օվալ"
    },
    "shortCode": "drawOvalArc(180, 100, 360, \"turquoise\", true);",
    "code": "setBackground(\"white\"); hideTurtle(); goto(0, 0);\ndrawOvalArc(180, 100, 360, \"turquoise\", true);"
  },
  {
    "id": "figur-halboval",
    "title": {
      "en": "Half oval",
      "de": "Halbes Oval",
      "ja": "半楕円",
      "tr": "Yarım oval",
      "hy": "Կիսաօվալ"
    },
    "shortCode": "drawHalfOval(180, 100, \"salmon\", true);",
    "code": "setBackground(\"white\"); hideTurtle(); goto(0, 0);\ndrawHalfOval(180, 100, \"salmon\", true);"
  },
  {
    "id": "figur-wolke",
    "title": {
      "en": "Cloud",
      "de": "Wolke",
      "ja": "雲",
      "tr": "Bulut",
      "hy": "Ամպ"
    },
    "shortCode": "setBackground(\"#eaf5ff\");\ndrawCloud(65, \"white\");",
    "code": "setBackground(\"#eaf5ff\"); hideTurtle(); goto(-25, 0);\nangle(0);\ndrawCloud(65, \"white\");"
  },
  {
    "id": "figur-blume",
    "title": {
      "en": "Flower",
      "de": "Blume",
      "ja": "花",
      "tr": "Çiçek",
      "hy": "Ծաղիկ"
    },
    "shortCode": "drawFlower(6, 50, \"orchid\", \"gold\");",
    "code": "setBackground(\"white\"); hideTurtle(); goto(0, 0);\nangle(0);\ndrawFlower(6, 50, \"orchid\", \"gold\");"
  },
  {
    "id": "figur-spirale",
    "title": {
      "en": "Spiral",
      "de": "Spirale",
      "ja": "らせん",
      "tr": "Spiral",
      "hy": "Պարույր"
    },
    "shortCode": "drawSpiral(65, 61);",
    "code": "setBackground(\"white\"); hideTurtle(); goto(0, 0);\nangle(0);\ndrawSpiral(65, 61);"
  },
  {
    "id": "figur-linie",
    "title": {
      "en": "Line",
      "de": "Linie",
      "ja": "線",
      "tr": "Çizgi",
      "hy": "Գիծ"
    },
    "shortCode": "drawLine(-90, -40, 90, 40, \"teal\", 8);",
    "code": "setBackground(\"white\"); hideTurtle(); drawLine(-90, -40, 90, 40, \"teal\", 8);"
  },
  {
    "id": "figur-text",
    "title": {
      "en": "Text",
      "de": "Text",
      "ja": "文字",
      "tr": "Metin",
      "hy": "Տեքստ"
    },
    "shortCode": "writeText(\"Hallo Turtle!\", 28, \"navy\");",
    "code": "setBackground(\"white\"); hideTurtle(); goto(0, 0);\nwriteText(\"Hallo Turtle!\", 28, \"navy\");"
  },
  {
    "id": "figur-hintergrund",
    "title": {
      "en": "Background",
      "de": "Hintergrund",
      "ja": "背景",
      "tr": "Arka plan",
      "hy": "Ֆոն"
    },
    "shortCode": "setBackground(\"MidnightBlue\");",
    "code": "setBackground(\"white\"); hideTurtle(); setBackground(\"MidnightBlue\");"
  },
  {
    "id": "figur-landschaft",
    "title": {
      "en": "Sky and ground",
      "de": "Himmel und Boden",
      "ja": "空と地面",
      "tr": "Gökyüzü ve yer",
      "hy": "Երկինք և գետին"
    },
    "shortCode": "setDualBackground(\"skyblue\", \"palegreen\", -70);",
    "code": "setBackground(\"white\"); hideTurtle(); setDualBackground(\"skyblue\", \"palegreen\", -70);"
  },
  {
    "id": "figur-zufallsgroesse",
    "title": {
      "en": "Random size",
      "de": "Zufallsgröße",
      "ja": "ランダムな大きさ",
      "tr": "Rastgele boyut",
      "hy": "Պատահական չափ"
    },
    "shortCode": "let radius = getRandomNumber(20, 45);\ndrawOvalArc(radius * 2, radius * 2, 360, \"royalblue\", true);",
    "code": "setBackground(\"white\"); hideTurtle(); for (let x of [-200, -100, 0, 100, 200]) {\n  let radius = getRandomNumber(20, 45);\n  goto(x, 0);\n  drawOvalArc(radius * 2, radius * 2,\n    360, \"royalblue\", true);\n}"
  },
  {
    "id": "figur-zufallsfarbe",
    "title": {
      "en": "Random figure colours",
      "de": "Zufallsfarben für Figuren",
      "ja": "図形のランダムな色",
      "tr": "Şekillerde rastgele renk",
      "hy": "Պատկերների պատահական գույներ"
    },
    "shortCode": "drawOvalArc(65, 65, 360,\n    getRandomColor(), true);",
    "code": "setBackground(\"white\"); hideTurtle(); for (let x of [-200, -100, 0, 100, 200]) {\n  goto(x, 0);\n  drawOvalArc(65, 65, 360,\n    getRandomColor(), true);\n}"
  },
  {
    "id": "figur-zufallslinien",
    "title": {
      "en": "Random line colours",
      "de": "Zufallsfarben für Linien",
      "ja": "線のランダムな色",
      "tr": "Çizgilerde rastgele renk",
      "hy": "Գծերի պատահական գույներ"
    },
    "shortCode": "color(getRandomColor());\nwidth(10);\nforward(120);",
    "code": "setBackground(\"white\"); hideTurtle(); for (let y of [-160, -80, 0, 80, 160]) {\n  penup();\n  goto(-180, y);\n  angle(90);\n  pendown();\n  color(getRandomColor());\n  width(10);\n  forward(360);\n}"
  },
  {
    "id": "figur-springen",
    "title": {
      "en": "Random jumps",
      "de": "Zufällige Sprünge",
      "ja": "ランダムに移動",
      "tr": "Rastgele sıçramalar",
      "hy": "Պատահական ցատկեր"
    },
    "shortCode": "drawStar(5, 15, \"gold\", true);",
    "code": "setBackground(\"white\"); hideTurtle(); for (let i = 0; i < 8; i++) {\n  jumpRandom();\n  drawStar(5, 15, \"gold\", true);\n}"
  },
  {
    "id": "figur-fuellen",
    "title": {
      "en": "Fill your own shape",
      "de": "Eigene Form füllen",
      "ja": "自分の形を塗る",
      "tr": "Kendi şeklini doldur",
      "hy": "Լցնել սեփական պատկերը"
    },
    "shortCode": "beginFill(\"tomato\");\nforward(100);\nright(120);\nforward(100);\nright(120);\nforward(100);\nendFill();",
    "code": "setBackground(\"white\"); hideTurtle(); goto(-60, -40);\nangle(0);\nbeginFill(\"tomato\");\nforward(100);\nright(120);\nforward(100);\nright(120);\nforward(100);\nendFill();"
  }
];
