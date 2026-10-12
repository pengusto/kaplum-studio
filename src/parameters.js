import { parser } from "@lezer/javascript";
// Meanings follow positional arguments in the maintained function signatures.
const labels = {
  radius: ["Radius", "Radius", "半径", "Yarıçap", "Շառավիղ"],
  size: ["Size", "Größe", "大きさ", "Boyut", "Չափ"],
  paintColor: ["Color", "Farbe", "色", "Renk", "Գույն"],
  filled: [
    "Filled shape",
    "Ausgefüllte Form",
    "塗りつぶす",
    "İçi dolu şekil",
    "Լցված պատկեր",
  ],
  widthValue: ["Width", "Breite", "幅", "Genişlik", "Լայնություն"],
  height: ["Height", "Höhe", "高さ", "Yükseklik", "Բարձրություն"],
  points: [
    "Number of points",
    "Anzahl der Spitzen",
    "頂点の数",
    "Uç sayısı",
    "Գագաթների քանակ",
  ],
  petals: [
    "Number of petals",
    "Anzahl der Blütenblätter",
    "花びらの数",
    "Yaprak sayısı",
    "Թերթիկների քանակ",
  ],
  outerColor: [
    "Petal color",
    "Blütenfarbe",
    "花びらの色",
    "Yaprak rengi",
    "Թերթիկի գույն",
  ],
  innerColor: [
    "Center color",
    "Farbe der Mitte",
    "中心の色",
    "Merkez rengi",
    "Կենտրոնի գույն",
  ],
  degrees: [
    "Angle in degrees",
    "Winkel in Grad",
    "角度（度）",
    "Derece cinsinden açı",
    "Անկյունը աստիճաններով",
  ],
  rotation: [
    "Rotation in degrees",
    "Drehung in Grad",
    "回転角度",
    "Dönme açısı",
    "Պտույտը աստիճաններով",
  ],
  legAngle: [
    "Leg angle",
    "Beinwinkel",
    "脚の角度",
    "Bacak açısı",
    "Ոտքի անկյուն",
  ],
  wingAngle: [
    "Wing angle",
    "Flügelwinkel",
    "翼の角度",
    "Kanat açısı",
    "Թևի անկյուն",
  ],
  tailAngle: [
    "Tail angle",
    "Schwanzwinkel",
    "尾の角度",
    "Kuyruk açısı",
    "Պոչի անկյուն",
  ],
  mouth: [
    "Mouth opening in degrees",
    "Mundöffnung in Grad",
    "口の開き角度",
    "Ağız açıklığı",
    "Բերանի բացման անկյուն",
  ],
  facing: [
    "Facing direction",
    "Blickrichtung",
    "向き",
    "Bakış yönü",
    "Հայացքի ուղղություն",
  ],
  direction: ["Direction", "Richtung", "方向", "Yön", "Ուղղություն"],
  rays: [
    "Number of rays",
    "Anzahl der Strahlen",
    "光線の数",
    "Işın sayısı",
    "Ճառագայթների քանակ",
  ],
  topColor: [
    "Sky color",
    "Himmelsfarbe",
    "空の色",
    "Gökyüzü rengi",
    "Երկնքի գույն",
  ],
  bottomColor: [
    "Ground color",
    "Bodenfarbe",
    "地面の色",
    "Zemin rengi",
    "Գետնի գույն",
  ],
  horizonY: [
    "Horizon height",
    "Höhe des Horizonts",
    "地平線の高さ",
    "Ufuk yüksekliği",
    "Հորիզոնի բարձրություն",
  ],
  text: [
    "Text to display",
    "Angezeigter Text",
    "表示する文字",
    "Gösterilecek metin",
    "Ցուցադրվող տեքստ",
  ],
  message: [
    "Text to display",
    "Angezeigter Text",
    "表示する文字",
    "Gösterilecek metin",
    "Ցուցադրվող տեքստ",
  ],
  thickness: [
    "Line thickness",
    "Linienstärke",
    "線の太さ",
    "Çizgi kalınlığı",
    "Գծի հաստություն",
  ],
  distance: ["Distance", "Strecke", "距離", "Mesafe", "Հեռավորություն"],
  steps: [
    "Number of steps",
    "Anzahl der Schritte",
    "ステップ数",
    "Adım sayısı",
    "Քայլերի քանակ",
  ],
  turn: [
    "Turn per step",
    "Drehung pro Schritt",
    "各ステップの回転",
    "Her adımda dönüş",
    "Պտույտ յուրաքանչյուր քայլում",
  ],
  tick: [
    "Current animation step",
    "Aktueller Animationsschritt",
    "現在のアニメーションステップ",
    "Geçerli animasyon adımı",
    "Ընթացիկ շարժման քայլ",
  ],
  duration: [
    "Number of animation steps",
    "Anzahl der Animationsschritte",
    "アニメーションのステップ数",
    "Animasyon adımı sayısı",
    "Շարժման քայլերի քանակ",
  ],
  min: [
    "Smallest value",
    "Kleinster Wert",
    "最小値",
    "En küçük değer",
    "Նվազագույն արժեք",
  ],
  max: [
    "Largest value",
    "Größter Wert",
    "最大値",
    "En büyük değer",
    "Առավելագույն արժեք",
  ],
  x: [
    "Horizontal position",
    "Waagerechte Position",
    "横の位置",
    "Yatay konum",
    "Հորիզոնական դիրք",
  ],
  y: [
    "Vertical position",
    "Senkrechte Position",
    "縦の位置",
    "Dikey konum",
    "Ուղղահայաց դիրք",
  ],
  x1: [
    "Start horizontal position",
    "Startposition waagerecht",
    "始点の横位置",
    "Başlangıç yatay konumu",
    "Սկզբի հորիզոնական դիրք",
  ],
  y1: [
    "Start vertical position",
    "Startposition senkrecht",
    "始点の縦位置",
    "Başlangıç dikey konumu",
    "Սկզբի ուղղահայաց դիրք",
  ],
  x2: [
    "End horizontal position",
    "Endposition waagerecht",
    "終点の横位置",
    "Bitiş yatay konumu",
    "Վերջի հորիզոնական դիրք",
  ],
  y2: [
    "End vertical position",
    "Endposition senkrecht",
    "終点の縦位置",
    "Bitiş dikey konumu",
    "Վերջի ուղղահայաց դիրք",
  ],
  value: [
    "Line thickness",
    "Linienstärke",
    "線の太さ",
    "Çizgi kalınlığı",
    "Գծի հաստություն",
  ],
  enabled: [
    "Enabled: true or false",
    "Aktiv: true oder false",
    "有効：true または false",
    "Etkin: true veya false",
    "Միացված՝ true կամ false",
  ],
  callback: [
    "Function to run",
    "Ausgeführte Funktion",
    "実行する関数",
    "Çalıştırılacak fonksiyon",
    "Կատարվող ֆունկցիա",
  ],
  id: [
    "Timer identifier",
    "Kennung des Timers",
    "タイマーの識別子",
    "Zamanlayıcı kimliği",
    "Ժամաչափի նույնացուցիչ",
  ],
  delayMilliseconds: [
    "Delay in milliseconds",
    "Wartezeit in Millisekunden",
    "待ち時間（ミリ秒）",
    "Milisaniye cinsinden süre",
    "Սպասման ժամանակը միլիվայրկյաններով",
  ],
  font: [
    "Font and size",
    "Schriftart und Größe",
    "フォントとサイズ",
    "Yazı tipi ve boyutu",
    "Տառատեսակ և չափ",
  ],
  radians: [
    "Angle in radians",
    "Winkel im Bogenmaß",
    "角度（ラジアン）",
    "Radyan cinsinden açı",
    "Անկյունը ռադիաններով",
  ],
};
const languageIndex = { en: 0, de: 1, ja: 2, tr: 3, hy: 4 };
export function parameterMeanings(entry, locale) {
  if (entry.name === "color")
    return [
      { name: "paintColor", meaning: labels.paintColor[languageIndex[locale]] },
    ];
  const inside = entry.signature.slice(entry.signature.indexOf("(") + 1, -1);
  if (!inside.trim()) return [];
  return inside.split(",").map((part) => {
    const [name, value] = part.trim().split(/\s*=\s*/);
    return {
      name,
      value,
      meaning:
        labels[name]?.[languageIndex[locale]] ||
        (() => {
          throw new Error(
            "Missing parameter meaning: " + entry.name + "." + name,
          );
        })(),
    };
  });
}

// The editor's JavaScript parser keeps callback commas and nested calls intact.
export function exampleCall(source, name) {
  let result = null;
  parser.parse(source).iterate({
    enter(node) {
      if (node.name !== "CallExpression") return;
      const callee = node.node.firstChild;
      if (!callee || source.slice(callee.from, callee.to) !== name) return;
      const list = callee.nextSibling;
      const values = [];
      for (let child = list?.firstChild; child; child = child.nextSibling) {
        if (!["(", ")", ","].includes(child.name))
          values.push(source.slice(child.from, child.to));
      }
      result = {
        source: source.slice(node.from, node.to),
        values,
        position: node.from,
      };
    },
  });
  return result;
}

// Shared by catalogue and inspector; expressions are preserved verbatim.
export function parameterValues(source, entry, locale) {
  const call = entry && exampleCall(source, entry.name);
  return entry ? parameterMeanings(entry, locale).map((p, i) => call?.values[i] ?? p.value ?? "undefined") : [];
}
export function replaceParameterCall(source, entry, values) {
  const call = entry && exampleCall(source, entry.name);
  if (!call) return source;
  const args = [...values];
  while (args.at(-1) === "undefined") args.pop();
  return source.slice(0, call.position) + `${entry.name}(${args.join(", ")})` + source.slice(call.position + call.source.length);
}
